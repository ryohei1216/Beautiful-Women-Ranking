import React, { useState, useEffect } from "react";
import firebase from "./firebase";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log(firebase.auth());
  useEffect(() => {
    //←コンポーネントの表示が終わった後に呼び出し？
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
