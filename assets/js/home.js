const form = html.querySelector("form");

form.addEventListener("submit", async function(e) {
	e.preventDefault();

	const subject = subject.value.trim();
	const content = content.value.trim();
	if (!subject && !content) {
		f_msgbox({type: "error", message: "Nothing has been entered."});
		return false;
	} else if (!confirm("Do you want to send an email?")) return false;

	try {
		const {message} = (await axios.post("https://sendmail.kimzuni.com/", {
			subject, content
		})).data;
		f_msgbox({type: "success", message: message || "Success"});
		form.subject.value = "";
		form.content.value = "";
	} catch(err) {
		const message = err.response?.data?.message;
		f_msgbox({type: "error", message: message || "Unknown Error"});
	}
});
