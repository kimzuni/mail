const host = "https://mailer.kimzuni.com/";
const stag = html.querySelector(".status");
const sval = {
	default: {
		title: undefined,
		color: undefined,
	}, check: {
		title: "Checking...",
		color: null,
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
	if (e.title) stag.title = "Server Status: " + e.title;
	if (e.color) {
		stag.classList.remove("check");
		set_style(stag, "--status", e.color);
		form.querySelector('[type="submit"]').toggleAttribute("disabled", !e.submit);
	}
}

let statusTimeout;
const checkStatus = async function() {
	clearTimeout(statusTimeout);

	const totalLength = form.querySelector("rect").getTotalLength() / 20;
	set_style(stag, "--length", totalLength);
	set_style(stag, "--length-", totalLength*-1);
	stag.classList.add("check");
	updateStatus(sval.check);

	try {
		await axios.get(host);
		updateStatus(sval.ok);
	} catch(err) {
		updateStatus(sval.error);
	}

	statusTimeout = setTimeout(checkStatus, 5000);
}



stag.click();
