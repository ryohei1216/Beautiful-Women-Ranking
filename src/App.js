import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UploadPhotos from "./UploadPhotos";
import WomenRanking from "./WomenRanking";
import Room from "./Room";
import "./App.css";
// import { AuthProvider } from "./config/AuthService";

const App = () => {
  return (
    <div>
      {/* <AuthProvider> */}
      <h1>Select Favorite Woman</h1>
      <Router>
        <Switch>
          <Route path="/" exact component={Room} />
          <Route path="/upload_photos" exact component={UploadPhotos} />
          <Route path="/women_ranking" exact component={WomenRanking} />
        </Switch>
      </Router>
      {/* </AuthProvider> */}
    </div>
  );
};

export default App;
