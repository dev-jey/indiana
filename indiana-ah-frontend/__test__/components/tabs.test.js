import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Toggle from '../../src/components/toggle.jsx';
import Profileform from '../../src/components/forms/profileForm.jsx';
import Passwordform from '../../src/components/forms/passwordForm.jsx';
import ProfileTab from '../../src/components/Tabs/Tabs.jsx';

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
      subscribed: false,
      inAppNotification: false,
      createdAt: '2019-03-25T12:44:11.396Z'
    },
    isLoading: false,
    error: 'There was an error fetching your profile'
  }
};

const userData = {
  name: 'Ezenwa Ogbonna',
  id: 'dac4d2c6-2d27-49da-a3c8-6e1c86518099',
  username: 'drizzy',
  email: 'ezenwaogbonna1@gmail.com',
  bio: 'jwkwewkwkkwkwwww',
  imageUrl: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
  isVerified: true,
  role: 'user',
  subscribed: false,
  inAppNotification: false,
  createdAt: '2019-03-25T12:44:11.396Z'
};

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

describe('Tab component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}>
      <ProfileTab userProfile={userData} /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Tab component', () => {
  it('renders the Profile Page', () => {
    const tab = mount(<Provider store={store}><ProfileTab
      userProfile={userData} /></Provider>);
    const row = tab.find('.row');
    const tabPane = tab.find('.tab-pane');
    const toggle = tab.find({ type: 'checkbox' });
    toggle.simulate('change', { target: { checked: true } });
    expect(row.length).toEqual(4);
    expect(tabPane.length).toEqual(3);
    expect(tab.find(<Profileform />)).toBeDefined();
    expect(tab.find(<Passwordform />)).toBeDefined();
  });
});

describe('Toggler component', () => {
  it('renders correctly', () => {
    const toggler = shallow(<Toggle checked={false} />);
    const text1 = toggler.find('h3').text();
    expect(text1).toEqual('Turn On');
    toggler.instance().handleChange(true);
    const text = toggler.find('h3').text();
    expect(text).toEqual('Turn Off');
  });
});
