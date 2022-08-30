import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../utils/responsive";
import Link from "next/link";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";

const Container = styled.div`
  height: 70px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 24px;
  color: black;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const { state, dispatch } = useContext(Store);
  const { user, cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = (e) => {
    e.preventDefault();
    Cookies.remove("cart");
    Cookies.remove("user");
    dispatch({ type: "CART_RESET" });
    dispatch({ type: "USER_LOGOUT" });
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer></SearchContainer>
        </Left>
        <Center>
          <Link href={"/"}>
            <a>
              <Logo>AMMAR.</Logo>
            </a>
          </Link>
        </Center>
        <Right>
          {user ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="text-blue-600">{user.name}</Menu.Button>
              <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/profile">
                    Profile
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink className="dropdown-link" href="/order-history">
                    Order History
                  </DropdownLink>
                </Menu.Item>
                {user.isAdmin && (
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/admin/dashboard"
                    >
                      Admin Dashboard
                    </DropdownLink>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <a
                    className="dropdown-link"
                    href="#"
                    onClick={logoutClickHandler}
                  >
                    Logout
                  </a>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href="/login">
              <a className="p-2">Login</a>
            </Link>
          )}
          <Link href="/cart">
            <MenuItem>
              <Badge
                overlap="rectangular"
                badgeContent={cartItemsCount}
                color="primary"
              >
                <Link href="/cart">
                  <a>
                    <ShoppingCartOutlined />
                  </a>
                </Link>
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
