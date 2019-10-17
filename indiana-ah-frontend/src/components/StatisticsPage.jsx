import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FadingCircle } from 'better-react-spinkit';
import PropTypes from 'prop-types';
import {
  readingStatImage,
  bookmarkStatImage,
  reactionStatImage,
  commentStatImage,
  likeStat,
  dislikeStat
} from '../assets/images/svg';
import SideNav from './SideNav.jsx';
import getUsersStat from '../redux/actions/getUsersStatActions';

export class StatisticsPage extends Component {
  componentDidMount = async () => {
    document.body.style.marginBottom = '0';
    await this.props.getUsersStat();
  };

  componentWillUnmount() {
    document.body.style.marginBottom = '30rem';
  }

  render() {
    const {
      statistics: {
        ReadingStat,
        bookmarksStat,
        commentStat,
        reactionStat: { total, dislikes, likes } = {}
      } = {},
      loading
    } = this.props;
    return (
      <div className="main">
        <SideNav />
        <section className="container-fluid profile statPage">
          {loading && (
            <div className="loader">
              <FadingCircle className="loader-pic" size={100} color="white" />
            </div>
          )}
          <Row className="mb-7">
            <div className="col-md-4 col-sm-5 profile-card text-center profile-info mail">
              <div>
                <img
                  src={readingStatImage}
                  alt="reading-stat"
                  className="statisticsImage"
                />
              </div>
              <div className="py-2">
                <h3 className="font-weight-bold">
                  You have read <span>{ReadingStat} article(s)</span>
                </h3>
              </div>
            </div>
            <div className="space col-md-1" />
            <div className="col-md-7 tabs  profile-card order-1 order-md-4">
              <div className="d-flex justify-content-around align-items-center">
                <img
                  src={reactionStatImage}
                  alt="reaction-stat"
                  className="bigImage pt-5"
                />
                <div>
                  <h3 className="font-weight-bold">
                    You have Reacted <span className="px-2">{total} time(s)</span>
                  </h3>
                  <div className="d-flex justify-content-around">
                    <span>
                      <img src={likeStat} alt="like-stat" />
                      <h4>{likes}</h4>
                    </span>
                    <span>
                      <img src={dislikeStat} alt="disLike-stat" />
                      <h4>{dislikes}</h4>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <div className="col-md-4 profile-card text-center mail order-3 order-md-4">
              <div>
                <img
                  src={bookmarkStatImage}
                  alt="bookmark-stat"
                  className="statisticsImage"
                />
              </div>
              <div className="pt-4 font-weight-bold">
                <h3>
                  You have bookmarked <span>{bookmarksStat} article(s)</span>
                </h3>
              </div>
            </div>
            <div className="space col-md-1 order-2 order-md-4" />
            <div className="col-md-7 tabs profile-card order-1 order-md-4">
              <div className="d-flex justify-content-around align-items-center">
                <img
                  src={commentStatImage}
                  alt="comment-stat"
                  className="bigImage pt-5"
                />
                <div className="mt-5">
                  <h3 className="font-weight-bold">You have Commented</h3>
                  <h1>{commentStat} time(s)</h1>
                </div>
              </div>
            </div>
          </Row>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  statistics: state.statistics.data[0],
  loading: state.statistics.isLoading
});

StatisticsPage.propTypes = {
  statistics: PropTypes.object,
  getUsersStat: PropTypes.func,
  loading: PropTypes.bool
};

export default connect(
  mapStateToProps,
  {
    getUsersStat
  }
)(StatisticsPage);
