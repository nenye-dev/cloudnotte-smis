import { useState, useEffect } from "react";
import type{
  ChangeEvent,
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
}from 'react';
import axios from "axios";
import StudentTable from "./StudentTable.tsx";
import FirstPart from "./FirstPart.tsx";
import SearchBar from "./SearchBar.tsx";
import Notification from "./Notification.tsx";
import FormModal from "./FormModal.tsx";
import DeleteModal from "./DeleteModal.tsx";
import type{
  Student,
  StudentFormData,
  NotificationData,
  ClassName,
  StudentsByClass,
} from './studentTypes'




 type IndividualClassPageProps={
  profileRef:RefObject<HTMLDivElement | null>;
  classes:StudentsByClass;
  selectedStudent:Student | null;
  setSelectedStudent:Dispatch<SetStateAction<Student| null>>;
  selectedClass:ClassName;
  setSelectedClass:Dispatch<SetStateAction<ClassName |null>>;
  onStudentAdded:(student:Student, className:ClassName)=>void;
  onStudentDeleted:(studentId:string |number)=>void;
  onStudentUpdated:(student:Student)=>void;
 }

function convertImageToBase64(file:File) :Promise<string>{
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if(typeof reader.result==="string"){
        resolve(reader.result);
      }else{
        reject(new Error("Could not convert image to Base64."));
      }
    };
    reader.onerror = () => reject(reader.error);

    reader.readAsDataURL(file);
  });
}

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
}:IndividualClassPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const classStudents = classes[selectedClass] || [];
  const filteredStudents = classStudents.filter((student) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim()),
  );
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationData |null>(null);
  useEffect(() => {
    if (!notification) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
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
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (!(formData.image instanceof File)) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(formData.image);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [formData.image]);
  const handleChange = (
    event:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, } = event.target;
    const file=
    event.target instanceof HTMLInputElement
    ? event.target.files?.[0]
    :undefined;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "image" ? file ?? value: value,
    }));
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      let responseData: Partial<Student> = {};

      if (studentToEdit) {
        // Update an existing student
        if (!studentToEdit.isLocal) {
          const response = await axios.put<Partial<Student>>(
            `https://dummyjson.com/users/${studentToEdit.id}`,
            studentData,
          );
          responseData=response.data
        } else {
          // Locally added students do not need an API request
          responseData = studentData;
        }

        let image = studentToEdit.image || "";

        if (formData.image instanceof File) {
          image = await convertImageToBase64(formData.image);
        }

        const updatedStudent = {
          ...studentToEdit,
          ...responseData,
          ...studentData,
          id: studentToEdit.id,
          address: studentData.address,
          image,
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
       const response = await axios.post<Student>(
          "https://dummyjson.com/users/add",
          studentData,
        );
        responseData=response.data;

        let image = responseData.image || "";

        if (formData.image instanceof File) {
          image = await convertImageToBase64(formData.image);
        }

        const newStudent = {
          ...response.data,
          ...studentData,
          address: studentData.address,
          image,
          id: `local-${Date.now()}`,
          isLocal: true,
        };

        onStudentAdded(newStudent, selectedClass);
        console.log("New student:", newStudent);
        console.log("Class selected:", selectedClass);

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

  const confirmDeleteStudent = (student:Student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };
  const confirmAndDeleteStudent = async():Promise<void> => {
    if (!studentToDelete) return;

    await handleDeleteStudent(studentToDelete);

    setShowDeleteConfirm(false);
    setStudentToDelete(null);
  };
  const handleDeleteStudent = async (studentToDelete:Student,):Promise<void> => {
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
  const handleEditStudent = async (studentToEdit:Student) => {
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
      <FirstPart
        selectedClass={selectedClass}
        setNotification={setNotification}
        setStudentToEdit={setStudentToEdit}
        setFormData={setFormData}
        setShowModal={setShowModal}
      />
      {notification && <Notification notification={notification} />}

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <StudentTable
        filteredStudents={filteredStudents}
        setSelectedStudent={setSelectedStudent}
        confirmDeleteStudent={confirmDeleteStudent}
        selectedStudent={selectedStudent}
        handleEditStudent={handleEditStudent}
        profileRef={profileRef}
      />
      {showModal && (
        <FormModal
          loading={loading}
          setShowModal={setShowModal}
          studentToEdit={studentToEdit}
          handleSubmit={handleSubmit}
          formData={formData}
          imagePreview={imagePreview}
          handleChange={handleChange}
          notification={notification}
        />
      )}

      {showDeleteConfirm && studentToDelete && (
        <DeleteModal
          studentToDelete={studentToDelete}
          setShowDeleteConfirm={setShowDeleteConfirm}
          setStudentToDelete={setStudentToDelete}
          confirmAndDeleteStudent={confirmAndDeleteStudent}
        />
      )}
    </div>
  );
}
export default IndividualClassPage;
