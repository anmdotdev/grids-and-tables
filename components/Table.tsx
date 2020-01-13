import React from 'react';

import styled from 'styled-components';
import dayjs from 'dayjs';

import Skeleton from '../common/Skeleton';

import colors from '../util/colors';
import breakpoint from '../util/breakpoint';

type DataItem = {
	name?: string;
	image?: string;
	description?: string;
	date?: string;
};

type TableProps = {
	data?: [DataItem];
};

const Table: React.FC<TableProps> = ({ data }) => (
	<Container>
		{data && (
			<Content>
				{data.map((row, id) => {
					const { name, description, image, date } = row;
					return (
						<Row key={id} className="bordered">
							<Group flex={2}>
								<Skeleton height="100px">
									<Image src={image} />
								</Skeleton>
							</Group>
							<Row flex={9} className="tab-vertical">
								<Group flex={3}>
									<h3>{name}</h3>
								</Group>
								<Group flex={5}>
									<div>{description}</div>
								</Group>
								<Group flex={1}>
									<strong>
										{dayjs(date).format('dd MMM, yyyy')}
										<em>{dayjs(date).format(' - hh:mm a')}</em>
									</strong>
								</Group>
							</Row>
						</Row>
					);
				})}
			</Content>
		)}
	</Container>
);

const Container = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px 10px;
`;

const Content = styled.div`
	width: 67%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	& > * {
		margin: 0px 30px;
	}

	@media (max-width: ${breakpoint.LG}px) {
		width: 85%;
	}
`;

type FlexProps = { flex?: number };

const Row = styled.div`
	flex: ${({ flex }: FlexProps) => flex || 'none'};
	width: 100%;
	max-width: 1800px;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding: 25px 0px;

	&.bordered {
		transition: 0.1s all linear;
		border-bottom: 1px solid ${colors.VERY_LIGHT_GRAY};

		&:hover {
			background-color: ${colors.SUPER_LIGHT_GRAY};
		}
	}

	&.tab-vertical {
		@media (max-width: ${breakpoint.MD}px) {
			flex-direction: column;
			align-items: flex-start;
			flex: 6;

			& > * {
				margin-bottom: 5px;
			}
		}
	}

	@media (max-width: ${breakpoint.SM}px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const Group = styled.div`
	flex: ${({ flex }: FlexProps) => flex || 'none'};
	padding: 0px 15px;
	width: 100%;
`;

type ImageProps = { src?: string };

const Image = styled.div`
  width: 100%;
  height: 100%;

  background-image: url('${({ src }: ImageProps) => src || ''}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export default Table;
