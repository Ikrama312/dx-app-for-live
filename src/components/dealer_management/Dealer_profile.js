import React from "react";
import user_avatar from "../../assets/img/man_pic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faTrashAlt,
  faTimes,
  faUserAlt,
  faEnvelope,
  faPhoneAlt,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import user_img from "../../assets/img/user_img.png";

const User_profile = ({ data, deleteDealer, blockDealer, unblockDealer }) => {
  return (
    <div className="mian-wrap-user w-100">
      <div className="p-3">
        <div className="d-flex flex-wrap align-items-center">
          <div className="messager-avatar ">
            <img
              className="rounded-circle"
              src={data.image ? data.image : user_img}
              width="70px"
              height="70px"
            />
          </div>
          <div className=" pl-3">
            <h6 className="mb-0 text-cus-primary font-md-cus font-700">
              {data.fullName}
            </h6>
            <span className="mb-0" style={{ fontSize: 14 + "px" }}>
              <FontAwesomeIcon
                className="text-cus-success mr-1"
                icon={faMapMarkerAlt}
              />
              {data.address}
            </span>
          </div>
          <div className="user-manage-btn ml-auto">
            <button
              className="w-100 border-0 bg-cus-danger text-white d-flex align-items-center"
              type="button"
              onClick={deleteDealer}
            >
              {" "}
              <FontAwesomeIcon icon={faTrashAlt} />{" "}
              <span className="mx-auto">Delete User</span>
            </button>
            <button
              className="w-100 border-cus-danger mt-2 text-cus-danger d-flex align-items-center bg-none "
              type="button"
              onClick={() => {
                data.isBlocked ? unblockDealer() : blockDealer();
              }}
            >
              <i className="text-cus-danger round-border-style ">
                <FontAwesomeIcon icon={faTimes} />
              </i>
              <span className="mx-auto">
                {data.isBlocked ? "Unblock User" : "Block User"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-sm-12 mt-2">
          <div className="user-info-bar bg-trans-primary d-flex flex-wrap p-2 align-items-center radius-6">
            <i className="text-cus-primary mr-3">
              <FontAwesomeIcon icon={faMapMarker} />
            </i>
            <span className="text-cus-primary">{data.address}</span>
          </div>
        </div>
        <div className="col-sm-6 mt-2">
          <div className="user-info-bar bg-trans-primary d-flex flex-wrap p-2 align-items-center radius-6">
            <i className="text-cus-primary mr-3">
              <FontAwesomeIcon icon={faPhoneAlt} />
            </i>
            <span className="text-cus-primary">{data.phoneNumber}</span>
          </div>
        </div>
        <div className="col-sm-6 mt-2">
          <div className="user-info-bar bg-trans-primary d-flex flex-wrap p-2 align-items-center radius-6">
            <i className="text-cus-primary mr-3">
              <FontAwesomeIcon icon={faEnvelope} />
            </i>
            <span className="text-cus-primary">{data.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default User_profile;
