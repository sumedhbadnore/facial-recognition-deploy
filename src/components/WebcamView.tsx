// src/components/WebcamView.tsx
import React, { useRef, useEffect } from "react";
import { detectFaces } from "../utils/faceDetection";
import * as faceapi from "face-api.js";

interface WebcamViewProps {
  webcamActive: boolean;
  modelsLoaded: boolean;
}

const WebcamView: React.FC<WebcamViewProps> = ({ webcamActive, modelsLoaded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    if (webcamActive) {
      startWebcam();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [webcamActive]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const analyze = async () => {
      if (
        videoRef.current &&
        canvasRef.current &&
        webcamActive &&
        modelsLoaded &&
        videoRef.current.videoWidth > 0 &&
        videoRef.current.videoHeight > 0
      ) {
        const detections = await detectFaces(videoRef.current);

        const canvas = canvasRef.current;
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        faceapi.matchDimensions(canvas, {
          width: video.videoWidth,
          height: video.videoHeight,
        });

        const resized = faceapi.resizeResults(detections, {
          width: video.videoWidth,
          height: video.videoHeight,
        });

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          resized.forEach((detection: any) => {
            const { age, gender, expressions, detection: box } = detection;
            const { x, y, width, height } = box.box;

            ctx.strokeStyle = "#00FF00";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);

            ctx.fillStyle = "#00FF00";
            ctx.font = "16px Arial";
            ctx.fillText(`Age: ${Math.round(age)} | Gender: ${gender}`, x, y > 20 ? y - 10 : y + 20);

            const emotions = Object.entries(expressions || {}) as [string, number][];
            emotions.sort((a, b) => b[1] - a[1]);
            if (emotions.length > 0) {
              const [topEmotion] = emotions[0];
              ctx.fillText(`Emotion: ${topEmotion}`, x, y > 40 ? y - 30 : y + 40);
            }
          });
        }
      }
    };

    if (webcamActive) {
      interval = setInterval(analyze, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [webcamActive, modelsLoaded]);

  return (
    <div className="rounded bg-light" style={{ position: "relative", width: 640, height: 480}}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="640"
        height="480"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
      />
    </div>
  );
};

export default WebcamView;
