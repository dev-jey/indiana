import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopBarProgress from 'react-topbar-progress-indicator';
import PropTypes from 'prop-types';
import moment from 'moment';
import getAllUserArticles from '../redux/actions/articleActions/userArticlesActions';
import UserArticleCardComponent from './common/UserArticleCardComponent';
import Pagination from './common/Pagination';
import { setAndGetCurrentPage } from '../utils/index';

class UserArticles extends Component {
  state = {};

  username = this.props.userData.username;

  async componentDidUpdate(prevProps) {
    if (prevProps.location.search === this.props.location.search) return;
    const currentPage = setAndGetCurrentPage(this);
    const query = `page=${currentPage}&limit=4`;
    await this.props.getAllUserArticles(this.username, query);
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    const currentPage = setAndGetCurrentPage(this);
    const query = `page=${currentPage}&limit=4`;
    this.props.getAllUserArticles(this.username, query);
  }

  render() {
    const { currentPage } = this.state;
    const { allUserArticles } = this.props;
    const numberOfPages = allUserArticles.articleData.totalNumberOfPages;
    if (!Object.keys(allUserArticles.articleData).length) return <TopBarProgress />;
    if (allUserArticles.articleData.message) return <h2>You have no articles</h2>;
    return (
      <div className="user-articles-section">
        {allUserArticles.isLoading && <TopBarProgress />}
        {allUserArticles.articleData.articles.map((article, index) => (
          <UserArticleCardComponent
            className="user-article-card"
            key={index}
            img={
              article.imageUrl
              || 'https://images.pexels.com/photos/1438190/pexels-photo-1438190.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            }
            articleTitle={article.articleTitle}
            articleBody={article.articleBody}
            tags={article.tags}
            likeCount={article.likes}
            dislikeCount={article.dislikes}
            commentCount={article.Comments.length}
            slug={article.slug}
            timeCount={moment(article.createdAt).fromNow()}
          />
        ))}
        {numberOfPages > 1 && (
          <Pagination numberOfPages={numberOfPages} currentPage={currentPage} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allUserArticles: state.allUserArticles,
  userData: state.user.userData
});

UserArticles.propTypes = {
  userData: PropTypes.object,
  allUserArticles: PropTypes.object,
  getAllUserArticles: PropTypes.func,
  location: PropTypes.object
};

export { UserArticles, mapStateToProps };

export default connect(
  mapStateToProps,
  { getAllUserArticles }
)(UserArticles);
