import './App.css';
import React from 'react';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Create from './components/Create';
import { Container } from "react-bootstrap";
import AuthProvider from './contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Container>
            <div className="App">
              <Route exact path="/" component = {Home}/>
              <Route path="/login" component = {Login}/>
              <Route path="/signup" component = {Signup}/>
              <Route path="/create" component = {Create}/>
            </div>
        </Container>
      </Router>
    </AuthProvider>
    
  );
};
