import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Banner from '../components/banner';
import ActionBar from '../components/action-bar';

import Grid from '../components/grid';
import Table from '../components/table';

import { getMockData } from '../store/mock/actions';
import { getData } from '../store/mock/selectors';

const Home = ({ data }) => (
  <>
    <Banner />
    <ActionBar />
    <Grid data={data} />
    <Table data={data} />
  </>
);

Home.getInitialProps = async ({ store }) => {
  await store.dispatch(getMockData());
};

const mapStateToProps = state => ({ data: getData(state.mock) });

Home.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(Home);
