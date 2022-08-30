import styled from "styled-components";
import Product from "./Product";
import { product } from "../types/types";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface productsprops {
  cat?: string;
  products: product[];
}

const Products: React.FC<productsprops> = ({ cat, products }) => {
  return (
    <Container>
      {cat
        ? products.map((product) => (
            <Product product={product} key={product._id} />
          ))
        : products
            ?.slice(0, 5)
            .map((item) => <Product product={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
