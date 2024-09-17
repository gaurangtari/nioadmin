import React, { useContext } from "react";
import { SocketContext } from "../Context";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  headingText: {
    fontSize: 20,
    textAlign: "center",
  },
  container: {
    padding: 20,
  },
  paper: {
    alignContent: "center",
  },

  value: {
    fontSize: 40,
    textAlign: "center",
  },
}));

function VehicleState() {
  const classes = useStyles();

  const { myVideo, stream, vehicleState } = useContext(SocketContext);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <>
      {/* <Grid container spacing={2} className={classes.container}>
        <Grid item xs={6} md={4}>
          <Paper className={classes.paper}>
            <Typography varient="h1" className={classes.headingText}>
              Depth (m)
            </Typography>
            <Typography varient="h3" className={classes.value}>
              {vehicleState.depth.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper className={classes.paper}>
            <Typography varient="h1" className={classes.headingText}>
              Velocity
            </Typography>
            <Typography varient="h3" className={classes.value}>
              {vehicleState.velocity}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper className={classes.paper}>
            <Typography varient="h1" className={classes.headingText}>
              Orientation
            </Typography>
            <Typography varient="h3" className={classes.value}>
              {vehicleState.orientation}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
      </Grid> */}

      {/* <Grid item xs={6} md={6}>
        <Paper>
        <Typography varient="h1">Vehicle state</Typography>
        <Typography varient="h6">Northing: {vehicleState.northing}</Typography>
        <Typography varient="h6">Easting: {vehicleState.easting}</Typography>
        <Typography varient="h6">depth: {vehicleState.depth}</Typography>
        <Typography varient="h6">velocity: {vehicleState.velocity}</Typography>
        <Typography varient="h6">orientation: {vehicleState.orientation}</Typography>
        
        
        </Paper>
      </Grid> */}
    </>
  );
}

export default VehicleState;
