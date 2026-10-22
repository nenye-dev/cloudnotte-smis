function CoursesModal({
  setSelectedGroup,
  selectedGroupName,
  selectedCourses,
  selectedGroupDescription,
}) {
  return (
    <div className="modal-overlay" onClick={() => setSelectedGroup(null)}>
      <main
        className="courses-page modal-page"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={() => setSelectedGroup(null)}
          aria-label="Close modal"
        >
          &times;
        </button>

        <button className="back-button" onClick={() => setSelectedGroup(null)}>
          ← Back to Courses
        </button>

        <div className="course-heading">
          <div>
            <h1>{selectedGroupName} Courses</h1>
            <p className="courses-subtitle">{selectedGroupDescription}</p>
          </div>

          <div className="course-count">
            <span>{selectedCourses.length} Courses</span>
          </div>
        </div>

        <div className="courses-container">
          {selectedCourses.map((course) => {
            const Icon = course.icon;

            return (
              <div
                className={`course-card ${course.className}`}
                key={course.name}
              >
                <div className="course-icon">
                  <Icon />
                </div>

                <div className="course-content">
                  <h3>{course.name}</h3>
                  <p>{course.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
export default CoursesModal;
