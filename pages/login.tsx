import { Link } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import FormInput from "../components/FormulaInput";
import React from "react";
import { axiosPublic } from "../utils/axios";
import { Store } from "../utils/Store";

const App = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("/bg1.jpg");
  background-size: cover;
  background-position: center;
`;

const Form = styled.form`
  background-color: white;
  padding: 0px 60px;
  border-radius: 10px;
`;

const H1 = styled.h1`
  color: teal;
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: none;
  background-color: teal;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const A = styled.a`
  justify-content: center;
  color: teal;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  margin-bottom: 10px;
`;

const inputs = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
    required: true,
  },

  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    label: "Password",
    // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  },
];

const login: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    password: "",
    email: "",
  });
  const redirect = router.query.redirect;
  console.log(redirect);

  useEffect(() => {
    if (state.user) {
      console.log("user is already logged in");
      router.replace("/");
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosPublic.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      console.log(JSON.stringify(result.data));

      dispatch({ type: "USER_LOGIN", payload: result.data });
      router.replace(redirect?.toString() || "/");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {loading ? (
        "Loading"
      ) : (
        <App>
          <Form onSubmit={handleSubmit}>
            <H1>Login</H1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <Button>Submit</Button>
            <Link href="/register">
              <A>Register</A>
            </Link>
          </Form>
        </App>
      )}
    </div>
  );
};

export default login;
