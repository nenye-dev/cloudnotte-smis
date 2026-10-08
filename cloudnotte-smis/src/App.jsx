import {Routes,Route} from 'react-router';
import Layout from './Components/Layout';
import HomePage from './Components/Pages/HomePage';
import StudentsPage from './Components/Pages/StudentsPage'
import CoursesPage from './Components/Pages/CoursesPage'
import AboutPage from './Components/Pages/AboutPage'
import './App.css'

function App() {
  

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/students"element={<StudentsPage/>}/>
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/about" element={<AboutPage />} /> 
      </Route>
    </Routes>
  )
}

export default App
