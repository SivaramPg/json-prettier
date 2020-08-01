import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { saveAs } from 'file-saver';
import Select from 'react-select';

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
	Button,
	ButtonIcon,
	ButtonText,
} from '../components/styledComponents';

const MainAppContainer = () => {
	const [inputString, setInputString] = useState('');
	const [formattedString, setFormattedString] = useState('');
	const [indentSize, setIndentSize] = useState(4);

	const indentOptions = [
		{ value: 0, label: 'Remove Whitespace' },
		{ value: 2, label: '2 spaces' },
		{ value: 4, label: '4 spaces' },
		{ value: 8, label: '8 spaces' },
	];

	const previousInputString = usePrevious(inputString);
	const previousIndentSize = usePrevious(indentSize);

	const setFileStringInput = (jsonString: string) => {
		setInputString(jsonString);
	};

	const handleStringInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setInputString(value);
	};

	const formatJson = () => {
		try {
			if (
				inputString &&
				(previousInputString !== inputString ||
					previousIndentSize !== indentSize)
			) {
				const parsedObj = JSON.parse(inputString.replace(/'/g, ''));
				setFormattedString(JSON.stringify(parsedObj, null, indentSize));
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

	const handleClearTextbox = () => {
		setInputString('');
		setFormattedString('');
	};

	const selectStyles = {
		input: (styles: any) => ({ ...styles, ...{ width: '150px' } }),
	};

	const handleIndentSelection = (selectedOption: any) => {
		setIndentSize(selectedOption.value);
	};

	return (
		<div>
			<MainContainer>
				<SubContainer>
					<PageTitle title="JSON Formatter - Pretty print your JSON" />
					<FlexRowContainer style={{ width: '100%', margin: '20px 0' }}>
						<h3 style={{ fontWeight: 'normal' }}>Indentation:&nbsp;&nbsp;</h3>
						<Select
							styles={selectStyles}
							defaultValue={indentOptions[2]}
							onChange={handleIndentSelection}
							options={indentOptions}
						/>
					</FlexRowContainer>
					<TextareaContainer>
						<TextBox
							id="textarea-1"
							placeholder="Paste your JSON string here."
							value={inputString}
							readOnly={false}
							maxLength={1000000000}
							onChange={handleStringInput}
							handleClearTextbox={handleClearTextbox}
						/>
						<div style={{ margin: '0 10px' }}>
							<h1>&rarr;</h1>
							<h1>&rarr;</h1>
						</div>
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
						<Button backgroundColor="#99ee33" onClick={formatJson}>
							<FlexRowContainer>
								<ButtonIcon
									src="https://img.icons8.com/ios/50/000000/clear-formatting.png"
									alt="format-icon"
								/>
								&nbsp;&nbsp;
								<ButtonText>Format</ButtonText>
							</FlexRowContainer>
						</Button>
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

	background: radial-gradient(#a4a4a4 3px, transparent 4px),
		radial-gradient(#a4a4a4 3px, transparent 4px),
		linear-gradient(#fff 4px, transparent 0),
		linear-gradient(
			45deg,
			transparent 74px,
			transparent 75px,
			#a4a4a4 75px,
			#a4a4a4 76px,
			transparent 77px,
			transparent 109px
		),
		linear-gradient(
			-45deg,
			transparent 75px,
			transparent 76px,
			#a4a4a4 76px,
			#a4a4a4 77px,
			transparent 78px,
			transparent 109px
		),
		#fff;
	background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px, 109px 109px;
	background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
`;

const SubContainer = styled(FlexColumnContainer)`
	justify-content: flex-start;
	width: 80%;
	max-width: 1600px;
	min-height: calc(100vh - 70px);
	/* background-color: #ffffffee; */
	background-color: #eee;
`;

const TextareaContainer = styled(FlexRowContainer)`
	width: 100%;
	min-height: 60vh;
`;

const ActionButtonsContainer = styled(FlexRowContainer)`
	width: 100%;
	justify-content: space-evenly;
	margin: 30px 0;
`;
