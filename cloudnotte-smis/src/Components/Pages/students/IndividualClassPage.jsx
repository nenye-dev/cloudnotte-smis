import {useState} from 'react';
import {UserRound,Mail,MapPin} from 'lucide-react';
function IndividualClassPage({profileRef,classes,selectedStudent,setSelectedStudent,selectedClass,setSelectedClass}){
    const [searchTerm, setSearchTerm] = useState('');
    const classStudents=classes[selectedClass] || [];
    const filteredStudents=classStudents.filter((student)=>
    `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim())

)
    return(
        <div className="students-page">
                <button className="back-button"
                    onClick={()=>{
                        setSelectedStudent(null)
                        setSelectedClass(null)
                    }}
                >
                     ← Back to Classes
                </button>
                <h1>{selectedClass}</h1>
                <div  className="search-bar">
                <input 
                type="text"
                
                placeholder="Search students by name"
                value={searchTerm}
                onChange={(event)=> setSearchTerm(event.target.value)}
                 />
                 </div>
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
                                {filteredStudents.length>0? (
                                 filteredStudents.map((student, index)=>(
                            <tr key={student.id} onClick={()=>(setSelectedStudent(student))}>
                                <td>{index + 1}</td>
                                <td><img src={student.image} className="table-student-image" /></td>
                                <td>{student.lastName} {student.firstName}</td>
                                <td>{student.email}</td>
                                <td>{student.address.city},{student.address.state}</td>
                            </tr>
                            ))
                        ) : (
                                <tr>
                                    <td colspan="5">No students found.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                </div>
                    {selectedStudent &&(
                        <div className="student-profile-card" ref={profileRef}>
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

    )
}
export default IndividualClassPage;