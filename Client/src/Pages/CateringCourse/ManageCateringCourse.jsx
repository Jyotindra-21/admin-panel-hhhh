import React, { useEffect, useState } from "react";
import styles from "./CateringCourse.module.css";
import CateringCourseCard from "../../Components/CateringCourseCard/CateringCourseCard";
import axios from "axios";
import { toast } from "react-toastify";
import getHeaders from "../../helpers/getReqHeaders";
import Loader from "../../Components/Loader";

export default function ManageCateringCourse() {
  const [cateringCourse, setCateringCourse] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCourses = async () => {
    const res = await axios.get(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/view/course"
    );
    if (res.status !== 200) throw new Error("Erro while fetching courses!");
    console.log(res.data);
    setCateringCourse(res.data);
  };

  const deleteCourseHandler = async (id) => {
    console.log(id);
    setDeleteLoading(true);
    const res = await axios.delete(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/delete/course",
      {
        data: { id },
        headers: getHeaders(),
      }
    );
    const updatedCourses = cateringCourse.filter((course) => course.id !== id);
    if (res.status !== 200) return toast.error("Error deleting course");
    toast.success("Course deleted successfully");
    setCateringCourse(updatedCourses);
    setDeleteLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (Object.keys(cateringCourse).length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.AddMenuItemContainer}>
      <h4>Manage Catering Course</h4>
      <div className={styles.ManageContainer}>
        {cateringCourse &&
          cateringCourse.map((course) => (
            <CateringCourseCard
              key={course.id}
              course={course}
              deleteLoading={deleteLoading}
              deleteCourseHandler={deleteCourseHandler}
            />
          ))}
      </div>
    </div>
  );
}
