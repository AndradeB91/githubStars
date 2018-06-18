import React from 'react';
import { Icon, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './index.css';

const GithubRepository = ({
  id,
  name,
  owner,
  description,
  starredCount,
  starActive,
  buttonClickAction,
}) => (
  <div className="mainContainer">
    <div>
      <Header as="h3" style={{ margin: '0px' }}>
        {`${owner} / ${name}`}
      </Header>
      <p>{description}</p>
      <div className="starContainer">
        <Icon name="star outline" />
        <div>{starredCount}</div>
      </div>
    </div>
    <div className="buttonContainer">
      <Button toggle active={starActive} id={id} onClick={buttonClickAction}>
        {starActive ? 'unstar' : 'star'}
      </Button>
    </div>
  </div>
);

GithubRepository.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  owner: PropTypes.string,
  description: PropTypes.string,
  starredCount: PropTypes.number,
  starActive: PropTypes.bool,
  buttonClickAction: PropTypes.func,
};

export default GithubRepository;
