interface Result {
	id: number;
	details_url: string;
	algorithm_version: number;
	scanned_at: string;
	error: null | string;
	grade: string;
	score: number;
	status_code: number;
	tests_failed: number;
	tests_passed: number;
	tests_quantity: number;
	message?: string;
}

export function observatoryResponseToMarkdown(response: Result) {
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
