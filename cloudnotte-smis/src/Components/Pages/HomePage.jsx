import {Link} from 'react-router'
import Header from '../Header'
import './HomePage.css'

function HomePage(){
    return(
        <>
        <Header />
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
                    <p>450</p>
                </div>
                <div className="students-container">
                    <div className="students-card">
                        <h3>Student 1</h3>
                    </div>
                    <div className="students-card">
                        <h3>Student 2</h3>
                    </div>
                    <div className="students-card">
                        <h3>Student 3</h3>
                    </div>
                </div>
            </section>
            <section className="courses-section">
            <div className="section-header">
                 <h2>Courses</h2>
                 <Link to="/courses">See all</Link>
            </div>
            <div className="courses-container">
                <div className="course-card">
                    <h3>Course 1</h3>
                </div>
                 <div className="course-card">
                    <h3>Course 2</h3>
                </div>
                 <div className="course-card">
                    <h3>Course 3</h3>
                </div>
            </div>
            </section>
        </div>
        </>
    )
}
export default HomePage