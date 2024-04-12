import React, { useEffect, useState } from "react";
import styles from "./CurrentVoucher.module.css";
import CurrentVoucherCard from "../../Components/CurrentVoucherCard/CurrentVoucherCard";
import { toast } from "react-toastify";
import axios from "axios";
import getHeaders from "../../helpers/getReqHeaders";
import Loader from "../../Components/Loader";

export default function ManageCurrentVoucher() {
  const [vouchers, setVouchers] = useState([]);
  const [deletedLoading, setDeleteLoading] = useState(false);

  const fetchVouchers = async () => {
    const res = await axios.get(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/view/voucher"
    );
    if (res.status !== 200) throw new Error("Failed to Fetch Current Vouchers");
    setVouchers(res.data);
  };

  const handleDeleteVoucher = async (id) => {
    console.log(id);
    setDeleteLoading(true);
    const updatedVouchers = vouchers.filter((voucher) => voucher.id !== id);
    const res = await axios.delete(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/delete/vouchersection",
      {
        data: { id },
        headers: getHeaders(),
      }
    );
    if (res.status !== 200) return toast.error("Error deleting voucher");
    toast.success("Voucher deleted successfully");
    setVouchers(updatedVouchers);
    setDeleteLoading(false);
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  if (Object.keys(vouchers).length === 0) {
    return <Loader />;
  }
  return (
    <div className={styles.AddMenuItemContainer}>
      <h4>Manage Current Voucher</h4>
      <div className={styles.ManageContainer}>
        {vouchers &&
          vouchers.map((voucher) => (
            <CurrentVoucherCard
              key={voucher.id}
              id={voucher.id}
              img={voucher.imageurl}
              title={voucher.title}
              validity={voucher.validity}
              VoucherCode={`1245-2132-3659`}
              description={voucher.description}
              deletedLoading={deletedLoading}
              handleDeleteVoucher={handleDeleteVoucher}
            />
          ))}
      </div>
    </div>
  );
}
