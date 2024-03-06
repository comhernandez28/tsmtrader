import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Dashboard() {
	const navigate = useNavigate();
	const { user } = useSelector((state) => {
		return state.auth;
	});

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, []);

	return (
		<>
			<div></div>
		</>
	);
}

export default Dashboard;
