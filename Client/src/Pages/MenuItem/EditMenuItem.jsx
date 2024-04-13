import React, { useEffect, useState } from "react";
import styles from "./MenuItem.module.css";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { uploadFileToStorageAndGetUrl } from "../../helpers/uploadImage";
// Toast Imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

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

export default function EditMenuItem() {

  const { id } = useParams();
  const redirect = useNavigate();
  const [uploadImage, setUploadImage] = useState();
  const [menuItem , setMenuItem] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [menuCateg, setMenuCateg] = useState([]);

  const clearForm = () => {
    setUploadImage();
    setCategory("");
    setNewCategory("");
    setTitle("");
    setDesc("");
  };

  useEffect(() => {
    (async function () {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/view/menu`
      );

      if (res.status !== 200) throw new Error("Error Fetching Menu Data");
      const menuCategories = Object.keys(res.data)
      for (const key in res.data) {
        if (res.data.hasOwnProperty(key)) {
          const menuitem = res.data[key].filter((menu) => menu.id == id)
          if (menuitem.length > 0) {
            setMenuItem(menuitem[0])
            setCategory(menuItem[0].categoryname)
          }
        }
      }
      setMenuCateg(menuCategories);
    })();
  }, []);

   console.log(menuItem);
  const handleMenuItemUpload = async () => {
    setLoading(true)
    if (!uploadImage) {
      setLoading(false)
      return toast.error("Menuimage required !", {
        position: "top-right",
      });
    }
    if (!title) {
      setLoading(false)
      return toast.error("Menuitem name required !", {
        position: "top-right",
      });
    }
    if (!desc) {
      setLoading(false)
      return toast.error("Menudescription required !", {
        position: "top-right",
      });
    }
    if (!category && !newCategory) {
      setLoading(false)
      return toast.error("Select menu category or Enter New!", {
        position: "top-right",
      });
    }

    let categ = category;
    if (!category && newCategory) {
      categ = newCategory;
    }

    const imageUrl = await uploadFileToStorageAndGetUrl("menu", uploadImage);
    const data = {
      name: title,
      imageurl: imageUrl.publicUrl,
      description: desc,
      categoryname: categ,
      type: "Menu",
    };
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(
        `https://admin-panel-hadramaut-react-f4r8.vercel.app/create/menu`,
        data,
        {
          headers: headers,
        }
      );
      toast.success(res.data.success, {
        position: "top-right",
      });
      clearForm();
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
      clearForm();
    }
    setLoading(false)
  };

  return (
    <div className={styles.AddMenuItemContainer}>
      <h4>Edit Menu Item</h4>
      <div className={styles.uploadContainer}>
        <form className={styles.uploadBox}>
          <div className={styles.image_wrapper}>
            {/* {uploadImage ? (
              <img src={URL.createObjectURL(uploadImage)} />
            ) : (
              <CloudUploadIcon className={styles.ImageUploadIcon} />
            )} */}
            {!uploadImage && uploadImage ? (
              <img src={uploadImage} />
            ) : uploadImage ? (
              <img src={URL.createObjectURL(uploadImage)} />
            ) : (
              <CloudUploadIcon className={styles.ImageUploadIcon} />
            )}
          </div>
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            disabled={loading}
            tabIndex={-1}
            color="primary"
            onChange={(e) => setUploadImage(e.target.files[0])}
          >
            Select Image
            <VisuallyHiddenInput type="file" />
          </Button>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              disabled={!menuCateg}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={""}>Select Category</MenuItem>
              {menuCateg.map((categ) => (
                <MenuItem value={categ} key={categ}>
                  {categ}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <p>OR</p>
          <TitleInput
            type="text"
            disabled={loading}
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <TitleInput
            type="text"
            disabled={loading}
            placeholder="Title"
            value={menuItem.name}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DescriptionTextarea
            name=""
            id=""
            cols="30"
            rows="5"
            disabled={loading}
            placeholder="Description"
            value={menuItem.desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={handleMenuItemUpload}
          >
            Upload{" "}
          </Button>
        </form>
      </div>
    </div>
  );
}
