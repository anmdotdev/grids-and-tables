import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import colors from '../util/colors';
import breakpoint from '../util/breakpoint';

import Shimmer from './shimmer';

const Card = ({ name, image, description, date }) => (
	<Container>
		{image && (
			<Shimmer height="180px">
				<Image src={image} />
			</Shimmer>
		)}
		{name && <h2>{name}</h2>}
		{description && <div>{description}</div>}
		{date && (
			<>
				<Hr />
				<div>
					{format(new Date(date), 'dd MMM, yyyy')}
					<em>{format(new Date(date), ' - hh:mm a')}</em>
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

const Image = styled.div`
  width: 100%;
  height: 100%;

  background-image: url('${({ src }) => src || ''}');
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
