import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { isLoggedInOnSpotify } from './auth';
import { Header } from './components/Header';
import { MyCharts } from './pages/MyCharts';
import './custom.css'


export function App() {
  const isLoggedIn = isLoggedInOnSpotify()
    return (
      <main>
        <Header /> 
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/charts' component={MyCharts} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />

      </Switch>
    </main>
    )
    }
  export default App