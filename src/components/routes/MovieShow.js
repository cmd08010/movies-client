import React, { useEffect, useState } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import { movieShow, movieDelete } from '../../api/movies'

const MovieShow = ({ msgAlert, user, match }) => {
  const [movie, setMovie] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const { id } = match.params

  console.log(id)

  useEffect(() => {
    console.log('in useEffect')
    movieShow(user, id)
      .then(res => setMovie(res.data.movie))
      .then(() => msgAlert({
        heading: 'Loaded Movie Successfully',
        message: 'Viewing one. Click one to see its page.',
        variant: 'success'
      }))
      .catch((error) => msgAlert({
        heading: 'Loaded Movies Successfully',
        message: 'Viewing all movies. Click one to see its page.' + error.message,
        variant: 'danger'
      }))
  }, [])

  const deleteBook = (e) => {
    movieDelete(movie._id, user)
      .then(response => setRedirect(true))
      .catch(console.err)
  }

  if (redirect) {
    return <Redirect to="/movies"/>
  }

  if (!movie) {
    return (
      <Spinner animation="border" variant="info">
        <span className="sr-only">Loading...</span>
      </Spinner>

    )
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Movie</h3>
        <h4>{movie.title}</h4>
        <h4>{movie.director}</h4>
        <button onClick={deleteBook}>Delete </button>
        <button><Link to={'/update-book/' + movie._id} /></button>
      </div>
    </div>
  )
}

export default withRouter(MovieShow)
