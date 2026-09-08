import { useState } from 'react';

function Register({ onSubmit, onSwitch, error }) {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });
	const submit = (event) => {
		event.preventDefault();
		onSubmit(form);
	};

	return (
		<form className="auth-form" onSubmit={submit}>
			<label htmlFor="register-name">Full name</label>
			<input id="register-name" name="name" onChange={updateField} placeholder="Alex Morgan" required type="text" value={form.name} />
			<label htmlFor="register-email">Email address</label>
			<input id="register-email" name="email" onChange={updateField} placeholder="you@example.com" required type="email" value={form.email} />
			<label htmlFor="register-password">Password</label>
			<input id="register-password" minLength="8" name="password" onChange={updateField} placeholder="At least 8 characters" required type="password" value={form.password} />
			{error && <p className="form-error" role="alert">{error}</p>}
			<button className="primary-button" type="submit">Create account</button>
			<p className="form-switch">Already have an account? <button onClick={onSwitch} type="button">Sign in</button></p>
		</form>
	);
}

export default Register;
