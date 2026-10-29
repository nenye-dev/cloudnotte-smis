import { UserRound, Mail, MapPin, SquarePen, Trash } from "lucide-react";
import type {RefObject} from 'react';
import type {Student} from './studentTypes';
type StudentTableProps={
  filteredStudents:Student[];
  setSelectedStudent:(student:Student | null)=>void;
  confirmDeleteStudent:(student:Student)=>void;
  selectedStudent:Student | null;
  handleEditStudent:(student :Student)=>void;
  profileRef:RefObject<HTMLDivElement | null>;
}
function StudentTable({
  filteredStudents,
  setSelectedStudent,
  confirmDeleteStudent,
  selectedStudent,
  handleEditStudent,
  profileRef,
}:StudentTableProps) {
  return (
    <div className="students-content">
      <div className="class-students-table">
        <table className="student-table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Student Passport</th>
              <th>
                <UserRound />
                Name
              </th>
              <th>
                <Mail />
                Email
              </th>
              <th>
                <MapPin />
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                >
                  <td>{index + 1}</td>
                  <td>
                    {student.image && !student.image.startsWith("blob:") ? (
                      <img
                        src={student.image}
                        className="table-student-image"
                        alt="Student passport"
                      />
                    ) : (
                      <div className="table-student-image image-placeholder">
                        No image
                      </div>
                    )}
                  </td>
                  <td>
                    {student.lastName} {student.firstName}
                  </td>
                  <td>{student.email}</td>
                  <td>
                    {student.address?.city},{student.address?.state}
                  </td>
                  <td>
                    <button
                      className="delete-icon"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        confirmDeleteStudent(student);
                      }}
                      aria-label={`Delete ${student.firstName} ${student.lastName}`}
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedStudent && (
        <div className="student-profile-card" ref={profileRef}>
          <button
            className="edit-button"
            type="button"
            onClick={() => handleEditStudent(selectedStudent)}
            aria-label="Edit-student"
          >
            <SquarePen />
          </button>
          <button
            className="close-profile"
            onClick={() => setSelectedStudent(null)}
          >
            X
          </button>
          {selectedStudent.image &&
          !selectedStudent.image.startsWith("blob:") ? (
            <img
              src={selectedStudent.image}
              className="profile-image"
              alt="Student passport"
            />
          ) : (
            <div className="profile-image image-placeholder">No image</div>
          )}
          <h2>
            {selectedStudent.lastName} {selectedStudent.firstName}
          </h2>
          <p className="profile-id">
            Student ID:{selectedStudent.studentId || selectedStudent.id}
          </p>
          <div className="profile-details">
            <div>
              <span>Email</span>
              <p>{selectedStudent.email}</p>
            </div>
            <div>
              <span>Address</span>
              <p>
                {selectedStudent.address?.city},{selectedStudent.address?.state}
              </p>
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
            <button
              className="delete-record"
              type="button"
              onClick={() => confirmDeleteStudent(selectedStudent)}
            >
              Delete Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default StudentTable;
