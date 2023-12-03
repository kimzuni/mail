const form = html.querySelector("form");

const formSubmit = async function(e) {
	e.preventDefault();
	const [title, content] = [form.title, form.content].map(x => x.value.trim());

	if (e.type == "reset") {
		if ((title || content) && confirm("Do you want to clear the form?")) {
			form.title.value = "";
			form.content.value = "";
		}
		return;
	} else if (!title && !content) {
		f_msgbox({type: "error", message: "Nothing has been entered."});
		return false;
	} else if (!confirm("Do you want to send an email?")) return false;

	try {
		const {message} = (await axios.post(host, {
			title, content
		})).data;
		f_msgbox({type: "success", message: message || "Success"});
		form.title.value = "";
		form.content.value = "";
	} catch(err) {
		const message = err.response?.data?.message;
		f_msgbox({type: "error", message: message || "Error"});
	}
}

form.addEventListener("submit", formSubmit);
form.addEventListener("reset", formSubmit);
