import { useState } from 'react';

function Login({ onSubmit, onSwitch, error }) {
	const [form, setForm] = useState({ email: '', password: '' });

	const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });
	const submit = (event) => {
		event.preventDefault();
		onSubmit(form);
	};

	return (
		<form className="auth-form" onSubmit={submit}>
			<label htmlFor="login-email">Email address</label>
			<input id="login-email" name="email" onChange={updateField} placeholder="you@example.com" required type="email" value={form.email} />
			<label htmlFor="login-password">Password</label>
			<input id="login-password" name="password" onChange={updateField} placeholder="Enter your password" required type="password" value={form.password} />
			{error && <p className="form-error" role="alert">{error}</p>}
			<button className="primary-button" type="submit">Sign in</button>
			<p className="form-switch">New here? <button onClick={onSwitch} type="button">Create an account</button></p>
		</form>
	);
}

export default Login;
