import React from "react";
import styles from "./BranchCard.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function BranchCard({
  branch,
  branchDeleteHandler,
  deleteLoading,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <h3 className={styles.branch_title}>{branch.name}</h3>
        <p>Address : {branch.address}</p>
        <h3>
          Operation Hour : {branch.startingTime} to {branch.endingTime}
        </h3>
        <h3>
          Google Link : <Link to={branch.google}>{branch.google}</Link>
        </h3>
        <h3>
          Waze Link : <Link to={branch.waze}>{branch.waze}</Link>
        </h3>
      </div>
      <div className={styles.card_bottom}>
        <Link to={`/branch/edit-branch/${branch.id}`}>
          <Button
            variant="contained"
            style={{ marginRight: "20px" }}
            color="primary"
          >
            Edit
          </Button>
        </Link>
        <Button
          variant="contained"
          style={{ marginRight: "20px" }}
          color="error"
          disabled={deleteLoading}
          onClick={() => branchDeleteHandler(branch.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
