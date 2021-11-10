import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Playlist } from './pages/Playlist'
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { isLoggedInOnSpotify } from './auth';
import { Header } from './components/Header';
import { MyCharts } from './pages/MyCharts';
import { CreateAPlaylist } from './pages/CreateAPlaylist'
import './styles/main.scss'
import { SpotifyAuthCallback } from './SpotifyCallBack';


export function App() {
  const isLoggedIn = isLoggedInOnSpotify()
    return (
      <main>
        <Header /> 
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/charts' component={MyCharts} />
        <Route exact path="/playlist/:id" component={Playlist} />
        <Route exact path="/create" component={CreateAPlaylist} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path="/callback" component={SpotifyAuthCallback}>
          <SpotifyAuthCallback />
        </Route>
      </Switch>
    </main>
    )
    }
  export default App