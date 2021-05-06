import React, { useState, useEffect } from "react";
import "chart.js";
import user_avatar from "../../assets/img/user_img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { socket } from "../../services/socket";
import Services from "../../services";
import { withRouter } from "react-router";
import moment from "moment";
import Map from '../MapDirectionsRenderer';
import { GoogleApiKey } from "../../constant/keys"

function Dx_tracking(props) {
  const [data, setData] = useState({ dealer: {}, driver: {} });
  const [markers, setmarkers] = useState([]);
  const [driverMarker, setDriverMarker] = useState({ lat: "", lng: "" })
  useEffect(() => {
    getDx();
    socket.on("driver-coords", (data) => {
      console.log("tracking", data)
      if (data.orderId == props.match.params.id) {
        setDriverMarker({ lat: data.latitude, lng: data.longitude })
      }
    });
  }, [])

  const getDx = () => {
    // setLoading(true);
    Services.admin
      .getOrderbyId(props.match.params.id)
      .then((response) => {
        const json = response.data;
        // setLoading(false);
        setData(json);
        setmarkers([{ lat: json.dealer.lat, lng: json.dealer.long }, { lat: json.dropCoords.lat, lng: json.dropCoords.long }]);
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  return (
    <div className="mian-wrap-user ml-5">
      <div className="p-3 mt-5">
        <div className="card-cus-header text-center bg-cus-primary text-white">
          <p className="mb-0 text-uppercase">Live DX Tracking</p>
        </div>
        {data.dealer.lat && <div className="tracking-map">
          <Map
            markers={markers}
            driverMarker={driverMarker}
            defaultZoom={8}
            googleMapURL={
              'https://maps.googleapis.com/maps/api/js?key=' +
              GoogleApiKey +
              '&callback=initMap&libraries=geometry,drawing,places'
            }
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `75vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            defaultCenter={{
              lat: data.dealer.lat,
              lng: data.dealer.long
            }}
          />
          {/* <iframe
            style={{ height: "75vh" }}
            className="border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26360909.888257876!2d-113.74875964478716!3d36.242299409623534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1603705448362!5m2!1sen!2s"
            width="100%"
            height="250"
            frameborder="0"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe> */}
        </div>}
        <div className="d-flex align-items-center bg-white px-2">
          <div className="tracker-image">
            <img
              width="40px"
              height="40px"
              className="rounded-circle"
              src={data.dealer.image || user_avatar}
            />
          </div>
          <div className="user-info-rating">
            <p
              className="text-cus-primary pl-2 mb-0 font-700"
              style={{ fontsize: 14 + "px" }}
            >
              {data.dealer.fullname}
            </p>
            <div className="stars-ratings pl-2">
              <FontAwesomeIcon className="active" icon={faStar} />
              <FontAwesomeIcon className="active" icon={faStar} />
              <FontAwesomeIcon className="active" icon={faStar} />
              <FontAwesomeIcon className="active" icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
          </div>
          <div className="d-flex flex-wrap pl-2 mt-2" style={{ flex: 1 }}>
            <div className="d-flex align-items-center">
              <div className="company-image">
                <img
                  width="20px"
                  className="rounded-circle"
                  height="20px"
                  src={data.dealer.image || user_avatar}
                />
              </div>
              <div className="company-text pl-1">
                <p className="mb-0">{data.dealer.address}</p>
              </div>
            </div>
            <div className="d-flex ml-auto align-items-center">
              <div className="company-image">
                <img
                  width="20px"
                  className="rounded-circle"
                  height="20px"
                  src={data.driver.image || user_avatar}
                />
              </div>
              <div className="company-text pl-1">
                <p className="mb-0">{data.dropCoords ? data.dropCoords.address : null}</p>
              </div>
            </div>
            <div className="w-100 progress-bar-sec mt-2">
              <div className="progress-route w-100">
                <div
                  className="progress-bar-width bg-cus-success"
                  style={{ width: 30 + "%" }}
                ></div>
              </div>
              <div className="d-flex progress-label">
                {/* <span>{moment(data.pickupTime).format("hh:mm A")}</span> */}
                <span className="ml-auto">11:45PM</span>
              </div>
            </div>
          </div>
        </div>
      </div></div>
  );
}

export default withRouter(Dx_tracking);
