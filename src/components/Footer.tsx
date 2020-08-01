import React from 'react';
import styled from 'styled-components/macro';

const Footer = () => {
	return (
		<FooterContainer>
			<p>Made by Sivaram Pandariganthan</p>
		</FooterContainer>
	);
};

export default Footer;

const FooterContainer = styled.footer`
	width: 100%;
	height: 70px;

	display: flex;
	justify-content: center;
	align-items: center;

	flex-flow: row nowrap;
	color: white;
	background-color: black;
`;
