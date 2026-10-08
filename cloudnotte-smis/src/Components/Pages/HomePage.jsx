import {Link} from 'react-router'
import {useState,useEffect} from 'react';

import './HomePage.css'


function HomePage(){
    const [students,setStudents] =useState([])
    useEffect(()=>{
    const fetchStudents = async ()=>{
        const response = await fetch('https://dummyjson.com/users')
        const data = await response.json()
        setStudents(data.users)
    }

    fetchStudents()
},[])
const totalStudents=students.length
const juniorStudents =students.slice(0,18).length
const seniorStudents =students.slice(18,30).length
    return(
        <>
        
        <div className="welcome-card">
           <h2> Welcome to the CloudNotte School Management Information System</h2>
        </div>
        <div className="body1">
            
            <section className="students-section">
                <div className="section-header">
                    <h2>Students</h2>
                    <Link to="/students">See all</Link>
                </div>
                <div className="total-students">
                    <h3>Total Students:</h3>
                    <p>{totalStudents}</p>
                </div>
                <div className="students-container">
                    <div className="students-card">
                        <h3>Junior Students</h3>
                        <p>Total:{juniorStudents}</p>
                    </div>
                    <div className="students-card">
                        <h3>Senior Students</h3>
                        <p>Total:{seniorStudents}</p>
                    </div>
                    
                </div>
            </section>
            <section className="courses-section">
            <div className="section-header">
                 <h2>Courses</h2>
                 <Link to="/courses">See all</Link>
            </div>
            <div className="courses-container-home">
                <div className="course-card-home">
                    <h3>Junior Courses</h3>
                    <p>Find courses offered by junior students such as Mathematics,English,Civic Education,CRS etc...</p>
                </div>
                 <div className="course-card-home">
                    <h3>Senior Courses</h3>
                    <p>Find courses offered by senior students such as Biology,Further Mathematics,Literature,Mathematics etc... </p>
                </div>
                
            </div>
            </section>
        </div>
        </>
    )
}
export default HomePage