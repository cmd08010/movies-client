import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import Spinner from 'react-bootstrap/Spinner'

import { movieCreate } from '../../api/movies'
import MovieForm from '../MovieForm/MovieForm'

const MovieCreate = ({ msgAlert, user }) => {
  const [movie, setMovie] = useState({
    title: '',
    director: ''
  })
  const [createdMovieId, setCreatedMovieId] = useState(null)

  const handleChange = event => {
    event.persist()
    setMovie({ ...movie, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    movieCreate(movie, user)
      // set the createdMovieId to the _id of the movie we got in the response's data
      .then(res => setCreatedMovieId(res.data.movie._id))
      .then(() => msgAlert({
        heading: 'Created Movie Successfully',
        message: 'Showing created movie.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to create movie',
          message: 'Could not create movie with error:' + error.message,
          variant: 'danger'
        })
      })
  }
  if (createdMovieId) {
    // redirect to the movie's show page
    return <Redirect to={`/movies/${createdMovieId}`} />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Create Movie</h3>
        <MovieForm
          movie={movie}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </div>
  )
}

export default MovieCreate
