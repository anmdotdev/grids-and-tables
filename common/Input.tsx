import React from 'react';
import styled from 'styled-components';

import colors from '../util/colors';

type InputProps = {
	type: string;
	value: string;
	placeholder: string;
	icon?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ icon, ...props }) => (
	<Container>
		<InputField {...props} />
		{icon && <Icon src={icon} aria-hidden="true" />}
	</Container>
);

const Container = styled.div`
	position: relative;
`;

const InputField = styled.input`
	height: 40px;
	font-size: 13px;
	padding: 5px 15px;
	border-radius: 4px;
	border: 1px solid #ddd;
	background-color: ${colors.SUPER_LIGHT_GRAY};
	color: ${colors.PRIMARY};
	min-width: 230px;
	width: 100%;
	margin: 5px 0px;

	&:focus {
		outline: 1px solid ${colors.PRIMARY};
	}
`;

const Icon = styled.img`
	position: absolute;
	right: 10px;
	top: 18px;
	width: 16px;
	cursor: pointer;
`;

export default Input;
