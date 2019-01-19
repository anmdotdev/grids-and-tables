import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';

import Card from '../common/card';
import Pagination from '../common/pagination';

import { handlePageChange } from '../store/mock/actions';
import { getPage, getTotal } from '../store/mock/selectors';

import breakpoint from '../util/breakpoint';

const Grid = ({
  page, total, data, handlePageChange: handlePageChangeAction,
}) => (
  <Container>
    <Content>
      {data.map((card, id) => (
        <Card key={id} {...card} />
      ))}
    </Content>
    {data.length === 0 && <h3>No Data Available for the Selected Settings</h3>}
    <Pagination page={page} total={total} onChange={handlePageChangeAction} />
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
  padding-bottom: 10px;
`;

const Content = styled.div`
  width: 75%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  & > * {
    margin: 25px 30px;
  }

  @media (max-width: ${breakpoint.LG}px) {
    width: 85%;
  }

  @media (max-width: ${breakpoint.SM}px) {
    width: 95%;
  }
`;

Grid.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  data: PropTypes.shape({}).isRequired,
  handlePageChange: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ mock }) => ({ page: getPage(mock), total: getTotal(mock) });

export default connect(
  mapStateToProps,
  { handlePageChange },
)(Grid);
