import React, {useContext} from "react";
import {AuthContext} from '../contexts/AuthContext';

function Home(props){
  const {currentUser} = useContext(AuthContext);
  return <div className="Home">Home {currentUser && currentUser.username}</div>
}

export default Home;