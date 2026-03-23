import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import DigitalTech from './pages/DigitalTech'
import LLMs from './pages/LLMs'
import Interactive from './pages/Interactive'
import BestPractices from './pages/BestPractices'
import FunFacts from './pages/FunFacts'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/digital-technologies" element={<DigitalTech />} />
        <Route path="/large-language-models" element={<LLMs />} />
        <Route path="/interactive" element={<Interactive />} />
        <Route path="/best-practices" element={<BestPractices />} />
        <Route path="/fun-facts" element={<FunFacts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
