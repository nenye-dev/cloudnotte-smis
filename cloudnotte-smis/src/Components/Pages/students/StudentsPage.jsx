import {useState,useEffect,useRef} from 'react'
import './StudentsPage.css'
import IndividualClassPage from './IndividualClassPage';
import axios from 'axios';
function StudentsPage(){

    const [students,setStudents]=useState([])
    const [selectedClass,setSelectedClass]=useState(null)
    const [selectedStudent,setSelectedStudent]=useState(null)
    const profileRef =useRef(null)
    const fetchStudents=async ()=>{
        const response=await axios.get('https://dummyjson.com/users')
        setStudents(response.data.users)
        console.log(response)
    }
    useEffect(()=>{
        fetchStudents()
    },[])
    useEffect(() => {
    if (selectedStudent && profileRef.current) {
        profileRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
}, [selectedStudent])

    const classes={
        "JSS 1" :students.slice(0,5),
        "JSS 2" :students.slice(5,12),
        "JSS 3" :students.slice(12,18),
        "SSS 1" :students.slice(18,23),
        "SSS 2" :students.slice(23,27),
        "SSS 3" :students.slice(27,30)
    }
    console.log(classes)
    if (selectedClass){
        return(
            <>
            
            <IndividualClassPage profileRef={profileRef} classes={classes} selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} selectedClass={selectedClass} setSelectedClass={setSelectedClass} />
            </>
        )
    }
    return(
        <>
        
        <div className="students-page">
            <h1>Students</h1>
                <section className="student-level">
                    <h2>Junior Students</h2>
                    <div className="class-list">
                        <div className="class-card" onClick={()=>setSelectedClass("JSS 1")}>
                            <h3>JSS 1</h3>
                        </div>
                        <div className="class-card"onClick={()=>setSelectedClass("JSS 2")}>
                            <h3>JSS 2</h3>
                        </div>
                        <div className="class-card" onClick={()=>setSelectedClass("JSS 3")}>
                            <h3>JSS 3</h3>
                        </div>
                    </div>
                </section>
                <section className="student-level">
                    <h2>Senior Students</h2>
                        <div className="class-list">
                            <div className="class-card" onClick={()=>setSelectedClass("SSS 1")}>
                                <h3>SSS 1</h3>
                            </div>
                            <div className="class-card" onClick={()=>setSelectedClass("SSS 2")}>
                                <h3>SSS 2</h3>
                            </div>
                            <div className="class-card" onClick={()=>setSelectedClass("SSS 3")}>
                                <h3>SSS 3</h3>
                            </div>
                        </div>
                </section>
        </div>
        </>
    )
}
export default StudentsPage