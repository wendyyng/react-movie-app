import './App.css';
import Header from './components/header/header.component'
import Navigation from './components/navigation/navigation-component';
import Trending from './pages/trending/trending';
import Movies from './pages/movies/movies';
import Tv from './pages/tv/tv';
import Search from './pages/search/search';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
     <BrowserRouter> 
     <Header />
        <div className="app">

              <Routes>
                <Route path="/" element={<Trending />} />
                <Route path="movies" element={<Movies />} />
                <Route path="tv" element={<Tv />} />
                <Route path="search" element={<Search />} />
              </Routes>

        </div>
         <Navigation />
    </BrowserRouter>
    </>

  );
}

export default App;
