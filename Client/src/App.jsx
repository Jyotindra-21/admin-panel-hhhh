import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import AddSliderImage from "./Pages/Slider/AddSliderImage";
import ManageSliderImage from "./Pages/Slider/ManageSliderImage";
import AddMenuItem from "./Pages/MenuItem/AddMenuItem";
import ManageMenuItem from "./Pages/MenuItem/ManageMenuItem";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AddBranches from "./Pages/Branches/AddBranches";
import ManageBranches from "./Pages/Branches/ManageBranches";
import AddVoucher from "./Pages/Voucher/AddVoucher";
import ManageVoucher from "./Pages/Voucher/ManageVoucher";
import AddCurrentVoucher from "./Pages/CurrentVoucher/AddCurrentVoucher";
import ManageCurrentVoucher from "./Pages/CurrentVoucher/ManageCurrentVoucher";
import AddCateringCourse from "./Pages/CateringCourse/AddCateringCourse";
import ManageCateringCourse from "./Pages/CateringCourse/ManageCateringCourse";
import ManageCateringPage from "./Pages/CateringPage/ManageCateringPage";
import AddFAQ from "./Pages/FAQ/AddFAQ";
import ManageFAQ from "./Pages/FAQ/ManageFAQ";
import AddPromoTnC from "./Pages/PromoTnC/AddPromoTnC";
import ManagePromoTnC from "./Pages/PromoTnC/ManagePromoTnC";
import EditFAQ from "./Pages/FAQ/EditFaq";
import Login from "./Pages/Login/Login";
import EditBranches from "./Pages/Branches/EditBranch";

import { ToastContainer } from "react-toastify";
import EditCurrentVoucher from "./Pages/CurrentVoucher/EditCurrentVoucher";
import EditCateringCourse from "./Pages/CateringCourse/EditCateringCourse";
import EditPromoTnC from "./Pages/PromoTnC/EditPromoTnC";
import PrivacyPolicy from "./Pages/Policy/PrivacyPolicy";
import Newsletter from "./Pages/Newsletter/Newsletter";
import EditMenuItem from "./Pages/MenuItem/EditMenuItem";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function App() {
  const [open, setOpen] = useState(true);
  const [isLogedIn, setIsLogedIn] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLogedIn(true);
    }
  }, []);

  return (
    <>
      {isLogedIn ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {/* HEADER */}
          <Header open={open} handleDrawerOpen={handleDrawerOpen} />
          {/* SIDEBAR */}
          <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
          <ToastContainer />
          <Main open={open}>
            <DrawerHeader />
            {/* ROUTES START */}
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route
                path="/slider/add-slider-image"
                element={<AddSliderImage />}
              />
              <Route
                path="/slider/manage-slider-image"
                element={<ManageSliderImage />}
              />
              <Route path="/menu/add-menu-item" element={<AddMenuItem />} />
              <Route
                path="/menu/manage-menu-item"
                element={<ManageMenuItem />}
              />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/branch/add-branches" element={<AddBranches />} />
              <Route
                path="/branch/manage-branches"
                element={<ManageBranches />}
              />
              <Route path="/voucher/add-voucher" element={<AddVoucher />} />
              <Route
                path="/voucher/manage-voucher"
                element={<ManageVoucher />}
              />
              <Route
                path="/voucher/add-current-voucher"
                element={<AddCurrentVoucher />}
              />
              <Route
                path="/voucher/manage-current-voucher"
                element={<ManageCurrentVoucher />}
              />
              <Route
                path="/catering/add-catering-course"
                element={<AddCateringCourse />}
              />
              <Route
                path="/catering/manage-catering-course"
                element={<ManageCateringCourse />}
              />
              <Route
                path="/catering/manage-catering-page"
                element={<ManageCateringPage />}
              />
              <Route path="/faq/add-faq" element={<AddFAQ />} />
              <Route path="/faq/manage-faq" element={<ManageFAQ />} />
              <Route path="/promo/add-promo-tnc" element={<AddPromoTnC />} />
              <Route
                path="/promo/manage-promo-tnc"
                element={<ManagePromoTnC />}
              />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/news-letter" element={<Newsletter />} />

              {/* Edit Routes */}
              <Route path="/faq/edit-faqs/:id" element={<EditFAQ />} />
              <Route
                path="/branch/edit-branch/:id"
                element={<EditBranches />}
              />
              <Route
                path="/voucher/edit-voucher/:id"
                element={<EditCurrentVoucher />}
              />
              <Route
                path="/catering/edit-catering-course/:id"
                element={<EditCateringCourse />}
              />
              <Route
                path="/promo/edit-promo-tnc/:id"
                element={<EditPromoTnC />}
              />
               <Route
                path="/menu/edit-menu-item/:id"
                element={<EditMenuItem />}
              />
            </Routes>
            {/* ROUTES END */}
          </Main>
        </Box>
      ) : (
        <Login />
      )}
    </>
  );
}
