import {CirclePlus} from 'lucide-react';
function FirstPart({selectedClass,setNotification,setStudentToEdit,setFormData,setShowModal}){
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