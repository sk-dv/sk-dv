import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './theme'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import About from './pages/About'
import GalaxyPage from './pages/GalaxyPage'
import TreePage from './pages/Tree/TreePage'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <div className="h-full w-full bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 transition-colors">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/galaxy" element={<GalaxyPage />} />
            <Route path="/tree" element={<TreePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}
