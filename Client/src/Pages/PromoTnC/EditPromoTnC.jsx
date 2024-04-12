import React, { useEffect, useState } from "react";
import styles from "./PromoTnC.module.css";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import getHeaders from "../../helpers/getReqHeaders";

export default function EditPromoTnC() {
  const { id } = useParams();
  const redirect = useNavigate();
  const [promoData, setPromoData] = useState();
  const [newCateg, setNewCateg] = useState("");

  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState();

  useEffect(() => {
    (async function () {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/view/promotnc`
      );
      if (res.status !== 200) throw new Error("Error Fetching faq Data");
      const combinedData = Object.values(res.data).flat();
      const promo = combinedData.filter((promo) => promo.id == id);
      const categories = [];
      Object.keys(res.data).forEach((categ) => {
        if (!categories.includes(categ)) {
          categories.push(categ);
        }
      });
      setAllCategories(categories);
      setPromoData(promo[0]);
    })();
  }, []);

  const promoUpdateHandler = async () => {
    if (!promoData.categoryname && !newCateg)
      return toast.error("Select faq category or Add New");
    if (!promoData.title) return toast.error("Title is required");
    if (!promoData.description) return toast.error("Description is required");
    let category = promoData.categoryname;
    if (newCateg && !promoData.categoryname) {
      category = newCateg;
    }
    const data = {
      ...promoData,
      categoryname: category,
    };
    setLoading(true);
    console.log(data);
    try {
      const res = await axios.put(
        "https://admin-panel-hadramaut-react-f4r8.vercel.app/update/promotnc",
        data,
        {
          headers: getHeaders(),
        }
      );
      if (res.status !== 200) return toast.error("Error updating promo");
      toast.success("Promo updated Successfully");
      setLoading(false);
      setTimeout(() => {
        redirect("/promo/manage-promo-tnc");
      }, 1500);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.Faq_Main}>
      <h4>Edit Promo TnC</h4>
      <div className={styles.faq_container}>
        {promoData && (
          <form>
            <div className={styles.Control_form}>
              <label className={styles.form_label} htmlFor="PromoCategory">
                Promo Category
              </label>
              <select
                className={styles.form_select}
                name="Category"
                id="PromoCategory"
                value={promoData.categoryname}
                onChange={(e) =>
                  setPromoData((prevData) => ({
                    ...prevData,
                    categoryname: e.target.value,
                  }))
                }
              >
                <option value="">Select Category</option>
                {allCategories &&
                  allCategories.map((cate, index) => (
                    <option value={cate} key={index}>
                      {cate}
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
                value={newCateg}
                onChange={(e) => setNewCateg(e.target.value)}
              />
            </div>
            <div className={styles.Control_form}>
              <label className={styles.form_label} htmlFor="question">
                Title
              </label>
              <input
                className={styles.form_input}
                id="question"
                type="text"
                placeholder="Enter Title"
                value={promoData.title}
                onChange={(e) =>
                  setPromoData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.Control_form}>
              <label className={styles.form_label} htmlFor="answer">
                Description
              </label>
              <textarea
                className={styles.form_input}
                name="answer"
                id="answer"
                cols="30"
                rows="6"
                value={promoData.description}
                onChange={(e) =>
                  setPromoData((prevData) => ({
                    ...prevData,
                    description: e.target.value,
                  }))
                }
              ></textarea>
            </div>
            <div className={styles.Control_form}>
              <label className={styles.form_label} htmlFor="answer">
                <Button
                  className={styles.Button_add}
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={promoUpdateHandler}
                >
                  UPDATE
                </Button>
              </label>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
