import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import axios from "axios";

const ShoppingList = () => {
  // const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const [items, setItem] = useState([]);
  // const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const fetchData = () => {
  //   return fetch("http://localhost:8000/api/products/")
  //     .then((response) => response.json)
  //     .then((data) => setItem(data));
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:8000/api/products/");
      setItem(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  // async function getItems() {
  //   const items = await fetch("http://localhost:8000/api/products/", {
  //     method: "GET",
  //   });
  //   const itemsJson = await items.json();
  //   dispatch(setItems(itemsJson.data));
  // }

  // useEffect(() => {
  //   getItems();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // const topRatedItems = items.filter(
  //   (item) => item.attributes.category === "topRated"
  // );
  // const newArrivalsItems = items.filter(
  //   (item) => item.attributes.category === "newArrivals"
  // );
  // const bestSellersItems = items.filter(
  //   (item) => item.attributes.category === "bestSellers"
  // );
  // const items = [{}];
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>ean</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item, index) => (
            <Item item={item} key={index} />
            // <div key={index}>
            //   <p>{item.item_name}</p>
            // </div>
          ))}
        {/* {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.item_name}-${item.id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.item_name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.item_name}-${item.id}`} />
          ))} */}
      </Box>
    </Box>
  );
};

export default ShoppingList;
