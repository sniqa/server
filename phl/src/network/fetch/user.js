import { postData } from './fetch'

export function login (username, password) {
	return postData({
		login: {
			'username': username,
			'password': password
		}
	})
}

export function findUser (username) {
	return postData({
		findUser: {
			'username': username
		}
	})
}

export function create (username, password) {
	return postData({
		createUser: {
			'username': username,
			'password': password
		}
	})
}