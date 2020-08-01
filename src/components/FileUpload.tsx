import React, { FunctionComponent } from 'react';
import styled from 'styled-components/macro';

import {
	FlexRowContainer,
	LabelButton,
	ButtonIcon,
	ButtonText,
} from '../components/styledComponents';

type FileUploadProps = {
	onUploadSuccess: (jsonString: string) => void;
};

const FileUpload: FunctionComponent<FileUploadProps> = ({
	onUploadSuccess,
}) => {
	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e?.target;
		if (files && files[0]) {
			const file = files[0];

			if (file.type !== 'application/json') {
				alert('Invalid JSON file.');
				return;
			}
			if (file.size > 10000000) {
				alert('Upload file is too large to process');
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				onUploadSuccess(String(reader.result));
			};
			reader.readAsText(file);
		}
	};
	return (
		<>
			<LabelButton backgroundColor="#44ee9599" htmlFor="file-upload">
				<FlexRowContainer>
					<ButtonIcon
						src="https://img.icons8.com/wired/64/000000/upload.png"
						alt="upload-icon"
					/>
					&nbsp;&nbsp;
					<ButtonText>Upload File</ButtonText>
				</FlexRowContainer>
			</LabelButton>
			<FileInput
				type="file"
				id="file-upload"
				name="Upload File"
				accept=".json"
				onChange={handleFileInput}
			/>
		</>
	);
};

export default FileUpload;

const FileInput = styled.input`
	display: none;
`;
