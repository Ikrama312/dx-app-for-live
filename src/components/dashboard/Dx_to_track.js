import React from "react";
import "chart.js";
import user_avatar from "../../assets/img/man_pic.jpg";
import user_img from "../../assets/img/user_img.png";
import { withRouter } from "react-router";
function Dx_to_track({ data, ...rest }) {
  return (
    <div className="w-100">
      <div className="card-cus-header text-center bg-cus-primary text-white">
        <p className="mb-0 text-uppercase">Live DX</p>
      </div>
      <div className="w-100 select-dx-track mt-3">
        <div className="dfx-selectors-list bg-white px-2 pb-2">
          <h5 className="text-cus-primary text-center mb-4 pt-3">
            Select DX to Track
          </h5>
          {data.map((item) => (
            <div className="dfx-selectors mb-2 d-flex align-items-center">
              <div className="dfx-selec-image">
                <div className="status-active position-relative">
                  <img
                    className="rounded-circle"
                    width="55px"
                    height="55px"
                    src={
                      item.driver.image !== null ? item.driver.image : user_img
                    }
                  />
                </div>
              </div>
              <div className="selectors-info pl-3" style={{ flex: 1 }}>
                <h5 className="mb-0">{item.driver.fullName}</h5>
                <div className="selectors-upper-info pl-3 position-relative">
                  <p className="mb-0">
                    {item.dealer.address}
                    {/* <span className="company_name">(Embond.OK)</span> */}
                  </p>
                  <span className="bottom-detail">{item.distance} KM</span>
                </div>
                <div className="selectors-bottom-info mt-1 pl-3 position-relative">
                  <p className="mb-0">
                    {item.dropCoords.address}
                    {/* <span className="company_name">(Embond.OK)</span> */}
                  </p>
                  {/* <span className="bottom-detail">Lorem Ispum</span> */}
                </div>
              </div>
              <div className="track-trigger">
                <button type="button" onClick={() => { rest.history.push(`/track_dx/${item.id}`) }} className="not-active-track px-2">
                  Track Now
                </button>
              </div>
            </div>
          ))}
          {/* <div className="dfx-selectors d-flex mb-2 align-items-center">
            <div className="dfx-selec-image">
              <div className="status-active position-relative">
                <img
                  className="rounded-circle"
                  width="55px"
                  height="55px"
                  src={user_avatar}
                />
              </div>
            </div>
            <div className="selectors-info pl-3" style={{ flex: 1 }}>
              <h5 className="mb-0">John Doe</h5>
              <div className="selectors-upper-info pl-3 position-relative">
                <p className="mb-0">
                  autonation INC
                  <span className="company_name">(Embond.OK)</span>
                </p>
                <span className="bottom-detail">Lorem Ispum</span>
              </div>
              <div className="selectors-bottom-info mt-1 pl-3 position-relative">
                <p className="mb-0">
                  autonation INC
                  <span className="company_name">(Embond.OK)</span>
                </p>
                <span className="bottom-detail">Lorem Ispum</span>
              </div>
            </div>
            <div className="track-trigger">
              <button type="button" className="not-active-track px-2">
                Track Now
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Dx_to_track);
