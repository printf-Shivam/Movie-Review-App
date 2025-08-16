import './App.css'
import api from "./api/axiosConfig"
import { useState, useEffect } from 'react'
import Layout from "./components/Layout.jsx"
import {Route, Routes} from "react-router-dom"
import Home from "./components/Home.jsx"
import Header from "./components/Header.jsx"
import Trailer from './components/Trailer.jsx'
import WatchList from './components/WatchList.jsx'
import Reviews from './components/Reviews.jsx'

function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies= async() =>{
    try {
      
      const response = await api.get("api/v1/movies");
      setMovies(response.data);

    } catch (error) {
      console.log("Error in getMovies method"+ error);
    }
  }

  const getMovieData = async (movieId) => {
    try 
    {
        const response = await api.get(`/api/v1/movies/${movieId}`);
        const singleMovie = response.data;

        setMovie(singleMovie);
        setReviews(singleMovie.reviews);
    } 
    catch (error) 
    {
      console.error(error);
    }
  }


  useEffect(()=>{ // getMovie function always runs when app component loads 
    getMovies();
  },[])

  return (
    <>
      <div className='App'>
        <Header/>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Home movies={movies}/>} />
            <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
            <Route path="/watchList" element={<WatchList />} />
            <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>

          </Route>
        </Routes>

        </div>
    </>
  )
}

export default App
