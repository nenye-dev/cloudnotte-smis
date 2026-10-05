import {Routes,Route} from 'react-router';
import HomePage from './Components/Pages/HomePage';
import StudentsPage from './Components/Pages/StudentsPage'
import CoursesPage from './Components/Pages/CoursesPage'
import './App.css'

function App() {
  

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/students"element={<StudentsPage/>}/>
      <Route path="/courses" element={<CoursesPage />} />
      {/* <Route path="/about" element={<AboutPage />} />  */}
    </Routes>
  )
}

export default App
