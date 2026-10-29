import {Trash} from 'lucide-react';
import type { Dispatch, SetStateAction } from "react";
import type { Student } from "./studentTypes";


type DeleteModalProps = {
  studentToDelete: Student;
  setShowDeleteConfirm: Dispatch<SetStateAction<boolean>>;
  setStudentToDelete: Dispatch<SetStateAction<Student | null>>;
  confirmAndDeleteStudent: () => Promise<void>;
};

function DeleteModal({studentToDelete,setShowDeleteConfirm,setStudentToDelete,confirmAndDeleteStudent}:DeleteModalProps){
    return(
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
    )
}
export default DeleteModal