import React from 'react'

const MovieForm = ({ movie, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      required
      placeholder='Enter movie title'
      // the title refers to the piece of state we want to update
      name='title'
      value={movie.title}
      onChange={handleChange}
    />
    <label>Director</label>
    <input
      required
      placeholder='Enter movie director'
      // the director refers to the piece of state we want to update
      name='director'
      value={movie.director}
      onChange={handleChange}
    />
    <button>Submit</button>
  </form>

)

export default MovieForm
