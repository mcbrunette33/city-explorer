import React from "react";
import { Badge, ListGroup } from "react-bootstrap";

class Weather extends React.Component {
  render() {
    return (
      <>
        {

          <ListGroup
            as="ol"
            style={{
              minWidth: '30rem',
              width: '60%',
              margin: '0 auto'
            }}
          >
            {this.props.weather.map((forecast, index) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key = {index}
              >
                <p 
                className="ms-2 me-auto">
                  {forecast.description}
                </p>
                <Badge bg="primary" pill>
                  {forecast.date}
                </Badge>
              </ListGroup.Item>

            ))
        }
            </ListGroup>
        }
      </>
    )
  }
}

export default Weather
