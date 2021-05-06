import React, { useEffect } from "react";
import Auth from "./view/Auth";
import { socket } from "./services/socket";
import { useSnackbar } from "notistack";


function App() {
  const { enqueueSnackbar } = useSnackbar();
  socket.on("messages", (msg) => {
    console.log("new Message", msg)
    enqueueSnackbar(`Message from ${msg.senderType}: ${msg.text}`, {
      variant: "primary",
    });
  });

  return (
    <React.Fragment>
      <Auth />
    </React.Fragment>
  );
}

export default App;
