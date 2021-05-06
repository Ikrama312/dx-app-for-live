import React from "react";
import "chart.js";
import user_img from "../assets/img/user_img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faTrash,
  faTimes,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import Services from "../services";
import { withRouter } from "react-router-dom";
library.add(fab, faTrash, faTimes, faMapMarkerAlt);

class Top_users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealerData: [],
      loader: true,
    };
  }
  componentDidMount() {
    Services.admin
      .getDealer()
      .then((response) => {
        const json = response.data;
        this.setState({
          dealerData: json,
        });
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        this.setState({
          loader: false,
        });
      });
  }
  render() {
    return (
      <div className="w-100">
        <div className="px-3 w-100">
          <div className="custom-card mt-3 bg-white overflow-x-hidden w-100">
            <div className="card-cus-header text-center bg-cus-primary text-white">
              <p className="mb-0 text-uppercase">Top Dealers</p>
            </div>
            {this.state.loader !== false ? (
              <div class="w-100 text-center py-4">
                <div class="spinner-grow text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}
            {this.state.dealerData.map((dealer) => (
              <div
                className="users-messages border-bottom  px-2 pt-2 pb-3 position-relative"
                onClick={() => {
                  this.props.history.push(`/dealer_profile/${dealer.id}`);
                }}
              >
                <div className="d-flex flex-wrap  chat-user-box align-items-center">
                  <div className="messager-avatar ">
                    <img
                      className="rounded-circle"
                      src={dealer.image !== null ? dealer.image : user_img}
                      width="60px"
                      height="60px"
                    />
                  </div>
                  <div className="messager-detail pl-3">
                    <h6 className="mb-0 text-cus-primary">{dealer.fullName}</h6>
                    {dealer.address !== "" ? (
                      <span className="mb-0 text-cus-primary messager-state">
                        <FontAwesomeIcon
                          className="text-cus-success mr-1"
                          icon={faMapMarkerAlt}
                        />
                        {dealer.address}
                      </span>
                    ) : null}
                  </div>
                  <p className="rating-user-text text-cus-primary px-3 mx-auto mb-0 font-700">
                    4.8 <span>(187 Ratings)</span>
                  </p>
                  <div className="stars-ratings">
                    <i className="fa fa-star active"></i>
                    <i className="fa fa-star active"></i>
                    <i className="fa fa-star active"></i>
                    <i className="fa fa-star active"></i>
                    <i className="fa fa-star"></i>
                  </div>
                </div>
                <div className="user-mess-action">
                  <button
                    type="button"
                    className="bg-transparent border-0 px-0"
                    onClick={this.props.deleteDealer}
                  >
                    <span className="bg-cus-danger rounded-circle action-btn">
                      <FontAwesomeIcon
                        className="text-white"
                        key={dealer.id}
                        icon={faTrash}
                      />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="bg-transparent border-0 px-0"
                  >
                    <span className="border-cus-danger rounded-circle action-btn ml-2">
                      <FontAwesomeIcon
                        className="text-cus-danger "
                        key={dealer.id}
                        icon={faTimes}
                      />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Top_users);
