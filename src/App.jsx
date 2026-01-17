import Navbar from "./components/Navbar"
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import DisclaimerPage from "./pages/DisclaimerPage"
import Services from "./pages/Services"
import Programs from "./pages/Programs"


function App() {
  useEffect(() => {
    AOS.init();
  },
   [])
     useEffect(() => {
    if(isLoading){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    },3000); 

    return () => clearTimeout(timer);
    }
 }, [isLoading]);


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} /> 
        <Route path="/service" element={<Services />} />
        <Route path="/programs" element={<Programs />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App