import React, { useState, useEffect } from 'react';

function Register() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	});

	const { username, email, password, password2 } = formData;

	return (
		<div>
			<h1 className='text-3xl font-bold underline'>Register</h1>
		</div>
	);
}

export default Register;
