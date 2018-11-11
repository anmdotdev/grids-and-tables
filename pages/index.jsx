import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Banner from '../components/banner';
import ActionBar from '../components/action-bar';

import Grid from '../components/grid';
import Table from '../components/table';

import { getMockData, handleSearch, handleSorting } from '../store/mock/actions';

class Home extends Component {
  static async getInitialProps({ store }) {
    return store.dispatch(getMockData());
  }

  componentDidMount() {
    const { handleSearch: handleSearchAction, handleSorting: handleSortingAction } = this.props;

    handleSearchAction(localStorage.getItem('search') || '');
    handleSortingAction(localStorage.getItem('sortValue') || '');
  }

  render() {
    const { currentData } = this.props;

    return (
      <>
        <Banner />
        <ActionBar />
        <Grid data={currentData} />
        <Table data={currentData} />
      </>
    );
  }
}

const mapStateToProps = ({ mock: { currentData } }) => ({ currentData });

Home.propTypes = {
  currentData: PropTypes.shape({}).isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSorting: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { handleSearch, handleSorting },
)(Home);
