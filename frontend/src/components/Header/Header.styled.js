import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
	display: flex;
	flex-flow: row nowrap;
	backdrop-filter: blur(10px);
	align-items: center;
	justify-content: space-between;
	background-color: #434343;

	li {
		display: inline;
		margin: 2px;
	}
`;

export const Logo = styled.div`
	justify-content: left;
`;

export const NavLink = styled(Link)`
	color: #c5c5c5;
	font-size: x-large;
	font-family: Arial, Helvetica, sans-serif;
	text-decoration: none;
	margin: 10px;
	&:hover,
	&:focus {
		color: white;
	}
	&:active {
		color: #f9f6ee;
	}
`;
