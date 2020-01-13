import React, { useState } from 'react';
import styled from 'styled-components';

import Input from './Input';
import useBoundedClick from '../hooks/useBoundedClick';

import colors from '../util/colors';

type SelectOption = { value: string; label: string };

type SelectOption = {
	value: string;
	options: [Option];
	placeholder: string;
	icon: string;
	onChange: Function;
};

const Select: React.FC<SelectProps> = ({ value, options, placeholder, icon, onChange }) => {
	const [searchString, setSearchString] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const selected = options.find((option) => option.value === value);
	const selectedValue = (selected || {}).label || searchString;

	const selectRef = useBoundedClick<HTMLDivElement>({
		onOuterClick(e) {
			e.stopPropagation();
			setIsOpen(false);
		},
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchString(e.target.value);
		onChange(e.target.value);
	};

	const handleChange = (selectedOption: string) => {
		onChange(selectedOption);
		setSearchString('');
		setIsOpen(false);
	};

	return (
		<Container ref={selectRef}>
			<Input
				type="text"
				value={isOpen ? searchString : selectedValue}
				placeholder={isOpen ? selectedValue : placeholder}
				onChange={handleInputChange}
				onFocus={() => setIsOpen(true)}
				icon={icon}
			/>
			{isOpen && (
				<Options>
					{options.map(({ label, value: optionValue }) => {
						const show = !(
							searchString &&
							searchString !== '' &&
							!label.toLowerCase().includes(searchString.toLowerCase())
						);

						return show ? (
							<Option key={optionValue} onClick={() => handleChange(optionValue)}>
								{label}
							</Option>
						) : null;
					})}
				</Options>
			)}
		</Container>
	);
};

const Container = styled.div`
	position: relative;
`;

const Options = styled.div`
	position: absolute;
	top: 44px;
	background-color: ${colors.WHITE};
	border-radius: 5px;
	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
	width: 100%;
`;

const Option = styled.div`
	padding: 10px 15px;
	border-bottom: 1px solid ${colors.VERY_LIGHT_GRAY};
	cursor: pointer;
	transition: 0.1s all linear;

	&:hover {
		color: #fff;
		background-color: ${colors.PRIMARY};
		border-bottom: 1px solid ${colors.PRIMARY};
	}
`;

export default Select;
