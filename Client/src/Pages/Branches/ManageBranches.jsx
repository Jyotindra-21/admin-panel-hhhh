import React, { useEffect, useState } from "react";
import styles from "./Branches.module.css";
import BranchCard from "../../Components/BranchCard/BranchCard";
import axios from "axios";
import getHeaders from "../../helpers/getReqHeaders";
import Loader from "../../Components/Loader";

// Toast Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageBranches() {
  const [branches, setBranches] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchBrtanches = async () => {
    const res = await axios.get(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/view/branches"
    );
    if (res.status !== 200) throw new Error("Error While Fetching Branches");
    setBranches(res.data);
  };

  const branchDeleteHandler = async (id) => {
    setDeleteLoading(true);
    const updatedBranches = branches.filter((branch) => branch.id !== id);
    const res = await axios.delete(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/delete/branch",
      {
        data: { id },
        headers: getHeaders(),
      }
    );
    if (res.status !== 200)
      return toast.error("Error Deleting Branch", {
        position: "top-right",
      });
    toast.success("Branch Deleted Successfully", {
      position: "top-right",
    });
    setBranches(updatedBranches);
    setDeleteLoading(false);
  };

  useEffect(() => {
    fetchBrtanches();
  }, []);

  if (Object.keys(branches).length === 0) {
    return <Loader />;
  }
  return (
    <div className={styles.BranchesContainer}>
      <h4>Manage Branch</h4>
      <div className={styles.BranchWrapper}>
        {branches.map((branch) => (
          <BranchCard
            key={branch.id}
            deleteLoading={deleteLoading}
            branch={branch}
            branchDeleteHandler={branchDeleteHandler}
          />
        ))}
      </div>
    </div>
  );
}
