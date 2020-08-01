import styled from 'styled-components/macro';

export const FlexContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

export const FlexRowContainer = styled(FlexContainer)`
	flex-flow: row nowrap;
`;

export const FlexColumnContainer = styled(FlexContainer)`
	flex-flow: column nowrap;
`;

interface ButtonProps {
	backgroundColor?: string;
}

export const Button = styled.button`
	background-color: ${(props: ButtonProps) =>
		props.backgroundColor ? props.backgroundColor : 'default'};
`;

export const ButtonText = styled.p`
	font-size: 14px;
	font-weight: bold;
`;

export const ButtonIcon = styled.img`
	width: 30px;
	height: 30px;
`;
