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
		// <S.Header className='flex mb-4 p-10 bg-black'>
		// 	<S.Logo>
		// 		<S.NavLink to='/'>TSMTrader</S.NavLink>
		// 	</S.Logo>
		// 	<ul>
		// 		{user ? (
		// 			<>
		// 				<li className='block'>
		// 					<button onClick={onLogout}>
		// 						<FaSignOutAlt></FaSignOutAlt> Logout
		// 					</button>
		// 				</li>
		// 			</>
		// 		) : (
		// 			<>
		// 				<li className='block'>
		// 					<S.NavLink to={'/login'} className='block text-white'>
		// 						Login
		// 					</S.NavLink>
		// 				</li>
		// 				<li className='block'>
		// 					<S.NavLink to={'/register'} href='#' className='block text-white'>
		// 						Register
		// 					</S.NavLink>
		// 				</li>
		// 			</>
		// 		)}
		// 	</ul>
		// </S.Header>

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
								onClick={onLogout}
								color='primary'
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
