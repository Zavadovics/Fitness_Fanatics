import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from './components/pages/Home/Home';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
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

const newUser = localStorage.getItem('loggedInUser')
  ? JSON.parse(localStorage.getItem('loggedInUser'))
  : null;

const App = () => {
  const { REACT_APP_SERVER_URL } = process.env;
  const [loggedInUser, setLoggedInUser] = useState(newUser);

  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  const [userPhoto, setUserPhoto] = useState({
    image: '',
  });

  useEffect(() => {
    if (loggedInUser) {
      const getPhoto = async () => {
        fetch(`${REACT_APP_SERVER_URL}/api/photo/${loggedInUser.id}`)
          .then(res => {
            if (res.status < 200 || res.status >= 300) {
              throw Error(
                `could not fetch data from database, error ${res.status}`
              );
            }
            return res.json();
          })
          .then(jsonRes => {
            setUserPhoto({
              image: jsonRes[0].avatar,
            });
            setError(null);
          })
          .catch(err => {
            setError(err.message);
          });
      };
      getPhoto();
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
                    <Activities
                      profile={profile}
                      loggedInUser={loggedInUser}
                      // activities={activities}
                      // setActivities={setActivities}
                    />
                  </Route>
                  <Route exact path='/activities/new'>
                    <NewActivity loggedInUser={loggedInUser} />
                  </Route>
                  <Route exact path='/activities/edit/:id'>
                    <EditActivity
                    // activities={activities}
                    // setActivities={setActivities}
                    />
                  </Route>
                  <Route exact path='/profile'>
                    <Profile
                      loggedInUser={loggedInUser}
                      userPhoto={userPhoto}
                      profile={profile}
                      setProfile={setProfile}
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
                    <TrainingPlans />
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
            </>
          )}
        </Switch>
      </Router>
    </>
  );
};

export default App;
