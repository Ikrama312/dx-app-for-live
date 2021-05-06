import React, { useState } from "react";
import "chart.js";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import user_img from "../assets/img/user_img.png";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  TextField,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Services from "../services";
import { useSnackbar } from "notistack";
import moment from "moment";

const Top_bar_user = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [modal, setModal] = useState(false);
  const [notification, setNotification] = useState("");
  const [title, setTitle] = useState("");
  const [driverCheck, setDriverCheck] = useState(false);
  const [dealerCheck, setDealerCheck] = useState(false);
  const [date, setDate] = useState("2017-05-24T10:30");

  const toggle = () => setModal(!modal);

  const sendNotification = (now) => {
    // setLoading(true);
    const to = [];
    dealerCheck && to.push("dealer");
    driverCheck && to.push("driver");
    Services.admin
      .sendNotification({
        title,
        message: notification,
        to,
        now,
        time: date,
      })
      .then((response) => {
        const json = response.data;
        enqueueSnackbar(
          now
            ? "Notification Sent Successfully!"
            : "Notification Scheduled Successfully!",
          {
            variant: "success",
          }
        );
        setTitle("");
        setNotification("");
        setDriverCheck(false);
        setDealerCheck(false);
        setDate("2017-05-24T10:30");
        toggle();
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => { });
  };

  const onsubmit = (now) => {
    if (!title) {
      enqueueSnackbar("Title is required!", {
        variant: "error",
      });
      return;
    }
    if (!notification) {
      enqueueSnackbar("Notification is required!", {
        variant: "error",
      });
      return;
    }
    if (!dealerCheck && !driverCheck) {
      enqueueSnackbar("Atleast select one send to role!", {
        variant: "error",
      });
      return;
    }
    if (!date && !now) {
      enqueueSnackbar("Select a date!", {
        variant: "error",
      });
      return;
    }
    sendNotification(now);
  };

  return (
    <div className="w-100">
      <div className="d-flex flex-wrap">
        <div className="user-image">
          <div className="status-active position-relative">
            <img
              className="rounded-circle"
              src={props.useravatar !== null ? props.useravatar : user_img}
              width="65px"
              height="65px"
            />
          </div>
        </div>
        <div className="user-info ml-4">
          <p className="mb-2 font-700">
            Hi <span className="text-capitalize"> , {props.username}</span>
          </p>
          <h4>Welcome back!</h4>
        </div>
        <div className="ml-auto position-relative datepicker-wrap w-300">
          <DateRangePicker>
            <input
              type="text"
              className="input-date-design w-100"
              name="daterange"
              readonly="true"
            />
          </DateRangePicker>
          <div
            className="position-absolute"
            style={{ right: 13 + "px", top: 9 + "px" }}
          >
            <i className="fa fa-calendar"></i>
          </div>
          <div
            className="position-absolute"
            style={{ right: 13 + "px", top: 9 + "px" }}
          >
            <i className="fa fa-angle-down"></i>
          </div>
        </div>
      </div>
      <button
        className=" border-0 bg-cus-success rounded-pill text-white float-right py-1 px-2"
        type="button"
        onClick={toggle}
      >
        <span className="mx-auto font-weight-bold">SEND NOTIFICATION</span>
      </button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Send Notification</ModalHeader>
        <ModalBody>
          <InputLabel htmlFor="my-input" className="text-dark">
            Write a new Notification
          </InputLabel>
          <TextField
            value={title}
            className="mb-2"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            fullWidth
            variant="outlined"
          />
          <TextField
            id="my-input"
            value={notification}
            onChange={(e) => setNotification(e.target.value)}
            inputProps={{
              maxlength: 300,
            }}
            placeholder="Type your message here..."
            helperText={`${notification.length}/300`}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
          <InputLabel className="text-dark">Send To</InputLabel>
          <div className="row mx-0">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <FormControlLabel
                value={driverCheck}
                onChange={(e) => {
                  setDriverCheck(e.target.value);
                }}
                control={<Checkbox color="primary" />}
                label="Drivers"
                labelPlacement="end"
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <FormControlLabel
                value={dealerCheck}
                onChange={(e) => {
                  setDealerCheck(e.target.value);
                }}
                control={<Checkbox color="primary" />}
                label="Dealers"
                labelPlacement="end"
              />
            </div>
          </div>
          <div className="text-right">
            <button
              className="border border-cus-primary border-1 bg-cus-primary rounded-pill text-white py-1 px-4"
              type="button"
              onClick={() => onsubmit(true)}
            >
              <span className="mx-auto font-weight-bold">SEND NOW</span>
            </button>
          </div>
          <InputLabel htmlFor="future-date" className="text-dark">
            SCHEDULE FOR FUTURE
          </InputLabel>
          <TextField
            id="datetime-local"
            // label="Next appointment"
            type="datetime-local"
            variant="outlined"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="w-100"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div className="py-2 text-right">
            <button
              className="border border-cus-primary border-1 bg-cus-white rounded-pill text-cus-primary py-1 px-4"
              type="button"
              onClick={() => onsubmit(false)}
            >
              <span className="mx-auto font-weight-bold">SCHEDULE NOW</span>
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Top_bar_user;
