const form = document.querySelector("#prediction-form");
const submitButton = document.querySelector("#submit-button");
const resetButton = document.querySelector("#reset-example");
const statusElement = document.querySelector("#model-status");
const placeholder = document.querySelector("#result-placeholder");
const resultValue = document.querySelector("#result-value");
const predictionNumber = document.querySelector("#prediction-number");
const errorMessage = document.querySelector("#error-message");
const batchForm = document.querySelector("#batch-form");
const batchFile = document.querySelector("#batch-file");
const batchSubmit = document.querySelector("#batch-submit");
const batchError = document.querySelector("#batch-error");
const batchResults = document.querySelector("#batch-results");
const batchMetrics = document.querySelector("#batch-metrics");
const batchTable = document.querySelector("#batch-table");
const batchDownload = document.querySelector("#batch-download");
const fileName = document.querySelector("#file-name");

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const exampleValues = Object.fromEntries(
  Array.from(form.elements)
    .filter((element) => element.name)
    .map((element) => [element.name, element.value]),
);

async function checkHealth() {
  try {
    const response = await fetch("/health");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Model unavailable");
    statusElement.classList.add("ready");
    statusElement.querySelector("span:last-child").textContent = "Model ready";
  } catch (error) {
    statusElement.classList.add("error");
    statusElement.querySelector("span:last-child").textContent = "Model unavailable";
  }
}

function showError(message) {
  placeholder.hidden = true;
  resultValue.hidden = true;
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function showPrediction(value) {
  errorMessage.hidden = true;
  placeholder.hidden = true;
  predictionNumber.textContent = Number(value).toFixed(2);
  resultValue.hidden = false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.hidden = true;
  submitButton.disabled = true;
  submitButton.textContent = "Calculating…";

  const payload = Object.fromEntries(
    Array.from(new FormData(form).entries()).map(([key, value]) => [key, Number(value)]),
  );

  try {
    const response = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Prediction failed.");
    showPrediction(data.predicted_weekly_units);
  } catch (error) {
    showError(error.message || "Prediction failed.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Calculate forecast";
  }
});

resetButton.addEventListener("click", () => {
  for (const [name, value] of Object.entries(exampleValues)) {
    form.elements[name].value = value;
  }
  errorMessage.hidden = true;
  resultValue.hidden = true;
  placeholder.hidden = false;
});

batchFile.addEventListener("change", () => {
  fileName.textContent = batchFile.files[0]?.name || "No file selected";
});

batchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  batchError.hidden = true;
  batchResults.hidden = true;
  batchSubmit.disabled = true;
  batchSubmit.textContent = "Running predictions…";

  try {
    const body = new FormData(batchForm);
    const response = await fetch("/predict-file", { method: "POST", body });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Batch prediction failed.");

    const metricLabels = {
      rows: "Rows",
      mae: "Demo MAE",
      mean_actual: "Mean actual",
      mean_prediction: "Mean prediction",
    };
    batchMetrics.innerHTML = Object.entries(data.metrics)
      .map(([key, value]) => `<article><span>${escapeHTML(metricLabels[key] || key)}</span><strong>${Number(value).toFixed(key === "rows" ? 0 : 2)}</strong></article>`)
      .join("");
    const headers = data.preview_columns;
    batchTable.innerHTML = `
      <thead><tr>${headers.map((header) => `<th>${escapeHTML(header)}</th>`).join("")}</tr></thead>
      <tbody>${data.preview.map((row) => `<tr>${headers.map((header) => `<td>${escapeHTML(row[header] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody>
    `;
    batchDownload.href = data.download_url;
    batchResults.hidden = false;
  } catch (error) {
    batchError.textContent = error.message || "Batch prediction failed.";
    batchError.hidden = false;
  } finally {
    batchSubmit.disabled = false;
    batchSubmit.textContent = "Run batch prediction";
  }
});

checkHealth();
