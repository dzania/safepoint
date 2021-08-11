import React, { useState, useEffect } from "react";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";
import { Accordion, Card } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import userService from "../services/user-service";
import DeleteCredentialModal from "../components/DeleteCredentialModal";
import UpdateCredentialModal from "../components/UpdateCredentialModal";
import AddCredentialModal from "../components/AddCredentialModal";

export default function Dashboard() {
  const username = AuthService.getCurrentUserName();
  const [credentials, setCredentials] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  useEffect(() => {
    const getCredentials = UserService.getAllCredentials();
    getCredentials.then((response) => {
      setCredentials(response.data);
    });
  }, []);

  const handleEdit = (id) => {
    const updateCredentials = UserService.updateCredentials(id);
    updateCredentials.then(() => {
      refreshCredentials();
    });
  };

  const deleteCredentials = (id) => {
    const deleteCredentials = UserService.deleteCredentials(id);
    deleteCredentials.then(() => {
      refreshCredentials();
    });
  };

  const refreshCredentials = () => {
    userService.getAllCredentials().then((response) => {
      setCredentials(response.data);
    });
  };

  const addCredential = () => {
    console.log("prototyp");
  };

  return (
    <div className="container justify-content-center mx-auto">
      <h1 style={{ color: "whitesmoke" }}>Hi! {username}</h1>
      <button
        className="btn btn-success rounded-pill"
        onClick={handleShowAdd}
        style={{ margin: "auto", display: "flex" }}
      >
        Add new credentials
      </button>
      <AddCredentialModal show={showAdd} handleClose={handleCloseAdd} />
      {credentials.map((credential) => {
        return (
          <>
            <Accordion key={credential.id}>
              <Card style={{ marginTop: "10px" }}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  key={credential.id}
                >
                  {credential.website}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p>Login: {credential.login}</p>
                    <p>Password: {credential.password}</p>
                    <IconButton onClick={handleShowDelete}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={handleShowUpdate}>
                      <EditIcon />
                    </IconButton>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <DeleteCredentialModal
                show={showDelete}
                handleClose={handleCloseDelete}
                handleDelete={() => deleteCredentials(credential.id)}
              />
              <UpdateCredentialModal
                show={showUpdate}
                handleClose={handleCloseUpdate}
                handleEdit={credential.id}
              />
            </Accordion>
          </>
        );
      })}
    </div>
  );
}
