import { Link } from "react-router";

import "./HomePage.css";

type Student = {
  id: string | number;
  [key: string]: unknown;
};
type AddedStudentsByClass = Record<string, Student[]>;
function HomePage() {
  const totalStudents = (() => {
    const savedStudents = JSON.parse(
      localStorage.getItem("misStudents") || "[]",
    );

    const addedStudents = JSON.parse(
      localStorage.getItem("misAddedStudents") || "{}",
    );

    const deletedIds = JSON.parse(
      localStorage.getItem("misDeletedStudentIds") || "[]",
    );

    const allStudents = [
      ...savedStudents,
      ...Object.values(addedStudents).flat(),
    ];

    return allStudents.filter(
      (student, index, array) =>
        array.findIndex((item) => item.id === student.id) === index &&
        !deletedIds.includes(student.id),
    ).length;
  })();
  const savedStudents: Student[] = JSON.parse(
    localStorage.getItem("misStudents") || "[]",
  );

  const addedStudentsByClass: AddedStudentsByClass = JSON.parse(
    localStorage.getItem("misAddedStudents") || "{}",
  );

  const deletedStudentIds: (string | number)[] = JSON.parse(
    localStorage.getItem("misDeletedStudentIds") || "[]",
  );

  const juniorClasses = ["JSS 1", "JSS 2", "JSS 3"];
  const seniorClasses = ["SSS 1", "SSS 2", "SSS 3"];
  const baseStudentsByClass: Record<string, Student[]> = {
    "JSS 1": savedStudents.slice(0, 5),
    "JSS 2": savedStudents.slice(5, 12),
    "JSS 3": savedStudents.slice(12, 18),
    "SSS 1": savedStudents.slice(18, 23),
    "SSS 2": savedStudents.slice(23, 27),
    "SSS 3": savedStudents.slice(27, 30),
  };

  const juniorStudents = juniorClasses.reduce(
    (total, className) =>
      total +
      (savedStudents.length > 0
        ? (baseStudentsByClass[className] || []).filter(
            (student) => !deletedStudentIds.includes(student.id),
          ).length
        : 0) +
      (addedStudentsByClass[className] || []).filter(
        (student) => !deletedStudentIds.includes(student.id),
      ).length,
    0,
  );

  const seniorStudents = seniorClasses.reduce(
    (total, className) =>
      total +
      (savedStudents.length > 0
        ? (baseStudentsByClass[className] || []).filter(
            (student) => !deletedStudentIds.includes(student.id),
          ).length
        : 0) +
      (addedStudentsByClass[className] || []).filter(
        (student) => !deletedStudentIds.includes(student.id),
      ).length,
    0,
  );
  return (
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
              <p>
                Find courses offered by junior students such as
                Mathematics,English,Civic Education,CRS etc...
              </p>
            </div>
            <div className="course-card-home">
              <h3>Senior Courses</h3>
              <p>
                Find courses offered by senior students such as Biology,Further
                Mathematics,Literature,Mathematics etc...{" "}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default HomePage;
