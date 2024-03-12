import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	height: 80vh;
`;

export const Form = styled.form`
	display: flex;
	flex-flow: column nowrap;
	width: 700px;
	height: 100%;
`;

export const FormGroup = styled.div`
	display: flex;
	flex-flow: row nowrap;
`;

export const Heading = styled.h1`
	font-size: 2em;
	font-weight: bolder;
	margin-bottom: 10px;
`;

export const SubHeader = styled.p`
	margin-bottom: 12px;
`;
