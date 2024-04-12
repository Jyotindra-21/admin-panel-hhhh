import React, { useState } from "react";
import styles from "./CateringCourse.module.css";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import axios from "axios";
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

export default function AddCateringCourse() {
  const [menuImage, setMenuImage] = useState();
  const [menuPopImage, setMenuPopImage] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pricePerPax, setPricePerPax] = useState("");
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setMenuImage();
    setMenuPopImage();
    setTitle("");
    setDesc("");
    setPricePerPax("");
  };

  const cateringCourseAddHandler = async () => {
    if (!menuImage) return toast.error("Select Menu Image First");
    if (!title) return toast.error("Enter menu title!");
    if (!desc) return toast.error("Enter description!");
    if (!pricePerPax) return toast.error("Define price per pax!");
    if (!menuPopImage) return toast.error("Select Popup image for Menu Item");

    setLoading(true);
    const menuImageURL = await uploadFileToStorageAndGetUrl(
      "catering",
      menuImage
    );
    const menuPopupImageUrl = await uploadFileToStorageAndGetUrl(
      "catering",
      menuPopImage
    );

    const data = {
      title,
      description: desc,
      pricePerPax: Number(pricePerPax),
      imageurl: menuImageURL.publicUrl,
      popupImage: menuPopupImageUrl.publicUrl,
    };
    
    console.log(data);
    const res = await axios.post(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/create/course",
      data,
      {
        headers: getHeaders(),
      }
    );
    setLoading(false);
    clearForm();
    if (res.status !== 200)
      return toast.error("Error while adding catering course");
    toast.success(res.data.success);
  };

  return (
    <div className={styles.AddMenuItemContainer}>
      <h4>Add Catering Course</h4>
      <div className={styles.uploadContainer}>
        <form className={styles.uploadBox}>
          <div className={styles.imageBox}>
            {menuImage ? (
              <img src={URL.createObjectURL(menuImage)} />
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
              onChange={(e) => setMenuImage(e.target.files[0])}
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
            name="price-pre-pax"
            placeholder="Price Pre pax"
            value={pricePerPax}
            onChange={(e) => setPricePerPax(e.target.value)}
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
          <p>Select menu popup image</p>
          <div className={styles.imageBox}>
            {menuPopImage ? (
              <img src={URL.createObjectURL(menuPopImage)} />
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
            Select Menu Image
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setMenuPopImage(e.target.files[0])}
            />
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={cateringCourseAddHandler}
          >
            Upload{" "}
          </Button>
        </form>
      </div>
    </div>
  );
}
