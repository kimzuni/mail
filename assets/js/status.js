const sval = {
	default: {
		title: false,
		color: false,
	}, check: {
		title: "Checking...",
		color: "var(--warning-color)",
	}, ok: {
		title: "Good",
		color: "var(--success-color)",
	}, error: {
		title: "Bad",
		color: "var(--error-color)",
	},
}



const updateStatus = function(e) {
	stag.title = e.title || "";
	set_style(stag, "--status", e.color || "");
	stag.classList.remove("check");
}

let statusTimeout;
const checkStatus = async function() {
	clearTimeout(statusTimeout);
	stag.classList.add("check");

	try {
		await axios.get(host);
		updateStatus(sval.ok);
	} catch(err) {
		updateStatus(sval.error);
	}

	statusTimeout = setTimeout(checkStatus, 5000);
}
