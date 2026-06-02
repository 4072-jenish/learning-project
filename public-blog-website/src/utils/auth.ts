export const getToken = () => {
	return localStorage.getItem("token");
};

export const requireLogin = () => {
	const token = getToken();

	if (!token) {
		alert("Please login first");
		window.location.href = "/auth/login";
		return null;
	}

	return token;
};