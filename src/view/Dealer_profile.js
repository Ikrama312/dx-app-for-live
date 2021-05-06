import React from "react";
import Dealer_profile from "../components/dealer_management/Dealer_profile";
import Total_charts from "../components/dealer_management/Total_charts";
import Messaging from "../components/dealer_management/messaging";
import { useEffect } from "react";
import Services from "../services";
import { withRouter } from "react-router-dom";
import { useState } from "react";
const User_details = (props) => {
  const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getDealerDetail();
    getDealerStats();
    getRoomMessages();
  }, []);

  const getRoomMessages = () => {
    setLoading(true);
    Services.admin
      .getRoomMessages({ dealer_id: props.match.params.id })
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
      .getDealerDetails(props.match.params.id)
      .then((response) => {
        const json = response.data;
        setLoading(false);
        setData({ ...json, dealer_id: json.id });
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getDealerStats = () => {
    setLoading(true);
    Services.admin
      .getDealerStats(props.match.params.id)
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
      .deleteDealer(props.match.params.id)
      .then((response) => {
        const json = response.data;
        props.history.push("/");
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => { });
  };

  const blockDealer = () => {
    setLoading(true);
    Services.admin
      .blockDealer(props.match.params.id)
      .then((response) => {
        const json = response.data;
        getDealerDetail();
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => { });
  };

  const unblockDealer = () => {
    setLoading(true);
    Services.admin
      .unblockDealer(props.match.params.id)
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
            <Dealer_profile
              data={data}
              deleteDealer={deleteDealer}
              blockDealer={blockDealer}
              unblockDealer={unblockDealer}
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
