// Course data
const courses = [
  {
    id: "course1",
    title: "HTML & CSS Basics",
    description: "Learn how to build static web pages using HTML and CSS.",
    video: "https://www.youtube.com/embed/mU6anWqZJcc",
    lessons: ["Introduction", "HTML Basics", "CSS Basics", "Project"]
  },
  {
    id: "course2",
    title: "JavaScript Essentials",
    description: "Understand the core concepts of JavaScript.",
    video: "https://www.youtube.com/embed/W6NZfCO5SIk",
    lessons: ["Introduction", "Variables", "Functions", "DOM Manipulation"]
  },
  {
    id: "course3",
    title: "React for Beginners",
    description: "Start building dynamic apps with React.",
    video: "https://www.youtube.com/embed/w7ejDZ8SWv8",
    lessons: ["Introduction", "JSX", "Components", "State & Props"]
  }
];

// Load courses on index.html
if (document.getElementById("courseList")) {
  const courseList = document.getElementById("courseList");
  const search = document.getElementById("search");

  function renderCourses(filter = "") {
    courseList.innerHTML = "";
    courses
      .filter(c => c.title.toLowerCase().includes(filter.toLowerCase()))
      .forEach(course => {
        const div = document.createElement("div");
        div.className = "course-card";
        div.innerHTML = `
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <button onclick="window.location.href='course.html?id=${course.id}'">View</button>
        `;
        courseList.appendChild(div);
      });
  }

  renderCourses();

  search.addEventListener("input", e => {
    renderCourses(e.target.value);
  });
}

// Load course details on course.html
if (document.getElementById("courseTitle")) {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("id");
  const course = courses.find(c => c.id === courseId);

  if (course) {
    document.getElementById("courseTitle").textContent = course.title;
    document.getElementById("courseVideo").src = course.video;

    const lessonsList = document.getElementById("lessonsList");
    let completedLessons = JSON.parse(localStorage.getItem(courseId)) || [];

    function updateProgress() {
      const percent = Math.round((completedLessons.length / course.lessons.length) * 100);
      document.getElementById("progressPercent").textContent = percent + "%";
      localStorage.setItem(courseId, JSON.stringify(completedLessons));
    }

    course.lessons.forEach(lesson => {
      const li = document.createElement("li");
      const isChecked = completedLessons.includes(lesson);
      li.innerHTML = `<label><input type="checkbox" ${isChecked ? "checked" : ""}> ${lesson}</label>`;
      li.querySelector("input").addEventListener("change", (e) => {
        if (e.target.checked) {
          completedLessons.push(lesson);
        } else {
          completedLessons = completedLessons.filter(l => l !== lesson);
        }
        updateProgress();
      });
      lessonsList.appendChild(li);
    });

    updateProgress();
  }
}
