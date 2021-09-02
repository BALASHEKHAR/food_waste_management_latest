import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Post from "../../components/Post/Post";
import "./ProfilePage.css";
import PropTypes from "prop-types";
import {
  Paper,
  TextField,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { connect } from "react-redux";

import { getPosts } from "../../actions/post.js";
import { updateUser } from "../../actions/auth.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProfilePage = ({
  updateUser,
  getPosts,
  post: { posts, loading },
  auth,
}) => {
  const [userPosts, setUserPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [snakOpen, setSnakOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [snakbarMessage, setsnakbarMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [valid, setValid] = useState(false);
  const [imgChange, setImageChange] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setImage(auth.user.avatar);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const uploadImageURL = (item) => {
    try {
      return URL.createObjectURL(item);
    } catch (error) {
      return item;
    }
  };

  useEffect(() => {
    getPosts();
    setUserPosts(posts.filter((e) => e.user === auth.user._id));
  }, [getPosts]);

  const updateProfile = async () => {
    if (imgChange) {
      // setSnackOpen(true);
      // setSnackText("Posting...");
      setUploading(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "SocialMedia");
      data.append("cloud_name", "djqrcbjmu");

      await fetch("	https://api.cloudinary.com/v1_1/djqrcbjmu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const Data = {};
          Data["avatar"] = data.secure_url;
          updateUser(Data, () => {
            console.log("success");
          });
        });
      setUploading(false);
    } else {
      setOpen(false);
    }
  };

  const points = userPosts
    .map((post) => parseInt(post.likes.length))
    .reduce((a, b) => a + b, 0);

  return (
    <div className="profile-page">
      <div className="header">
        <div data-aos="zoom-in-down" className="image">
          <Avatar src={auth.user.avatar} className="avatar" />
        </div>
        <div className="details">
          <h1 className="text-xl font-bold ">{auth.user.name}</h1>
          <h2 className="text-[#ffc600]">loves: {100 + points * 100}</h2>
          <EditIcon className="edit-icon" onClick={() => handleClickOpen()} />
        </div>
      </div>

      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="flex flex-col mt-2  ">
          {userPosts.length === 0 && (
            <h1 className="text-xl text-center">No Posts</h1>
          )}
          {userPosts.map((postItem) => (
            <Post key={postItem._id} post={postItem} />
          ))}
        </div>
      )}

      <Paper className="account_paper" elevation={3}>
        <Dialog
          style={{ maxWidth: "500px", margin: "auto" }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile();
            }}
          >
            <DialogTitle id="alert-dialog-slide-title">
              Edit Profile
            </DialogTitle>
            <DialogContent style={{ padding: "0px" }}>
              <div id="alert-dialog-slide-description">
                <p style={{ opacity: "0.7", padding: "0px 10px" }}>
                  <b>NOTE: </b>High resolution image takes much to upload,
                  please be patient
                </p>
                <br />
                <input
                  style={{ width: "100%", margin: "auto", paddingLeft: "10px" }}
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setValid(true);
                    setImageChange(true);
                  }}
                />
                <br />
                <br />
                <img
                  width="100%"
                  height="200px"
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                  alt="img"
                  src={uploadImageURL(image)}
                />
                <br />
                <br />
              </div>
            </DialogContent>
            <DialogActions>
              <Button type="button" onClick={handleClose} color="primary">
                cancel
              </Button>
              <Button type="submit" onClick={handleClose} color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Paper>
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
ProfilePage.propTypes = {
  updateUser: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, { getPosts, updateUser })(ProfilePage);
