import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-validation/build/form";
import UserService from "../services/user-service";
import CheckButton from "react-validation/build/button";

export default function UpdateCredentialModal(props) {
  const form = useRef();
  const checkBtn = useRef();

  const [website, setWebsite] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeWebsite = (e) => {
    const website = e.target.value;
    setWebsite(website);
  };

  const onChangeLogin = (e) => {
    const login = e.target.value;
    setLogin(login);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      UserService.updateCredentials(props.id,website, login, password).then(
        () => {
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Form onSubmit={handleAdd} ref={form}>
        <Modal.Body>
          <h5>Change credential for {props.website}</h5>
          <div className="form-group">
            <input
              class="form-control"
              id="website"
              placeholder="Website"
              value={website}
              onChange={onChangeWebsite}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <input
              class="form-control"
              id="login"
              placeholder="login"
              value={login}
              onChange={onChangeLogin}
              validations={[required]}
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="InputPassword1"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary rounded-pill" onClick={props.handleClose}>
            Close
          </Button>
          <Button
            variant="success rounded-pill"
            disabled={loading}
            onClick={handleAdd}
          >
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            Add
          </Button>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </Modal.Footer>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </Modal>
  );
}

