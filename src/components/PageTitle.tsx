import React, { memo, FunctionComponent } from 'react';
import styled from 'styled-components/macro';

type PageTitleProps = {
	title: string;
};

const PageTitle: FunctionComponent<PageTitleProps> = ({ title }) => {
	return <H1>{title}</H1>;
};

export default memo(PageTitle);

const H1 = styled.h1`
	width: 100%;
	text-align: center;
	margin: 30px 0;
`;
