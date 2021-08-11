import React, { useState, useEffect } from "react";
import AuthService from "../services/auth-service";
import UserService from "../services/user-service";
import { Accordion, Card } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import userService from "../services/user-service";
import DeletePopup from '../components/DeletePopup'

export default function Dashboard() {
  const username = AuthService.getCurrentUserName();
  const [credentials, setCredentials] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getCredentials = UserService.getAllCredentials();
    getCredentials.then((response) => {
      setCredentials(response.data);
    });
  }, []);

  const handleEdit = (id) => {
    const updateCredentials = UserService.updateCredentials(id);
    updateCredentials.then(()=>{
      refreshCredentials();
    })
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

  const handleAdd = () => {
    console.log("prototyp");
  };

  return (
    <div className="container justify-content-center mx-auto">
      <h1 style={{ color: "whitesmoke" }}>Hi! {username}</h1>
      <button
        className="btn btn-success rounded-pill"
        onClick={() => handleAdd()}
        style={{ margin: "auto", display: "flex" }}
      >
        Add new credentials
      </button>
      {credentials.map((credential) => {
        return (
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
                  <IconButton onClick={handleShow}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit()}>
                    <EditIcon />
                  </IconButton>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <DeletePopup show={show}
            handleClose={handleClose} 
            handleDelete={()=> deleteCredentials(credential.id)}
            />
          </Accordion>
        );
      })}
    </div>
  );
}
