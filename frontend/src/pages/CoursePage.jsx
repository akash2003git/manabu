import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getCourseById,
  getCourseContent,
  purchaseCourse,
} from "../api/courseApi";
import { isUserAuthenticatedAtom, userAtom } from "../store/store";
import { useAtomValue } from "jotai";
import { useHydrated } from "../hooks/useHydrated";
import { CourseContentList } from "../components/course/CourseContentList";

function CoursePage() {
  const [access, setAccess] = useState("guest");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({ content: [] });
  const [courseContent, setCourseContent] = useState([]);
  const [hasFetchedContent, setHasFetchedContent] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  const { courseId } = useParams();
  const navigate = useNavigate();
  const hydrated = useHydrated();

  const isUserAuthenticated = useAtomValue(isUserAuthenticatedAtom);
  const user = useAtomValue(userAtom);

  // Reset states when courseId changes
  useEffect(() => {
    setError("");
    setCourseContent([]);
    setHasFetchedContent(false);
    setAccess("guest");
  }, [courseId]);

  // const handlePurchase = async () => {
  //   try {
  //     setPurchasing(true);
  //     await purchaseCourse(courseId);
  //
  //     const updatedUser = await getMe();
  //     setUser(updatedUser);
  //
  //     setAccess("purchased");
  //     const content = await getCourseContent(courseId);
  //     setCourseContent(content);
  //     setHasFetchedContent(true);
  //
  //     // Smooth scroll to course content
  //     document
  //       .getElementById("course-content")
  //       ?.scrollIntoView({ behavior: "smooth" });
  //   } catch (err) {
  //     console.error(err);
  //     alert(err.response?.data?.message || "Purchase failed");
  //   } finally {
  //     setPurchasing(false);
  //   }
  // };

  const handlePurchase = async () => {
    try {
      setPurchasing(true);
      await purchaseCourse(courseId); // this will redirect to Stripe Checkout
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Purchase failed");
      setPurchasing(false);
    }
  };

  useEffect(() => {
    if (!hydrated) return;

    let isMounted = true;
    setLoading(true);

    async function getCourseDetails() {
      try {
        const data = await getCourseById(courseId);
        if (isMounted) setCourse(data);

        if (!isUserAuthenticated) {
          setAccess("guest");
          return;
        }

        // Check purchase status
        if (user?.purchasedCourses?.includes(courseId)) {
          setAccess("purchased");

          if (!hasFetchedContent) {
            const content = await getCourseContent(courseId);
            if (isMounted) {
              setCourseContent(content);
              setHasFetchedContent(true);
            }
          }
        } else {
          setAccess("not-purchased");
        }
      } catch (err) {
        console.error(err);
        if (isMounted) setError("Error fetching course details");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    getCourseDetails();

    return () => {
      isMounted = false;
    };
  }, [hydrated, isUserAuthenticated, courseId]);

  if (!hydrated) return <p className="text-center mt-[150px]">Loading...</p>;

  return (
    <div className="w-full mt-[100px] sm:mt-[150px] px-5 sm:px-20 2xl:px-60">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex flex-col sm:flex-row w-full gap-10 mb-10">
        <img
          src={course.imageLink}
          alt={course.title}
          className="rounded-xl w-100"
        />
        <div>
          <h1 className="text-3xl text-txt mb-[30px] font-bold">
            {course.title}
          </h1>
          <p className="text-txt mb-4">{course.description}</p>

          {access === "purchased" ? null : access === "guest" ? (
            <button
              onClick={() =>
                navigate("/login", { state: { from: `/courses/${courseId}` } })
              }
              className="cursor-pointer px-4 py-2 bg-accent hover:bg-secondary font-bold text-background rounded-xl w-full sm:w-auto"
            >
              Login to Purchase
            </button>
          ) : (
            <button
              onClick={handlePurchase}
              disabled={purchasing}
              className={`cursor-pointer px-4 py-2 bg-accent hover:bg-secondary font-bold text-background rounded-xl w-full sm:w-auto ${
                purchasing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {purchasing ? "Processing..." : `Enroll for $${course.price}`}
            </button>
          )}
        </div>
      </div>

      {access === "purchased" && (
        <div id="course-content">
          <CourseContentList content={courseContent} isAccessible={true} />
        </div>
      )}

      {(access === "not-purchased" || access === "guest") &&
        (course.content.length > 0 ? (
          <CourseContentList content={course.content} isAccessible={false} />
        ) : (
          <p className="text-center text-gray-400 mt-5">
            No content added yet.
          </p>
        ))}
    </div>
  );
}

export default CoursePage;
