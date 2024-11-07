import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { ref, get, set, onValue, off } from "firebase/database";
import { rtdb } from "./firebase";

import * as process from "process";
window.global = window;
window.process = process;
window.Buffer = [];

const SocketContext = createContext();
//URLs
const SERVER = "https://rovsite.pagekite.me/";

//SOCKET INITIALISATION
const socket = io(SERVER);
console.log(socket);

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [vehicleState, setVehicleState] = useState({});
  const adminIdRef = ref(rtdb, "admin-id");
  const adminHeartbeatRef = ref(rtdb, "heartbeat/admin");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });

    socket.on("me", (id) => {
      socket.emit("join-room", id, id);
      set(adminIdRef, id);
      setMe(id);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
      console.log("signal from the client", signal);
    });
  }, []);

  // heartbeat;
  useEffect(() => {
    setInterval(() => {
      const heartbeat = Date.now();
      set(adminHeartbeatRef, { heartbeat: heartbeat });
    }, 3000);
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

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {});

    peer.signal(call.signal);

    connectionRef.current = peer;
  };
  socket.on("hungup", (data) => {
    connectionRef.current.destroy();
  });

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

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
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
