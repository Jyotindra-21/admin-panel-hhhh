import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./MenuItemCard.module.css";
import axios from "axios";
import { deleteFileFromBucket } from "../../helpers/deleteImage";
import getReqHeaders from "../../helpers/getReqHeaders";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MenuItemCard({
  img,
  title,
  description,
  category,
  id,
  handleMenuItemDelete,
  
}) {
  const [loading , setLoading] = React.useState(false)
  const menuItemDeleteHandler = async () => {
    setLoading(true)
    const deleteRes = await axios.delete(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/delete/menu",
      {
        headers: getReqHeaders(),
        data: { id: id },
      }
    );
    if (deleteRes.status == 200) {
      const res = await deleteFileFromBucket("menu", img);
      if (res.status == 200) {
        handleMenuItemDelete(id, category);
        setLoading(false)
      }
    } else {
      toast.success("Error Deleting Menu Data!", {
        position: "top-right",
      });
      setLoading(false)
    }
  };

  return (
    <Card className={styles.Menu_Item_Card}>
      <img className={styles.cardImage} src={img} />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category : {category}
        </Typography>
        <div>
          <Button
            style={{ marginRight: "5px" }}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            Edit
          </Button>
          <Button
            style={{ marginRight: "5px" }}
            color="error"
            variant="contained"
            onClick={menuItemDeleteHandler}
            disabled={loading}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
