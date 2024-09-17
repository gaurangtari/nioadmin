import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import axios from "axios";
import * as process from "process";
window.global = window;
window.process = process;
window.Buffer = [];

const SocketContext = createContext();
//URLs

const SERVER = "http://localhost:9090";

//SOCKET INITIALISATION
const socket = io(SERVER);

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [joinedPeers, setJoinedPeers] = useState([]);
  const [vehicleState, setVehicleState] = useState({});
  const effectOneHasRun = useRef(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const sendAdminIdToRedis = async (id) => {
    try {
      await axios.post(`${SERVER}/admin-id`, { id });
    } catch (error) {
      console.log(error);
      console.error("Error sending data to Redis:", error);
    }
  };

  useEffect(() => {
    // if (effectOneHasRun.current) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => {
      socket.emit("join-room", id, id);
      setMe(id);
      sendAdminIdToRedis(id);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
      console.log("im running here");
    });
    // effectOneHasRun.current = true;
  }, []);

  useEffect(() => {
    console.log("second effect");
    socket.on("vehicle-state", (data) => {
      setVehicleState(data);
    });
  }, []);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    setCall({ isReceivingCall: false });

    const peer = new Peer({ initiator: false, trickle: false, stream });
    console.log(stream);

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    setJoinedPeers([...joinedPeers, call.name]);
    peer.on("stream", (currentStream) => {
      // userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    console.log(joinedPeers);
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal, id) => {
      setCallAccepted(true);
      peer.signal(signal);
      console.log(id);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        vehicleState,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
