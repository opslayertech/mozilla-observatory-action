import { URL } from "url";
import * as core from "@actions/core";
import { writeFile } from "fs/promises";
import fetch from "node-fetch";

function observatoryResponseToMarkdown(response) {
	const {
		id,
		details_url,
		algorithm_version,
		scanned_at,
		grade,
		score,
		status_code,
		tests_failed,
		tests_passed,
		tests_quantity,
	} = response;

	return `## Observatory Scan Results
  
  - **Scan ID**: ${id}
  - **Details**: [View full report](${details_url})
  - **Algorithm Version**: ${algorithm_version}
  - **Scanned At**: ${new Date(scanned_at).toLocaleString()}
  - **Status Code**: ${status_code}
  - **Grade**: ${grade}
  - **Score**: ${score} / 100
  
  ### Test Summary
  - **Total Tests**: ${tests_quantity}
  - **Tests Passed**: ${tests_passed}
  - **Tests Failed**: ${tests_failed}`;
}

async function scan({ url }) {
	if (!url) {
		throw new Error("SANDBOX_URL env variable is required");
	}

	const hostname = new URL(url).hostname;

	console.log("Running Observatory scan for:", hostname);

	const response = await fetch(
		`https://observatory-api.mdn.mozilla.net/api/v2/scan?host=${hostname}`,
		{
			method: "POST",
		},
	);

	const json = await response.json();

	console.log("Observatory response:", json);

	if (json.error) {
		throw new Error(json.error + " " + json.message);
	}

	const fileName = "observatory.md";

	const markdown = observatoryResponseToMarkdown(json);

	await writeFile(fileName, markdown, "utf8");

	console.log(`Observatory scan results written to ${fileName}`);
}

async function main() {
	try {
		const url = core.getInput("url");
		console.log(`URL from Input: ${url}`);
		await scan({ url });
	} catch (error) {
		core.setFailed(error.message);
	}
}

main().catch((error) => {
	console.error(error);
	throw error;
});
