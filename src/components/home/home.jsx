import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid homeLayout">
        <div className="container-fluid">
          Welcome to my sample app. Please type in the search bar above a
          subject that you want to query the api to display images.
        </div>
      </div>
    );
  }
}

export default Home;
