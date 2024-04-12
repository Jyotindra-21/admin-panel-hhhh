import React, { useEffect, useState } from "react";
import styles from "./PromoTnC.module.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { toast } from "react-toastify";
import getHeaders from "../../helpers/getReqHeaders";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";

export default function ManagePromoTnC() {
  const [promoTnc, setPromoTnc] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const promoDeleteHandler = async (id) => {
    setDeleteLoading(true);
    const res = await axios.delete(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/delete/promotnc",
      {
        data: { id },
        headers: getHeaders(),
      }
    );
    const updatedPromos = promoTnc.filter((promo) => promo.id !== id);
    if (res.status !== 200) return toast.error("Error deleting promos");
    toast.success("Promo deleted successfully");
    setPromoTnc(updatedPromos);
    setDeleteLoading(false);
  };

  const fetchPromos = async () => {
    const res = await axios.get(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/view/promotnc"
    );
    const combinedData = Object.values(res.data).flat();
    setPromoTnc(combinedData);
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  if (Object.keys(promoTnc).length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.Faq_Main}>
      <h4>Manage Promo TnC</h4>
      <div className={styles.faq_container}>
        {promoTnc &&
          promoTnc.map((promo) => (
            <PromoCard
              key={promo.id}
              promo={promo}
              promoDeleteHandler={promoDeleteHandler}
              deleteLoading={deleteLoading}
            />
          ))}
      </div>
    </div>
  );
}

function PromoCard({ promo, promoDeleteHandler, deleteLoading }) {
  return (
    <div className={styles.FAQ_Card}>
      <div className={styles.Card_content}>
        <h3>
          <span> Title :</span> {promo.title}
        </h3>
        <h3>
          <span> Description :</span> {promo.description}
        </h3>
        <h3>
          <span>Categorized : </span> {promo.categoryname}
        </h3>
      </div>
      <div className={styles.Card_action}>
        <IconButton
          aria-label="delete"
          color="primary"
          disabled={deleteLoading}
          onClick={() => promoDeleteHandler(promo.id)}
        >
          <DeleteIcon />
        </IconButton>
        <Link to={`/promo/edit-promo-tnc/${promo.id}`}>
          <IconButton aria-label="Edit" color="primary">
            <EditIcon />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
