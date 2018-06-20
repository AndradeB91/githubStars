import React, { Fragment } from 'react';
import Input from '../../CustomInput';
import Card from '../../CustomCard';
import Modal from '../../CustomModal';
import { Image, Header } from 'semantic-ui-react';
import './index.css';
import UserNotFoundImage from '../../../assets/images/not_found.png';
import { toast, ToastContainer } from 'react-toastify';

class Profile extends React.Component {
  switchRepoStarAction = event => {
    const { id } = event.target;
    const { userStarredRepositories, starRepositoryAction } = this.props;
    const repository = userStarredRepositories.get(id);
    const isStarred = repository.get('starred');
    starRepositoryAction(id, isStarred);
  };

  showToast = () => {
    const { toastMessage } = this.props;
    if (toastMessage) {
      toast.success(`Repo ${toastMessage} with success!`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  render() {
    const {
      userInfos,
      searchRepositoriesAction,
      userStarredRepositories,
      handleChange,
      handleClick,
      onPageChange,
    } = this.props;

    const name = userInfos.get('name');
    const login = userInfos.get('login');
    const avatarUrl = userInfos.get('avatarUrl');
    const bio = userInfos.get('bio');
    const location = userInfos.get('location');
    const email = userInfos.get('email');
    const url = userInfos.get('url');

    const extraInfos = [
      { data: location, icon: 'location arrow' },
      { data: email, icon: 'mail' },
      { data: url, icon: 'world' },
    ];

    this.showToast();

    return (
      <div className="profileContainer">
        <div className="inputContainer">
          <Input onChange={handleChange} onKeyUp={handleClick} />
        </div>
        {login ? (
          <Fragment>
            <div className="cardContainer">
              <Card
                name={name}
                login={login}
                avatarUrl={avatarUrl}
                bio={bio}
                location={location}
                email={email}
                url={url}
                extraInfos={extraInfos}
              />
            </div>
            <div className="repoContainer">
              <Modal
                buttonText="Show User Starred Repo"
                headerIcon="github"
                headerContent="Starred Repositories"
                onClickAction={searchRepositoriesAction}
                userStarredRepositories={userStarredRepositories}
                buttonClickAction={this.switchRepoStarAction}
                onPageChange={onPageChange}
              />
            </div>
            <ToastContainer autoClose={5000} />
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2">User Not Found</Header>
            <Image src={UserNotFoundImage} size="medium" centered />
          </Fragment>
        )}
      </div>
    );
  }
}

export default Profile;
