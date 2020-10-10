import React from 'react';
import Nav from './Nav';
import Search from './Search';
import MovieList from './MovieList';
import Pagination from './Pagination';
import MovieInfo from './MovieInfo';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchTerm: '',
      totalRes: 0,
      currentPage: 1,
      currentMovie: null
    }
    this.apiKey =  process.env.REACT_APP_API

  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
    .then(data => data.json()) 
    .then(data => {
      console.log(data);
      this.setState({movies: [...data.results], totalRes: data.total_results});
    })
  }

  handleChange =(e) => {
    this.setState({searchTerm: e.target.value});
    localStorage.setItem("movie", this.state.searchTerm);
  }

  nextPage = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`)
    .then(data => data.json())
    .then(data => {
      console.log(data)
      this.setState({movies: [...data.results], currentPage: pageNumber})
    })
  }

  viewMovieInfo = (id) => {
     const filtereMovies = this.state.movies.filter(movie => movie.id === id);
     const newCurrentMovie = filtereMovies.length > 0 ? filtereMovies[0] : null;
     this.setState({currentMovie: newCurrentMovie});
     localStorage.setItem("film", newCurrentMovie.id)
  }

  closeMovieInfo = () => {
    this.setState({currentMovie: null})
  }

  render () {
  const numberPages = Math.floor(this.state.totalRes /20);

    return (
      <div>
        <Nav />
        {
          this.state.currentMovie == null ? <div><Search handleSubmit={this.handleSubmit} handleChange={this.handleChange}/><MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies}/></div>  : 
          <MovieInfo closeMovieInfo={this.closeMovieInfo} currentMovie={this.state.currentMovie}/>
        }
          {this.state.totalRes > 20 && this.state.currentMovie== null ?  <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage}/> : ''}
   
       </div>
    )
  }
}

export default App;
