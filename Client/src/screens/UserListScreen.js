import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import PopupWindow from "../components/PopupWindow.js";
import { deleteUser, fetchUsers } from "../actions/userActions.js";
import { DELETE_USER_RESET } from "../constants/userConstants.js";

function UserListScreen() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { user } = useSelector((state) => state.userProfile);
  const { loading, error, users } = useSelector((state) => state.userList);
  const { fullfilled, error: deleteUserError } = useSelector(
    (state) => state.userDelete
  );

  useEffect(() => {
    if (user && user.is_staff) {
      dispatch(fetchUsers());
    } else {
      navigate("/");
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (fullfilled) {
      setShow(false);
      dispatch({
        type: DELETE_USER_RESET,
      });
      dispatch(fetchUsers());
    }
  }, [fullfilled, dispatch]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>STAFF</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email}</td>
                <td>
                  {user.is_staff ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <div className="d-flex justify-content-evenly">
                    <LinkContainer to={`/admin/user/${user.id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        setShow(true);
                        setUserToDelete(user.id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <PopupWindow show={show}>
        <div className="text-center">Are you sure you want to delete?</div>
        <div className="d-flex justify-content-evenly mt-3">
          <Button
            className="btn-md"
            variant="danger"
            onClick={() => {
              deleteUserHandler(userToDelete);
            }}
          >
            Delete
          </Button>
          <Button
            className="btn-md"
            variant="primary"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </div>
        {deleteUserError && (
          <div className="d-flex justify-content-center mt-3">
            <Message variant="danger">{deleteUserError}</Message>
          </div>
        )}
      </PopupWindow>
    </div>
  );
}

export default UserListScreen;
