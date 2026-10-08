import {useState,useEffect} from 'react'
import {UserRound, MapPin, Mail} from 'lucide-react'
import './StudentsPage.css'
function StudentsPage(){

    const [students,setStudents]=useState([])
    const [selectedClass,setSelectedClass]=useState(null)
    const [selectedStudent,setSelectedStudent]=useState(null)
    const fetchStudents=async ()=>{
        const response=await fetch('https://dummyjson.com/users')
        const data =await response.json()
        setStudents(data.users)
        console.log(data)
    }
    useEffect(()=>{
        fetchStudents()
    },[])
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
            
            <div className="students-page">
                <button className="back-button"
                    onClick={()=>setSelectedClass(null)}
                >
                     ← Back to Classes
                </button>
                <h1>{selectedClass}</h1>
                <div className="students-content">
                <div className="class-students-table">
                    
                        <table className="student-table" >
                            <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Student Passport</th>
                                <th><UserRound />Name</th>
                                <th><Mail />Email</th>
                                <th><MapPin />Address</th>
                            </tr>
                            </thead>
                            <tbody>
                                {classes[selectedClass].map((student, index)=>(
                            <tr key={student.id} onClick={()=>(setSelectedStudent(student))}>
                                <td>{index + 1}</td>
                                <td><img src={student.image} className="table-student-image" /></td>
                                <td>{student.lastName} {student.firstName}</td>
                                <td>{student.email}</td>
                                <td>{student.address.city},{student.address.state}</td>
                            </tr>
                            ))}
                            </tbody>
                        </table>
                </div>
                    {selectedStudent &&(
                        <div className="student-profile-card">
                            <button className="close-profile" onClick={()=>setSelectedStudent(null)}>X</button>
                            <img src={selectedStudent.image} className="table-student-image" />
                            <h2>{selectedStudent.lastName} {selectedStudent.firstName}</h2>
                            <p className="profile-id">Student ID:{selectedStudent.ip}</p>
                            <div className="profile-details">
                                <div>
                                    <span>Email</span>
                                    <p>{selectedStudent.email}</p>
                                </div>
                                <div>
                                    <span>Address</span>
                                    <p>{selectedStudent.address.city},{selectedStudent.address.state}</p>
                                </div>
                                <div>
                                    <span>Age</span>
                                    <p>{selectedStudent.age}</p>
                                </div>
                                <div>
                                    <span>Gender</span>
                                    <p>{selectedStudent.gender}</p>
                                </div>
                                <div>
                                    <span>Phone Number</span>
                                    <p>{selectedStudent.phone}</p>
                                </div>
                                <div>
                                    <span>Height</span>
                                    <p>{selectedStudent.height}</p>
                                </div>
                                <div>
                                    <span>Weight</span>
                                    <p>{selectedStudent.weight}</p>
                                </div>
                            </div>
                        </div>

                    )}
                    </div>
            </div>
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