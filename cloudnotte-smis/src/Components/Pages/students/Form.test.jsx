import { it,expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import IndividualClassPage from "./IndividualClassPage";
import axios from 'axios';

vi.mock('axios');

vi.mock("./FirstPart", () => ({
  default: ({ setShowModal }) => (
    <button onClick={() => setShowModal(true)}>Add student</button>
  ),
}));

vi.mock("./FormModal", () => ({
  default: ({ handleSubmit, formData, handleChange }) => (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        aria-label="First name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        aria-label="Last name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        name="email"
        aria-label="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="phone"
        aria-label="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        name="Age"
        aria-label="age"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        name="Weight"
        aria-label="weight"
        value={formData.weight}
        onChange={handleChange}
      />
      <input
        name="Height"
        aria-label="height"
        value={formData.height}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  ),
}));

describe('Student form validation',()=>{
    it('rejects names containing numbers',async()=>{
        render(
            <IndividualClassPage
            classes={{ 'JSS 1': [] }}
        selectedClass="JSS 1"
        selectedStudent={null}
        setSelectedStudent={vi.fn()}
        setSelectedClass={vi.fn()}
        onStudentAdded={vi.fn()}
        onStudentDeleted={vi.fn()}
        onStudentUpdated={vi.fn()}
      />
    );
        fireEvent.click(screen.getByRole('button',{name:/add student/i}));
        fireEvent.change(screen.getByLabelText(/first name/i),{
            target:{name:'firstName', value:'John123'}
        });
        fireEvent.change(screen.getByLabelText(/last name/i),{
            target:{name:'lastName',value:'Smith'}
        });
        fireEvent.change(screen.getByLabelText(/age/i),{
          target:{name:'age',value:'c'}
        })
        fireEvent.click(screen.getByRole('button',{name:/submit/i}));
        expect(axios.post).not.toHaveBeenCalled();
    })
})
