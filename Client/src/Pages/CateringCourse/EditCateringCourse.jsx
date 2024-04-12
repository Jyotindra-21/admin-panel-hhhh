import React, { useEffect, useState } from "react";
import styles from "./CateringCourse.module.css";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
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

export default function EditCateringCourse() {
  const { id } = useParams();
  const redirect = useNavigate();
  const [cateringData, setCateringData] = useState();

  const [menuImage, setMenuImage] = useState();
  const [menuPopupImage, setMenuPopupImage] = useState();

  const [loading, setLoading] = useState(false);

  const fetchCateringData = async () => {
    const res = await axios.get(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/view/course"
    );
    if (res.status !== 200) throw new Error("Erro while fetching courses!");
    const course = res.data.filter((cours) => cours.id == id);
    setCateringData(course[0]);
  };

  useEffect(() => {
    fetchCateringData();
  }, []);

  const cateringCourseUpdateHandler = async () => {
    if (!cateringData.title) return toast.error("Enter menu title!");
    if (!cateringData.description) return toast.error("Enter description!");
    if (!cateringData.pricePerPax) return toast.error("Define price per pax!");

    setLoading(true);
    let menuImageURL = cateringData.imageurl;
    let menuPopupImageUrl = cateringData.popupImage;

    if (menuImage) {
      menuImageURL = await uploadFileToStorageAndGetUrl("catering", menuImage);
    }
    if (menuPopupImage) {
      menuPopupImageUrl = await uploadFileToStorageAndGetUrl(
        "catering",
        menuPopupImage
      );
    }

    const data = {
      ...cateringData,
      pricePerPax: Number(cateringData.pricePerPax),
      imageurl: menuImageURL,
      popupImage: menuPopupImageUrl,
    };

    console.log(data);

    const res = await axios.put(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/update/course",
      data,
      {
        headers: getHeaders(),
      }
    );
    if (res.data.error) return toast.error(res.data.error);
    setLoading(false);
    if (res.status !== 200)
      return toast.error("Error while updating catering course");
    toast.success(res.data.success);
    setTimeout(() => {
      redirect("/catering/manage-catering-course");
    }, 1500);
  };

  return (
    <div className={styles.AddMenuItemContainer}>
      <h4>Add Catering Course</h4>
      <div className={styles.uploadContainer}>
        {cateringData && (
          <form className={styles.uploadBox}>
            <div className={styles.imageBox}>
              {menuImage ? (
                <img src={URL.createObjectURL(menuImage)} />
              ) : !menuImage && cateringData.imageurl ? (
                <img src={cateringData.imageurl} />
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
              value={cateringData.title}
              onChange={(e) =>
                setCateringData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
            <TitleInput
              type="text"
              name="price-pre-pax"
              placeholder="Price Pre pax"
              value={cateringData.pricePerPax}
              onChange={(e) =>
                setCateringData((prevData) => ({
                  ...prevData,
                  pricePerPax: e.target.value,
                }))
              }
            />
            <DescriptionTextarea
              name=""
              id=""
              cols="30"
              rows="5"
              placeholder="Description"
              value={cateringData.description}
              onChange={(e) =>
                setCateringData((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }))
              }
            />
            <p>Select menu popup image</p>
            <div className={styles.imageBox}>
              {menuPopupImage ? (
                <img src={URL.createObjectURL(menuPopupImage)} />
              ) : !menuPopupImage && cateringData.popupImage ? (
                <img src={cateringData.popupImage} />
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
              onClick={cateringCourseUpdateHandler}
            >
              Update{" "}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
