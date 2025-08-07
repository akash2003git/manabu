function AboutPage() {
  return (
    <div className="w-full mt-[100px] sm:mt-[150px] px-5 sm:px-20 2xl:px-60">
      <h1 className="text-4xl font-bold mb-6">About This Project</h1>
      <p className="text-lg mb-4">
        This is a full-stack{" "}
        <span className="font-semibold">course-selling platform</span> built as
        a personal project to strengthen my skills in modern web development and
        showcase my ability to build production-ready applications.
      </p>
      <p className="text-lg mb-4">
        The platform supports secure user authentication, Stripe payments for
        course access, a clean and responsive UI, and protected routes for
        premium content.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">💻 Tech Stack</h2>
      <ul className="list-disc list-inside text-left max-w-xl text-base">
        <li>
          <strong>Frontend:</strong> React, Vite, Tailwind CSS
        </li>
        <li>
          <strong>Backend:</strong> Node.js, Express
        </li>
        <li>
          <strong>Database:</strong> MongoDB with Mongoose
        </li>
        <li>
          <strong>Payments:</strong> Stripe (sandbox)
        </li>
        <li>
          <strong>Auth:</strong> JWT-based authentication
        </li>
        <li>
          <strong>Deployment:</strong> Vercel (Frontend), Render (Backend)
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        🚀 Future Improvements
      </h2>
      <ul className="list-disc list-inside text-left max-w-xl text-base">
        <li>Add user progress tracking & quizzes</li>
        <li>Instructor dashboard for course management</li>
        <li>Video hosting integration with Cloudinary or Mux</li>
        <li>Refactor into a scalable microservices architecture</li>
      </ul>

      <p className="text-lg mt-10 italic">
        This project reflects my passion for building useful tools and
        constantly improving as a developer. Thanks for checking it out!
      </p>
    </div>
  );
}

export default AboutPage;
