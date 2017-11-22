export const userService = {
	login,
	logout,
	register
};

function login(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({username, password})
	};

	return fetch('/users/authenticate', requestOptions)
		.then(response => {
			if (!response.ok) {
				return Promise.reject(response.statusText);
			}
			return response.json();
		})
		.then(user => {
			if (user && user.token) {
				localStorage.setItem('user', JSON.stringify(user));
			}

			return user;
		});
}

function logout() {
	localStorage.removeItem('user');
}

function register(user) {
	const requestOptions = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(user)
	};

	return fetch('/users/register', requestOptions).then(handleResponse);
}

function handleResponse(response) {
	if (!response.ok) {
		return Promise.reject(response.statusText);
	}

	return response.json();
}