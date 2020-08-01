import React, { useState, useEffect, FunctionComponent } from 'react';

import okIcon from '../assets/icons/ok-32.png';
import usePrevious from '../hooks/usePrevious';

type TextBoxProps = {
	id: string;
	placeholder?: string;
	value: string;
	readOnly: boolean;
	maxLength: number;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextBox: FunctionComponent<TextBoxProps> = ({
	id,
	placeholder = '',
	value,
	readOnly,
	maxLength,
	onChange,
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
			copyText.setSelectionRange(0, 99999); /*For mobile devices*/

			document.execCommand('copy');
			setCopyStatus(true);
		}
	};

	return (
		<div
			style={{
				position: 'relative',
				margin: '10px',
			}}
		>
			{readOnly && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						width: 50,
						height: 50,
						backgroundColor: '#fff',
						boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.25)',
						borderRadius: 7,
						top: 20,
						right: 20,
						cursor: 'pointer',
					}}
					title="Copy to Clipboard"
					onClick={copyToClipboard}
				>
					<h2>&#128203;</h2>
					{copiedToClipboard && (
						<img
							style={{
								position: 'absolute',
								width: 15,
								height: 15,
								bottom: 5,
								right: 5,
								backgroundColor: 'white',
								borderRadius: '50%',
							}}
							src={okIcon}
							alt="checkmark"
						/>
					)}
				</div>
			)}
			<textarea
				id={id}
				style={{ padding: 5, fontFamily: 'Fira Code' }}
				placeholder={placeholder}
				value={value}
				readOnly={readOnly}
				maxLength={maxLength}
				onChange={onChange}
			/>
		</div>
	);
};

export default TextBox;
