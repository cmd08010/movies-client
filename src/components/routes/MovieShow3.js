// 1. Imports
// Component & Fragment
import React, { Component, Fragment } from 'react'
import { movieShow } from '../../api/movies'
import { withRouter, Redirect } from 'react-router-dom'
// 2. Class
class ShowMovie extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // initially we have no data, no movie (null)
      movie: null
      // Delete boolean to manage if we've deleted this movie
    }
    // If we don't use arrow functions, then we need to bind the `this` scope
    // this.deletemovie = this.deletemovie.bind(this)
    console.log(this, 'this is this')
  }
  // When this component mounts, make a GET
  // request using the ID param in the front-end route URL
  // and set the state to trigger a re-render
  componentDidMount () {
    // axios(apiUrl + '/movies/' + this.props.match.params.id)
    const { msgAlert, user } = this.props
    console.log(this.props)
    // console.log(this.props.match.params.id)
    // fetch all of our movies
    movieShow(this.props.match.params.id, user)
      // set the movies state to the movies we got back in our response's data
      .then(res => this.setState({ movie: res.data.movie }))
      .then(() => msgAlert({
        heading: 'Loaded Movie Successfully',
        message: 'Viewing',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to load movies',
          message: 'Could not load movies with error:' + error.message,
          variant: 'danger'
        })
      })
  }

  deleteBook = () => {
  axios.delete(`${apiUrl}/books/${this.props.match.params.id}`)
    .then(response => this.setState({ redirect: true }))
}
  render () {
    // create a local variable `movie` and set it's value
    // to the value of the `movie` key on `this.state`
    const { movie, deleted } = this.props
    // 2 scenarios: loading, movie to show
    let movieJsx = ''
    if (deleted) {
      // if deleted is true, we can redirect
      return <Redirect to="/index-movies"/>
    } else if (!movie) {
      // loading, no movie yet
      movieJsx = <p>Loading...</p>
    } else {
      // we have a movie! Display it
      movieJsx = (
        <div>
          <h4>{movie.title}</h4>
          <button onClick={this.deleteBook}>Delete </button>
        </div>
      )
    }
    return (
      <Fragment>
        <h1>Just One movie:</h1>
        {movieJsx}
      </Fragment>
    )
  }
}
// 3. Exports
export default withRouter(ShowMovie)
