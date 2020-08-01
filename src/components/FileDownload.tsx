import React, { FunctionComponent } from 'react';

import { FlexRowContainer } from '../components/styledComponents';

type FileDownloadProps = {
	btnText: string;
	onClick: () => void;
};

const FileDownload: FunctionComponent<FileDownloadProps> = ({
	btnText,
	onClick,
}) => {
	return (
		<button style={{ backgroundColor: '#44ee9599' }} onClick={onClick}>
			<FlexRowContainer>
				<img
					style={{ width: 30, height: 30 }}
					src="https://img.icons8.com/wired/64/000000/download.png"
					alt="download-icon"
				/>
				&nbsp;&nbsp;
				<p style={{ fontSize: 14, fontWeight: 'bold' }}>{btnText}</p>
			</FlexRowContainer>
		</button>
	);
};

export default FileDownload;
