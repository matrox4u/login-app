let users = JSON.parse(localStorage.getItem('users')) || [];

export function configureHTTPBackend() {
	let realFetch = window.fetch;
	window.fetch = function (url, opts) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// authenticate
				if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
					// get parameters from post request
					let params = JSON.parse(opts.body);

					let filteredUsers = users.filter(user => {
						return user.username === params.username && user.password === params.password;
					});

					if (filteredUsers.length) {
						let user = filteredUsers[0];
						let responseJson = {
							id: user.id,
							username: user.username,
							token: 'fake-jwt-token'
						};
						resolve({ok: true, json: () => responseJson});
					} else {
						reject('Username or password is incorrect');
					}

					return;
				}

				if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
					if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
						let urlParts = url.split('/');
						let id = parseInt(urlParts[urlParts.length - 1]);
						let matchedUsers = users.filter(user => {
							return user.id === id;
						});
						let user = matchedUsers.length ? matchedUsers[0] : null;

						resolve({ok: true, json: () => user});
					} else {
						reject('Unauthorised');
					}

					return;
				}

				if (url.endsWith('/users/register') && opts.method === 'POST') {
					let newUser = JSON.parse(opts.body);

					let duplicateUser = users.filter(user => {
						return user.username === newUser.username;
					}).length;
					if (duplicateUser) {
						reject('Username "' + newUser.username + '" is already taken');
						return;
					}

					newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
					users.push(newUser);
					localStorage.setItem('users', JSON.stringify(users));

					resolve({ok: true, json: () => ({})});

					return;
				}

				realFetch(url, opts).then(response => resolve(response));

			}, 500);
		});
	}
}