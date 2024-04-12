import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./ValueHistoryCard.module.css";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import axios from "axios";
import { uploadFileToStorageAndGetUrl } from "../../helpers/uploadImage";
import getHeaders from "../../helpers/getReqHeaders";

import { toast } from "react-toastify";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function ValueHistoryCard({
  id,
  img,
  description,
  historyData,
  setHistoryData,
  value,
  setValues,
}) {
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState(description);
  const [loading, setLoading] = useState(false);

  const handleUpdateHistoryData = async () => {
    setLoading(true)
    let imageurl = img;
    if (image) {
      const res = await uploadFileToStorageAndGetUrl("history", image);
      imageurl = res.publicUrl;
    }
    const updatedHistoryData = historyData.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          description: desc,
          imageurl,
        };
      }
      return data;
    });
    const singleHistoryData = updatedHistoryData.filter(
      (data) => data.id == id
    );

    try {
      const res = await axios.put(
        "https://admin-panel-hadramaut-react-f4r8.vercel.app/update/history",
        singleHistoryData[0],
        {
          headers: getHeaders(),
        }
      );
      if (res.status !== 200) {
        setLoading(false)
        return toast.error("Failed To update history data");
      }
      toast.success(res.data.success);
      setLoading(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      setLoading(false)
    }
    setHistoryData(updatedHistoryData);
  };

  const handleUpdateValuesData = async () => {
    setLoading(true)
    let imageurl = img;
    if (image) {
      const res = await uploadFileToStorageAndGetUrl("mission", image);
      imageurl = res.publicUrl;
    }
    const updatedValues = { ...value, imageurl, description: desc };

    try {
      const res = await axios.put(
        "https://admin-panel-hadramaut-react-f4r8.vercel.app/update/values",
        updatedValues,
        {
          headers: getHeaders(),
        }
      );
      if (res.status !== 200) {
        setLoading(false)
        return toast.error("Failed To update values data");
      }
      toast.success(res.data.success);
      setLoading(false)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
      setLoading(false)
    }
    setValues(updatedValues);
  };

  return (
    <Card className={styles.Value_History_Card}>
      {image ? (
        <img className={styles.cardImage} src={URL.createObjectURL(image)} />
      ) : (
        <img className={styles.cardImage} src={img} />
      )}
      <CardContent className={styles.Card_content}>
        <div style={{ display: "flex", gap: "15px" }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            color="primary"
            disabled={loading}
          >
            Re Upload Image
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            disabled={loading}
            color="primary"
            onClick={!value ? handleUpdateHistoryData : handleUpdateValuesData}
          >
            Save
          </Button>
        </div>
        <textarea
          className={styles.textarea_filed}
          cols="30"
          rows="8"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </CardContent>
    </Card>
  );
}
