import React, { useEffect, useState } from "react";
import styles from "./FAQ.module.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import getHeaders from "../../helpers/getReqHeaders";
import Loader from "../../Components/Loader";

export default function ManageFAQ() {
  const [faqData, setFaqData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const faqDeleteHandler = async (id) => {
    setDeleteLoading(true);
    const res = await axios.delete(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/delete/faqs",
      {
        data: { id },
        headers: getHeaders(),
      }
    );
    const updatedFaqs = faqData.filter((faq) => faq.id !== id);
    if (res.status !== 200) return toast.error("Error deleting faqs");
    toast.success("Faq deleted successfully");
    setFaqData(updatedFaqs);
    setDeleteLoading(false);
  };

  useEffect(() => {
    (async function () {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/view/faqs`
      );
      if (res.status !== 200) throw new Error("Error Fetching faq Data");
      setFaqData(res.data);
    })();
  }, []);

  if (Object.keys(faqData).length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.Faq_Main}>
      <h4>Manage FAQ</h4>
      <div className={styles.faq_container}>
        {faqData.map((faq) => (
          <SingleFaq
            faq={faq}
            key={faq.id}
            deleteLoading={deleteLoading}
            faqDeleteHandler={faqDeleteHandler}
          />
        ))}
      </div>
    </div>
  );
}

function SingleFaq({ faq, faqDeleteHandler, deleteLoading }) {
  return (
    <div className={styles.FAQ_Card}>
      <div className={styles.Card_content}>
        <h3>
          <span> Question :</span> {faq.question}
        </h3>
        <h3>
          <span> Answer :</span> {faq.answer}
        </h3>
        <h3>
          <span>Categorized : </span> {faq.categoryname}
        </h3>
      </div>
      <div className={styles.Card_action}>
        <IconButton
          aria-label="delete"
          color="primary"
          disabled={deleteLoading}
          onClick={() => faqDeleteHandler(faq.id)}
        >
          <DeleteIcon />
        </IconButton>
        <Link to={`/faq/edit-faqs/${faq.id}`}>
          <IconButton aria-label="Edit" color="primary">
            <EditIcon />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
