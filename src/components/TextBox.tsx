import React, { useState, useEffect, FunctionComponent } from 'react';
import styled from 'styled-components/macro';

import usePrevious from '../hooks/usePrevious';

import { FlexContainer } from '../components/styledComponents';

import okIcon from '../assets/icons/ok-32.png';
import deleteIcon from '../assets/icons/delete-32.png';

type TextBoxProps = {
	id: string;
	placeholder?: string;
	value: string;
	readOnly: boolean;
	maxLength: number;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	handleClearTextbox?: () => void;
};

const TextBox: FunctionComponent<TextBoxProps> = ({
	id,
	placeholder = '',
	value,
	readOnly,
	maxLength,
	onChange,
	handleClearTextbox = () => {},
}) => {
	const [copiedToClipboard, setCopyStatus] = useState(false);
	const previousValue = usePrevious(value);

	useEffect(() => {
		if (value !== previousValue) {
			setCopyStatus(false);
		}
	}, [value, previousValue]);

	const copyToClipboard = () => {
		const copyText = document.getElementById(id) as HTMLTextAreaElement;

		if (copyText && copyText.value) {
			copyText.select();

			document.execCommand('copy');
			setCopyStatus(true);
		}
	};

	return (
		<TextBoxContainer>
			{!readOnly && (
				<DeleteIcon
					src={deleteIcon}
					alt="delete-icon"
					title="Clear the text box."
					onClick={handleClearTextbox}
				/>
			)}
			{readOnly && (
				<CopyToClipboardContainer
					title="Copy to Clipboard"
					onClick={copyToClipboard}
				>
					<h2>&#128203;</h2>
					{copiedToClipboard && <CheckmarkIcon src={okIcon} alt="checkmark" />}
				</CopyToClipboardContainer>
			)}
			<TextArea
				id={id}
				placeholder={placeholder}
				value={value}
				readOnly={readOnly}
				maxLength={maxLength}
				onChange={onChange}
			/>
		</TextBoxContainer>
	);
};

export default TextBox;

const TextBoxContainer = styled.div`
	position: relative;
	margin: 10px;
`;

const TextArea = styled.textarea`
	padding: 5px;
	font-family: 'Fira Code';
	width: 700px;
	max-width: 720px;
	height: 60vh;
	resize: none;

	&:focus {
		background-color: #ffff9911;
	}

	&::selection {
		background-color: #90e3ee;
	}
`;

const CopyToClipboardContainer = styled(FlexContainer)`
	position: absolute;
	width: 50px;
	height: 50px;
	background-color: #fff;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.25);
	border-radius: 7px;
	top: 20px;
	right: 20px;
	cursor: pointer;
`;

const CheckmarkIcon = styled.img`
	position: absolute;
	width: 15px;
	height: 15px;
	bottom: 5px;
	right: 5px;
	background-color: #fff;
	border-radius: 50%;
`;

const DeleteIcon = styled.img`
	position: absolute;
	width: 20px;
	height: 20px;
	bottom: 25px;
	right: 25px;
	background-color: #fff;
	cursor: pointer;
`;
