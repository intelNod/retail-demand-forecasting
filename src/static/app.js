const form = document.querySelector("#prediction-form");
const submitButton = document.querySelector("#submit-button");
const resetButton = document.querySelector("#reset-example");
const statusElement = document.querySelector("#model-status");
const placeholder = document.querySelector("#result-placeholder");
const resultValue = document.querySelector("#result-value");
const predictionNumber = document.querySelector("#prediction-number");
const errorMessage = document.querySelector("#error-message");

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

checkHealth();
