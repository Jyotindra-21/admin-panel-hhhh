import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import MenuIcon from "@mui/icons-material/Menu";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AppsIcon from "@mui/icons-material/Apps";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import QuizIcon from "@mui/icons-material/Quiz";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import NewspaperIcon from '@mui/icons-material/Newspaper';

export const SideMenuData = [
  {
    id: 1,
    title: "Dashboard",
    path: "/",
    icon: <GridViewIcon />,
  },
  {
    id: 2,
    title: "Slider",
    path: "/",
    icon: <SlideshowIcon />,
    subNav: [
      {
        id: 201,
        title: "Add Slider Image",
        path: "/slider/add-slider-image",
        icon: <AddCircleOutlineRoundedIcon />,
      },
      {
        id: 202,
        title: "Manage Slider Image",
        path: "/slider/manage-slider-image",
        icon: <EditRoundedIcon />,
      },
    ],
  },
  {
    id: 3,
    title: "Menu",
    path: "/menu",
    icon: <MenuIcon />,
    subNav: [
      {
        id: 301,
        title: "Add Menu Item",
        path: "/menu/add-Menu-item",
        icon: <AddCircleOutlineRoundedIcon />,
      },
      {
        id: 302,
        title: "Manage Menu Item",
        path: "/menu/manage-menu-item",
        icon: <EditRoundedIcon />,
      },
    ],
  },
  {
    id: 4,
    title: "About Us",
    path: "/about-us",
    icon: <AcUnitIcon />,
  },
  {
    id: 5,
    title: "Branches",
    path: "/Branches",
    icon: <AppsIcon />,
    subNav: [
      {
        id: 501,
        title: "Add Branches",
        path: "/branch/add-branches",
        icon: <AddCircleOutlineRoundedIcon />,
      },
      {
        id: 502,
        title: "Manage Branches",
        path: "/branch/manage-branches",
        icon: <EditRoundedIcon />,
      },
    ],
  },
  {
    id: 6,
    title: "Voucher",
    path: "/",
    icon: <CardGiftcardIcon />,
    subNav: [
      {
        id: 601,
        title: "Add Voucher",
        path: "/voucher/add-voucher",
        icon: <AddCircleOutlineRoundedIcon />,
      },
      {
        id: 602,
        title: "Manage  Voucher",
        path: "/voucher/manage-voucher",
        icon: <EditRoundedIcon />,
      },
    ],
  },
  {
    id: 7,
    title: "Current Voucher",
    path: "/",
    icon: <CardGiftcardIcon />,
    subNav: [
      {
        id: 701,
        title: "Add Current Voucher",
        path: "/voucher/add-current-voucher",
        icon: <AddCircleOutlineRoundedIcon />,
      },
      {
        id: 702,
        title: "Manage Current Voucher",
        path: "/voucher/manage-current-voucher",
        icon: <EditRoundedIcon />,
      },
    ],
  },
  {
    id: 8,
    title: "Catering Course",
    path: "/",
    icon: <AutoGraphIcon />,
    subNav: [
      {
        id: 801,
        title: "Add Catering Course",
        path: "/catering/add-catering-course",
        icon: <AddCircleOutlineRoundedIcon />,
      },
      {
        id: 802,
        title: "Manage Catering Course",
        path: "/catering/manage-catering-course",
        icon: <EditRoundedIcon />,
      },
    ],
  },
  {
    id: 9,
    title: "Catering Page",
    path: "/catering/manage-catering-page",
    icon: <BakeryDiningIcon />,
  },
  {
    id: 10,
    title: "Privacy Policy",
    path: "/privacy-policy",
    icon: <PrivacyTipIcon />,
  },
  {
    id: 11,
    title: "FAQ",
    path: "/",
    icon: <QuizIcon />,
    subNav: [
      {
        id: 1101,
        title: "Add FAQ",
        path: "/faq/add-faq",
        icon: <AddCircleOutlineRoundedIcon />,
      },
      {
        id: 1102,
        title: "Manage FAQ",
        path: "/faq/manage-faq",
        icon: <EditRoundedIcon />,
      },
    ],
  },
  {
    id: 12,
    title: "Promo TnC",
    path: "/",
    icon: <QuizIcon />,
    subNav: [
      {
        id: 1201,
        title: "Add Promo TnC",
        path: "/promo/add-promo-tnc",
        icon: <AddCircleOutlineRoundedIcon />,
      },
      {
        id: 1202,
        title: "Manage Promo TnC",
        path: "/promo/manage-promo-tnc",
        icon: <EditRoundedIcon />,
      },
    ],
  },
  {
    id: 13,
    title: "News Letter",
    path: "/news-letter",
    icon: <NewspaperIcon />,
  },
];
