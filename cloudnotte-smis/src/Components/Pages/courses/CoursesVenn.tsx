type CoursesVennProps={
  juniorOnlyCourses:string[];
  seniorOnlyCourses:string[];
  bothCourses:string[];
  setSelectedGroup:(group:string[] |null)=>void;
  setSelectedGroupName:(name:string)=>void;
  setSelectedGroupDescription:(description:string)=>void;
}

function CoursesVenn({
  juniorOnlyCourses,
  seniorOnlyCourses,
  bothCourses,
  setSelectedGroup,
  setSelectedGroupName,
  setSelectedGroupDescription,
}:CoursesVennProps) {
  return (
    <div className="courses-venn">
      <div className="course-group junior-group">
        <div className="group-heading">
          <span className="group-number">01</span>
          <h2>Junior Courses</h2>
        </div>
        <div className="group-course-list">
          {juniorOnlyCourses.map((course) => (
            <span key={course}>{course}</span>
          ))}
        </div>
        <button
          onClick={() => {
            setSelectedGroup([...juniorOnlyCourses]);
            setSelectedGroupName("Junior");
            setSelectedGroupDescription(
              "These are th courses strictly for junior students.",
            );
          }}
        >
          Learn more
        </button>
      </div>

      <div className="course-group both-group">
        <div className="group-heading">
          <span className="group-number">02</span>
          <h2>Both</h2>
        </div>
        <p className="group-description">
          courses available to both junior and senior students.
        </p>
        <div className="group-course-list">
          {bothCourses.map((course) => (
            <span key={course}>{course}</span>
          ))}
        </div>
        <button
          onClick={() => {
            setSelectedGroup([...bothCourses]);
            setSelectedGroupName("Junior and Senior");
            setSelectedGroupDescription(
              "These are courses for both junior and senior students.",
            );
          }}
        >
          Learn more
        </button>
      </div>
      <div className="course-group senior-group">
        <div className="group-heading">
          <span className="group-number">03</span>
          <h2>Senior Courses</h2>
        </div>
        <div className="group-course-list">
          {seniorOnlyCourses.map((course) => (
            <span key={course}>{course}</span>
          ))}
        </div>
        <button
          onClick={() => {
            setSelectedGroup([...seniorOnlyCourses]);
            setSelectedGroupName("Senior");
            setSelectedGroupDescription(
              "These are courses strictly for senior students.",
            );
          }}
        >
          Learn more
        </button>
      </div>
    </div>
  );
}
export default CoursesVenn;
