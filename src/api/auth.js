const USERS_KEY = 'store-app-users';
const SESSION_KEY = 'store-app-session';

const readUsers = () => {
	try {
		return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
	} catch {
		return [];
	}
};

const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const register = ({ name, email, password, role = 'customer' }) => {
	const users = readUsers();
	const normalizedEmail = email.trim().toLowerCase();

	if (users.some((user) => user.email === normalizedEmail)) {
		throw new Error('An account with this email already exists.');
	}

	const user = {
		id: window.crypto && typeof window.crypto.randomUUID === 'function' ? window.crypto.randomUUID() : `${Date.now()}`,
		name: name.trim(),
		email: normalizedEmail,
		password,
		role,
	};

	saveUsers([...users, user]);
	return createSession(user);
};

export const login = ({ email, password, role = 'customer' }) => {
	const normalizedEmail = email.trim().toLowerCase();
	const user = readUsers().find(
		(candidate) => candidate.email === normalizedEmail && candidate.password === password && candidate.role === role,
	);

	if (!user) {
		throw new Error('Email, password, or account type is incorrect.');
	}

	return createSession(user);
};

export const getSession = () => {
	try {
		return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
	} catch {
		return null;
	}
};

export const logout = () => localStorage.removeItem(SESSION_KEY);

const createSession = ({ password, ...user }) => {
	localStorage.setItem(SESSION_KEY, JSON.stringify(user));
	return user;
};