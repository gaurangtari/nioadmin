import React, { useContext } from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";
// import Card from "@m";

import { SocketContext } from "../Context";
import Sidebar from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  video: {
    // width: "800px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  gridContainer: {
    justifyContent: "center",
    padding: "20px",
    [theme.breakpoints.down("xs")]: {},
  },
  paper: {
    margin: "10px",
  },
}));

const VideoPlayer = () => {
  const { myVideo, stream } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      {stream ? (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <video
              playsInline
              muted
              ref={null}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}

      <Grid item xs={6} md={6}>
        <Paper>
          <h1>telemetry data</h1>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VideoPlayer;
