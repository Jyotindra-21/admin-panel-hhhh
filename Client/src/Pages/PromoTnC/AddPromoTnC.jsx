import React, { useEffect, useState } from "react";
import styles from "./PromoTnC.module.css";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify"
import getHeaders from "../../helpers/getReqHeaders";

export default function AddPromoTnC() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryname, setCategoryname] = useState("");

  const [loading, setLoading] = useState(false);
  const [selectcategory, setSelectCategory] = useState("");

  const [allCategories, setAllCategories] = useState([]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCategoryname("");
    setSelectCategory("");
  };

  const fetchAllCategories = async () => {
    const categories = [];
    const res = await axios.get(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/view/promotnc"
    );
    Object.keys(res.data).forEach((categ) => {
      if (!categories.includes(categ)) {
        categories.push(categ);
      }
    });
    setAllCategories(categories);
  };

  const promoSubmitHandler = async () => {
    if (!selectcategory && !categoryname)
      return toast.error("Select category or type new!");
    if (!title) return toast.error("Enter title");
    if (!description) return toast.error("Enter description!");

    const data = {
      categoryname: selectcategory || categoryname,
      title,
      description,
    };
    setLoading(true);
    const res = await axios.post(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/create/promotnc",
      data,
      {
        headers: getHeaders(),
      }
    );
    if (res.status !== 200) return toast.error("Failed to post faq");
    toast.success(res.data.success);
    setLoading(false);
    clearForm();
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className={styles.Faq_Main}>
      <h4>Add Promo TnC</h4>
      <div className={styles.faq_container}>
        <form>
          <div className={styles.Control_form}>
            <label className={styles.form_label} htmlFor="FAQQuestionCategory">
              Promo Category
            </label>
            <select
              className={styles.form_select}
              name="Category"
              id="FAQQuestionCategory"
              value={selectcategory}
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {allCategories &&
                allCategories.map((categ, index) => (
                  <option value={categ} key={index}>
                    {categ}
                  </option>
                ))}
            </select>
          </div>
          <h6 className={styles.Or_}>OR</h6>
          <div className={styles.Control_form}>
            <label className={styles.form_label} htmlFor="addCat"></label>
            <input
              className={styles.form_input}
              id="addCat"
              type="text"
              placeholder="Add New Category"
              value={categoryname}
              onChange={(e) => setCategoryname(e.target.value)}
            />
          </div>
          <div className={styles.Control_form}>
            <label className={styles.form_label} htmlFor="title">
              Title
            </label>
            <input
              className={styles.form_input}
              id="tile"
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.Control_form}>
            <label className={styles.form_label} htmlFor="des">
              Description
            </label>
            <textarea
              className={styles.form_input}
              name="des"
              id="des"
              cols="30"
              rows="6"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.Control_form}>
            <label className={styles.form_label}>
              <Button
                className={styles.Button_add}
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={promoSubmitHandler}
              >
                ADD
              </Button>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
