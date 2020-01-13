import React from 'react';
import styled from 'styled-components';

import colors from '../util/colors';

type PaginationProps = {
	page: number;
	total: number;
	onChange: Function;
};

const Pagination: React.FC<PaginationProps> = ({ page, total, onChange }) => {
	const list = [];
	list.push(
		<Button key="previous" onClick={() => onChange(page - 1)} disabled={page === 1}>
			<Image src="/images/previous.svg" />
		</Button>,
	);

	if (total <= 7) {
		for (let i = 0; i < total; i += 1) {
			list.push(
				<Button className={page === i + 1 ? 'active' : ''} onClick={() => onChange(i + 1)} key={i}>
					{i + 1}
				</Button>,
			);
		}
	} else {
		for (let j = 0; j < 3; j += 1) {
			list.push(
				<Button key={j} onClick={() => onChange(j + 1)} className={page === j + 1 ? 'active' : ''}>
					{j + 1}
				</Button>,
			);
		}
		if (page <= 5) {
			[4, 5].forEach((item) =>
				list.push(
					<Button
						key={item}
						onClick={() => onChange(item)}
						className={page === item ? 'active' : ''}
					>
						{item}
					</Button>,
				),
			);
		} else {
			list.push(
				<Button key="dot_1" disabled>
					...
				</Button>,
			);
			list.push(
				<Button key={page} onClick={() => onChange(page)} className="active">
					{page}
				</Button>,
			);
		}
		if (page < total - 1) {
			list.push(
				<Button key="dot_2" disabled>
					...
				</Button>,
			);
		}
		if (page !== total) {
			list.push(
				<Button key={total} onClick={() => onChange(total)}>
					{total}
				</Button>,
			);
		}
	}
	list.push(
		<Button key="next" onClick={() => onChange(page + 1)} disabled={page === total}>
			<Image src="/images/next.svg" />
		</Button>,
	);
	return total && total > 1 ? <Container>{list}</Container> : null;
};

const Container = styled.div`
	margin: 15px;

	button:first-child {
		margin-left: 0;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	button:last-child {
		margin-right: 0;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
`;

const Button = styled.button`
	background-color: white;
	margin: 0px 2px;
	border: none;
	height: 32px;
	width: 32px;
	cursor: pointer;
	outline: none;
	color: ${colors.SECONDARY};
	font-size: 14px;

	&:disabled {
		opacity: 0.65;
		pointer-events: none;
		cursor: not-allowed;
	}

	&:hover {
		background-color: ${colors.VERY_LIGHT_GRAY};
	}

	&.active {
		cursor: default;
		color: ${colors.WHITE};
		background-color: ${colors.SECONDARY};
	}
`;

const Image = styled.img`
	height: 9px;
	width: 5px;
`;

export default Pagination;
