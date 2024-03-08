import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
//import * as S from 'Profile.styled';

function Profile() {
	const [editingDisabled, setEditingDisabled] = useState(true);

	const { user } = useSelector((state) => {
		return state.auth;
	});

	const enableEditing = (e) => {
		e.preventDefault();
		setEditingDisabled((prevState) => !prevState);
	};

	return (
		<>
			{user.tsmToken ? null : (
				<Card>
					<CardBody>
						<b>API Key</b>: This is a unique, private key which is used to
						authenticate a TSM user with the authentication API. You can find
						your API key{' '}
						<Link to={'https://www.tradeskillmaster.com/user'} target='_blank'>
							here
						</Link>
						. API keys should be handled with a similar level of security as you
						would handle a password and should never be made public.
					</CardBody>
				</Card>
			)}
			<form>
				Profile Details
				<br />
				<input type='text' disabled={editingDisabled} value={user.username} />
				<input
					type='text'
					disabled={editingDisabled}
					value={user.email}></input>
				<input
					type='text'
					disabled={editingDisabled}
					value={user.tsmToken}
					placeholder='API Key'
				/>
				<button onClick={enableEditing}>Edit Profile</button>
			</form>
		</>
	);
}

export default Profile;
