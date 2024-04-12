import React, { useEffect, useState } from "react";
import styles from "./FAQ.module.css";
import { Button } from "@mui/material";

import { toast } from "react-toastify";
import axios from "axios";
import getHeaders from "../../helpers/getReqHeaders";

export default function AddFAQ() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [categoryname, setCategoryname] = useState("");
  const [selectcategory, setSelectCategory] = useState("");

  const [allCategories, setAllCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setQuestion("");
    setAnswer("");
    setCategoryname("");
    setSelectCategory("");
  };

  const fetchAllCategories = async () => {
    const categories = [];
    const res = await axios.get(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/view/faqs"
    );
    res.data.forEach((categ) => {
      if (!categories.includes(categ.categoryname)) {
        categories.push(categ.categoryname);
      }
    });
    setAllCategories(categories);
  };

  const faqSubmitHandler = async () => {
    if (!selectcategory && !categoryname)
      return toast.error("Select category or type new!");
    if (!question) return toast.error("Enter question");
    if (!answer) return toast.error("Enter answer!");

    const data = {
      categoryname: selectcategory || categoryname,
      question,
      answer,
    };
    setLoading(true);
    const res = await axios.post(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/create/faqs",
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
      <h4>Add FAQ</h4>
      <div className={styles.faq_container}>
        <form>
          <div className={styles.Control_form}>
            <label className={styles.form_label} htmlFor="FAQQuestionCategory">
              FAQ Question Category
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
            <label className={styles.form_label} htmlFor="question">
              Question
            </label>
            <input
              className={styles.form_input}
              id="question"
              type="text"
              placeholder="Enter Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
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
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.Control_form}>
            <label className={styles.form_label} htmlFor="answer">
              <Button
                className={styles.Button_add}
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={faqSubmitHandler}
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
