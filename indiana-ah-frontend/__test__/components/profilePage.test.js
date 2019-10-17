import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import Button from '../../src/styles/styledComponents/Button.jsx';
import ConnectedProfilePage, { ProfilePage } from '../../src/components/ProfilePage.jsx';
import { ProfileTab } from '../../src/components/Tabs/Tabs.jsx';
import Profileform, { ProfileForm } from '../../src/components/forms/profileForm.jsx';
import Passwordform, { PasswordForm } from '../../src/components/forms/passwordForm.jsx';

const onChange = jest.fn();
const initialState = {
  user: {
    userData: {
      name: 'Ezenwa Ogbonna',
      id: 'dac4d2c6-2d27-49da-a3c8-6e1c86518099',
      username: 'drizzy',
      email: 'ezenwaogbonna1@gmail.com',
      bio: 'jwkwewkwkkwkwwww',
      imageUrl: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
      isVerified: true,
      role: 'user',
      subscribed: true,
      inAppNotification: false,
      createdAt: '2019-03-25T12:44:11.396Z'
    },
    isLoading: false,
    error: 'username error'
  }
};

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

describe('Profile page component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <ConnectedProfilePage />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Profile page', () => {
  let profilePage;
  beforeEach(() => {
    profilePage = mount(
      <MemoryRouter>
        <Provider store={store}>
          <ConnectedProfilePage />
        </Provider>
      </MemoryRouter>
    );
  });
  afterEach(() => {
    profilePage.unmount();
  });
  it('renders the Profile Page', () => {
    expect(profilePage.find('main')).toBeDefined();
    expect(profilePage.find(<ProfileTab />)).toBeDefined();
  });
  it('toggles the checkbox', () => {
    profilePage.instance();
    const checkbox = profilePage.find('input').at(1);
    checkbox.simulate('change', { target: { checked: true } });
  });
  it('calls the handleProfileImage functions', () => {
    profilePage
      .find('input')
      .at(0)
      .simulate('change');
  });
  it('should display the apporpriate card when the user has not completed his/her profile', () => {
    const props = {
      userData: {
        bio: '',
        name: 'dodo',
        username: 'dododo',
        subscribed: true
      },
      isLoading: true
    };
    const wrapper = shallow(<ProfilePage user={props} />);
    expect(
      wrapper
        .find('h5')
        .at(2)
        .text()
    ).toEqual('Your account has been verified');
  });

  describe('Update Password form', () => {
    const handleSubmit = jest.fn();
    it('should change state', () => {
      const passwordForm = mount(
        <Provider store={store}>
          <Passwordform handleSubmit={handleSubmit} handleChange={onChange} />
        </Provider>
      );
      const input = passwordForm.find('input').at(0);
      input.instance().value = 'cim23000';
      input.simulate('blur');
      input.simulate('change');
      passwordForm.setState({ currentPassword: 'cim23000' });
      expect(passwordForm.state().currentPassword).toEqual('cim23000');
      const button = passwordForm.find('button');
      button.simulate('click');
    });
  });

  describe('Update Profile form', () => {
    const handleSubmit = jest.fn();
    it('should change state', () => {
      const profileForm = mount(
        <Provider store={store}>
          <Profileform handleSubmit={handleSubmit} handleChange={onChange} />
        </Provider>
      );
      const input = profileForm.find('input').at(0);
      input.instance().value = 'Yinka Alabi';
      input.simulate('change');
      profileForm.setState({ name: 'Yinka Alabi' });
      expect(profileForm.state().name).toEqual('Yinka Alabi');
      const button = profileForm.find('button');
      button.simulate('click');
    });
    it('should handle errors from profile update', () => {
      const profileData = {
        error: 'error in username oo'
      };
      const userProfile = {
        bio: 'yeye yeye',
        name: 'dodo',
        username: 'dododo',
        isLoading: true
      };
      const wrapper = shallow(
        <ProfileForm
          profileData={profileData}
          handleSubmit={handleSubmit}
          handleChange={onChange}
          userProfile={userProfile}
        />
      );
      wrapper.setProps({ profileData: { error: 'error in username sha' } });
      expect(wrapper.state().errors.username).toEqual('error in username sha');
    });
    it('should handle password validation errors', () => {
      const profileData = {
        error: 'error in username oo'
      };
      const updateUserPassword = jest.fn();
      const userProfile = {
        bio: 'yeye yeye',
        name: 'dodo',
        username: 'dododo',
        isLoading: true
      };
      const wrapper = shallow(
        <PasswordForm
          profileData={profileData}
          updateUserPassword={updateUserPassword}
          handleSubmit={handleSubmit}
          handleChange={onChange}
          userProfile={userProfile}
        />
      );
      wrapper.setProps({ profileData: { error: 'Passwords don\'t match' } });
      wrapper.setState({
        data: {
          currentPassword: 'dodosecret',
          newPassword: 'dadasecret',
          confirmPassword: 'dadasecreta'
        }
      });
      const wrongPasswordEvent = {
        preventDefault() { },
        target: {
          currentPassword: 'dodosecret',
          newPassword: 'dadasecret',
          confirmPassword: 'dadasecreta'
        }
      };
      wrapper.instance().handleBlur(wrongPasswordEvent);
      expect(wrapper.state().errors.confirmPassword).toEqual('Passwords don\'t match');
      wrapper.setState({
        data: {
          currentPassword: 'dodosecret',
          newPassword: 'dadasecret',
          confirmPassword: 'dadasecret'
        }
      });
      const correctPasswordEvent = {
        preventDefault() { },
        target: {
          currentPassword: 'dodosecret',
          newPassword: 'dadasecret',
          confirmPassword: 'dadasecret'
        }
      };
      wrapper.instance().handleBlur(correctPasswordEvent);
      expect(wrapper.state().errors.confirmPassword).toEqual('');
      wrapper.setState({
        data: {
          currentPassword: 'dodosecret',
          newPassword: 'dadasecret',
          confirmPassword: 'dadasecret'
        }
      });
      wrapper
        .find(Button)
        .dive()
        .simulate('click');
      expect(wrapper.state().errors.confirmPassword).toEqual('');
    });
  });
});
