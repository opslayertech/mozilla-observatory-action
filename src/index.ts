import * as core from "@actions/core";
import { scan } from "./scan";

async function main() {
	try {
		const url = core.getInput("url");
		console.log(`URL from Input: ${url}`);

		const { markdown, json } = await scan({ url });

		console.log(`Scan Markdown result: ${markdown}`);
		console.log(`Scan JSON result: ${json}`);
		core.setOutput("markdown-result", markdown);
		core.setOutput("json-result", markdown);
	} catch (error) {
		core.setFailed(error.message);
	}
}

main().catch((error) => {
	console.error(error);
	throw error;
});
