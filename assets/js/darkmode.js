const darkmode = function(mode) {
	html.setAttribute("darkmode", mode);
}

darkmode(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? true : false);
