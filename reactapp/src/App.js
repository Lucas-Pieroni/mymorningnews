import React from 'react';
import './App.css';
import ScreenHome from './components/ScreenHome';
import ScreenMyArticles from './components/ScreenMyArticles';
import ScreenArticlesBySource from './components/ScreenArticlesBySource';
import ScreenSource from './components/ScreenSource'
import Nav from './components/Nav'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useParams } from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import addToWishList from './reducer/addtowishlist';
import userToken from './reducer/addtoken';

const store = createStore(combineReducers({addToWishList, userToken}));


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/' exact component={ScreenHome} />
          <Route path='/screenmyarticles' component={ScreenMyArticles} />;
          <Route path ='/screensource' component={ScreenSource} />;
          <Route path = '/screenarticlesbysource/:idJournal' component={ScreenArticlesBySource} />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
