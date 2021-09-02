import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import {
  Paper,
  TextField,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
const Register = ({ register, isAuthenticated }) => {
  const [snakOpen, setSnakOpen] = useState(false);
  const [snakbarMessage, setsnakbarMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setsnakbarMessage("password didn't match");
      setSnakOpen(true);
      return;
    }
    if (name.trim().length === 0) {
      setsnakbarMessage("please type name");
      setSnakOpen(true);
      return;
    }
    if (email.trim().length === 0) {
      setsnakbarMessage("please add valid email address");
      setSnakOpen(true);
      return;
    }
    if (password.trim().length < 6) {
      setsnakbarMessage("password should be atleast 6 characters");
      setSnakOpen(true);
      return;
    }
    setUploading(true);
    await register({ name, email, password, onFail });
    setUploading(false);
  };
  const onFail = () => {
    setsnakbarMessage("Error");
    setSnakOpen(true);
  };

  //if authenticated

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          className="bg-white  px-6 py-8 rounded shadow-md text-black w-full"
          onSubmit={onSubmit}
        >
          <h1 className="mb-8 text-3xl    text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            placeholder="Full Name"
            onChange={onChange}
          />

          <input
            type="email"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={onChange}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={onChange}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password2"
            placeholder="Confirm Password"
            onChange={onChange}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </form>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </a>
          .
        </div>
      </div>
      <Backdrop style={{ zIndex: "1600" }} open={uploading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snakOpen}
        autoHideDuration={6000}
        onClose={() => setSnakOpen(false)}
        message={snakbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setSnakOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register })(Register);
