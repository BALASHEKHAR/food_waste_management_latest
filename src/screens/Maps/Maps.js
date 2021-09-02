import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import { format } from "timeago.js";
import { useLocation } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { getPosts } from "../../actions/post.js";

import "./Maps.css";

const Maps = ({ getPosts, post: { posts, loading } }) => {
  const inputRef = useRef();
  const location = useLocation();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 17.41342,
    longitude: 17.41342,
    zoom: 8,
  });

  const [foodItems, setfoodItems] = useState([]);
  const [searchedvalue, setsearchedvalue] = useState("");
  const [currentState, setcurrentState] = useState(null);
  const [userCurrentlocation, setuserCurrentlocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  //get currentUser location
  useEffect(async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setuserCurrentlocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => console.log(err)
    );
  }, []);

  //set food Items and convert them to string
  //check whether we came here from a post or by navbar using useLocation
  useEffect(async () => {
    const foodList = [];
    posts.map((postItem) => {
      const postob = {};
      postob["lat"] = postItem.lat;
      postob["lon"] = postItem.lon;
      postob["id"] = postItem._id;
      postob["address"] = postItem.address;
      postob["description"] = postItem.description;
      postob["foods"] = [];
      postItem.items.map((item) => {
        postob["foods"].push(item.item_name);
      });
      postob["foods"] = postob["foods"].toString();
      foodList.push(postob);
    });
    setfoodItems(foodList);

    if (location.state?.fromPost === true) {
      setViewport({
        ...viewport,
        latitude: location.state.lat,
        longitude: location.state.lon,
      });

      setcurrentState(location.state.id);
    } else {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          setViewport({
            ...viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => console.log(err)
      );
    }
  }, [posts]);
  const handleInputChange = () => {
    setsearchedvalue(inputRef.current.value);
  };
  const handleMarkerClick = (id, lat, lon) => {
    setcurrentState(id);
    setViewport({
      ...viewport,
      latitude: parseInt(lat),
      longitude: parseInt(lon),
    });
  };
  const getSeconds = (date) => {
    return (new Date().getTime() - Date.parse(date)) / 1000;
    //cur  - posted date sec
  };
  return (
    <div className="map">
      <div className="map-food-items">
        {foodItems.filter((food) => food.foods.includes(searchedvalue))
          .length === 0 && (
          <div style={{ textAlign: "center" }}>No Food items found</div>
        )}
        {foodItems
          .filter((food) => food.foods.includes(searchedvalue))
          .map((food, index) => {
            return (
              <Paper
                key={index}
                data-aos="fade-right"
                className="map-food-item"
                elevation={4}
              >
                <p>
                  <b>Address</b> : {food.address}
                </p>
                <p>
                  <b>Foods</b> : {food.foods}
                </p>
                <p>
                  <b>Description</b> : {food.description}
                </p>
                <div>
                  <button className="map-dir-btn">
                    <a
                      target="_blank"
                      href={`https://www.google.com/maps/search/?api=1&query=${food.address}`}
                    >
                      direction
                    </a>
                  </button>
                  <button
                    className="map-loc-btn"
                    onClick={() =>
                      handleMarkerClick(food.id, food.lat, food.lon)
                    }
                  >
                    location
                  </button>
                </div>
              </Paper>
            );
          })}
      </div>
      <div className="reactMapGl">
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken="pk.eyJ1Ijoia2FtYW5kbGFiYWxhc2hla2hhciIsImEiOiJja3JiZXJ0MWg0YjdpMndueHlzOHFmMmJhIn0.GK_kdlg4xXcqcdSF8gmDow"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          transitionDuration="400"
        >
          <Marker
            latitude={parseInt(userCurrentlocation.latitude)}
            longitude={parseInt(userCurrentlocation.longitude)}
            offsetLeft={-12}
            offsetTop={-5}
          >
            <MyLocationIcon
              style={{
                cursor: "pointer",
                font: viewport.zoom * 10,
                color: "green",
              }}
            />
            your are here
          </Marker>

          {posts.map((postItem, i) => {
            return (
              <div key={i}>
                <Marker
                  latitude={parseInt(postItem.lat)}
                  longitude={parseInt(postItem.lon)}
                  offsetLeft={-12}
                  offsetTop={-5}
                >
                  <RoomIcon
                    onClick={() =>
                      handleMarkerClick(
                        postItem._id,
                        postItem.lat,
                        postItem.lon
                      )
                    }
                    style={{
                      cursor: "pointer",
                      font: viewport.zoom * 10,
                      color: "red",
                    }}
                  />
                </Marker>

                {postItem._id === currentState && (
                  <Popup
                    latitude={parseInt(postItem.lat)}
                    longitude={parseInt(postItem.lon)}
                    closeButton={true}
                    onClose={() => setcurrentState(null)}
                    anchor="bottom"
                  >
                    <div style={{ zIndex: "200" }}>
                      <span className="maptimeago">
                        {format(postItem.date)}
                      </span>
                      <div className="mapuser">
                        <img src={postItem.avatar} />
                        <p>{postItem.name}</p>
                      </div>

                      <div style={{ fontSize: "12px", marginTop: "5px" }}>
                        <span style={{ color: "#FF00FF" }}>description :</span>{" "}
                        {postItem.description}
                      </div>

                      <div style={{ fontSize: "12px", marginTop: "5px" }}>
                        <span style={{ color: "#FF00FF" }}>Address :</span> :{" "}
                        {postItem.address}
                      </div>
                      <TableContainer style={{ maxWidth: "350px" }}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell size="small" align="center">
                                <b>Items</b>
                              </TableCell>
                              <TableCell align="center">
                                <b>quantity</b>{" "}
                              </TableCell>
                              <TableCell align="center">
                                <b>spoils in</b>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {postItem.items.map((row, index) =>
                              getSeconds(postItem.date) >
                              parseInt(row.spoil_in_hrs) * 60 * 60 ? (
                                <TableRow key={index}>
                                  <TableCell align="center">
                                    {row.item_name}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.availability}kgs
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    style={{ color: "red" }}
                                  >
                                    spoiled{" "}
                                    {Math.floor(
                                      (getSeconds(postItem.date) -
                                        parseInt(row.spoil_in_hrs) * 60 * 60) /
                                        1000
                                    )}
                                    hrs ago
                                  </TableCell>
                                </TableRow>
                              ) : (
                                <TableRow key={index}>
                                  <TableCell align="center">
                                    {row.item_name}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row.availability}kgs
                                  </TableCell>
                                  <TableCell align="center">
                                    <span style={{ color: "green" }}>
                                      {Math.floor(
                                        (parseInt(row.spoil_in_hrs) * 60 * 60 -
                                          getSeconds(postItem.date)) /
                                          1000
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
                      <div></div>
                    </div>
                  </Popup>
                )}
              </div>
            );
          })}

          <input
            placeholder="search food items here..."
            ref={inputRef}
            onChange={handleInputChange}
            className="map_search"
            type="search"
            required
          />
        </ReactMapGL>
      </div>
    </div>
  );
};
Maps.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Maps);
