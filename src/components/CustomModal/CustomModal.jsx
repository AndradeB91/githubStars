import React from 'react';
import { Button, Header, Modal, Segment } from 'semantic-ui-react';
import GithubRepositoryItem from '../GithubRepositoryItem';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const renderUserStarredRepositories = (object, buttonClickAction) => {
  return Object.entries(object.toJS()).map(([id, value]) => {
    const { name, owner, description, starredCount, starred } = value;
    return (
      <Segment raised key={`${id}_${uuid()}`}>
        <GithubRepositoryItem
          id={id}
          name={name}
          owner={owner}
          description={description}
          starredCount={starredCount}
          starActive={starred}
          buttonClickAction={buttonClickAction}
        />
      </Segment>
    );
  });
};

const CustomModal = ({
  buttonText,
  onClickAction,
  headerIcon,
  headerContent,
  userStarredRepositories,
  buttonClickAction,
}) => (
  <Modal
    dimmer={'blurring'}
    trigger={<Button onClick={onClickAction}>{buttonText}</Button>}
    closeIcon
  >
    <Header icon={headerIcon} content={headerContent} />
    <Modal.Content>
      {renderUserStarredRepositories(
        userStarredRepositories,
        buttonClickAction,
      )}
    </Modal.Content>
  </Modal>
);

CustomModal.propTypes = {
  buttonText: PropTypes.string,
  onClickAction: PropTypes.func,
  headerIcon: PropTypes.string,
  headerContent: PropTypes.string,
  userStarredRepositories: PropTypes.object,
};

export default CustomModal;
