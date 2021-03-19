import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import { movieIndex } from '../../api/movies'

const MovieIndex = ({ msgAlert, user }) => {
  const [movies, setMovies] = useState(null)

  useEffect(() => {
    movieIndex(user)
      .then(res => setMovies(res.data.movies))
      .then(() => msgAlert({
        heading: 'Loaded Movies Successfully',
        message: 'Viewing all movies. Click one to see its page.',
        variant: 'success'
      }))
      .catch((error) => msgAlert({
        heading: 'Loaded Movies Successfully',
        message: 'Viewing all movies. Click one to see its page.' + error.message,
        variant: 'danger'
      }))
  }, [])

  if (!movies) {
    return (
      <Spinner animation="border" variant="info">
        <span className="sr-only">Loading...</span>
      </Spinner>

    )
  }
  const moviesJsx = movies.map(movie => (
    <Link to={`/movies/${movie._id}`} key={movie._id}>
      <li>{movie.title}</li>
    </Link>
  ))

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Movies</h3>
        {moviesJsx}
      </div>
    </div>
  )
}

export default MovieIndex
