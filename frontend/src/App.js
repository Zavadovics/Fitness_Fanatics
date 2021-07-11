import { React, useState } from 'react';
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
import TrainingPlans from './components/pages/TrainingPlans/TrainingPlans';

const newUser = localStorage.getItem('loggedInUser')
  ? JSON.parse(localStorage.getItem('loggedInUser'))
  : null;

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(newUser);
  // console.log('newUser - app.js', newUser);

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
                <Sidebar />
                <div className='content-cont'>
                  <Route exact path='/activities'>
                    <Activities />
                  </Route>
                  <Route exact path='/activities/new'>
                    <NewActivity />
                  </Route>
                  <Route exact path='/activities/edit/:id'>
                    <EditActivity
                      activityFromList={{
                        _id: 4,
                        duration: '120',
                        activityType: 'futás',
                        distance: '6000',
                        comment: 'cool run',
                      }}
                    />
                  </Route>
                  <Route exact path='/profile'>
                    <Profile />
                  </Route>
                  <Route exact path='/profile/edit/:id'>
                    <EditProfile />
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
