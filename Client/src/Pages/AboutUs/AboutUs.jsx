import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import styles from "./AboutUs.module.css";
import { Button, Divider } from "@mui/material";
import ValueHistoryCard from "../../Components/ValueHistoryCard/ValueHistoryCard";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import getHeaders from "../../helpers/getReqHeaders";
import { uploadFileToStorageAndGetUrl } from "../../helpers/uploadImage";
import { axiosRequest } from "../../helpers/axiosRequest";

export default function AboutUs() {
  const [aboutUsData, setAboutUsData] = useState({});
  const [introduction, setIntroduction] = useState();
  const [historyData, setHistoryData] = useState();
  const [missionData, setMissionData] = useState();
  const [values, setValues] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/view/about`
      );
      console.log(res.data);
      if (res.status !== 200)
        throw new Error("Failed to fetch about page data");
      setAboutUsData(res.data);
      setIntroduction(res.data["introduction"][0]);
      setHistoryData(res.data["history"]);
      setMissionData(res.data["mission"][0]);
      setValues(res.data["values"][0]);
    })();
  }, []);

  const introductionUpdateHandler = async () => {
    setLoading(true);
    if (!introduction.introduction)
      return toast.error("Introduction is required!");
    if (!introduction.title) return toast.error("Title is required!");
    try {
      const res = await axios.put(
        "https://admin-panel-hadramaut-react-f4r8.vercel.app/update/aboutus",
        introduction,
        {
          headers: getHeaders(),
        }
      );
      console.log(res);
      if (res.status !== 200) return toast.error(res.data.error);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);

    }
    setLoading(false)
  };

  const handleUpdateMissionData = async () => {
    setLoading(true)
    try {
      const res = await axios.put(
        "https://admin-panel-hadramaut-react-f4r8.vercel.app/update/mission",
        missionData,
        {
          headers: getHeaders(),
        }
      );
      if (res.status !== 200)
        return toast.error("Failed To update mission data");
      toast.success(res.data.success);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
    setLoading(false)
  };

  if (Object.keys(aboutUsData).length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.AboutContainer}>
      <h4>Manage About us Page</h4>
      <div className={styles.uploadContainer}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <div className={styles.form_control}>
            <label htmlFor="introduction_id">Introduction</label>
            <textarea
              disabled={loading}
              className={styles.form_filed}
              name="introduction"
              id="introduction_id"
              cols="30"
              rows="6"
              placeholder="Introduction.."
              value={introduction.introduction}
              onChange={(e) =>
                setIntroduction((prevData) => ({
                  ...prevData,
                  introduction: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <div className={styles.form_control}>
            <label htmlFor="title_id">Title</label>
            <input
              type="text"
              className={styles.form_filed}
              disabled={loading}
              name="title"
              id="title_id"
              cols="30"
              rows="10"
              placeholder="Some Sample Title"
              value={introduction.title}
              onChange={(e) =>
                setIntroduction((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div style={{ padding: "20px 0" }}>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={introductionUpdateHandler}
            >
              Update
            </Button>
          </div>
        </Box>
      </div>
      {/* History section */}
      <Divider className={styles.Divider_about} />
      <h4>History Section</h4>
      <div className={styles.uploadContainer}>
        {historyData &&
          historyData.map((data) => (
            <ValueHistoryCard
              key={data.id}
              id={data.id}
              historyData={historyData}
              setHistoryData={setHistoryData}
              img={data.imageurl}
              description={data.description}
            />
          ))}
      </div>
      {/* Mission section */}
      <Divider className={styles.Divider_about} />

      <h4>Mission Section</h4>
      <div className={styles.uploadContainer}>
        <textarea
          className={styles.form_filed}
          cols="30"
          rows="8"
          placeholder="Mission.."
          disabled={loading}
          value={missionData.description}
          onChange={(e) =>

            setMissionData((prevData) => ({
              ...prevData,
              description: e.target.value,
            }))
          }
        ></textarea>
      </div>
      <Button
        component="label"
        role={undefined}
        disabled={loading}
        variant="contained"
        tabIndex={-1}
        color="primary"
        onClick={handleUpdateMissionData}
      >
        Save
      </Button>
      {/* Value section */}
      <Divider className={styles.Divider_about} />

      <h4>Value Section</h4>
      <div className={styles.uploadContainer}>
        <ValueHistoryCard
          section={"values"}
          value={values}
          setValues={setValues}
          img={values.imageurl}
          description={values.description}
        />
      </div>
    </div>
  );
}
