/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

import colors from '../util/colors';

type PaginationProps = {
	page: number;
	total: number;
	onChange: (page?: number | string) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, total, onChange }) => {
	const pages: [(number | string)?] = [];

	if (total <= 7) {
		for (let i = 0; i < total; i++) {
			pages.push(i + 1);
		}
	} else {
		if (page > 4) {
			pages.push('...');
		}

		let midLength;

		if (page > 4 && total - page > 3) {
			midLength = 3;
		} else if (total - page > 3) {
			midLength = 5;
		} else {
			midLength = total;
		}

		for (let i = page - 1; i < midLength; i++) {
			pages.push(i + 1);
		}

		if (total - page > 3) {
			pages.push('...');
		}

		pages.push(total);
	}

	return total && total > 1 ? (
		<Container>
			<Button
				key="previous"
				role="button"
				aria-label="Previous Page"
				onClick={() => onChange(page - 1)}
				disabled={page === 1}
			>
				<Image src="/images/previous.svg" />
			</Button>

			{pages.map((currentPage, id) =>
				currentPage === '...' ? (
					<Button key={`page_${currentPage}_${id}`} disabled>
						...
					</Button>
				) : (
					<Button
						key={`page_${currentPage}`}
						role="button"
						aria-label={`Page ${currentPage}`}
						onClick={() => onChange(currentPage)}
						className={page === currentPage ? 'active' : ''}
					>
						{currentPage}
					</Button>
				),
			)}

			<Button
				key="next"
				role="button"
				aria-label="Next Page"
				onClick={() => onChange(page + 1)}
				disabled={page === total}
			>
				<Image src="/images/next.svg" />
			</Button>
		</Container>
	) : null;
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
