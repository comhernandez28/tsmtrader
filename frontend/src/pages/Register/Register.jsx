import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { Spinner } from '@nextui-org/react';

import { register, reset } from '../../features/auth/authSlice';

function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	});

	const { username, email, password, password2 } = formData;

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			toast.error('Password do not match');
		} else {
			const userData = {
				username,
				email,
				password,
			};

			dispatch(register(userData));
		}
	};

	if (isLoading) {
		return <Spinner></Spinner>;
	}

	return (
		<>
			<section>
				<h1>
					<FaUser></FaUser> Register
				</h1>
				<p>Please Create an Account:</p>
				<form>
					<input
						type='text'
						id='username'
						name='username'
						value={username}
						placeholder='Enter Username'
						onChange={onChange}
					/>

					<input
						type='text'
						id='email'
						name='email'
						value={email}
						placeholder='Enter Email'
						onChange={onChange}
					/>

					<input
						type='password'
						id='password'
						name='password'
						value={password}
						placeholder='Enter Password'
						onChange={onChange}
					/>

					<input
						type='password'
						id='password2'
						name='password2'
						value={password2}
						placeholder='Confirm Password'
						onChange={onChange}
					/>
					<button onClick={onSubmit}>Register</button>
				</form>
			</section>
		</>
	);
}

export default Register;
