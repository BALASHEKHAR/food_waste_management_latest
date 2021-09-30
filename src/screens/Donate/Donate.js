import React, { forwardRef, useState } from "react";
import { withRouter } from "react-router";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import { Box, Typography, Backdrop, CircularProgress } from "@material-ui/core";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Link, useLocation } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import MaterialTable from "material-table";
import "./Donate.css";
import { connect } from "react-redux";
import { addPost, updatePost } from "../../actions/post.js";
import PropTypes from "prop-types";
//icons

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Donate = ({ addPost, updatePost }) => {
  const location = useLocation();
  const [snakbarMessage, setSnakbarMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const init = {
    description: "",
    country: "",
    city: "",
    address: "",
    lat: "",
    lon: "",
    any_other: "",
    items: [],
    images: [],
    columns: [
      { title: "item_name", field: "item_name" },
      { title: "availability", field: "availability", type: "numeric" },
      { title: "spoil_in_hrs", field: "spoil_in_hrs", type: "numeric" },
    ],
    ...location.state?.postItem,
  };

  const [formData, setFormData] = useState(init);
  const {
    description,
    country,
    city,
    address,
    any_other,
    images,
    columns,
    items,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleRegion = (e) => {
    setFormData({ ...formData, ["city"]: e });
  };
  const handleCountry = (e) => {
    setFormData({ ...formData, ["country"]: e });
  };
  const eraseFormData = () => {
    setFormData(init);
    setUploading(false);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (images.length < 1) {
      setSnakbarMessage("select atleast one image");
      setOpen(true);
      return;
    }
    if (description.trim().length === 0) {
      setSnakbarMessage("write some description");
      setOpen(true);
      return;
    }
    if (country.trim().length === 0) {
      setSnakbarMessage("select country");
      setOpen(true);
      return;
    }
    if (city.trim().length === 0) {
      setSnakbarMessage("select state");
      setOpen(true);
      return;
    }
    if (address.trim().length === 0) {
      setSnakbarMessage("please add address");
      setOpen(true);
      return;
    }
    if (items.length === 0) {
      setSnakbarMessage("add atleast one item");
      setOpen(true);
      return;
    }
    setUploading(true);

    if (location.state?.fromPost === true) {
      await updatePost(formData, location.state?.id);
      setUploading(false);
    } else {
      await addPost(formData);
      eraseFormData();
    }
  };

  const uploadImageURL = (item) => {
    try {
      return URL.createObjectURL(item);
    } catch (error) {
      return item;
    }
  };

  const removeImage = (index) => {
    let imagesArray = images;
    imagesArray.splice(index, 1);
    setFormData({ ...formData, ["images"]: imagesArray });
  };

  return (
    <div className="new-post-compose">
      <div className="header">
        <h1 className="text-3xl">Donate</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="inputs">
          <textarea
            style={{ maxHeight: "400px" }}
            name="description"
            maxLength="480"
            rows="15"
            cols="30"
            placeholder="Compose a message here"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
          <CountryDropdown
            className="drop-downs"
            value={country}
            onChange={(e) => handleCountry(e)}
          />
          <RegionDropdown
            className="drop-downs"
            country={country}
            value={city}
            onChange={(e) => handleRegion(e)}
          />

          <input
            className="input-fields"
            name="address"
            type="address"
            placeholder="address"
            value={address}
            onChange={(e) => onChange(e)}
          />
          <input
            className="input-fields"
            name="any_other"
            type="text"
            placeholder="any other details"
            value={any_other}
            onChange={(e) => onChange(e)}
          />
          <MaterialTable
            style={{
              width: "90vw",
              maxWidth: "700px",
            }}
            className="material-table"
            icons={tableIcons}
            options={{ search: false, paging: false }}
            title="Add Food Items here"
            columns={columns}
            data={items}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setFormData({
                      ...formData,
                      ["items"]: [...items, newData],
                    });

                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...items];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;

                    setFormData({ ...formData, ["items"]: [...dataUpdate] });

                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...items];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setFormData({ ...formData, ["items"]: [...dataDelete] });

                    resolve();
                  }, 1000);
                }),
            }}
          />
        </div>

        <br />
        <Box display="flex" flexWrap="wrap">
          {images.map((item, index) => (
            <Box key={index} margin="12px">
              <img
                src={uploadImageURL(item)}
                style={{ height: "160px", width: "160px", objectFit: "cover" }}
              />
              <br />

              <DeleteIcon onClick={(e) => removeImage(index)} />
            </Box>
          ))}
        </Box>

        <input
          accept="image/*"
          hidden
          id="contained-button-file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              let imagesArray = images;

              imagesArray.push(e.target.files[0]);
              setFormData({ ...formData, images: imagesArray });

              e.target.value = null;
            }
          }}
          type="file"
        />
        <label htmlFor="contained-button-file" className="donate-btn">
          {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  rounded"> */}

          <span>AddImage</span>
        </label>

        <button onClick={onSubmit} className="donate-button">
          {location.state?.fromPost === true ? "Edit" : "Donate"}
        </button>
      </form>

      <Backdrop style={{ zIndex: "1600" }} open={uploading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={snakbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpen(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

Donate.propTypes = {
  addPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
};

export default connect(null, { addPost, updatePost })(Donate);
