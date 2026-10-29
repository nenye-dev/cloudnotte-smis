import type {
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from "react";

import type {
  Student,
  StudentFormData,
  NotificationData,
} from "./studentTypes";

import {X}from 'lucide-react';

type FormModalProps = {
  loading: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  studentToEdit: Student | null;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  formData: StudentFormData;
  imagePreview: string;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  notification: NotificationData | null;
};


function FormModal({loading,setShowModal,studentToEdit,handleSubmit,formData,imagePreview,handleChange,notification}:FormModalProps){
    return(
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
                {formData.image instanceof File && imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Student passport preview" />
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
    )
}
export default FormModal