import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { search } from '../../../redux';
import SearchUser from '../SearchUser';
import Profile from '../Profile';

class Dispenser extends React.Component {
  handleChange = event => {
    const { value } = event.target;
    const { setUserAction } = this.props;
    setUserAction(value);
  };

  handleClick = event => {
    if (event.keyCode === 13) {
      const { loginToFetch, searchUserAction } = this.props;
      searchUserAction(loginToFetch);
    }
  };

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
            handleChange={this.handleChange}
            handleClick={this.handleClick}
            toastMessage={toastMessage}
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
  loginToFetch: search.selectors.getUserLoginToFetch,
  userInfos: search.selectors.getAllUserInfos,
  userStarredRepositories: search.selectors.getUserStarredRepositories,
  toastMessage: search.selectors.getToastMessage,
});

const mapDispatchToProps = {
  setUserAction: search.actions.setUser,
  searchUserAction: search.actions.searchUser,
  searchRepositoriesAction: search.actions.searchRepositories,
  starRepositoryAction: search.actions.starRepository,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dispenser);
