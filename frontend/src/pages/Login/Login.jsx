import React, { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/Spinner';

import { login, reset } from '../../features/auth/authSlice';

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

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
		const userData = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner></Spinner>;
	}

	return (
		<>
			<section>
				<h1>
					<FaSignInAlt></FaSignInAlt> Login
				</h1>
				<p>Please Login:</p>
				<form>
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

					<button onClick={onSubmit}>Login</button>
				</form>
			</section>
		</>
	);
}

export default Login;
