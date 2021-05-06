import React from "react";
import Pages from "../components/Pages";
import Top_dealers from "../components/Top_dealers";
import Services from "../services";
import User_profile from "../components/user_management/User_profile";
import Total_charts from "../components/user_management/Total_charts";
function User_management() {
  return (
    <section className="site-main-wrapper pt-66 pb-5 w-100">
      {/* <Pages /> */}
      <div className="row pl-mdnav-cus mx-0 pt-3">
        <div class="chat-header col-12 d-flex">
          <h3 class="text-cus-primary pt-4">Dealers Management</h3>
          <span className=" ml-auto ">
            <button
              className=" border-0 bg-cus-success rounded-pill text-white py-0 px-2"
              type="button"
            >
              <span className="mx-auto font-weight-bold">ADD DEALER</span>
            </button>
          </span>
        </div>
        <Top_dealers />
      </div>
    </section>
  );
}

export default User_management;
