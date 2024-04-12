import React, { useRef, useState } from "react";
import styles from "./Slider.module.css";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadFileToStorageAndGetUrl } from "../../helpers/uploadImage";
import axios from "axios";

import { toast } from "react-toastify";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

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

export default function AddSliderImage() {
  const [uploadImage, setuploadImage] = useState();
  const [viewportType, setViewportType] = useState("Desktop");

  const [loading, setLoading] = useState(false);
  const imageContainerRefDesk = useRef(null);

  const uploadSliderImage = async (publicUrl, imagetype) => {
    const config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}/create/slider`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        imageurl: publicUrl,
        type: "Home",
        viewport: viewportType,
      }),
    };
    try {
      const response = await axios(config);
      console.log(response.data);
      toast.success(response.data.success);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleSliderImageUpload = async (forScreen) => {
    // Should Delete the image if it exists ?...

    if (!setuploadImage) return;
    setLoading(true);
    try {
      const { publicUrl } = await uploadFileToStorageAndGetUrl(
        "sliders",
        uploadImage
      );
      // Post Data To Database
      uploadSliderImage(publicUrl, "desktopimage");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setuploadImage("");
  };

  return (
    <>
      <div className={styles.AddSliderContainer}>
        <h4>Add Slider Image (For Desktop)</h4>
        <div className={styles.uploadContainer}>
          <div ref={imageContainerRefDesk} className={styles.uploadBox}>
            {uploadImage ? (
              <img src={URL.createObjectURL(uploadImage)} />
            ) : (
              <CloudUploadIcon className={styles.ImageUploadIcon} />
            )}
          </div>
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            color="primary"
          >
            Select Image
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setuploadImage(e.target.files[0])}
            />
          </Button>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              value={viewportType}
              onChange={(e) => setViewportType(e.target.value)}
            >
              <MenuItem value="Desktop">Desktop</MenuItem>
              <MenuItem value="Mobile">Mobile</MenuItem>
            </Select>
          </FormControl>

          <Button
            color="primary"
            variant="contained"
            onClick={() => handleSliderImageUpload("Desktop")}
            disabled={loading}
          >
            Upload
          </Button>
        </div>
      </div>
    </>
  );
}
