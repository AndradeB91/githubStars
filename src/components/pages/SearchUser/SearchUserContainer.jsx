import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { search } from '../../../redux';

class SearchUser extends React.Component {
  handleClick = () => {
    const { login, searchUserAction } = this.props;
    searchUserAction(login);
  };

  handleChange = event => {
    const { value } = event.target;
    const { setUserAction } = this.props;
    setUserAction(value);
  };

  render() {
    return (
      <Fragment>
        <input
          type="text"
          placeholder="Username"
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Click me</button>
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
