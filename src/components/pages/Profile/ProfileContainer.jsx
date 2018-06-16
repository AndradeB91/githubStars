import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import uuid from 'uuid';
import { Card, Icon, Image } from 'semantic-ui-react'

import { search } from '../../../redux';

import './index.css';

class Profile extends React.Component {

	renderExtraInformation = array => (
		array.map(info => (info.data ? 
			<div key={`${info.data}_${uuid()}`} 
					 className='extraInfoContainer'>
				<Icon name = {info.icon}/>
				<div>{info.data}</div>
			</div> : null
		))			 
	)

  render () {
		const { userInfos } = this.props;

		const name = userInfos.get('name');
		const login = userInfos.get('login');
		const avatarUrl = userInfos.get('avatarUrl');
		const bio = userInfos.get('bio');
		const location = userInfos.get('location');
		const email = userInfos.get('email');
		const url = userInfos.get('url');
		
    return (
      <Fragment>
        <Card>
					<Image src = {avatarUrl}/>
					<Card.Content>
						<Card.Header>{name}</Card.Header>
						<Card.Meta>{login}</Card.Meta>
						<Card.Description>{bio}</Card.Description>
					</Card.Content>
					<Card.Content extra>
						{this.renderExtraInformation([
							{data: location, icon: 'location arrow'},
							{data: email, icon: 'mail'},
							{data: url, icon: 'world'},
						])}
					</Card.Content>
        </Card>
      </Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userInfos: search.selectors.getAllUserInfos,
});

export default connect(mapStateToProps)(Profile);
