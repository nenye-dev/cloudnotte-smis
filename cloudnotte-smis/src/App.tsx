import {Routes,Route} from 'react-router';
import Layout from './Components/Layout.tsx';
import HomePage from './Components/Pages/home/HomePage';
import StudentsPage from './Components/Pages/students/StudentsPage'
import CoursesPage from './Components/Pages/courses/CoursesPage'
import AboutPage from './Components/Pages/about/AboutPage.tsx';
import NotFound from './Components/Pages/not found/NotFoundPage'
import './App.css'

function App() {
  

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/students" element={<StudentsPage/>}/>
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/about" element={<AboutPage />} /> 
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
