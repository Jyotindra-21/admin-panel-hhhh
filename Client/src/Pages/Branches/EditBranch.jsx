import React, { useEffect, useState } from "react";
import styles from "./Branches.module.css";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
// Toast Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getHeaders from "../../helpers/getReqHeaders";

export default function EditBranches() {
  const [branchData, setBranchdata] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const redirect = useNavigate();

  const fetchBranch = async () => {
    const res = await axios.get(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/view/branches"
    );
    if (res.status !== 200) throw new Error("Error While Fetching Branch");
    const branchData = res.data.filter((branch) => branch.id == id);
    setBranchdata(branchData[0]);
  };

  useEffect(() => {
    fetchBranch();
  }, [id]);

  const updateBranchHandler = async () => {
    if (!branchData.name)
      return toast.error("Branchname Required", {
        position: "top-right",
      });
    if (!branchData.address)
      return toast.error("Address Required", {
        position: "top-right",
      });
    if (!branchData.startingTime)
      return toast.error("Add Branch Start Time", {
        position: "top-right",
      });
    if (!branchData.endingTime)
      return toast.error("Add Branch End Time", {
        position: "top-right",
      });
    if (!branchData.google)
      return toast.error("Add Goole Link", {
        position: "top-right",
      });
    if (!branchData.waze)
      return toast.error("Add Waze Link", {
        position: "top-right",
      });
    setLoading(true);
    try {
      const res = await axios.put(
        "https://admin-panel-hadramaut-react-f4r8.vercel.app/update/branch",
        branchData,
        {
          headers: getHeaders(),
        }
      );
      if (res.status !== 200) {
        toast.error("Error Updating Branch", {
          position: "top-right",
        });
        return setLoading(false);
      }
      toast.success(res.data.success, {
        position: "top-right",
        hideProgressBar: true,
      });
      setTimeout(() => {
        redirect("/branch/manage-branches");
      }, 2000);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
    setLoading(false);
  };

  const formatHour = (hour) => {
    const suffix = hour >= 12 && hour < 24 ? "PM" : "AM";
    let formattedHour = hour % 12;
    if (formattedHour === 0) formattedHour = 12;
    return `${
      formattedHour < 10 ? `0${formattedHour}` : formattedHour
    }:00 ${suffix}`;
  };

  return (
    <div className={styles.BranchesContainer}>
      <h4>Edit Branches</h4>
      <div className={styles.FormContainer}>
        {branchData && (
          <form action="">
            <div className={styles.form_control}>
              <div className={styles.form_label}>
                <label htmlFor="branch">Branch Name</label>
              </div>
              <div className={styles.form_input}>
                <input
                  type="text"
                  id="branch"
                  placeholder="Branch Name"
                  value={branchData.name}
                  onChange={(e) =>
                    setBranchdata((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className={styles.form_control}>
              <div className={styles.form_label}>
                <label htmlFor="branch_address">Address</label>
              </div>
              <div className={styles.form_input}>
                <textarea
                  name="branchAddress"
                  id="branch_address"
                  cols="30"
                  rows="4"
                  placeholder="Branch Address"
                  value={branchData.address}
                  onChange={(e) =>
                    setBranchdata((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>
            <div className={styles.form_control}>
              <div className={styles.form_label}>
                <label htmlFor="branch_address">Operation Hours</label>
              </div>
              <div className={styles.form_input}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div
                    className={styles.form_control_sub}
                    style={{ flex: "1" }}
                  >
                    <div className={styles.form_label}>
                      <label htmlFor="fromHour">From</label>
                    </div>
                    <div
                      className={styles.form_input}
                      style={{ width: "150px" }}
                    >
                      <select
                        name="FromHour"
                        id="fromHour"
                        value={branchData.startingTime}
                        onChange={(e) =>
                          setBranchdata((prev) => ({
                            ...prev,
                            startingTime: e.target.value,
                          }))
                        }
                      >
                        {[...new Array(24)].map((_, i) => (
                          <option key={i} value={formatHour(i)}>
                            {formatHour(i)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div
                    className={styles.form_control_sub}
                    style={{ flex: "1" }}
                  >
                    <div className={styles.form_label}>
                      <label htmlFor="ToHour">To</label>
                    </div>
                    <div className={styles.form_input}>
                      <select
                        name="ToHour"
                        id="TOHour"
                        value={branchData.endingTime}
                        onChange={(e) =>
                          setBranchdata((prev) => ({
                            ...prev,
                            endingTime: e.target.value,
                          }))
                        }
                      >
                        {[...new Array(24)].map((_, i) => (
                          <option key={i} value={formatHour(i)}>
                            {formatHour(i)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.form_control}>
              <div className={styles.form_label}>
                <label htmlFor="location">
                  Location Link <br /> (Google Map)
                </label>
              </div>
              <div className={styles.form_input}>
                <input
                  type="text"
                  id="location"
                  placeholder="Location"
                  value={branchData.google}
                  onChange={(e) =>
                    setBranchdata((prev) => ({
                      ...prev,
                      google: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className={styles.form_control}>
              <div className={styles.form_label}>
                <label htmlFor="waze_link">Waze Link</label>
              </div>
              <div className={styles.form_input}>
                <input
                  type="text"
                  id="waze_link"
                  placeholder="waze link"
                  value={branchData.waze}
                  onChange={(e) =>
                    setBranchdata((prev) => ({ ...prev, waze: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className={styles.form_control}>
              <div className={styles.form_label}>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={updateBranchHandler}
                >
                  Update Branch
                </Button>{" "}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
