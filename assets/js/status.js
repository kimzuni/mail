const host = "https://mailer.kimzuni.com/";
const stag = html.querySelector(".status");
const sval = {
	default: {
		title: undefined,
		color: undefined,
	}, check: {
		title: "Checking...",
		color: "var(--warning-color)",
	}, ok: {
		title: "Good",
		color: "var(--success-color)",
		submit: true,
	}, error: {
		title: "Down",
		color: "var(--error-color)",
	},
}



const updateStatus = function(e) {
	stag.title = e.title ? "Server Status: " + e.title : "";
	set_style(stag, "--status", e.color || "");
	stag.classList.remove("check");

	const elem = form.querySelector('[type="submit"]');
	e.submit ? elem.removeAttribute("disabled") : elem.setAttribute("disabled", "");
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



stag.click();
