import React from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Faq from "../view/Faq";
import Terms_conditions from "../view/Terms_conditions";
import About_us from "../view/About_us";
import Messages from "../view/Messages";
function page_nav() {
  return (
    <div className="site_main_wrap">
      <Router>
        <section className="pt-66 pb-5">
          <div className="row pl-mdnav-cus mx-0">
            <div className="head-tabs w-100">
              <ul className="list-unstyled mb-0 px-2 d-flex flex-wrap">
                <li className="text-center ml-3">
                  <NavLink
                    to="/pages/terms_conditions"
                    activeClassName="active"
                    className="d-block py-3"
                  >
                    Terms & Conditions
                  </NavLink>
                </li>
                <li className="text-center">
                  <NavLink
                    to="/pages/faq"
                    activeClassName="active"
                    className="d-block py-3"
                  >
                    FAQ'S
                  </NavLink>
                </li>
                <li className="text-center">
                  <NavLink
                    to="/pages/about_us"
                    activeClassName="active"
                    className="d-block py-3"
                  >
                    About Us
                  </NavLink>
                </li>
                <li className="text-center">
                  <NavLink
                    to="/pages/messages"
                    activeClassName="active"
                    className="d-block py-3"
                  >
                    Messaging
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <Switch>
          <Route path="/pages/faq">
            <Faq />
          </Route>
          <Route path="/pages/Terms_conditions">
            <Terms_conditions />
          </Route>
          <Route path="/pages/about_us">
            <About_us />
          </Route>
          <Route path="/pages/messages">
            <Messages />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default page_nav;
