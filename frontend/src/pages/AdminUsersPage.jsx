import { getAllUsers } from "../api/userApi";
import { getCourseById } from "../api/courseApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAllUsers() {
      try {
        setLoading(true);
        const fetchedUsers = await getAllUsers();

        // Fetch course names for each user's purchasedCourses
        const usersWithCourseNames = await Promise.all(
          fetchedUsers.map(async (user) => {
            const courseDetails = await Promise.all(
              user.purchasedCourses.map(async (courseId) => {
                try {
                  const course = await getCourseById(courseId);
                  return {
                    id: courseId,
                    title: course.title,
                  };
                } catch (err) {
                  console.error(`Failed to fetch course ${courseId}:`, err);
                  return { id: courseId, title: "Unknown Course" };
                }
              }),
            );

            return {
              ...user,
              purchasedCourses: courseDetails,
            };
          }),
        );

        setUsers(usersWithCourseNames);
      } catch (err) {
        console.error(err.message);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    }

    fetchAllUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl lg:text-3xl font-bold mb-4">All Users</h1>
      <div className="space-y-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-4 border border-gray-300 rounded shadow-sm"
          >
            <p>
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <div>
              <span className="font-semibold">Purchased Courses:</span>
              {user.purchasedCourses.length > 0 ? (
                <ul className="list-disc list-inside mt-1">
                  {user.purchasedCourses.map((course) => (
                    <li key={course.id}>
                      <Link
                        to={`/courses/${course.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {course.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No courses purchased</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsersPage;
