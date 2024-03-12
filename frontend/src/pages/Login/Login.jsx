import React, { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Input, Link } from '@nextui-org/react';
//import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import * as S from './Login.styled';

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
			<S.Container>
				<S.Heading>TSM TRADER</S.Heading>
				<Card>
					<CardBody className='p-4'>
						<S.Form className='gap-4'>
							<Input
								type='email'
								label='Email'
								id='email'
								name='email'
								value={email}
								placeholder='Enter Email'
								onChange={onChange}
							/>

							<Input
								type='password'
								label='Password'
								id='password'
								name='password'
								value={password}
								placeholder='Enter Password'
								onChange={onChange}
							/>

							<Button onClick={onSubmit}>LOGIN</Button>
						</S.Form>
						<span className='text-center'>
							Don't have an account?{' '}
							<Link color='foreground' underline='always'>
								<NavLink to={'/register'}>Sign up</NavLink>
							</Link>
						</span>
					</CardBody>
				</Card>
			</S.Container>
		</>
	);
}

export default Login;
