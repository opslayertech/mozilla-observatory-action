import * as core from "@actions/core";
import { scan } from "./scan";

async function main() {
	try {
		const url = core.getInput("url");
		console.log(`URL from Input: ${url}`);

		const result = await scan({ url });

		console.log(`Scan result: ${result}`);
		core.setOutput("result", result);
	} catch (error) {
		core.setFailed(error.message);
	}
}

main().catch((error) => {
	console.error(error);
	throw error;
});
