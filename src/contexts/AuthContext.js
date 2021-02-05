import React, {useState, useEffect} from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const AuthContext = React.createContext();

async function checkToken(){
  if(cookies.get('jwt')){
    try {
      const res = await fetch('http://localhost:8080/checkJwt', {
        method: 'POST',
        body: JSON.stringify({token: cookies.get('jwt')}),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
      });
      const data = await res.json();
      console.log(data.user.username);
      return data.user;
    } catch (err) {
      console.log(err.message);
      return null;
    }
  };
  return null;
};

const AuthProvider = (props) => {

  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    checkToken().then(user => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;