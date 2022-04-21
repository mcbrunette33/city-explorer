import React from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import Weather from './Weather';
import Movie from './Movie';

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
      errorMessage: '',
      weatherData: [],
      showweather: false,
      showmovie: false,
      movieData: []
    
    }
  }

  handleTypeUpdate = e => {
    this.setState({
      location: e.target.value
    })
  }

  handleExplore = async e => {
    e.preventDefault();
    try {
      let apiUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONAPI}&q=${this.state.location}&format=json`;
      // console.log(apiUrl);
      let locationData = await axios.get(apiUrl);
      this.setState({
        locationData: locationData.data[0],
        locationName: locationData.data[0].display_name,
        locationLon: locationData.data[0].lon,
        locationLat: locationData.data[0].lat,
        clickExplore: true
      }, async () => {
        let weatherApiUrl = `${process.env.REACT_APP_SERVER}/weather?lon=${this.state.locationLon}&lat=${this.state.locationLat}`;
        let weatherData = await axios.get(weatherApiUrl);
        this.setState({
          weatherData: weatherData.data,
          showweather: true
        }, async () => {
          let movieApiUrl = `${process.env.REACT_APP_SERVER}/movie?locationCity=${this.state.location}`;
          let movieData = await axios.get(movieApiUrl);
          this.setState({
            movieData: movieData.data,
            showmovie: true
          }
          );

        });
      });
    }
    catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status} Unable to find location`,
        showweather: false,
        showmovie: false
      });
    }
  }
  render() {
    console.log('this is state', this.state);
    return (
      <>
        <div>
          <form onSubmit={this.handleExplore} className="search-box">
            <input
              type="text" name="location" onInput={this.handleTypeUpdate} />
            <Button type="submit">Explore</Button>
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
          {this.state.showweather &&
            <Weather weather={this.state.weatherData} />

          }
           {this.state.showmovie &&
            <Movie movie={this.state.movieData} />

          }
          {
            this.state.clickExplore
              ?
              <Card.Img variant="bottom" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONAPI}&center=${this.state.locationLat},${this.state.locationLon}&zoom=12`} />
              :
              <Card.Img variant="bottom" />
          }
        </Card>
      </>
    );
  }
}

export default Main;