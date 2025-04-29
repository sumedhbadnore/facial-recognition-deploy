// src/components/WebcamFeed.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWebcam } from "../redux/faceSlice";
import { loadModels } from "../utils/faceDetection";
import { RootState } from "../redux/store";

import WebcamView from "./WebcamView";
import UploadImage from "./UploadImage";

const WebcamFeed: React.FC = () => {
  const dispatch = useDispatch();
  const webcamActive = useSelector(
    (state: RootState) => state.face.webcamActive
  );

  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    loadModels().then(() => setModelsLoaded(true));
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: 'Montserrat, sans-serif'}}
    >
      <div className="container mt-5 text-center">
        <h1 className="text-dark mb-3 fw-bold">
          Facial Recognition App
        </h1>
        <p
          className="lead text-muted"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          This web application demonstrates real-time facial recognition using
          webcam feed and image uploads. Built with React, TypeScript, Redux,
          Face-API.js, and styled with Bootstrap.
        </p><br/>
        <p className="text-muted fw-bold">
          Upload an image or start your webcam to see live detection of age,
          gender, and emotions!
        </p>
      </div>

      <WebcamView webcamActive={webcamActive} modelsLoaded={modelsLoaded} />

      <button
        className="btn btn-primary m-3 fw-bold"
        onClick={() => dispatch(toggleWebcam())}
        disabled={!modelsLoaded}
      >
        {modelsLoaded
          ? webcamActive
            ? "Stop Webcam"
            : "Start Webcam"
          : "Loading models..."}
      </button>

      <UploadImage modelsLoaded={modelsLoaded} />
    </div>
  );
};

export default WebcamFeed;
