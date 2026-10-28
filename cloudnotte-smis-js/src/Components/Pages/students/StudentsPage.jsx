import { useState, useEffect, useRef } from "react";
import "./StudentsPage.css";
import IndividualClassPage from "./IndividualClassPage";
import axios from "axios";
function readFromStorage(key, fallback) {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : fallback;
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return fallback;
  }
}
function StudentsPage() {
  const [students, setStudents] = useState(() =>
    readFromStorage("misStudents", []),
  );
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [addedStudentsByClass, setAddedStudentsByClass] = useState(() =>
    readFromStorage("misAddedStudents", {}),
  );
  const [deletedStudentIds, setDeletedStudentIds] = useState(() =>
    readFromStorage("misDeletedStudentIds", []),
  );
  const handleStudentDeleted = (studentId) => {
    setDeletedStudentIds((previous) =>
      previous.includes(studentId) ? previous : [...previous, studentId],
    );

    setAddedStudentsByClass((previous) => {
      const updated = {};

      Object.keys(previous).forEach((className) => {
        updated[className] = previous[className].filter(
          (student) => student.id !== studentId,
        );
      });

      return updated;
    });
  };

  const profileRef = useRef(null);
  const fetchStudents = async () => {
    const response = await axios.get("https://dummyjson.com/users");
    setStudents(response.data.users);
    console.log(response);
  };
  useEffect(() => {
    if (students.length === 0) {
      fetchStudents();
    }
  }, [students.length]);
  useEffect(() => {
    localStorage.setItem("misStudents", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(
      "misAddedStudents",
      JSON.stringify(addedStudentsByClass),
    );
  }, [addedStudentsByClass]);

  useEffect(() => {
    localStorage.setItem(
      "misDeletedStudentIds",
      JSON.stringify(deletedStudentIds),
    );
  }, [deletedStudentIds]);
  useEffect(() => {
    if (selectedStudent && profileRef.current) {
      profileRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedStudent]);

  const classes = {
    "JSS 1": students.slice(0, 5),
    "JSS 2": students.slice(5, 12),
    "JSS 3": students.slice(12, 18),
    "SSS 1": students.slice(18, 23),
    "SSS 2": students.slice(23, 27),
    "SSS 3": students.slice(27, 30),
  };
  console.log(classes);
  Object.keys(classes).forEach((className) => {
    classes[className] = [
      ...classes[className],
      ...(addedStudentsByClass[className] || []),
    ];
  });
  Object.keys(classes).forEach((className) => {
    classes[className] = classes[className].filter(
      (student) => !deletedStudentIds.includes(student.id),
    );
  });
  const handleStudentAdded = (newStudent, className) => {
    setAddedStudentsByClass((previous) => {
      const updated = {
        ...previous,
        [className]: [...(previous[className] || []), newStudent],
      };

      console.log("Students added to class:", updated[className]);

      return updated;
    });
  };

  const handleStudentUpdated = (updatedStudent) => {
    setStudents((previous) =>
      previous.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student,
      ),
    );

    setAddedStudentsByClass((previous) => {
      const updated = {};

      Object.keys(previous).forEach((className) => {
        updated[className] = previous[className].map((student) =>
          student.id === updatedStudent.id ? updatedStudent : student,
        );
      });

      return updated;
    });
  };
  if (selectedClass) {
    return (
      <>
        <IndividualClassPage
          profileRef={profileRef}
          classes={classes}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          onStudentAdded={handleStudentAdded}
          onStudentDeleted={handleStudentDeleted}
          onStudentUpdated={handleStudentUpdated}
        />
      </>
    );
  }
  return (
    <>
      <div className="students-page">
        <h1>Students</h1>
        <section className="student-level">
          <h2>Junior Students</h2>
          <div className="class-list">
            <div
              className="class-card"
              onClick={() => setSelectedClass("JSS 1")}
            >
              <h3>JSS 1</h3>
            </div>
            <div
              className="class-card"
              onClick={() => setSelectedClass("JSS 2")}
            >
              <h3>JSS 2</h3>
            </div>
            <div
              className="class-card"
              onClick={() => setSelectedClass("JSS 3")}
            >
              <h3>JSS 3</h3>
            </div>
          </div>
        </section>
        <section className="student-level">
          <h2>Senior Students</h2>
          <div className="class-list">
            <div
              className="class-card"
              onClick={() => setSelectedClass("SSS 1")}
            >
              <h3>SSS 1</h3>
            </div>
            <div
              className="class-card"
              onClick={() => setSelectedClass("SSS 2")}
            >
              <h3>SSS 2</h3>
            </div>
            <div
              className="class-card"
              onClick={() => setSelectedClass("SSS 3")}
            >
              <h3>SSS 3</h3>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default StudentsPage;
