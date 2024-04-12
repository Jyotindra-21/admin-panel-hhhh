import React, { useState } from "react";
import styles from "./Voucher.module.css";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axios from "axios";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

// Toast Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFileToStorageAndGetUrl } from "../../helpers/uploadImage";
import getHeaders from "../../helpers/getReqHeaders";

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
export default function AddVoucher() {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [viewportType, setViewportType] = useState("Desktop");

  const uploadSliderImage = async (publicUrl, imagetype) => {
    const config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}/create/slider`,
      headers: getHeaders(),
      data: JSON.stringify({
        imageurl: publicUrl,
        viewport: imagetype,
        type: "Voucher",
      }),
    };
    try {
      const res = await axios(config);
      toast.success(res.data.success, {
        position: "top-right",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
    setImage();
  };

  const handleVoucherUpload = async () => {
    if (!image)
      toast.error("Select Image First", {
        position: "top-right",
      });
    setLoading(true);
    try {
      const { publicUrl } = await uploadFileToStorageAndGetUrl(
        "sliders",
        image
      );
      // Post Data To Database
      uploadSliderImage(publicUrl, viewportType);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.AddSliderContainer}>
      <h4>Add Voucher</h4>
      <div className={styles.uploadContainer}>
        <div className={styles.uploadBox}>
          {image ? (
            <img src={URL.createObjectURL(image)} />
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
            onChange={(e) => setImage(e.target.files[0])}
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
          disabled={loading}
          onClick={handleVoucherUpload}
        >
          Upload{" "}
        </Button>
      </div>
    </div>
  );
}
