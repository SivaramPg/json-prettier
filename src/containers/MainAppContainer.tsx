import React, { useState } from 'react';
import styled from 'styled-components';
import { saveAs } from 'file-saver';

import usePrevious from '../hooks/usePrevious';

import PageTitle from '../components/PageTitle';
import TextBox from '../components/TextBox';
import Footer from '../components/Footer';
import FileUpload from '../components/FileUpload';
import FileDownload from '../components/FileDownload';

import {
	FlexContainer,
	FlexRowContainer,
	FlexColumnContainer,
} from '../components/styledComponents';

const MainAppContainer = () => {
	const [inputString, setInputString] = useState('');
	const [formattedString, setFormattedString] = useState('');

	const previousInputString = usePrevious(inputString);

	const setFileStringInput = (jsonString: string) => {
		setInputString(jsonString);
	};

	const handleStringInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setInputString(value);
	};

	const formatJson = () => {
		try {
			if (inputString && previousInputString !== inputString) {
				const parsedObj = JSON.parse(inputString.replace(/'/g, ''));
				setFormattedString(JSON.stringify(parsedObj, null, 4));
			}
		} catch (error) {
			alert('Invalid JSON string!');
		}
	};

	const handleFileDownload = () => {
		if (formattedString) {
			const data = new Blob([formattedString], {
				type: 'application/json;charset=utf-8',
			});
			saveAs(data, 'formatted.json');
		}
	};

	return (
		<div>
			<MainContainer>
				<SubContainer>
					<PageTitle title="JSON String Formatter" />
					<TextareaContainer>
						<TextBox
							id="textarea-1"
							placeholder="Paste your JSON string here."
							value={inputString}
							readOnly={false}
							maxLength={1000000000}
							onChange={handleStringInput}
						/>
						<h1>&rarr;</h1>
						<TextBox
							id="textarea-2"
							value={formattedString}
							readOnly={true}
							maxLength={1000000000}
							onChange={(e) => {}}
						/>
					</TextareaContainer>
					<ActionButtonsContainer>
						<FileUpload onUploadSuccess={setFileStringInput} />
						<button style={{ backgroundColor: '#99ee33' }} onClick={formatJson}>
							<FlexRowContainer>
								<img
									style={{ width: 30, height: 30 }}
									src="https://img.icons8.com/ios/50/000000/clear-formatting.png"
									alt="format-icon"
								/>
								&nbsp;&nbsp;
								<p
									style={{
										fontWeight: 'bold',
										fontSize: 16,
									}}
								>
									Format
								</p>
							</FlexRowContainer>
						</button>
						<FileDownload
							btnText="Download JSON file"
							onClick={handleFileDownload}
						/>
					</ActionButtonsContainer>
				</SubContainer>
			</MainContainer>
			<Footer />
		</div>
	);
};

export default MainAppContainer;

const MainContainer = styled(FlexContainer)`
	width: 100%;
	min-height: calc(100vh - 70px);
	align-items: flex-start;
`;

const SubContainer = styled(FlexColumnContainer)`
	justify-content: flex-start;
	width: 80%;
	max-width: 1600px;
	min-height: calc(100vh - 70px);
	background-color: white;
`;

const TextareaContainer = styled(FlexRowContainer)`
	width: 100%;
	min-height: 60vh;

	& textarea {
		width: 700px;
		max-width: 720px;
		height: 60vh;
		resize: none;
	}

	& textarea:focus {
		background-color: #ffff9911;
	}

	& textarea::selection {
		background-color: #90e3ee;
	}
`;

const ActionButtonsContainer = styled(FlexRowContainer)`
	width: 100%;
	justify-content: space-evenly;
	margin: 30px 0;

	& button {
		width: 220px;
		padding: 15px;
		cursor: pointer;
	}
`;
