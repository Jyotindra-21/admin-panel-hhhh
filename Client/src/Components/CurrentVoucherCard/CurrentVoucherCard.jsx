import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./CurrentVoucherCard.module.css";
import { Link } from "react-router-dom";

export default function CurrentVoucherCard({
  img,
  title,
  description,
  validity,
  VoucherCode,
  id,
  handleDeleteVoucher,
  deletedLoading,
}) {
  return (
    <Card className={styles.Menu_Item_Card}>
      <img className={styles.cardImage} src={img} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {validity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {VoucherCode}
          </Typography>
        </div>
        <div>
          <Link to={`/voucher/edit-voucher/${id}`}>
            <Button
              style={{ marginRight: "5px" }}
              color="primary"
              variant="contained"
            >
              Edit
            </Button>
          </Link>
          <Button
            style={{ marginRight: "5px" }}
            color="error"
            variant="contained"
            disabled={deletedLoading}
            onClick={() => handleDeleteVoucher(id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
