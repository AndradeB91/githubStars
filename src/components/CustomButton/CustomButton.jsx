import React from 'react';
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const CustomButton = ({ 
	onClickAction,
  text,
}) => (
  <Button onClick={onClickAction}>{text}</Button>
);

CustomButton.propTypes = {
  extraInfos: PropTypes.func,
}

export default CustomButton;