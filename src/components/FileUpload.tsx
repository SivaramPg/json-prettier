import React, { FunctionComponent } from 'react';
import { FlexRowContainer } from '../components/styledComponents';

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
			console.log(file);
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
				console.log('loaded');
				onUploadSuccess(String(reader.result));
			};
			reader.readAsText(file);
		}
	};
	return (
		<div>
			<label style={{ cursor: 'pointer' }} htmlFor="file-upload">
				<FlexRowContainer
					style={{
						width: 200,
						padding: 15,
						backgroundColor: '#44ee9599',
						border: '2px solid #333',
					}}
				>
					<img
						style={{
							width: 30,
							height: 30,
						}}
						src="https://img.icons8.com/wired/64/000000/upload.png"
						alt="upload-icon"
					/>{' '}
					&nbsp;&nbsp;
					<p style={{ fontWeight: 'bold' }}>Upload File</p>
				</FlexRowContainer>
			</label>
			<input
				style={{ display: 'none' }}
				type="file"
				id="file-upload"
				name="Upload File"
				accept=".json"
				onChange={handleFileInput}
			/>
		</div>
	);
};

export default FileUpload;
