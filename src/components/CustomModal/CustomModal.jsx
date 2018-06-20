import React from 'react';
import { Button, Header, Modal, Segment, Icon } from 'semantic-ui-react';
import GithubRepositoryItem from '../GithubRepositoryItem';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import './index.css';

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
  onPageChange,
}) => (
  <Modal
    trigger={<Button onClick={onClickAction}>{buttonText}</Button>}
    closeIcon
  >
    <Header icon={headerIcon} content={headerContent} />
    <Modal.Content>
      {renderUserStarredRepositories(
        userStarredRepositories,
        buttonClickAction,
      )}
      <div className="paginationContainer">
        <div>
          <Button animated id="back" onClick={onPageChange}>
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name="left arrow" />
            </Button.Content>
          </Button>
        </div>

        <Button animated id="next" onClick={onPageChange}>
          <Button.Content visible>Next</Button.Content>
          <Button.Content hidden>
            <Icon name="right arrow" />
          </Button.Content>
        </Button>
      </div>
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
