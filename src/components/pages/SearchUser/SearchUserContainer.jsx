import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import Input from '../../CustomInput';
import './index.css';

const SearchUser = ({ handleChange, handleClick }) => (
  <div className="searchContainer">
    <div className="headerContainer">
      <Header as="h1" icon="github" content="GithubStars" />
    </div>
    <div className="inputContainer">
      <Input onChange={handleChange} onKeyUp={handleClick} />
    </div>
  </div>
);

SearchUser.propTypes = {
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
};

export default SearchUser;
