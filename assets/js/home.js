const form = html.querySelector("form");

form.addEventListener("submit", async function(e) {
	e.preventDefault();

	try {
		const {subject, content} = form;
		const {message} = (await axios.post("https://sendmail.kimzuni.com/", {
			subject: subject.value.trim(),
			content: content.value.trim(),
		})).data;
		f_msgbox({type: "success", message: message || "Success"});
		subject.value = "";
		content.value = "";
	} catch(err) {
		const message = err.response?.data?.message;
		f_msgbox({type: "error", message: message || "Unknown Error"});
	}
});
