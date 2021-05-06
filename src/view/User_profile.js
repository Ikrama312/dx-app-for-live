import React from "react";
import User_profile from "../components/user_management/User_profile";
import Total_charts from "../components/user_management/Total_charts";
import Messaging from "../components/user_management/messaging";
import { useEffect } from "react";
import Services from "../services";
import { withRouter } from "react-router-dom";
import { useState } from "react";

const User_details = (props) => {
  const [data, setData] = useState({});
  const [stats, setStats] = useState({});
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getDealerDetail();
    getDriverStats();
    getRoomMessages();
  }, []);

  const getRoomMessages = () => {
    setLoading(true);
    Services.admin
      .getRoomMessages({ driver: data, driver_id: props.match.params.id })
      .then((response) => {
        const json = response.data.data.reverse();
        setLoading(false);
        setMessages(json);
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDealerDetail = () => {
    setLoading(true);
    Services.admin
      .getDriverDetails(props.match.params.id)
      .then((response) => {
        const json = response.data;
        setLoading(false);
        setData({ ...json, driver_id: json.id });
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDriverStats = () => {
    setLoading(true);
    Services.admin
      .getDriverStats(props.match.params.id)
      .then((response) => {
        const json = response.data;
        setLoading(false);
        setStats(json);
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteDealer = () => {
    setLoading(true);
    Services.admin
      .deleteDriver(props.match.params.id)
      .then((response) => {
        const json = response.data;
        props.history.push("/");
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => { });
  };
  const blockDriver = () => {
    setLoading(true);
    Services.admin
      .blockDriver(props.match.params.id)
      .then((response) => {
        const json = response.data;
        getDealerDetail();
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => { });
  };

  const unblockDriver = () => {
    setLoading(true);
    Services.admin
      .unblockDriver(props.match.params.id)
      .then((response) => {
        const json = response.data;
        getDealerDetail();
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => { });
  };
  return (
    <section className="w-100">
      <div className="row pl-mdnav-cus mx-0">
        <div class="chat-header col-12">
          <h3 class="text-cus-primary pt-4">User Profile</h3>
        </div>
        {isLoading ? (
          <div class="w-100 text-center py-4">
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <User_profile
              data={data}
              deleteDealer={deleteDealer}
              blockDriver={blockDriver}
              unblockDriver={unblockDriver}
            />
            <Total_charts data={stats} />
            <Messaging data={data} roomMessages={messages} />
          </React.Fragment>
        )}
      </div>
    </section>
  );
};

export default withRouter(User_details);
