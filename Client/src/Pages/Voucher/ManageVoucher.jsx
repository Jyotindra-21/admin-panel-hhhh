import React, { useEffect, useState } from "react";
import styles from "./Voucher.module.css";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { toast } from "react-toastify";

import getHeaders from "../../helpers/getReqHeaders";
import { deleteFileFromBucket } from "../../helpers/deleteImage";
import Loader from "../../Components/Loader";

export default function ManageVoucher() {
  const [voucherImages, setVoucherImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVoucherImage = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/view/slider?type=Voucher`
    );
    if (res.status !== 200)
      return toast.error("Error Fetching Voucher Images", {
        position: "top-right",
      });
    console.log(res.data);
    setVoucherImages(res.data);
  };

  const voucherImageDeleteHandler = async (id, image) => {
    setLoading(true)
    try {
      const response = await axios.delete(
        "https://admin-panel-hadramaut-react-f4r8.vercel.app/delete/slider",
        {
          data: { id },
          headers: getHeaders(),
        }
      );
      const res = await deleteFileFromBucket("sliders", image);
      fetchVoucherImage();

      if (response.status === 200 ) {
        setLoading(false)
        return toast.success("Voucher Image Deleted", {
          position: "top-right",
        });
      }
      setLoading(false)
      // 

    } catch (error) {
      console.error(error);
      return toast.error("Error while deleting voucher image", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchVoucherImage();
  }, []);

  if (Object.keys(voucherImages).length === 0) {
    return <Loader />;
  }
  return (
    <div className={styles.AddSliderContainer}>
      <h4>Manage Voucher</h4>
      <div className={styles.uploadContainer}>
        <div className={styles.TableContainer}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">Viewport</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {voucherImages &&
                  voucherImages.map((voucher, index) => (
                    <TableRow
                      key={voucher.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="td" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell component="td" scope="row">
                        <img
                          src={voucher.imageurl}
                          alt="boys play chess"
                          style={{ aspectRatio: "2/1", objectFit: "cover" }}
                        />
                      </TableCell>
                      <TableCell component="td" scope="row">
                        {voucher.viewport}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="error"
                          variant="contained"
                          disabled={loading}
                          onClick={() =>
                            voucherImageDeleteHandler(
                              voucher.id,
                              voucher.imageurl
                            )
                          }
                        >
                          {" "}
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
