import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Contextpage = createContext();

export function MovieProvider({ children }) {

  const [header, setHeader] = useState("Trending");
  const [totalPage, setTotalPage] = useState(null)
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([])
  const [loader, setLoader] = useState(true);
  const [backgenre, setBackGenre] = useState(false);
  const navigate = useNavigate();// =====> navigate page

  const APIKEY = "091b3c1f69150c7277e01792c93058b9";


  //used for pagination
  useEffect(() => {
    if (page < 1) {
      setPage(1)  
    }
  }, [page]);


  //filtering Genre movies
  const filteredGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${activegenre}&api_key=${APIKEY}&with_origin_country=IN&page=${page}`
    );
    const filteredGenre = await data.json();
    setMovies(movies.concat(filteredGenre.results)); 
    setTotalPage(filteredGenre.total_pages);
    setLoader(false);
    setHeader("Genres");
  };

  //Search movies
  const fetchSearch = async (query) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&with_origin_country=IN&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const searchmovies = await data.json();
    setSearchedMovies(searchmovies.results); 
    setLoader(false);
    setHeader(`Results for "${query}"`);
  }

  // <===== Gener movies fetching ===>
  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&with_origin_country=IN&language=en-US`
    );
    const gen = await data.json();
    setGenres(gen.genres);
  }

  // <===== Tranding movies fetching ===>
  const fetchTrending = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&with_origin_country=IN&page=${page}`
    );
    const trend = await data.json();
    setTrending(trending.concat(trend.results));
    setTotalPage(trend.total_pages);
    setLoader(false);
    setHeader("Trending Movies");
  }

  // <===== upcoming movies fetching ===>
  const fetchUpcoming = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&with_origin_country=IN&language=en-US&page=${page}`
    );
    const upc = await data.json();
    setUpcoming(upcoming.concat(upc.results));
    setTotalPage(upc.total_pages);
    setLoader(false);
    setHeader("Upcoming Movies");
  }


  
  // <==========================================================>

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        setGenres,
        filteredGenre,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        activegenre,
        setActiveGenre,
        fetchSearch,
        loader,
        setBackGenre,
        backgenre,
        setLoader,
        fetchTrending,
        trending,
        fetchUpcoming,
        upcoming,
        totalPage,
        searchedMovies,
      }}
    >
      {children}
    </Contextpage.Provider>
  );

}

export default Contextpage
