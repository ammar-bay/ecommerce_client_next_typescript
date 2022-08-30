import React from "react";
import Layout from "../components/Layout";
import Slider from "../components/Slider";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Categories from "../components/Categories";
import axios from "../utils/axios";
import { product } from "../types/types";

interface products {
  products: product[];
}

const Index: React.FC<products> = ({ products }) => {
  return (
    <>
      <Layout>
        <Slider />
        <Categories />
        <Products products={products} />
        <Newsletter />
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const res = await axios.get("/products");
  const products: products = res.data;
  return {
    props: {
      products: products,
    },
  };
}

export default Index;
