const domains = [
	"https://kimzuni.com",
	"https://mail.kimzuni.com",
	"https://zuni.kim",
];

const localStorageShare = function(key) {
	const value = localStorage.getItem(key);
	const data = {key: value};
	for (const domain of domains) {
		if (domain.split("//")[1] == location.hostname) continue;
		window.postMessage(data, domain);
	}
}

window.addEventListener("message", function(e) {
	if (!domains.includes(e.origin)) return false;
	const data = e.data;

	for (const key in data) {
		const value = data[key];
		if (value)
			localStorage.setItem(key, value);
		else
			localStorage.removeItem(key);
	}
});
