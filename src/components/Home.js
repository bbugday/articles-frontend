import React,{useEffect, useContext} from "react";
import {AuthContext} from '../contexts/AuthContext';

function Home(props){
  const {currentUser} = useContext(AuthContext);
  return <div className="Home">{currentUser && currentUser.username}</div>
}

export default Home;