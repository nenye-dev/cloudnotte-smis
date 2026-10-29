import { it, expect, describe, vi } from "vitest";
import { render, screen, within, waitFor } from "@testing-library/react";
import { createRef } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Student } from "./studentTypes";
import StudentTable from "./StudentTable";
import StudentsPage from "./StudentsPage";


vi.mock("axios");
describe("Student table", () => {
  it("fetches from the api", async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: {
        users: [],
      },
    } as AxiosResponse);
    render(<StudentsPage />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("https://dummyjson.com/users");
    });
  });
  it("displays the student table with appropriate information", async () => {
    const mockStudents :Student[]= [
      {
        id: 1,
        firstName: "Student1",
        lastName: "Test",
        email: "Student1@example.com",
        age: 20,
        gender: "female",
        phone: "09104293084",
        image: "https://example.com/student.jpg",
        address: {
          city: "Lagos",
          state: "Lagos",
        },
      },
    ];

    render(<StudentTable  
    filteredStudents={mockStudents}
    selectedStudent={null}
    setSelectedStudent={vi.fn()}
    confirmDeleteStudent={vi.fn()}
    handleEditStudent={vi.fn()}
    profileRef={createRef<HTMLDivElement>()} />);

    expect(await screen.findByRole("table")).toBeInTheDocument();
    const studentRow = screen.getByRole("row", {
      name: /student1@example\.com/i,
    });
    expect(
      within(studentRow).getByText(/student1@example\.com/i),
    ).toBeInTheDocument();
    expect(within(studentRow).getByText(/Lagos/)).toBeInTheDocument();
    expect(
      within(studentRow).getByAltText("Student passport"),
    ).toBeInTheDocument();
  });
});
