import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from 'react-bootstrap/Button';
import LikeComponent from '../../src/components/common/LikeComponent';
import DislikeComponent from '../../src/components/common/DislikeComponent';
import CardComponent from '../../src/components/common/CardComponent';
import CommentIconComponent from '../../src/components/common/CommentIconComponent';
import UserProfileCard from '../../src/components/common/UserProfileCardComponent';
import {
  UserArticleCard
} from '../../src/components/common/UserArticleCardComponent';
import BadgeComponent from '../../src/components/common/BadgeComponent';
import TimerComponent from '../../src/components/common/TimerComponent';

describe('<CardComponent />', () => {
  const cardProps = {
    img: 'https://avatars0.githubusercontent.com/u/38977569?s=400&v=4',
    title: 'lkjhljugyghjh',
    text: 'lkjhljugyghjh',
    likeCount: 6,
    slug: 'how-i-got-into-andela',
    dislikeCount: 2,
    commentCount: 4
  };
  const wrapper = shallow(<CardComponent {...cardProps} />);
  it('should render a card component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find(LikeComponent)).toHaveLength(1);
    expect(wrapper.find(DislikeComponent)).toHaveLength(1);
    expect(wrapper.find(CommentIconComponent)).toHaveLength(1);
  });
  it('renders correctly', () => {
    const tree = renderer.create(<CardComponent {...cardProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<UserProfileCardComponent />', () => {
  const cardProps = {
    userName: 'Dozie',
    img: 'https://avatars1.githubusercontent.com/u/22154654?s=460&v=4',
    postCount: 2,
    bio: 'lkjhljugyghjh',
    articleBody: 'There is no limit to what you can achieve with a pen.',
    followingCount: 2,
    followersCount: 3
  };
  const wrapper = shallow(<UserProfileCard {...cardProps} />);
  it('should render a User profile card component', () => {
    expect(wrapper.length).toEqual(1);
    expect(
      wrapper
        .find('p')
        .at(0)
        .text()
    ).toEqual('Dozie');
    expect(
      wrapper
        .find('p')
        .at(1)
        .text()
    ).toEqual('lkjhljugyghjh');
  });
  it('renders correctly', () => {
    const tree = renderer.create(<UserProfileCard {...cardProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<UserArticleCardComponent />', () => {
  const cardProps = {
    img: 'https://avatars1.githubusercontent.com/u/22154654?s=460&v=4',
    articleTitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting ',
    tags: 'Eat, Code, sleep, Repeat',
    followersCount: 3,
    userName: 'Dozie',
    likeCount: 2,
    articleBody: 'There is no limit to what you can achieve with a pen.',
    slug: 'how-i-got-into-andela',
    dislikeCount: 3,
    commentCount: 5,
    timeCount: '2 days Ago',
    deleteArticles: jest.fn()
  };
  const cardProps2 = { ...cardProps, timeCount: 'false' };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserArticleCard {...cardProps} />);
  });

  it('should render a User profile card component', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find(TimerComponent)).toHaveLength(1);
    expect(wrapper.find(DislikeComponent)).toHaveLength(1);
    expect(wrapper.find(CommentIconComponent)).toHaveLength(1);
    expect(wrapper.find(LikeComponent)).toHaveLength(1);
    expect(wrapper.find(BadgeComponent)).toHaveLength(4);
  });
  it('should not render a timer component if timeCount is set to false', () => {
    wrapper.setProps({ ...cardProps2 });
    expect(wrapper.find(TimerComponent)).toHaveLength(0);
  });
  it('should show a modal when the delete button is clicked', () => {
    wrapper
      .find(Button)
      .at(1)
      .simulate('click');
  });
});
