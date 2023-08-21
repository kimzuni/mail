const form = html.querySelector("form");

form.addEventListener("submit", async function(e) {
	e.preventDefault();

	const [title, content] = [form.title, form.content].map(x => x.value.trim());
	if (!title && !content) {
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
});
