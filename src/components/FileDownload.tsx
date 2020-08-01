import React, { FunctionComponent } from 'react';

import {
	FlexRowContainer,
	Button,
	ButtonText,
	ButtonIcon,
} from '../components/styledComponents';

type FileDownloadProps = {
	btnText: string;
	onClick: () => void;
};

const FileDownload: FunctionComponent<FileDownloadProps> = ({
	btnText,
	onClick,
}) => {
	return (
		<Button backgroundColor="#44ee9599" onClick={onClick}>
			<FlexRowContainer>
				<ButtonIcon
					src="https://img.icons8.com/wired/64/000000/download.png"
					alt="download-icon"
				/>
				&nbsp;&nbsp;
				<ButtonText>{btnText}</ButtonText>
			</FlexRowContainer>
		</Button>
	);
};

export default FileDownload;
