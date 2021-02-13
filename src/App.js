import './App.css';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Home from './components/Home';
import Create from './components/article/Create';
import AuthProvider from './contexts/AuthContext';
import ArticleDetails from './components/article/ArticleDetails';

export default function App() {
  return (
    <AuthProvider>
      <Router>
          <div className="App">
            <Navbar/>
            <Route exact path="/" component = {Home}/>
            <Route path="/login" component = {Login}/>
            <Route path="/signup" component = {Signup}/>
            <Route path="/create" component = {Create}/>
            <Route exact path="/article/:id" component={ArticleDetails} />
          </div>
      </Router>
    </AuthProvider>
    
  );
};
