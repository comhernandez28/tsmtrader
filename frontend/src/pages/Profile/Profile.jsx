import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Input, Link } from '@nextui-org/react';
import * as S from './Profile.styled';

import { update, reset } from '../../features/auth/authSlice';

function Profile() {
	const dispatch = useDispatch();

	const { user, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const [userData, setUserData] = useState({
		id: user._id,
		username: user.username,
		email: user.email,
		tsmToken: user.tsmToken,
	});
	const [editingDisabled, setEditingDisabled] = useState(true);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, dispatch]);

	const enableEditing = (e) => {
		e.preventDefault();
		setEditingDisabled((prevState) => !prevState);
	};

	const saveProfile = (e) => {
		e.preventDefault();
		setEditingDisabled((prevState) => !prevState);
		dispatch(update(userData));
	};

	const onChange = (e) => {
		setUserData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const NullTSMToken = () => {
		return (
			<Card>
				<CardBody className='text-center'>
					<p>
						To use TSM Trader you must allow access to you TSM account by giving
						us your API Key. Below is their explanation and a link to where you
						can get it.
					</p>
					<br />
					<p>
						API Key: This is a unique, private key which is used to authenticate
						a TSM user with the authentication API. You can find your API key{' '}
						<Link
							color='foreground'
							underline='always'
							className='text-center'
							href={'https://www.tradeskillmaster.com/user'}
							target='_blank'>
							here
						</Link>
					</p>
					<p>
						API keys should be handled with a similar level of security as you
						would handle a password and should never be made public.
					</p>
				</CardBody>
			</Card>
		);
	};

	return (
		<>
			{user.tsmToken ? null : <NullTSMToken />}
			<br />
			<S.Container>
				<Card className='w-full md:w-1/2'>
					<CardBody>
						<S.Form className='gap-4'>
							Profile Details:
							<br />
							<Input
								type='text'
								label='Username'
								name='username'
								placeholder='Enter your username'
								isDisabled={editingDisabled}
								value={userData.username}
								onChange={onChange}
							/>
							<Input
								type='text'
								label='Email'
								name='email'
								placeholder='Enter your email'
								isDisabled={editingDisabled}
								value={userData.email}
								onChange={onChange}
							/>
							<Input
								type='text'
								label='TSM API Key'
								name='tsmToken'
								isDisabled={editingDisabled}
								value={userData.tsmToken}
								placeholder='Enter your TSM API Key'
								onChange={onChange}
							/>
							<Button onClick={editingDisabled ? enableEditing : saveProfile}>
								{editingDisabled ? 'Edit' : 'Save'} Profile
							</Button>
						</S.Form>
					</CardBody>
				</Card>
			</S.Container>
		</>
	);
}

export default Profile;
