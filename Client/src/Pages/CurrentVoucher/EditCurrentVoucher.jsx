import React, { useEffect, useState } from "react";
import styles from "./CurrentVoucher.module.css";
import { Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadFileToStorageAndGetUrl } from "../../helpers/uploadImage";
import axios from "axios";
import getHeaders from "../../helpers/getReqHeaders";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const TitleInput = styled("input")({
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  fontSize: "18px",
});
const DescriptionTextarea = styled("textarea")({
  width: "100%",
  borderRadius: "10px",
  padding: "10px",
  fontSize: "18px",
});
export default function EditCurrentVoucher() {
  const [voucherDetails, setVoucherDetails] = useState();
  const [image, setImage] = useState("");
  const { id } = useParams();

  const redirect = useNavigate();

  const fetchVoucher = async () => {
    const res = await axios.get(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/view/voucher"
    );
    if (res.status !== 200) throw new Error("Failed to Fetch Current Vouchers");
    const voucherData = res.data.filter((voucher) => voucher.id == id);
    setVoucherDetails(voucherData[0]);
  };

  useEffect(() => {
    fetchVoucher();
  }, []);

  const voucherUpdateHandler = async () => {
    if (!voucherDetails.title) return toast.error("Title is Required");
    if (!voucherDetails.validity)
      return toast.error("Select date For Validity");
    if (!voucherDetails.description) return toast.error("Enter Desciption");

    let publicUrl = voucherDetails.imageurl;
    if (image) {
      const res = await uploadFileToStorageAndGetUrl("voucher", image);
      publicUrl = res.publicUrl;
    }

    const data = { ...voucherDetails, imageurl: publicUrl };

    console.log(data);

    const res = await axios.put(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/update/vouchersection",
      data,
      {
        headers: getHeaders(),
      }
    );
    if (res.status !== 200) return toast.error("Error in Updating voucher");
    toast.success("Voucher Updated Successfully");
    setTimeout(redirect("/voucher/manage-current-voucher"), 1500);
  };

  return (
    <div className={styles.AddMenuItemContainer}>
      <h4>Update Current Voucher</h4>
      {voucherDetails && (
        <div className={styles.uploadContainer}>
          <div className={styles.uploadBox}>
            {!image && voucherDetails.imageurl ? (
              <img src={voucherDetails.imageurl} />
            ) : image ? (
              <img src={URL.createObjectURL(image)} />
            ) : (
              <CloudUploadIcon className={styles.ImageUploadIcon} />
            )}
          </div>
          <Button
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            color="secondary"
          >
            Select Image
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

          <TitleInput
            type="text"
            name="title"
            placeholder="Title"
            value={voucherDetails.title}
            onChange={(e) =>
              setVoucherDetails((prevData) => ({
                ...prevData,
                title: e.target.value,
              }))
            }
          />
          <TitleInput
            type="text"
            name="voucher_code"
            placeholder="Voucher Code"
            value={"00215"}
            //   onChange={(e) => setVoucherCode(e.target.value)}
          />
          <TitleInput
            type="date"
            name="validity"
            placeholder="Validity"
            value={voucherDetails.validity}
            onChange={(e) =>
              setVoucherDetails((prevData) => ({
                ...prevData,
                validity: e.target.value,
              }))
            }
          />
          <DescriptionTextarea
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder="Description"
            value={voucherDetails.description}
            onChange={(e) =>
              setVoucherDetails((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
          />
          <Button
            color="primary"
            variant="contained"
            onClick={voucherUpdateHandler}
          >
            Upload{" "}
          </Button>
        </div>
      )}
    </div>
  );
}
