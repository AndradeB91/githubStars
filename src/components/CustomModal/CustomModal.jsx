import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const CustomModal = ({ 
  buttonText,
  onClickAction,
  actionParameter,
  headerIcon,
  headerContent,
}) => (
  <Modal dimmer = {'blurring'} trigger = {
    <Button onClick={onClickAction}>
      {buttonText}
    </Button>
  } closeIcon>
    <Header icon = {headerIcon} content = {headerContent} />
    <Modal.Content>
      <p>
        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
      </p>
    </Modal.Content>
  </Modal>
);

CustomModal.propTypes = {
  buttonText: PropTypes.string,
  onClickAction: PropTypes.func,
  headerIcon: PropTypes.string,
  headerContent: PropTypes.string,
}

export default CustomModal;