import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Input from './input';

import colors from '../util/colors';

class Select extends Component {
  state = { searchString: '', isOpen: false };

  handleOpen = () => this.setState({ isOpen: true });

  handleClose = () => setTimeout(() => this.setState({ isOpen: false }), 200);

  handleInputChange = (e) => {
    const { onChange } = this.props;
    this.setState({ searchString: e.target.value }, onChange);
  };

  handleSelect = (selected) => {
    const { onChange } = this.props;
    onChange(selected);
  };

  render() {
    const { searchString, isOpen } = this.state;
    const {
      value, options, placeholder, icon,
    } = this.props;

    const selected = options.find(option => option.value === value);

    return (
      <Container>
        <Input
          value={(selected || {}).label || searchString}
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onFocus={this.handleOpen}
          onBlur={this.handleClose}
          icon={icon}
        />
        {isOpen && (
          <Options>
            {options.map(({ label, value: optionValue }) => {
              const show = !(
                searchString
                && searchString !== ''
                && !label.toLowerCase().includes(searchString.toLowerCase())
              );

              return show ? (
                <Option key={optionValue} onClick={() => this.handleSelect(optionValue)}>
                  {label}
                </Option>
              ) : null;
            })}
          </Options>
        )}
      </Container>
    );
  }
}

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

Select.propTypes = {
  value: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.shape({}).isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
};

Select.defaultProps = {
  placeholder: 'Type or Select...',
  icon: null,
};

export default Select;
