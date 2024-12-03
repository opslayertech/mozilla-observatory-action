import { URL } from "node:url";
import {
	type MozillaScanResponse,
	observatoryResponseToMarkdown,
} from "./utils";

type ScanResult = {
	markdown: string;
	json: MozillaScanResponse;
};

export async function scan({ url }: { url: string }): Promise<ScanResult> {
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

	const json: MozillaScanResponse = await response.json();

	console.log("Observatory response:", json);

	if (json.error) {
		throw new Error(json.error + " " + json.message);
	}

	const fileName = "observatory.md";

	const markdown = observatoryResponseToMarkdown(json);

	console.log(`Observatory scan results written to ${fileName}`);

	return { markdown, json };
}
