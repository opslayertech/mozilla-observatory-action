# Mozilla Observatory Action

The **Mozilla Observatory Action** is a GitHub Action that automates security scans using the Mozilla Observatory API. This action allows developers to seamlessly integrate website security scans into their CI/CD pipelines, ensuring continuous monitoring and improvement of web application security.

---

## Features
- Scans a specified URL using the Mozilla Observatory API.
- Provides scan results in both **Markdown** and **JSON** formats as outputs.
- Easy integration with GitHub Actions workflows.

---

## Inputs

| Name  | Description                                   | Required | Default |
|-------|-----------------------------------------------|----------|---------|
| `url` | The URL of the website to scan (e.g., `https://example.com`). | Yes      | None    |

---

## Outputs

| Name              | Description                            |
|-------------------|----------------------------------------|
| `markdown-result` | The scan result in Markdown format.    |
| `json-result`     | The scan result in JSON format for parsing. |

---

## Usage

Here's an example of how to use the Mozilla Observatory Action in a GitHub Actions workflow:

```yaml
name: Mozilla Observatory Scan

on:
  push:
    branches:
      - main

jobs:
  observatory-scan:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Run Mozilla Observatory Scan
      - name: Run Mozilla Observatory Scan
        id: scan
        uses: opslayertech/mozilla-observatory-action@v1
        with:
          url: "https://example.com"

      # Step 2: Use the Markdown Scan Result
      - name: Use Scan Result
        run: |
          echo "Scan result: ${{ steps.scan.outputs.markdown-result }}"

      # Step 3: Use the JSON Scan Result
      - name: Use Scan Result JSON
        run: |
          echo "Scan result: ${{ steps.scan.outputs.json-result }}"
```

## Example Outputs

### Markdown Result

```markdown
- **Scan ID**: 54422145
- **Details**: [View full report](https://developer.mozilla.org/en-US/observatory/analyze?host=example.com)
- **Algorithm Version**: 4
- **Scanned At**: 12/3/2024, 4:56:08 PM
- **Status Code**: 200
- **Grade**: B+
- **Score**: 80 / 100

### Test Summary
- **Total Tests**: 10
- **Tests Passed**: 9
- **Tests Failed**: 1
```

### JSON Result

```json
{
  "id": 54422145,
  "details_url": "https://developer.mozilla.org/en-US/observatory/analyze?host=example.com",
  "algorithm_version": 4,
  "scanned_at": "2024-12-03T16:56:08.803Z",
  "error": null,
  "grade": "B+",
  "score": 80,
  "status_code": 200,
  "tests_failed": 1,
  "tests_passed": 9,
  "tests_quantity": 10
}
``` 
