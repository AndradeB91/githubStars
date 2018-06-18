import React from 'react';
import uuid from 'uuid';
import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './index.css';

const renderExtraInformation = array =>
  array.map(
    info =>
      info.data ? (
        <div key={`${info.data}_${uuid()}`} className="extraInfoContainer">
          <Icon name={info.icon} />
          <div>{info.data}</div>
        </div>
      ) : null,
  );

const CustomCard = ({
  name,
  login,
  avatarUrl,
  bio,
  location,
  email,
  url,
  extraInfos,
}) => (
  <Card>
    <Image src={avatarUrl} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{login}</Card.Meta>
      <Card.Description>{bio}</Card.Description>
    </Card.Content>
    <Card.Content extra>{renderExtraInformation(extraInfos)}</Card.Content>
  </Card>
);

CustomCard.propTypes = {
  name: PropTypes.string,
  login: PropTypes.string,
  avatarUrl: PropTypes.string,
  bio: PropTypes.string,
  location: PropTypes.string,
  email: PropTypes.string,
  url: PropTypes.string,
  extraInfos: PropTypes.array,
};

export default CustomCard;
