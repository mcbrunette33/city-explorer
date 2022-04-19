import React from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationData: {},
      location: '',
      locationName: 'Location:',
      locationLon: 0,
      locationLat: 0,
      clickExplore: false,
      error: false,
      errorMessage: ''
    }
  }

  handleTypeUpdate = e => {
    this.setState({
      location: e.target.value
    })
  }

  handleExplore = async e => {
    e.preventDefault();
    let apiUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONAPI}&q=${this.state.location}&format=json`;
    console.log(apiUrl);
    let locationData = await axios.get(apiUrl);
    this.setState({
      locationData: locationData.data[0],
      locationName: locationData.data[0].display_name,
      locationLon: locationData.data[0].lon,
      locationLat: locationData.data[0].lat,
      clickExplore: true
    });
  }
  render() {
    // console.log('this is state', this.state);
    return (
      <>
        <div>
          <form onSubmit={this.handleExplore}>
            <label className="search-box">
              Where to?
              <input type="text" name="location" onInput={this.handleTypeUpdate} />
            </label>
            <button type="submit">Explore</button>
          </form>
        </div>
        <Card
          style={{
            height: '60%',
            width: '60%',
            padding: '6em',
            color: 'grey',
            backgroundColor: 'white',
            borderRadius: '6em'
          }}>
          <Card.Body>
            <Card.Title>
              {this.state.locationName}
            </Card.Title>
            <Card.Text>
              Lon: {this.state.locationLon}
            </Card.Text>
            <Card.Text>
              Lat: {this.state.locationLat}
            </Card.Text>
          </Card.Body>
          <Card.Img variant="bottom" src="" />
        </Card>
      </>
    );
  }
}

export default Main;