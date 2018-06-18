import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Input, Header } from 'semantic-ui-react';
import { search } from '../../../redux';

class SearchUser extends React.Component {
  handleChange = event => {
    const { value } = event.target;
    const { setUserAction } = this.props;
    setUserAction(value);
  };

  handleClick = event => {
    if (event.keyCode === 13) {
      const { login, searchUserAction } = this.props;
      searchUserAction(login);
    }
  };

  render() {
    return (
      <Fragment>
        <Header as="h1">GithubStars</Header>
        <div className="inputContainer">
          <Input
            fluid
            size="massive"
            icon="search"
            placeholder="github username..."
            onChange={this.handleChange}
            onKeyUp={this.handleClick}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  login: search.selectors.getUserLogin,
});

const mapDispatchToProps = {
  setUserAction: search.actions.setUser,
  searchUserAction: search.actions.searchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);
