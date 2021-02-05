import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { Container } from "react-bootstrap";
import AuthProvider from './contexts/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
          <div className="w-100" style={{maxWidth:"400px"}}>
            <div className="App">
              <Route exact path="/" component = {Home}/>
              <Route path="/login" component = {Login}/>
              <Route path="/signup" component = {Signup}/>
            </div>
          </div>
        </Container>
      </Router>
    </AuthProvider>
    
  );
};
