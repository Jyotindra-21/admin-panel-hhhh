import React, { useState } from "react";
import styles from "./CurrentVoucher.module.css";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadFileToStorageAndGetUrl } from "../../helpers/uploadImage";
import axios from "axios";
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
const TitleInput = styled("input")({
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  fontSize: "18px",
});
const DescriptionTextarea = styled("textarea")({
  width: "100%",
  borderRadius: "10px",
  padding: "10px",
  fontSize: "18px",
});
export default function AddCurrentVoucher() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [voucherCode, setVoucherCode] = useState("");
  const [validity, setValidity] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setImage("");
    setTitle("");
    setVoucherCode("");
    setValidity("");
    setDesc("");
  };

  const voucherUploadHandler = async () => {
    if (!image) return toast.error("Select Image Forst");
    if (!title) return toast.error("Title is Required");
    if (!validity) return toast.error("Select date For Validity");
    if (!desc) return toast.error("Enter Desciption");

    setLoading(true);
    const { publicUrl } = await uploadFileToStorageAndGetUrl("voucher", image);
    const data = {
      title,
      validity,
      description: desc,
      imageurl: publicUrl,
    };
    try {
      const res = await axios.post(
        "https://admin-panel-hadramaut-react-f4r8.vercel.app/create/vouchersection",
        data,
        {
          headers: getHeaders(),
        }
      );
      setLoading(false);
      clearForm();
      console.log(res);
      if (res.status !== 200) return toast.error("Error in adding voucher");
      toast.success("Current Voucher Added!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.AddMenuItemContainer}>
      <h4>Add Current Voucher</h4>
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
          color="secondary"
        >
          Select Image
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>

        <TitleInput
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TitleInput
          type="text"
          name="voucher_code"
          placeholder="Voucher Code"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
        />
        <TitleInput
          type="date"
          name="validity"
          placeholder="Validity"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />
        <DescriptionTextarea
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={voucherUploadHandler}
        >
          Upload{" "}
        </Button>
      </div>
    </div>
  );
}
