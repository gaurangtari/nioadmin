import React, { useContext } from "react";
import { Button, makeStyles } from "@material-ui/core";

import { SocketContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  ansBtn: {
    margin: 10,
    backgroundColor: "#adebb3",
    color: "#0d3311",
    fontWeight: "bold",
  },
  dclBtn: {
    margin: 10,
    backgroundColor: "#FF0000",
    color: "#880808",
    fontWeight: "bold",
  },
}));

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  const classes = useStyles();

  return (
    <>
      {call.isReceivingCall && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>{call.name} calling... </h1>
          <Button
            variant="contained"
            onClick={answerCall}
            className={classes.ansBtn}
          >
            Answer
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log("call declined");
            }}
            className={classes.dclBtn}
          >
            Decline
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
