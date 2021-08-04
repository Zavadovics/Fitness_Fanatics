import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from './components/pages/Home/Home';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword/ResetPassword';
import Navbar from './components/common/Navbar/Navbar';
import Sidebar from './components/common/Sidebar/Sidebar';
import Footer from './components/common/Footer/Footer';
import Activities from './components/pages/Activities/Activities';
import NewActivity from './components/pages/NewActivity/NewActivity';
import EditActivity from './components/pages/EditActivity/EditActivity';
import Profile from './components/pages/Profile/Profile';
import EditProfile from './components/pages/EditProfile/EditProfile';
import EditPhoto from './components/pages/EditPhoto/EditPhoto';
import TrainingPlans from './components/pages/TrainingPlans/TrainingPlans';
/* TO-DOs
- enable frontend to be able to add new city to db
- complete PDF uploading/viewing
 */
const newUser = localStorage.getItem('loggedInUser')
  ? JSON.parse(localStorage.getItem('loggedInUser'))
  : null;

const App = () => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [loggedInUser, setLoggedInUser] = useState(newUser);
  const [profile, setProfile] = useState('');
  // const [error, setError] = useState(null);
  const [userPhoto, setUserPhoto] = useState('');

  // console.log('userPhoto', typeof userPhoto);
  // console.log(loggedInUser);

  useEffect(() => {
    if (loggedInUser) {
      const getPhoto = async () => {
        fetch(`${REACT_APP_SERVER_URL}/api/photo/${loggedInUser.id}`, {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        })
          .then(res => {
            if (res.status !== 200) {
              throw Error(
                `could not fetch data from database, error ${res.status}`
              );
            }
            return res.json();
          })
          .then(jsonRes => {
            // console.log('jsonRes', jsonRes);
            setUserPhoto(jsonRes[0].avatar);
          })
          .catch(err => {
            console.log(err.message);
          });
      };
      getPhoto();
    }
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      const getProfile = async () => {
        fetch(`${REACT_APP_SERVER_URL}/api/user/${loggedInUser.id}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        })
          .then(res => {
            // console.log('res', res);
            if (res.status !== 200) {
              throw Error(
                `could not fetch the data from database, error ${res.status}`
              );
            }
            return res.json();
          })
          .then(jsonRes => {
            setProfile(jsonRes);
            // console.log('profile', profile);
          })
          .catch(err => {
            console.log(err.message);
          });
      };
      getProfile();
    }
  }, []);

  return (
    <>
      <Router>
        <Switch>
          {loggedInUser ? (
            <>
              <Navbar
                setLoggedInUser={setLoggedInUser}
                loggedInUser={loggedInUser}
              />
              <div className='app-cont'>
                <Sidebar loggedInUser={loggedInUser} />
                <div className='content-cont'>
                  <Route exact path='/activities'>
                    <Activities profile={profile} loggedInUser={loggedInUser} />
                  </Route>
                  <Route exact path='/activities/new'>
                    <NewActivity loggedInUser={loggedInUser} />
                  </Route>
                  <Route exact path='/activities/edit/:id'>
                    <EditActivity loggedInUser={loggedInUser} />
                  </Route>
                  <Route exact path='/profile'>
                    <Profile
                      loggedInUser={loggedInUser}
                      userPhoto={userPhoto}
                      profile={profile}
                    />
                  </Route>
                  <Route exact path={`/profile/edit/${loggedInUser.id}`}>
                    <EditProfile
                      loggedInUser={loggedInUser}
                      profile={profile}
                      setProfile={setProfile}
                    />
                  </Route>
                  <Route exact path={`/profile/photo/edit/${loggedInUser.id}`}>
                    <EditPhoto
                      loggedInUser={loggedInUser}
                      userPhoto={userPhoto}
                      setUserPhoto={setUserPhoto}
                    />
                  </Route>
                  <Route path='/training-plans'>
                    <TrainingPlans loggedInUser={loggedInUser} />
                  </Route>
                </div>
              </div>
              <Footer />
            </>
          ) : (
            <>
              <Route exact path='/' loggedInUser={loggedInUser}>
                <Home />
              </Route>
              <Route path='/register'>
                <Register />
              </Route>
              <Route path='/login'>
                <Login
                  setLoggedInUser={setLoggedInUser}
                  loggedInUser={loggedInUser}
                />
              </Route>
              <Route path={`/password`}>
                <ForgotPassword />
              </Route>
              <Route path={`/password-reset/:id/:token`}>
                <ResetPassword />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </>
  );
};

export default App;
