import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import homePage from './components/Home.jsx';
import UserVerificationpage from './components/UserVerificationPage.jsx';
import { signOutUser } from './redux/actions/authActions';
import { AUTHENTICATE_USER } from './redux/actions/actionTypes';
import Profilepage from './components/ProfilePage.jsx';
import 'react-toastify/dist/ReactToastify.min.css';
import { validateToken } from './utils';
import Navbar from './components/common/Navbar.jsx';
import ResetPasswordPage from './components/ResetPassword.jsx';
import SocialAuthPage from './components/SocialAuthPage.jsx';
import Comment from './components/comment/CommentForm.jsx';
import createArticle from './components/CreateArticle.jsx';
import store from './redux/store';
import UserDashboard from './components/UserDashboard.jsx';
import NotFound from './components/NotFound.jsx';
import SingleArticlePage from './components/containers/SingleArticle.jsx';
import PrivateRoute from './utils/authenticate';
import emailVerificationPage from './components/EmailVerificationPage.jsx';
import ArticlesSearchResultsPage from './components/ArticlesSearchResultsPage.jsx';
import Statisticspage from './components/StatisticsPage.jsx';

const user = validateToken(window.localStorage.getItem('token'));
if (user) {
  store.dispatch({
    type: AUTHENTICATE_USER,
    user
  });
} else {
  store.dispatch(signOutUser());
}

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Navbar />
      <ToastContainer autoClose={3000} position="top-right" />
      <Switch>
        <Route path="/articles/:slug" component={SingleArticlePage} />
        <Route path="/verifyUser" component={UserVerificationpage} />
        <Route path="/not-found" component={NotFound} exact />
        <Route path="/social-auth" component={SocialAuthPage} />
        <Route path="/search" component={ArticlesSearchResultsPage} />
        <Route path="/reset-password" component={ResetPasswordPage} />
        <PrivateRoute path="/profile" component={Profilepage} exact />
        <Route path="/comment" component={Comment} exact/>
        <Route path="/" component={homePage} exact />
        <PrivateRoute path="/article/create" component={createArticle} exact />
        <PrivateRoute path="/article/update/:slug" component={createArticle} exact />
        <PrivateRoute path="/dashboard" component={UserDashboard} />
        <PrivateRoute path="/statistics" component={Statisticspage} />
        <Route path="/user/verify" component={emailVerificationPage} />
        <Redirect to="not-found" exact />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default App;
