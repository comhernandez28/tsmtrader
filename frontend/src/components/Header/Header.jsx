import React from 'react';
import * as S from './Header.styled';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<S.Header className='flex mb-4 p-10 bg-black'>
			<S.Logo>
				<S.NavLink to='/'>TSMTrader</S.NavLink>
			</S.Logo>
			<ul>
				<li className='block'>
					<S.NavLink to={'/login'} className='block text-white'>
						Login
					</S.NavLink>
				</li>
				<li className='block'>
					<S.NavLink to={'/register'} href='#' className='block text-white'>
						Register
					</S.NavLink>
				</li>
			</ul>
		</S.Header>
	);
}

export default Header;
