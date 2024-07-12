import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import FormContainer from "../components/FormContainer.js";
import { login } from "../reducers/userReducers.js";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FormContainer>
      <div>Login Screen</div>
    </FormContainer>
  );
}

export default LoginScreen;
