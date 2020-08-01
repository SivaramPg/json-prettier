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
