import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import FormContainer from "../components/FormContainer.js";
import { adminFetchUser, adminUpdateUser } from "../actions/userActions.js";
import { ADMIN_UPDATE_USER_RESET } from "../constants/userConstants.js";

function UserEditScreen() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userId = useParams().id;

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isStaff, setIsStaff] = useState(false);

  const { user } = useSelector((state) => state.userProfile);

  const { user: userToEdit } = useSelector((state) => state.adminEdit);

  const { loading, error, fullfilled } = useSelector(
    (state) => state.adminUpdate
  );

  useEffect(() => {
    if (user && user.is_staff) {
      if (!userToEdit || userToEdit.id !== Number(userId)) {
        dispatch(adminFetchUser(userId));
      }
    } else {
      navigate("/");
    }
  }, [userId, user, userToEdit, dispatch, navigate]);

  useEffect(() => {
    if (userToEdit && fullfilled) {
      dispatch({ type: ADMIN_UPDATE_USER_RESET });
      dispatch(adminFetchUser(userId));
    }
  }, [userToEdit, fullfilled, userId, dispatch]);

  useEffect(() => {
    if (userToEdit) {
      setFirstname(userToEdit.first_name);
      setLastname(userToEdit.last_name);
      setUsername(userToEdit.username);
      setEmail(userToEdit.email);
      setIsStaff(userToEdit.is_staff);
    }
  }, [userToEdit]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      adminUpdateUser(
        userToEdit.id,
        username,
        email,
        firstname,
        lastname,
        isStaff
      )
    );
  };

  return (
    <div>
      <Link to="/admin/users">Go Back</Link>
      <h1>Edit User</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <FormContainer center xs={12} md={6}>
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="formIsStaff" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Is Staff"
              checked={isStaff}
              onChange={(e) => {
                setIsStaff(e.target.checked);
              }}
            ></Form.Check>
          </Form.Group>

          <Button className="mb-3" type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;
