import React, { useState } from "react";
import styles from "./Branches.module.css";
import { Button } from "@mui/material";
import axios from "axios";
// Toast Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getHeaders from "../../helpers/getReqHeaders";

export default function AddBranches() {
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [gooleLink, setGooleLink] = useState("");
  const [wazeLink, setWazeLink] = useState("");
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setBranchName("");
    setAddress("");
    setStartTime("");
    setEndTime("");
    setGooleLink("");
    setWazeLink("");
  };

  const branchUploadHandler = async () => {
    if (!branchName) return toast.error("Branchname Required");
    if (!address) return toast.error("Address Required");
    if (!startTime) return toast.error("Add Branch Start Time");
    if (!endTime) return toast.error("Add Branch End Time");
    if (!gooleLink) return toast.error("Add Goole Link");
    if (!wazeLink) return toast.error("Add Waze Link");

    const data = {
      name: branchName,
      address,
      startingTime: startTime,
      endingTime: endTime,
      google: gooleLink,
      waze: wazeLink,
    };
    setLoading(true);
    const res = await axios.post(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/create/branch",
      data,
      {
        headers: getHeaders(),
      }
    );
    if (res.status !== 200) {
      toast.error("Error Adding Branch");
      setLoading(false);
      return clearForm();
    }
    toast.success(res.data.success);
    clearForm();
    setLoading(false);
  };

  const formatHour = (hour) => {
    const suffix = hour >= 12 && hour < 24 ? "PM" : "AM";
    let formattedHour = hour % 12;
    if (formattedHour === 0) formattedHour = 12;
    return `${formattedHour < 10 ? `0${formattedHour}` : formattedHour
      }:00 ${suffix}`;
  };

  return (
    <div className={styles.BranchesContainer}>
      <h4>Add Branches</h4>
      <div className={styles.FormContainer}>
        <form action="">
          <div className={styles.form_control}>
            <div className={styles.form_label}>
              <label htmlFor="branch">Branch Name</label>
            </div>
            <div className={styles.form_input}>
              <input
                type="text"
                id="branch"
                disabled={loading}
                placeholder="Branch Name"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
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
                disabled={loading}
                placeholder="Branch Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className={styles.form_control}>
            <div className={styles.form_label}>
              <label htmlFor="branch_address">Operation Hours</label>
            </div>
            <div className={styles.form_input}>
              <div style={{ display: "flex", gap: "20px" }}>
                <div className={styles.form_control_sub} style={{ flex: "1" }}>
                  <div className={styles.form_label}>
                    <label htmlFor="fromHour">From</label>
                  </div>
                  <div className={styles.form_input} style={{ width: "150px" }}>
                    <select
                      name="FromHour"
                      id="fromHour"
                      value={startTime}
                      disabled={loading}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      {[...new Array(24)].map((_, i) => (
                        <option key={i} value={formatHour(i)}>
                          {formatHour(i)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.form_control_sub} style={{ flex: "1" }}>
                  <div className={styles.form_label}>
                    <label htmlFor="ToHour">To</label>
                  </div>
                  <div className={styles.form_input}>
                    <select
                      name="ToHour"
                      id="TOHour"
                      value={endTime}
                      disabled={loading}
                      onChange={(e) => setEndTime(e.target.value)}
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
                value={gooleLink}
                disabled={loading}
                onChange={(e) => setGooleLink(e.target.value)}
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
                disabled={loading}
                value={wazeLink}
                onChange={(e) => setWazeLink(e.target.value)}
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
                onClick={branchUploadHandler}
              >
                Add Branch
              </Button>{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
