import React, { lazy, Suspense } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/app.css";
import logo from "../assets/img/logo.png";
import Progress_bar from "./Progress_bar";
import dashboard_img from "../assets/img/dashboard.svg";
import info_img from "../assets/img/info.png";
import transfer_img from "../assets/img/transfer.svg";
import userlist_img from "../assets/img/user_list.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faSearch, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import keys from "../constant/keys";
const Home = lazy(() => import("../view/Dashboard"));
const Pages = lazy(() => import("./Pages"));
const User_management = lazy(() => import("../view/User_management"));
const Trach_Dx = lazy(() => import("../components/dashboard/Dx_tracking"));
const User_profile = lazy(() => import("../view/User_profile"));
const Dealer_management = lazy(() => import("../view/Dealer_management"));
const Dealer_profile = lazy(() => import("../view/Dealer_profile"));
const Order_list = lazy(() =>
  import("../components/business_report/Order_list")
);
library.add(fab, faSearch, faFileAlt);
export default class Header extends React.Component {
  onLogout = () => {
    localStorage.removeItem(keys.Preference.ACCESS_TOKEN);
    localStorage.removeItem(keys.Preference.REFRESH_TOKEN);
    window.location.reload();
  };
  render() {
    return (
      <div className="site_main_wrap">
        <Router>
          <header>
            <div className="d-flex flex-wrap bg-white align-items-center pl-3 py-2">
              <button className="border-0 bg-transparent left-bar-opner d-lg-none">
                <i className="fa fa-bars"></i>
              </button>
              <div className="site-logo">
                <img src={logo} height="50px" />
              </div>
              <div className="site-searchbar ml-4">
                <div className="input-group-set position-relative">
                  <input
                    className="header-field"
                    type="text"
                    placeholder="Type your keywords"
                  />
                  <div className="search-icon-field position-absolute">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                </div>
              </div>
              <div class="ml-auto pr-4">
                <button
                  type="button"
                  onClick={this.onLogout}
                  title="Logout"
                  className="logout-trigger"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="left-sidebar bg-white position-fixed h-100">
              <div className="left-sidebar-links">
                <ul className="list-unstyled px-2">
                  <li className="text-center mb-5">
                    <NavLink activeClassName="Nav-Bar-Active" to="/" exact>
                      <img src={dashboard_img} />
                    </NavLink>
                  </li>
                  <li className="text-center mb-5">
                    <NavLink
                      to="/user_management"
                      activeClassName="Nav-Bar-Active"
                    >
                      <img src={userlist_img} />
                    </NavLink>
                  </li>
                  <li class="text-center mb-5">
                    <NavLink
                      to="/businessReports"
                      activeClassName="Nav-Bar-Active"
                    >
                      <i>
                        <FontAwesomeIcon icon={faFileAlt} />
                      </i>
                    </NavLink>
                  </li>
                  <li className="text-center mb-5">
                    <NavLink
                      to="dealer_management"
                      activeClassName="Nav-Bar-Active"
                    >
                      <img src={transfer_img} />
                    </NavLink>
                  </li>
                  <li className="text-center mb-5">
                    <NavLink
                      to="/pages/Terms_conditions"
                      activeClassName="Nav-Bar-Active"
                    >
                      <img src={info_img} width="33px" />
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <Switch>
            <Suspense fallback={Progress_bar}>
              <Route exact path="/">
                <Home
                  username={this.props.username}
                  useravatar={this.props.useravatar}
                />
              </Route>
              <Route
                exact
                path="/pages/Terms_conditions"
                component={Pages}
              ></Route>
              <Route
                exact
                path="/user_management"
                component={User_management}
              ></Route>
              <Route
                exact
                path="/track_dx/:id"
                component={Trach_Dx}
              ></Route>
              <Route
                exact
                path="/businessReports"
                component={Order_list}
              ></Route>
              <Route
                exact
                path="/user_profile/:id"
                component={User_profile}
              ></Route>
              <Route
                exact
                path="/dealer_management"
                component={Dealer_management}
              ></Route>
              <Route
                exact
                path="/dealer_profile/:id"
                component={Dealer_profile}
              ></Route>
            </Suspense>
          </Switch>
        </Router>
      </div>
    );
  }
}
