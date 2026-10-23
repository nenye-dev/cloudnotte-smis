import { useState, useEffect } from "react";
import axios from "axios";
import {
  UserRound,
  Mail,
  MapPin,
  CirclePlus,
  X,
  Trash,
  SquarePen,
} from "lucide-react";
function IndividualClassPage({
  profileRef,
  classes,
  selectedStudent,
  setSelectedStudent,
  selectedClass,
  setSelectedClass,
  onStudentAdded,
  onStudentDeleted,
  onStudentUpdated,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const classStudents = classes[selectedClass] || [];
  const filteredStudents = classStudents.filter((student) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim()),
  );
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    city: "",
    state: "",
    height: "",
    weight: "",
    image: "",
  });
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: name === "image" ? files[0] : value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setNotification(null);
    // Check whether the email already exists
    const normalizedEmail = formData.email.trim().toLowerCase();

    const allStudents = Object.values(classes).flat();

    const emailExists = allStudents.some(
      (student) =>
        student.id !== studentToEdit?.id &&
        student.email?.trim().toLowerCase() === normalizedEmail,
    );

    if (emailExists) {
      setNotification({
        type: "error",
        message: "This email address is already registered to a student.",
      });
      return;
    }
    const namePattern = /^[a-zA-ZÀ-ÿ' -]+$/;
    const phonePattern = /^\+?[\d\s()-]{10,20}$/;

    if (
      !namePattern.test(formData.firstName.trim()) ||
      !namePattern.test(formData.lastName.trim())
    ) {
      setNotification({
        type: "error",
        message:
          "Names should contain only letters, spaces, hyphens or apostrophes.",
      });
      return;
    }

    const normalizedPhone = formData.phone.trim();
    const digitsOnly = normalizedPhone.replace(/\D/g, "");

    if (
      !phonePattern.test(normalizedPhone) ||
      digitsOnly.length < 10 ||
      digitsOnly.length > 15
    ) {
      setNotification({
        type: "error",
        message: "Enter a valid phone number containing 10–15 digits.",
      });
      return;
    }

    const age = Number(formData.age);
    const height = Number(formData.height);
    const weight = Number(formData.weight);

    if (
      formData.age.trim() === "" ||
      !Number.isInteger(age) ||
      age < 1 ||
      age > 100
    ) {
      setNotification({
        type: "error",
        message: "Age must be a whole number between 1 and 100.",
      });
      return;
    }

    if (
      formData.height.trim() === "" ||
      !Number.isFinite(height) ||
      height <= 0 ||
      height > 300
    ) {
      setNotification({
        type: "error",
        message: "Enter a height greater than 0 and no more than 300 cm.",
      });
      return;
    }

    if (
      formData.weight.trim() === "" ||
      !Number.isFinite(weight) ||
      weight <= 0 ||
      weight > 500
    ) {
      setNotification({
        type: "error",
        message: "Enter a weight greater than 0 and no more than 500 kg.",
      });
      return;
    }
    if (
      formData.image instanceof File &&
      !formData.image.type.startsWith("image/")
    ) {
      setNotification({
        type: "error",
        message: "Please upload a valid image file.",
      });
      return;
    }
    setLoading(true);

    const studentData = {
      studentId: studentToEdit
        ? studentToEdit.studentId || studentToEdit.id
        : `STU-${Date.now()}`,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      phone: formData.phone.trim(),
      height: Number(formData.height),
      weight: Number(formData.weight),
      address: {
        city: formData.city.trim(),
        state: formData.state.trim(),
      },
    };

    try {
      let response;

      if (studentToEdit) {
        // Update an existing student
        response = await axios.put(
          `https://dummyjson.com/users/${studentToEdit.id}`,
          studentData,
        );

        const updatedStudent = {
          ...studentToEdit,
          ...response.data,
          ...studentData,
          id: studentToEdit.id,
          address: studentData.address,
          image:
            formData.image instanceof File
              ? URL.createObjectURL(formData.image)
              : studentToEdit.image || "",
          isLocal: studentToEdit.isLocal || false,
        };

        onStudentUpdated(updatedStudent);

        setSelectedStudent(updatedStudent);

        setNotification({
          type: "success",
          message: "Student updated successfully!",
        });
      } else {
        // Add a new student
        response = await axios.post(
          "https://dummyjson.com/users/add",
          studentData,
        );

        const newStudent = {
          ...response.data,
          ...studentData,
          address: studentData.address,
          image:
            formData.image instanceof File
              ? URL.createObjectURL(formData.image)
              : response.data.image || "",
          id: response.data.id,
          isLocal: true,
        };

        onStudentAdded(newStudent, selectedClass);

        setNotification({
          type: "success",
          message: "Added successfully!",
        });
      }

      setShowModal(false);
      setStudentToEdit(null);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: "",
        phone: "",
        city: "",
        state: "",
        height: "",
        weight: "",
        image: "",
      });
    } catch (error) {
      console.error("Failed to save student:", error);

      setNotification({
        type: "error",
        message: studentToEdit
          ? "Failed to update student. Please try again."
          : "Failed to add student. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteStudent = (student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };
  const confirmAndDeleteStudent = async () => {
    if (!studentToDelete) return;

    await handleDeleteStudent(studentToDelete);

    setShowDeleteConfirm(false);
    setStudentToDelete(null);
  };
  const handleDeleteStudent = async (studentToDelete) => {
    try {
      if (!studentToDelete.isLocal) {
        await axios.delete(`https://dummyjson.com/users/${studentToDelete.id}`);
      }
      onStudentDeleted(studentToDelete.id);
      setSelectedStudent(null);
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
      setNotification({
        type: "success",
        message: "Student deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete student:", error);
      setNotification({
        type: "error",
        message: "Failed to delete student. Please try again.",
      });
    }
  };
  const handleEditStudent = async (studentToEdit) => {
    setNotification(null);
    setStudentToEdit(studentToEdit);

    setFormData({
      firstName: studentToEdit.firstName || "",
      lastName: studentToEdit.lastName || "",
      email: studentToEdit.email || "",
      age: String(studentToEdit.age ?? ""),
      gender: studentToEdit.gender || "",
      phone: studentToEdit.phone || "",
      city: studentToEdit.address?.city || "",
      state: studentToEdit.address?.state || "",
      height: String(studentToEdit.height ?? ""),
      weight: String(studentToEdit.weight ?? ""),
      image: studentToEdit.image || "",
    });
    setShowModal(true);
  };
  return (
    <div className="students-page">
      <button
        className="back-button"
        onClick={() => {
          setSelectedStudent(null);
          setSelectedClass(null);
        }}
      >
        ← Back to Classes
      </button>
      <div className="head1">
        <h1>{selectedClass}</h1>
        <button
          className="add-student-button"
          onClick={() => {
            setNotification(null);
            setStudentToEdit(null);
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              age: "",
              gender: "",
              phone: "",
              city: "",
              state: "",
              height: "",
              weight: "",
              image: "",
            });
            setShowModal(true);
          }}
        >
          <CirclePlus />
          Add New Student
        </button>
      </div>
      {notification && (
        <div
          className={`notification ${notification.type}`}
          role={notification.type === "error" ? "alert" : "status"}
        >
          {notification.message}
        </div>
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search students by name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
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
                      <img
                        src={student.image}
                        className="table-student-image"
                        alt="Student passport"
                      />
                    </td>
                    <td>
                      {student.lastName} {student.firstName}
                    </td>
                    <td>{student.email}</td>
                    <td>
                      {student.address.city},{student.address.state}
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
            <img src={selectedStudent.image} className="profile-image" />
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
                  {selectedStudent.address.city},{selectedStudent.address.state}
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
      {showModal && (
        <div
          className="modal-overlay"
          onClick={() => !loading && setShowModal(false)}
        >
          <div
            className="student-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{studentToEdit ? "EditStudent" : "Add New Student"}</h2>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={loading}
                aria-label="Close form"
              >
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {formData.image instanceof File && (
                  <div className="image-preview">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Student passport preview"
                    />
                  </div>
                )}

                <label className="image-upload-field">
                  Student Passport
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  minLength={2}
                />

                <input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  minLength={2}
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone:+[---] [---] [---] [----]"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[\+]?[0-9\s()\-]{10,20}"
                  title="Enter a phone number containing 10–15 digits, optionally with spaces or a leading +."
                  required
                />

                <input
                  name="age"
                  type="number"
                  placeholder="Age"
                  min="1"
                  max="100"
                  step="1"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>

                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  minLength={2}
                />

                <input
                  name="state"
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  minLength={2}
                />

                <input
                  name="height"
                  type="number"
                  placeholder="Height (cm)"
                  min="1"
                  max="300"
                  step="any"
                  value={formData.height}
                  onChange={handleChange}
                  required
                />

                <input
                  name="weight"
                  type="number"
                  placeholder="Weight (kg)"
                  min="1"
                  max="500"
                  step="any"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              {notification?.type === "error" && (
                <p className="form-error" role="alert">
                  {notification.message}
                </p>
              )}

              <button type="submit" className="done-button" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loader" />
                    {studentToEdit
                      ? "Updating student details..."
                      : "Adding student"}
                  </>
                ) : (
                  "Done"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && studentToDelete && (
        <div className="delete-confirm-overlay">
          <div
            className="delete-confirm-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="delete-warning-icon">
              <Trash size={26} />
            </div>

            <h2>Delete Student?</h2>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {studentToDelete.firstName} {studentToDelete.lastName}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="delete-confirm-actions">
              <button
                type="button"
                className="cancel-delete"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setStudentToDelete(null);
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-delete"
                onClick={confirmAndDeleteStudent}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default IndividualClassPage;
