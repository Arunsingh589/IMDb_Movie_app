import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Hero from "./components/Hero"
import MovieList from "./components/MovieList"
import Navbar from "./components/Navbar"
import CelebrityGallery from "./components/CelebrityGallery"
import TopPicks from "./components/Top-Picks"
import Videos from "./components/Videos"
import MovieDetail from "./components/MovieDetail"
// import TvShowDetails from "./components/TvShowDetails"
import SearchResults from "./components/SearchResults"
import PersonDetail from "./components/PersonDetail"
import StreamingSection from "./components/Streaming"
// import MovieCard from "./components/MovieCard"
import Footer from "./components/Footer"
// import SignInPage from "./components/Signup"
// import { SignIn } from "phosphor-react"
import CreateAccountPage from "./components/CreateAccount"
import SignUpPage from "./components/Signup"
import SignInPage from "./components/SignInPage"
// import VideoList from "./components/VideoList"
import MovieVideos from "./components/VideoList"
import MobileNavigation from "./components/MobileNav/MobileNavigation"
import TvShows from "./components/MobileNav/TvShow"
import TvShowDetail from "./components/TvShowDetails"

function HomePageComponents() {
  return (
    <>
      <CelebrityGallery />
      <TopPicks />
      <Videos />
      <StreamingSection />
      {/* <MovieVideos movieId={550} /> */}
      <Footer />
    </>
  )
}

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="movies/:type" element={<MovieList />} />
        <Route path="/search/:searchTerm" element={<SearchResults />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="tv/:id" element={<TvShowDetail />} />
        <Route path="/person/:id" element={<PersonDetail />} />
        <Route path="/signuppage" element={< SignUpPage />} />
        <Route path="/signin" element={< SignInPage />} />
        <Route path="/create-account" element={< CreateAccountPage />} />
        <Route path="/tv" element={<TvShows />} />



      </Routes>
      {location.pathname === "/" && <HomePageComponents />

      }
      <MobileNavigation />

    </>
  )
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
