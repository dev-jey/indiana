import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import IndexCarousel from '../carousels/indexCarousel.jsx';
import CardComponent from '../common/CardComponent';
import Footer from '../common/footer.jsx';
import {
  getAllArticles,
  getAllUsersBookMarkedArticles,
} from '../../redux/actions/articleActions/articleActions';

class PersonalisedViewComponent extends Component {
  state = {
    mostPopularArticles: [
      {
        img: 'https://images.unsplash.com/photo-1505262744895-ac5705911f6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80',
        title: 'National day',
        text: 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        likeCount: 0,
        slug: 'national-day',
        dislikeCount: 62,
        commentCount: 150
      },
      {
        img: 'https://images.unsplash.com/photo-1527427337751-fdca2f128ce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        title: 'How to build a world class feature',
        text: 'If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text.',
        likeCount: 200,
        slug: 'how-to-build-a-world-class-feature',
        dislikeCount: 2,
        commentCount: 100
      },
      {
        img: 'https://images.unsplash.com/photo-1521716250348-c4ae4ff1df43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80',
        text: 'If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text.',
        title: 'Read like a pro',
        likeCount: 2,
        slug: 'read-like-a-pro',
        dislikeCount: 2,
        commentCount: 25
      }]
  }

  componentDidMount() {
    const { auth: { isVerified } } = this.props;
    if (isVerified) this.props.getAllUsersBookMarkedArticles();
    this.props.getAllArticles();
  }

  render() {
    let featuresView;
    let bookmarkView;
    let bookmarkListView;
    const {
      articles: { allArticles, isLoading },
      auth: { isVerified },
      bookmarkedArticles: { isLoading: isBookMarkedArticlesLoading, userBookmarks }

    } = this.props;

    if (isLoading) {
      featuresView = <div className='carousel-spinner spinner-grow spinner-grow-lg text-primary'></div>;
    }
    if (isBookMarkedArticlesLoading) {
      // eslint-disable-next-line no-multi-assign
      bookmarkView = bookmarkListView = <div className='carousel-spinner spinner-grow spinner-grow-lg text-primary'></div>;
    }
    if (!isBookMarkedArticlesLoading && userBookmarks.length === 0) {
      // eslint-disable-next-line no-multi-assign
      bookmarkView = bookmarkListView = <p> You currently do not have any bookmarked Article </p>;
    }

    if (!isLoading && allArticles.length === 0) {
      featuresView = <p>There Are No Featured Articles</p>;
    }
    if (!isLoading && allArticles.length > 0) {
      const threeRandomArticles = allArticles.sort(() => 0.5 - Math.random()).slice(0, 4);
      featuresView = threeRandomArticles.map((eachCard, index) => <Link to ={`/articles/${eachCard.slug}`} key= {index}>
       <CardComponent
        img={eachCard.imageUrl}
        color={eachCard.color}
        commentCount={0}
        slug={eachCard.slug}
        likeCount={eachCard.likes}
        dislikeCount={eachCard.dislikes}
        title={eachCard.articleTitle}
        text={eachCard.articleBody}
        />
      </Link>);
    }
    if (!isBookMarkedArticlesLoading && userBookmarks.length > 0) {
      const bookmarkedAticleResults = userBookmarks.map(eachCard => eachCard.Article);
      // showing a maximum list of 4 bookmarked items due to space
      const bookmarkedlists = bookmarkedAticleResults.slice(0, 3);
      const listedBookmarkedItems = bookmarkedlists
        .map((eachCard, index) => <li key = {index} className='list-group-item'><Link to ={`/articles/${eachCard.slug}`}>{eachCard.articleTitle}</Link></li>);
      bookmarkListView = <ul className="list-group list-group-flush">{listedBookmarkedItems}</ul>;

      if (bookmarkedAticleResults.length === 1) {
        bookmarkView = bookmarkedAticleResults.map((eachCard, index) => <Link to ={`/articles/${eachCard.slug}`} key= {index}>
      <CardComponent
        img={eachCard.imageUrl}
        color={eachCard.color}
        commentCount={40}
        likeCount={430}
        slug={eachCard.slug}
        dislikeCount={40}
        title={eachCard.articleTitle}
        text={eachCard.articleBody}
        />
       </Link>);
      }
      bookmarkView = <IndexCarousel articles={bookmarkedAticleResults} isLoading={false} />;
    }

    const { mostPopularArticles } = this.state;

    return (
<Fragment>
<main className='personalised-container'>

<section className='top-read-container top-read-container-styles'>
<div className="row mx-0">
<div className="col-md-9 top-read-image-container px-0">
<img className='top-read-img 'src='https://images.unsplash.com/photo-1512808832507-c75aec26ebed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'/>
</div>
<div className='col-md-3 top-read-text-padding'>
<p className='text-center'> Top Read Of the Day </p>
<h2 className='text-center' >Women In Tech</h2>
<div className='top-read-main-text'>
For 50 years, WWF has been protecting the future of nature.
The leading conservation organization, WWF works in 100 countries and
is supported by 1.2 million members in the United States and close to 5 million globally
</div>
</div>
</div>
</section>


<section className='most-like-section'>
<h1 className='mb-4 card-title-size'> Most Popular Articles </h1>
<div className = 'card-container mb-5 mt-2'>
{mostPopularArticles.map((eachCard, index) => <CardComponent
  key= {index}
  img={eachCard.img}
  color={eachCard.color}
  slug={eachCard.slug}
  commentCount={eachCard.commentCount}
  likeCount={eachCard.likeCount}
  dislikeCount={eachCard.dislikeCount}
  title={eachCard.title}
  text={eachCard.text}
   />)}
<div className='popular-bookmarked'>
<div className='h-50 mb-5'>
<h3 className='mb-4'>Popular Articles</h3>
<ul className="list-group list-group-flush">
  <li className="list-group-item">First item</li>
  <li className="list-group-item">Second item</li>
  <li className="list-group-item">Third item</li>
  <li className="list-group-item">Fourth item</li>
</ul>
</div>
<div className='h-50'>
<h3 className='mb-4'>Bookmark Articles</h3>
{isVerified ? bookmarkListView : <p> You currently do not have any bookmarked Article </p>}
</div>
</div>
</div>
</section>

<section className='featured-articles-section'>
<h1 className='mb-4 card-title-size'>Featured  articles</h1>
<div className = 'card-container mb-5 mt-2'>
{featuresView}
</div>
</section>

<section className='bookmarked-articles-section'>
<h1 className='card-title-size mb-4'> Bookmarked articles </h1>
<div className = 'card-container mb-5 mt-2'>
 { isVerified ? bookmarkView : <h3> You currently do not have any bookmarked Article </h3>}
</div>
</section>
</main>
<Footer/>
</Fragment>
    );
  }
}
PersonalisedViewComponent.propTypes = {
  auth: PropTypes.object,
  articles: PropTypes.object,
  getAllArticles: PropTypes.func,
  getAllUsersBookMarkedArticles: PropTypes.func,
  bookmarkedArticles: PropTypes.object,
};
const mapStateToProps = state => ({
  auth: state.auth,
  articles: state.articles,
  bookmarkedArticles: state.bookmarkedArticles
});
export { PersonalisedViewComponent };
export default connect(mapStateToProps, {
  getAllArticles,
  getAllUsersBookMarkedArticles
})(PersonalisedViewComponent);
