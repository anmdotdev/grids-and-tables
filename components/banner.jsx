import React from 'react';
import styled from 'styled-components';

import colors from '../util/colors';

const Banner = () => (
  <Container>
    <h1>Grids and Tables</h1>
    <h3>Responsive app built with React &amp; NextJS.</h3>
  </Container>
);

const Container = styled.div`
  background: rgb(88, 111, 207);
  background: linear-gradient(90deg, ${colors.SECONDARY} 0%, ${colors.PRIMARY} 100%);
  color: ${colors.WHITE};
  width: 100%;
  min-height: 275px;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;

  h1 {
    font-size: 36px;
    margin-top: 0px;
    margin-bottom: 15px;
    text-align: center;
  }

  h3 {
    margin: 0px;
    text-align: center;
  }
`;

export default Banner;
