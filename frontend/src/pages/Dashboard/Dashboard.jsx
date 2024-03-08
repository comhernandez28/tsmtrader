import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spinner } from '@nextui-org/react';

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

	const DashboardNullTsmToken = () => {
		return (
			<div>
				No token detected, please follow instructions{' '}
				<Link to={'/profile'}>here</Link>
			</div>
		);
	};

	const DashboardWithTsmToken = () => {
		return (
			<div>
				Normal dash
				<div>test</div>
			</div>
		);
	};

	return (
		<>
			<div>
				{!user ? (
					navigate('/login')
				) : user?.tsmToken ? (
					<DashboardWithTsmToken></DashboardWithTsmToken>
				) : (
					<DashboardNullTsmToken></DashboardNullTsmToken>
				)}
			</div>
		</>
	);
}

export default Dashboard;
