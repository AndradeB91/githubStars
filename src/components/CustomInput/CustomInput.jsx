import React from 'react';
import { Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CustomInput = ({ onChange, onKeyUp }) => (
  <Input
    fluid
    size="massive"
    icon="search"
    placeholder="github username..."
    onChange={onChange}
    onKeyUp={onKeyUp}
  />
);

CustomInput.propTypes = {
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
};

export default CustomInput;
