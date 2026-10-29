import { it, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { createRef } from "react";
import IndividualClassPage from "./IndividualClassPage";
import axios from "axios";
import type { FormEvent, ChangeEvent } from "react";
import type { StudentFormData } from "./studentTypes";

type FirstPartMockProps = {
  setShowModal: (show: boolean) => void;
};

type FormModalMockProps = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  formData: StudentFormData;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

vi.mock("axios");

vi.mock("./FirstPart", () => ({
  default: ({ setShowModal }:FirstPartMockProps) => (
    <button onClick={() => setShowModal(true)}>Add student</button>
  ),
}));

vi.mock("./FormModal", () => ({
  default: ({ handleSubmit, formData, handleChange }:FormModalMockProps) => (
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
        name="age"
        aria-label="age"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        name="weight"
        aria-label="weight"
        value={formData.weight}
        onChange={handleChange}
      />
      <input
        name="height"
        aria-label="height"
        value={formData.height}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  ),
}));

describe("Student form validation", () => {
  it("rejects names containing numbers", async () => {
    render(
      <IndividualClassPage
       profileRef={createRef<HTMLDivElement>()}
        classes={{
          "JSS 1": [],
          "JSS 2": [],
          "JSS 3": [],
          "SSS 1": [],
          "SSS 2": [],
          "SSS 3": [],
        }}
        selectedClass="JSS 1"
        selectedStudent={null}
        setSelectedStudent={vi.fn()}
        setSelectedClass={vi.fn()}
        onStudentAdded={vi.fn()}
        onStudentDeleted={vi.fn()}
        onStudentUpdated={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /add student/i }));
    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { name: "firstName", value: "John123" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { name: "lastName", value: "Smith" },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { name: "age", value: "12" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(axios.post).not.toHaveBeenCalled();
  });
});
