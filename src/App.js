import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <ResponsiveAppBar />
      <VideoPlayer />
      <Notifications />
    </div>
  );
};

export default App;
