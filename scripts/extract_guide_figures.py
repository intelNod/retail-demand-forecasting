"""Extract the verified chart output from each executed project notebook."""

from __future__ import annotations

import base64
import json
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
NOTEBOOK_DIR = PROJECT_ROOT / "notebooks"
OUTPUT_DIR = PROJECT_ROOT / "docs" / "guide_assets"


def extract_first_png(notebook_path: Path) -> Path:
    notebook = json.loads(notebook_path.read_text(encoding="utf-8"))
    for cell in notebook["cells"]:
        for output in cell.get("outputs", []):
            encoded = output.get("data", {}).get("image/png")
            if encoded:
                if isinstance(encoded, list):
                    encoded = "".join(encoded)
                output_path = OUTPUT_DIR / f"{notebook_path.stem}.png"
                output_path.write_bytes(base64.b64decode(encoded))
                return output_path
    raise RuntimeError(f"No PNG output found in {notebook_path.name}")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    notebooks = sorted(NOTEBOOK_DIR.glob("*.ipynb"))
    if len(notebooks) != 12:
        raise RuntimeError(f"Expected 12 notebooks, found {len(notebooks)}")
    for notebook_path in notebooks:
        output_path = extract_first_png(notebook_path)
        print(output_path.relative_to(PROJECT_ROOT))


if __name__ == "__main__":
    main()
