import {useState,useEffect} from 'react';
import {UserRound,MapPin,Mail} from 'lucide-react'
import Header from '../Header'
import SearchInput from '../SearchInput'
import './StudentsPage.css'

function StudentsPage(){
    const[searchText,setSearchText]=useState('')
    const [students,setStudents]=useState([]);
     const fetchStudents = async () => {
        const response=await fetch('https://dummyjson.com/users')
        const data=await response.json();
        console.log(data);
        setStudents(data.users);
     };
     useEffect(()=>{
        fetchStudents();
     },[])
    //  useEffect(()=>{
    //     localStorage.setItem('searchText',searchText);
    //  },[searchText])
     const filteredStudents = students.filter((student) => {
        const matchesUsername = student.username
            .toLowerCase()
            .includes(searchText.toLowerCase());
            return matchesUsername
     })
    return(
        <>
        <Header />
        <SearchInput
        searchText={searchText}
        setSearchText={setSearchText} 
        />
        <div className="students-container">
            {filteredStudents.map((student)=>(
                <div className="students-card" key={student.id}>
                    <img src={student.image} className="student-image" />
                    <div className="student-description">
                        <h3>{student.firstName} {student.lastName}</h3>
                        <p><UserRound className="icon" />@{student.username}</p>
                        <p><Mail className="icon" />{student.email}</p>
                        <p><MapPin className="icon" />{student.address.city}</p>
                    </div>
                </div>
             ))}
                   
        </div>
        </>
    )
}
export default StudentsPage