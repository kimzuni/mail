const form = html.querySelector("form");

form.addEventListener("submit", async function(e) {
	e.preventDefault();

	const {subject, content} = form;
	try {
		const {message} = (await axios.post("https://sendmail.kimzuni.com/", {
			subject: subject.value.trim(),
			content: content.value.trim(),
		})).data;
		if (message) f_msgbox({type: "success", message});
	} catch(err) {
		const {message} = err.response.data;
		f_msgbox({type: "error", message: message || "Failed"});
	}
});
