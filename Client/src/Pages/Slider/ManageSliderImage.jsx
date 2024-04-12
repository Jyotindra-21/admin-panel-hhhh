import React, { useEffect, useState } from "react";
import styles from "./Slider.module.css";
import { Button } from "@mui/material";
import Loader from "../../Components/Loader";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { toast } from "react-toastify";

export default function ManageSliderImage() {
  const [sliderImages, setSliderImages] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);


  const fetchSliderImages = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_API}/view/slider?type=Home`
    );
    if (res.status !== 200) throw new Error("Cant Fetch Home Sliders!");
    console.log(res.data);
    setSliderImages(res.data);
  };

  useEffect(() => {
    fetchSliderImages();
  }, []);

  const deleteSlidetImage = async (id) => {
    const config = {
      method: "delete",
      url: "https://admin-panel-hadramaut-react-f4r8.vercel.app/delete/slider",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ id: id }),
    };
    setIsDeleting(true);
    try {
      const response = await axios(config);
      console.log(response.data);
      toast.success(response.data.success);
      fetchSliderImages();
    } catch (error) {
      console.error(error);
      toast.error(response.data.error);
    }
    setIsDeleting(false);
  };

  if (Object.keys(sliderImages).length === 0) {
    return <Loader />;
  }
  return (
    <div className={styles.AddSliderContainer}>
      <h4>Manage Slider Image</h4>
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
                {sliderImages.map((slides, index) => (
                  <TableRow
                    key={slides.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="td" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="td" scope="row">
                      <img
                        src={slides.imageurl}
                        alt="Home Page Slider Image"
                        style={{
                          width: "100%",
                          aspectRatio: "2/1",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell component="td" scope="row">
                      {slides.viewport}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        color="error"
                        variant="contained"
                        disabled={isDeleting}
                        onClick={() => deleteSlidetImage(slides.id)}
                      >
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
