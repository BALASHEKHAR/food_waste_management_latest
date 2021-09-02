import React, { Fragment, useEffect } from "react";

import { Menu, Transition } from "@headlessui/react";
import "./Dashboard.css";
import Post from "../../components/Post/Post.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/post.js";
import { Link } from "react-router-dom";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import FilterListIcon from "@material-ui/icons/FilterList";

import MyLocationIcon from "@material-ui/icons/MyLocation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard = ({ getPosts, post: { posts, loading } }) => {
  const anchorRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [sortbyloc, setsortbyloc] = React.useState(false);
  const [inputval, setinputval] = React.useState("");
  const [filter, setfilter] = React.useState("Food");
  const [userCurrentlocation, setuserCurrentlocation] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current?.contains(event?.target)) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

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

  const setCurrentFilter = (e, fil) => {
    setfilter(fil);
    handleClose(e);
  };

  const renderPosts = () => {
    return posts
      ?.sort((a, b) => {
        if (sortbyloc) {
          const x1 = parseInt(a.lat),
            y1 = parseInt(a.lon);
          const x2 = parseInt(b.lat),
            y2 = parseInt(b.lon);
          const x3 = userCurrentlocation.latitude,
            y3 = userCurrentlocation.longitude;

          const d1 = Math.sqrt((x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3));
          const d2 = Math.sqrt((x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3));

          return d1 - d2;
        }
      })

      .filter((post, index) => {
        if (filter === "Food") {
          const allitems = [];
          post.items.map((item) => allitems.push(item.item_name));

          return allitems.toString().includes(inputval);
        } else if (filter === "Country") {
          if (post.country) return post.country.includes(inputval);
        } else {
          return post.name.includes(inputval);
        }
      })
      .map((postItem) => <Post key={postItem._id} post={postItem} />);
    // console.log(posts);

    // posts.map((postItem) => <Post key={postItem._id} post={postItem} />);
  };

  return (
    <div className="p-8 dashboard">
      <div className="dashboard_search_location">
        <div className="dashboard_search">
          <input
            value={inputval}
            onChange={(e) => setinputval(e.target.value)}
            placeholder={`search for ${filter}`}
            type="search"
            required
          />
          <FilterListIcon
            ref={anchorRef}
            onClick={handleToggle}
            className="filterIcon"
          />
        </div>

        <div className="dashboard_location">
          <button onClick={() => setsortbyloc(!sortbyloc)}>
            {!sortbyloc ? (
              <>
                <p className="sm:text-sm">location</p>
                <MyLocationIcon style={{ marginLeft: "5px" }} />
              </>
            ) : (
              <>
                time
                <ScheduleIcon style={{ marginLeft: "5px" }} />
              </>
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="flex flex-col mt-2  ">{renderPosts()}</div>
      )}
      <div
        data-aos="zoom-in-down"
        data-aos-delay="5000"
        className="float_donate"
        // onClick={openDonate}
      >
        <Link to="/donate">
          <button className="text-xl">Donate</button>
        </Link>
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={(e) => setCurrentFilter(e, "Food")}>
                    Food Items
                  </MenuItem>
                  <MenuItem onClick={(e) => setCurrentFilter(e, "Country")}>
                    Country
                  </MenuItem>
                  <MenuItem onClick={(e) => setCurrentFilter(e, "User")}>
                    User
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

Dashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPosts })(Dashboard);
