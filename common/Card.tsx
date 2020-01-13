import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import colors from '../util/colors';
import breakpoint from '../util/breakpoint';

import Skeleton from './Skeleton';

type CardProps = {
	name?: string;
	image?: string;
	description?: string;
	date?: string;
};

const Card: React.FC<CardProps> = ({ name, image, description, date }) => (
	<Container>
		{image && (
			<Skeleton height="180px">
				<Image src={image} />
			</Skeleton>
		)}
		{name && <h2>{name}</h2>}
		{description && <div>{description}</div>}
		{date && (
			<>
				<Hr />
				<div>
					{dayjs(date).format('DD MMM, YYYY')}
					<em>{dayjs(date).format(' - hh:mm a')}</em>
				</div>
			</>
		)}
	</Container>
);

const Container = styled.div`
	max-width: calc(100% / 4);
	min-width: 250px;

	@media (max-width: ${breakpoint.SM}px) {
		max-width: 100%;
		width: 100%;
	}
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

const Hr = styled.hr`
	border: none;
	border-top: 1px solid ${colors.VERY_LIGHT_GRAY};
	margin: 10px 2px;
`;

export default Card;
