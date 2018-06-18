import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { search } from '../../../redux';
import Card from '../../CustomCard';
import Modal from '../../CustomModal';

class Profile extends React.Component {

	buttonClickAction = (event) => {
		const { id } = event.target;
		const { starRepositoryAction } = this.props;
		starRepositoryAction(id);
	}

  render () {
		const { 
			userInfos, 
			searchRepositoriesAction,
			userStarredRepositories,
		} = this.props;
		const name = userInfos.get('name');
		const login = userInfos.get('login');
		const avatarUrl = userInfos.get('avatarUrl');
		const bio = userInfos.get('bio');
		const location = userInfos.get('location');
		const email = userInfos.get('email');
		const url = userInfos.get('url');

		const extraInfos = [
			{data: location, icon: 'location arrow'},
			{data: email, icon: 'mail'},
			{data: url, icon: 'world'},
		]
		
    return (
      <Fragment>
        <Card
					name = {name}
					login = {login}
					avatarUrl = {avatarUrl}
					bio = {bio}
					location = {location}
					email = {email}
					url = {url}
					extraInfos = {extraInfos}
				/>
				<Modal
					buttonText = 'Show User Starred Repo'
					headerIcon = 'github' 
					headerContent = 'Starred Repositories'
					onClickAction = {searchRepositoriesAction}
					userStarredRepositories = {userStarredRepositories}
					buttonClickAction = {this.buttonClickAction}
				/>
      </Fragment>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userInfos: search.selectors.getAllUserInfos,
	userStarredRepositories: search.selectors.getUserStarredRepositories,
});

const mapDispatchToProps = {
  searchRepositoriesAction: search.actions.searchRepositories, 
	starRepositoryAction: search.actions.starRepository,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
