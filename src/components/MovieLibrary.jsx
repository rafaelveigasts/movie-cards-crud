// implement MovieLibrary component here
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super();
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onBookmarkedChange = this.onBookmarkedChange.bind(this);
    this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onSearchTextChange({ target }) {
    const { movies, searchText } = this.state;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
      movies: movies.filter((element) => (
        element.title.includes(searchText)
        || element.subtitle.includes(searchText)
        || element.storyline.includes(searchText)
      )),
    });
  }

  onBookmarkedChange({ target }) {
    const { movies } = this.state;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const favorite = movies.filter((element) => element.bookmarked === true);
    if (target.checked) {
      this.setState({
        [name]: value,
        movies: favorite,
      });
    }
  }

  onSelectedGenreChange({ target }) {
    const { movies } = this.state;
    const { name, value } = target;
    const genre = movies.filter((element) => element.genre === value);
    this.setState({
      [name]: value,
      movies: genre,
    });
  }

  onClick(props) {
    const { movies } = this.state;
    const addMovie = [...movies, props];
    this.setState({
      movies: addMovie,
    });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre, movies } = this.state;
    return (
      <>
        <SearchBar
          searchText={ searchText }
          bookmarkedOnly={ bookmarkedOnly }
          selectedGenre={ selectedGenre }
          onSearchTextChange={ this.onSearchTextChange }
          onBookmarkedChange={ this.onBookmarkedChange }
          onSelectedGenreChange={ this.onSelectedGenreChange }
        />
        <MovieList movies={ movies } />
        <AddMovie onClick={ this.onClick } />
      </>
    );
  }
}
MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};
export default MovieLibrary;

/*
Requisito 15: criar um componente chamado movielibrary
criar um componente de classe
ele vai receber os filmes ent??o fazemos disso uma props
adicionamos o searchbar para renderizar passando os filmes
fazemos o proptype para valida????o
Requisito 17: ?? renderizar o searchBar dentro do movieLibrary
Refatorando:
adicionamos os estados iniciais para searchtext, bookmarkedonly e select genre
na barra de buscas passamos como props acima cada uma recebendo seu respectivo estado inicial.
validamos com proptype
Passamos props como par??metro do contructor
fazemos o bind do onsearch que estava faltando e fazemos a fun????o onsearch
a fun????o onsearch filtra os t??tulos de acordo com o par??metro searchtext
o onclick dela atualiza o estado
dentro do render searchbar utilizamos o onsearchtextchange como props passando a fun????o
addmovie no onlick atualiza o estado
validamos
Adivionamos duas fun????es
onBookmarkedChange uma vai lidar com o checkbox para filtrar o favorito
onselectedGenreChange vai exibir o g??nero selecionado
adicionamos as duas dentro do searchbar

Continua????o Requisito 14:
fazemos o bind do onlick aqui tamb??m
dentro do onsearchTextChange fazemos um filtro para movies, para que retorne algo
caso ele encontre algo no titulo, subtitulo ou sinopse
com isso atalizamos a fun????o onclick que recebe uma props como parametro
esse valor vai ser o que ser?? setado como o state atual em movies
e ser?? retornado

Requisito 18: fazemos mais um filtro para bookmarked, caso volte true
fazermos uma condi????o para definir o estado do movies para favorite
depois em onselectedgere change desestruturamos o estado do movies
e fazemos outro filtro pelo genero antes de setar o estado

Agradecimentos ao Ivanielson que me ajudou dos meus 55% adiante
*/
