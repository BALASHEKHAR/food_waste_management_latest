import React, { useState, useEffect } from "react";
import "./Post.css";
import { autoPlay } from "react-swipeable-views-utils";
import { format } from "timeago.js";
import { useHistory, Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import PropTypes from "prop-types";
import { addLike, removeLike, deletePost } from "../../actions/post.js";
import { connect } from "react-redux";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const Post = ({ deletePost, addLike, removeLike, auth, post }) => {
  const history = useHistory();
  const openMaps = () => {
    history.push("maps", {
      fromPost: true,
      id: post._id,
      lat: parseInt(post.lat),
      lon: parseInt(post.lon),
    });
  };

  const [activeStep, setactiveStep] = useState(0);
  const handleStepChange = (step) => {
    setactiveStep(step);
  };

  const {
    name,
    description,
    city,
    country,
    user,
    date,
    address,
    any_other,
    likes,
    avatar,
    images,
    _id,
    items,
  } = post;

  const editPost = () => {
    history.push("donate", {
      fromPost: true,
      id: _id,
      postItem: {
        name,
        description,
        city,
        country,
        user,
        date,
        address,
        any_other,
        likes,
        avatar,
        images,
        items,
      },
    });
  };
  const handleLikes = () => {
    if (likes.filter((e) => e.user === auth.user._id).length > 0) {
      removeLike(_id);
    } else {
      addLike(_id);
    }
  };
  const getSeconds = () => {
    return (new Date().getTime() - Date.parse(date)) / 1000;
    //cur  - posted date sec
  };

  return (
    <div data-aos="fade-up" className="post-container">
      <div className="post-container-details">
        <div>
          <p className=" text-xl posted_on ">{format(date)}</p>

          <div className="posted_by_user">
            <img src={avatar} />
            <h2 className="text-sm ml-2 font-bold">{name}</h2>
          </div>

          <div className="post_availability">
            <b>Description : </b>
            {description}
          </div>

          {/* tabel */}

          <div>
            <br />
            <TableContainer className="table" component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <b>Food Item</b>
                    </TableCell>
                    <TableCell align="center">
                      <b>Availability</b>{" "}
                    </TableCell>
                    <TableCell align="center">
                      <b>Spoils_in_hrs</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {post.items.map((row, index) =>
                    getSeconds() > parseInt(row.spoil_in_hrs) * 60 * 60 ? (
                      <TableRow key={index}>
                        <TableCell align="center">{row.item_name}</TableCell>
                        <TableCell align="center">
                          {row.availability}kgs
                        </TableCell>
                        <TableCell align="center" style={{ color: "red" }}>
                          spoiled{" "}
                          {Math.floor(
                            (getSeconds() -
                              parseInt(row.spoil_in_hrs) * 60 * 60) /
                              3600
                          )}
                          hrs ago
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={index}>
                        <TableCell align="center">{row.item_name}</TableCell>
                        <TableCell align="center">
                          {row.availability}kgs
                        </TableCell>
                        <TableCell align="center">
                          <span style={{ color: "green" }}>
                            {Math.floor(
                              (parseInt(row.spoil_in_hrs) * 60 * 60 -
                                getSeconds()) /
                                3600
                            )}
                            hrs
                          </span>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
          </div>

          <div className="post_loc">
            <b>Country : </b>
            {country}
          </div>
          <div className="post_loc">
            <b>City : </b>

            {city}
          </div>
          <div className="post_loc">
            <b>Address : </b>
            {address}
          </div>
          <div className="post_remined">
            <b>Other Details :</b>
            {any_other}
          </div>
        </div>
        <div className="post_button">
          <button className="req_now_btn d" onClick={handleLikes}>
            {likes.length} <i className="fas fa-heart "></i>
          </button>
          {!auth.loading && user === auth.user._id ? (
            <>
              <button onClick={editPost} className="map_req_now_btn">
                Edit
              </button>
              <button
                onClick={() => deletePost(_id)}
                className="di_req_now_btn"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button className="map_req_now_btn" onClick={openMaps}>
                Show on map
              </button>
              <button className="di_req_now_btn">
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/search/?api=1&query=${address}`}
                >
                  Show directions
                </a>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="post-container-img">
        <AutoPlaySwipeableViews
          className="ImageGallery"
          axis={"x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((image, index) => (
            <div
              key={index}
              style={{
                overflow: "hidden",
                width: "100%",
                height: "100%",
              }}
            >
              {/* {Math.abs(activeStep - index) <= images.length && ( */}
              <img
                style={{
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={image}
                alt=""
              />
              {/* )} */}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        {/* {images.length == 0 && (
          <img
            style={{
              overflow: "hidden",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src="https://digitalfinger.id/wp-content/uploads/2019/12/no-image-available-icon-6-600x375.png"
            alt=""
          />
        )} */}
      </div>
    </div>
  );
};

Post.protoTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  Post
);
