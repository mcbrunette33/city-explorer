import React from "react";
import {ListGroup } from "react-bootstrap";

class Movie extends React.Component {
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
            {this.props.movie.map((movie, index) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key = {index}
              >
                <p 
                className="ms-2 me-auto">
                  {movie.title}
                </p>
                <p 
                className="ms-2 me-auto">
                  {movie.popularity}
                </p>
                <p 
                className="ms-2 me-auto">
                  {movie.overview}
                </p>
              </ListGroup.Item>

            ))
        }
            </ListGroup>
        }
      </>
    )
  }
}

export default Movie
