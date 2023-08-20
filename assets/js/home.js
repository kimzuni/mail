const host = "https://sendmail.kimzuni.com/";
const form = html.querySelector("form");
const stag = html.querySelector(".status");

stag.click();

form.addEventListener("submit", async function(e) {
	e.preventDefault();

	const [subject, content] = [form.subject, form.content].map(x => x.value.trim());
	if (!subject && !content) {
		f_msgbox({type: "error", message: "Nothing has been entered."});
		return false;
	} else if (!confirm("Do you want to send an email?")) return false;

	try {
		const {message} = (await axios.post(host, {
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
