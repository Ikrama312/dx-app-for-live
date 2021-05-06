import React, { useState, useEffect } from "react";
import Top_bar_user from "../components/Top_bar_user";
import Chart_1 from "../components/dashboard/Chart_1";
import Chart_2 from "../components/dashboard/Chart_2";
import Top_users from "../components/dashboard/Top_users";
import Dx_tracking from "../components/dashboard/Dx_tracking";
import Dx_to_track from "../components/dashboard/Dx_to_track";
import Dealership from "../components/dashboard/Dealership";
import Services from "../services";

function Dashboard(props) {
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [topDealers, setTopDealers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getOngoingOrders();
    getTopDealers();
  }, []);

  const getOngoingOrders = () => {
    setLoading(true);
    Services.admin
      .getOngoingOrders()
      .then((response) => {
        const json = response.data.data;
        setLoading(false);
        setOngoingOrders(json);
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getTopDealers = () => {
    setLoading(true);
    Services.admin
      .getDealer()
      .then((response) => {
        const json = response.data;
        setLoading(false);
        setTopDealers(json);
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section className="site-main-wrapper pt-66 pb-5">
      <div className="row pl-mdnav-cus mx-0">
        <div className="col-12 my-3">
          <Top_bar_user
            username={props.username}
            useravatar={props.useravatar}
          />
        </div>
        <div className="col-lg-6 row mx-0 px-0">
          <Chart_1 />
          <Chart_2 />
          <Top_users />
        </div>
        <div className="col-lg-4">
          {/* <Dx_tracking /> */}
          <Dx_to_track data={ongoingOrders} />
        </div>
        <div className="col-lg-2">
          <Dealership topDealers={topDealers} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
