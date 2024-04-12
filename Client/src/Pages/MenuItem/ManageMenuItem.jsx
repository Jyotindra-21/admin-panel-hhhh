import React, { useEffect, useState } from "react";
import styles from "./MenuItem.module.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Loader from "../../Components/Loader";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItemCard from "../../Components/MenuItemCard/MenuItemCard";
import axios from "axios";
import { toast } from "react-toastify";

export default function ManageMenuItem() {
  const [category, setCategory] = useState("All");
  const [menuCateg, setMenuCateg] = useState([]);
  const [menuData, setMenuData] = useState();


  const [dataByCategVise, setDataByCategVise] = useState([]);

  const formateMenuData = (data) => {
    // Filter Menu Categories
    const menuItems = Object.keys(data).map((item) => {
      return item;
    });
    setMenuCateg(menuItems);
  };

  const handleFilter = (e) => {
    const category = e.target.value;
    setCategory(category);
    if (category) {
      setDataByCategVise(menuData[category]);
    }
  };

  const handleMenuItemDelete = (id, category) => {
   
    const index = menuData[category].findIndex((item) => item.id === id);
    const updatedCategoryItems = [...menuData[category]];
    updatedCategoryItems.splice(index, 1);
    setMenuData((prevState) => ({
      ...prevState,
      [category]: updatedCategoryItems,
    }));
    toast.success("Menu Item Deleted", {
      position: "top-right",
    });
   
  };

  useEffect(() => {
    (async function () {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/view/menu`
      );
      if (res.status !== 200) throw new Error("Error Fetching Menu Data");
      formateMenuData(res.data);
      setMenuData(res.data);
    })();
  }, []);

  if (Object.keys(menuCateg).length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.AddMenuItemContainer}>
      <h4>Manage Menu Item</h4>
      <div className={styles.ManageContainer}>
        <Box sx={{ maxWidth: 180, marginLeft: "auto", marginBottom: "10px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleFilter}
            >
              <MenuItem value={"All"} selected>
                All
              </MenuItem>
              {menuCateg.map((categ) => (
                <MenuItem value={categ} key={categ}>
                  {categ}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {menuData && category == "All" ? (
          Object.entries(menuData).map(([category, data]) => {
            if (data && data?.length) {
              return (
                <div key={category}>
                  {data.map((item) => (
                    <MenuItemCard
                      handleMenuItemDelete={handleMenuItemDelete}
                      id={item.id}
                      key={item.id}
                      img={item.imageurl}
                      title={item.name}
                      category={category}
                      description={item.description}
                    />
                  ))}
                </div>
              );
            }
          })
        ) : (
          <div>
            {dataByCategVise.map((item) => {
              console.log(dataByCategVise);
              return (
                <MenuItemCard
                  handleMenuItemDelete={handleMenuItemDelete}
                  id={item.id}
                  key={item.id}
                  img={item.imageurl}
                  title={item.name}
                  category={item.categoryname}
                  description={item.description}
                />
              );
            })}
          </div>
        )}
        {dataByCategVise?.length == 0 && category !== "All" && (
          <h2 style={{ textAlign: "center" }}>No Items For This Category</h2>
        )}
      </div>
    </div>
  );
}
