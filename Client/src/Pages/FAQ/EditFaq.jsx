import React, { useEffect, useState } from "react";
import styles from "./FAQ.module.css";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import getHeaders from "../../helpers/getReqHeaders";

export default function EditFAQ() {
  const { id } = useParams();
  const redirect = useNavigate();
  const [faqData, setFaqData] = useState();
  const [newCateg, setNewCateg] = useState("");

  const [loading, setLoading] = useState(false);

  const [allCategories, setAllCategories] = useState();

  useEffect(() => {
    (async function () {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/view/faqs`
      );
      if (res.status !== 200) throw new Error("Error Fetching faq Data");
      const faq = res.data.filter((fq) => fq.id == id);
      const categories = [];
      res.data.forEach((categ) => {
        if (!categories.includes(categ.categoryname)) {
          categories.push(categ.categoryname);
        }
      });
      setAllCategories(categories);
      setFaqData(faq[0]);
    })();
  }, []);

  const faqUpdateHandler = async () => {
    if (!faqData.categoryname && !newCateg)
      return toast.error("Select faq category or Add New");
    if (!faqData.question) return toast.error("Question is required");
    if (!faqData.answer) return toast.error("Answer is required");
    let category = faqData.categoryname;
    if (newCateg && !faqData.categoryname) {
      category = newCateg;
    }
    const data = {
      ...faqData,
      categoryname: category,
    };
    setLoading(true);
    try {
      const res = await axios.put(
        "https://admin-panel-hadramaut-react-f4r8.vercel.app/update/faqs",
        data,
        {
          headers: getHeaders(),
        }
      );
      if (res.status !== 200) return toast.error("Error updating faq");
      toast.success("Faq updated Successfully");
      setLoading(false);
      setTimeout(() => {
        redirect("/faq/manage-faq");
      }, 1500);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  //   Function to get that pert. faq

  return (
    <div className={styles.Faq_Main}>
      <h4>Edit FAQ</h4>
      <div className={styles.faq_container}>
        {faqData && (
          <form>
            <div className={styles.Control_form}>
              <label
                className={styles.form_label}
                htmlFor="FAQQuestionCategory"
              >
                FAQ Question Category
              </label>
              <select
                className={styles.form_select}
                name="Category"
                id="FAQQuestionCategory"
                value={faqData.categoryname}
                onChange={(e) =>
                  setFaqData((prevData) => ({
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
                Question
              </label>
              <input
                className={styles.form_input}
                id="question"
                type="text"
                placeholder="Enter Question"
                value={faqData.question}
                onChange={(e) =>
                  setFaqData((prevData) => ({
                    ...prevData,
                    question: e.target.value,
                  }))
                }
              />
            </div>
            <div className={styles.Control_form}>
              <label className={styles.form_label} htmlFor="answer">
                Answer
              </label>
              <textarea
                className={styles.form_input}
                name="answer"
                id="answer"
                cols="30"
                rows="6"
                value={faqData.answer}
                onChange={(e) =>
                  setFaqData((prevData) => ({
                    ...prevData,
                    answer: e.target.value,
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
                  onClick={faqUpdateHandler}
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
