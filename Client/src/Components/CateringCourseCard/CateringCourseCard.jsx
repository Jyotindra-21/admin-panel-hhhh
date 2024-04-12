import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./CateringCourseCard.module.css";
import { Link } from "react-router-dom";

export default function CateringCourseCard({ course, deleteCourseHandler, deleteLoading }) {
  return (
    <Card className={styles.Menu_Item_Card}>
      <img className={styles.cardImage} src={course.imageurl} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Typography gutterBottom variant="h6" component="div">
            {course.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Price Per Pax : {course.pricePerPax}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.description}
          </Typography>
        </div>
        <div>
          <Link to={`/catering/edit-catering-course/${course.id}`}>
            <Button
              style={{ marginRight: "5px" }}
              color="primary"
              variant="contained"
            >
              Edit
            </Button>
          </Link>
          <Button
            style={{ marginRight: "5px" }}
            color="error"
            variant="contained"
            disabled={deleteLoading}
            onClick={() => deleteCourseHandler(course.id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
