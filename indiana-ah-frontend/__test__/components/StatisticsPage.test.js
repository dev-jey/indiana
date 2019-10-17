import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import ConnectedStatisticsPage from '../../src/components/StatisticsPage.jsx';

const initialState = {
  statistics: {
    data: [
      {
        bookmarksStat: 0,
        reactionStat: {
          total: 0,
          like: 0,
          dislike: 0
        },
        commentStat: 0,
        ReadingStat: 0
      }
    ],
    isLoading: false,
    error: ''
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
            <ConnectedStatisticsPage />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should unmount', () => {
    const statisticsPage = mount(
      <MemoryRouter>
        <Provider store={store}>
          <ConnectedStatisticsPage />
        </Provider>
      </MemoryRouter>
    );
    statisticsPage.unmount();
    const margin = document.body.style.marginBottom;
    expect(margin).toEqual('30rem');
  });
});
