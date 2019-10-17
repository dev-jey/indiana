import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TopBarProgress from 'react-topbar-progress-indicator';
import PropTypes from 'prop-types';
import UserArticleCardComponent from './common/UserArticleCardComponent';
import {
  getAllUsersBookMarkedArticles
} from '../redux/actions/articleActions/articleActions';


class UserBookmarksPage extends Component {
  state = {
    currentPage: 1,
    bookmarksPerPage: 4,
  }

  handleClick= (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  componentDidMount() {
    const { auth: { isVerified } } = this.props;
    if (isVerified) this.props.getAllUsersBookMarkedArticles();
  }

  render() {
    let bookmarkView;

    const { currentPage, bookmarksPerPage } = this.state;
    const { bookmarkedArticles: { isLoading, userBookmarks } } = this.props;

    if (!isLoading && !userBookmarks.length) {
      bookmarkView = <h1> You Currently do not have any bookmarked article   </h1>;
    }
    if (!isLoading && userBookmarks.length) {
      const indexOfLastBookmark = currentPage * bookmarksPerPage;
      const indexOfFirstBookmark = indexOfLastBookmark - bookmarksPerPage;
      const currentBookmark = userBookmarks.slice(indexOfFirstBookmark, indexOfLastBookmark);


      bookmarkView = currentBookmark.map((article, index) => (
       <UserArticleCardComponent
          className="user-article-card"
          key={index}
          img={
            article.Article.imageUrl
            || 'https://images.pexels.com/photos/1438190/pexels-photo-1438190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          }
          articleTitle={article.Article.articleTitle}
          articleBody={article.Article.articleBody}
          tags={article.Article.tags}
          likeCount={article.Article.likes}
          dislikeCount={article.Article.dislikes}
          slug={article.Article.slug}
          timeCount='false'
        />
      ));
    }

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(userBookmarks.length / bookmarksPerPage); i += 1) {
      pageNumbers.push(i);
    }
    const pagination = pageNumbers.map(number => (
        <li
        className='page-item'
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
    ));

    return (
      <Fragment>
        {isLoading && <TopBarProgress />}
        {bookmarkView}
        {userBookmarks.length > 4 ? <ul className = 'pagination'>{pagination}</ul> : ''}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  bookmarkedArticles: state.bookmarkedArticles
});

UserBookmarksPage.propTypes = {
  auth: PropTypes.object,
  getAllUsersBookMarkedArticles: PropTypes.func,
  bookmarkedArticles: PropTypes.object,
};

export { UserBookmarksPage };

export default connect(
  mapStateToProps,
  { getAllUsersBookMarkedArticles }
)(UserBookmarksPage);
