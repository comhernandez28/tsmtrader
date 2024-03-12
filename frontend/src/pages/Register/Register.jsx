import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Input, Spinner } from '@nextui-org/react';
import * as S from './Register.styled';

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
			<S.Container>
				<S.Heading>TSM TRADER</S.Heading>
				<Card>
					<CardBody>
						<S.SubHeader>Create an Account:</S.SubHeader>
						<S.Form className='gap-4'>
							<S.FormGroup className='gap-4'>
								<Input
									size='lg'
									type='text'
									label='Username'
									id='username'
									name='username'
									value={username}
									placeholder='Enter Username'
									onChange={onChange}
								/>

								<Input
									size='lg'
									type='text'
									label='Email'
									id='email'
									name='email'
									value={email}
									placeholder='Enter Email'
									onChange={onChange}
								/>
							</S.FormGroup>

							<S.FormGroup className='gap-4'>
								<Input
									size='lg'
									type='password'
									label='Password'
									id='password'
									name='password'
									value={password}
									placeholder='Enter Password'
									onChange={onChange}
								/>

								<Input
									size='lg'
									type='password'
									label='Password'
									id='password2'
									name='password2'
									value={password2}
									placeholder='Confirm Password'
									onChange={onChange}
								/>
							</S.FormGroup>
							<Button onClick={onSubmit}>Register</Button>
						</S.Form>
					</CardBody>
				</Card>
			</S.Container>
		</>
	);
}

export default Register;
