import React from 'react';
import * as S from './Header.styled';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
	User,
} from '@nextui-org/react';

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());

		navigate('/');
	};

	return (
		<Navbar className='dark text-white'>
			<NavbarBrand>
				{/* <AcmeLogo /> */}
				<p className='font-bold text-inherit'>
					<NavLink to='/'>TSMTrader</NavLink>
				</p>
			</NavbarBrand>
			<NavbarContent className='sm:flex gap-4' justify='center'>
				{user ? (
					<>
						<NavbarItem>
							<Button
								onClick={(e) => {
									e.preventDefault();
									navigate('/profile');
								}}>
								{user.username}
							</Button>
						</NavbarItem>
						<NavbarItem>
							<Button
								onClick={onLogout}
								color='default'
								href='#'
								variant='flat'>
								<FaSignOutAlt></FaSignOutAlt> Logout
							</Button>
						</NavbarItem>
					</>
				) : (
					<>
						<NavbarItem>
							<Link color='foreground'>
								<NavLink to={'/login'}>Login</NavLink>
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link color='foreground'>
								<NavLink to={'/register'}>Register</NavLink>
							</Link>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navbar>
	);
}

export default Header;
