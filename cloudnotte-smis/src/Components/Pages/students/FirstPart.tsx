import {CirclePlus} from 'lucide-react';
import type { Dispatch, SetStateAction } from "react";

import type {
  Student,
  StudentFormData,
  NotificationData,
  ClassName,
} from "./studentTypes";


type FirstPartProps = {
  selectedClass: ClassName;
  setNotification: Dispatch<SetStateAction<NotificationData | null>>;
  setStudentToEdit: Dispatch<SetStateAction<Student | null>>;
  setFormData: Dispatch<SetStateAction<StudentFormData>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

function FirstPart({selectedClass,setNotification,setStudentToEdit,setFormData,setShowModal}:FirstPartProps){
    return(
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
              department: "",
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
    )
}
export default FirstPart