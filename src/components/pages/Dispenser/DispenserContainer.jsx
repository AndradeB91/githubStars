import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { user, repository } from '../../../redux';
import SearchUser from '../SearchUser';
import Profile from '../Profile';

class Dispenser extends React.Component {
  // Handle new user to be searched
  handleChange = event => {
    const { value } = event.target;
    const { setUserAction } = this.props;
    setUserAction(value);
  };

  // Handle the 'Enter' key to search a github user
  handleClick = event => {
    if (event.keyCode === 13) {
      const { loginToFetch, searchUserAction } = this.props;
      searchUserAction(loginToFetch);
    }
  };

  // Handle repository list pagination
  onPageChange = (event, data) => {
    const { searchRepositoriesAction } = this.props;
    const pagination = data.id;
    searchRepositoriesAction(pagination);
  };

  render() {
    const { path } = this.props.match;
    const {
      userInfos,
      userStarredRepositories,
      searchRepositoriesAction,
      starRepositoryAction,
      toastMessage,
    } = this.props;
    switch (path) {
      case '/profile': {
        return (
          <Profile
            userInfos={userInfos}
            userStarredRepositories={userStarredRepositories}
            searchRepositoriesAction={searchRepositoriesAction}
            starRepositoryAction={starRepositoryAction}
            toastMessage={toastMessage}
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            onPageChange={this.onPageChange}
          />
        );
      }
      default: {
        return (
          <SearchUser
            handleChange={this.handleChange}
            handleClick={this.handleClick}
          />
        );
      }
    }
  }
}

const mapStateToProps = createStructuredSelector({
  loginToFetch: user.selectors.getUserLoginToFetch,
  userInfos: user.selectors.getAllUserInfos,
  userStarredRepositories: repository.selectors.getUserStarredRepositories,
  toastMessage: repository.selectors.getToastMessage,
});

const mapDispatchToProps = {
  setUserAction: user.actions.setUser,
  searchUserAction: user.actions.searchUser,
  searchRepositoriesAction: repository.actions.searchRepositories,
  starRepositoryAction: repository.actions.starRepository,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dispenser);
