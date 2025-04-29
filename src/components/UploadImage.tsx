import React, { useRef, useState } from "react";
import { detectFaces } from "../utils/faceDetection";

interface UploadImageProps {
  modelsLoaded: boolean;
}

const UploadImage: React.FC<UploadImageProps> = ({ modelsLoaded }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedData, setDetectedData] = useState<
    { age: number; gender: string; emotion: string }[]
  >([]);
  const [noFacesDetected, setNoFacesDetected] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setUploadedImage(reader.result);
          setDetectedData([]);  // Clear old detections
          setNoFacesDetected(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoaded = async () => {
    if (imageRef.current && modelsLoaded) {
      await imageRef.current.decode();
      analyzeUploadedImage();
    }
  };

  const analyzeUploadedImage = async () => {
    if (imageRef.current && modelsLoaded) {
      const img = imageRef.current;
      const detections = await detectFaces(img);

      if (detections.length === 0) {
        setNoFacesDetected(true);
        return;
      }

      const processedData = detections.map((detection: any) => {
        const { age, gender, expressions } = detection;
        const emotions = Object.entries(expressions || {}) as [string, number][];
        emotions.sort((a, b) => b[1] - a[1]);
        const topEmotion = emotions.length > 0 ? emotions[0][0] : "unknown";

        return {
          age: Math.round(age),
          gender,
          emotion: topEmotion,
        };
      });

      setDetectedData(processedData);
    }
  };

  const clearUploaded = () => {
    setUploadedImage(null);
    setDetectedData([]);
    setNoFacesDetected(false);
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow-sm text-center" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-primary">Upload an Image for Detection</h2>

      <div className="mb-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="form-control"
        />
      </div>

      {uploadedImage && (
        <>
          <div className="mb-3">
            <img
              src={uploadedImage}
              ref={imageRef}
              alt="Uploaded Face"
              onLoad={handleImageLoaded}
              className="img-fluid rounded shadow"
            />
          </div>

          {noFacesDetected && (
            <div className="alert alert-warning" role="alert">
              No faces detected. Please try uploading a different image.
            </div>
          )}

          {detectedData.length > 0 && (
            <div className="row justify-content-center">
              {detectedData.map((face, index) => (
                <div key={index} className="col-10 col-md-5 mb-3">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title text-primary">Face {index + 1}</h5>
                      <p className="card-text text-muted">
                        Age: {face.age}<br />
                        Gender: {face.gender}<br />
                        Emotion: {face.emotion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            className="btn btn-danger mt-3"
            onClick={clearUploaded}
          >
            Clear Image
          </button>
        </>
      )}
    </div>
  );
};

export default UploadImage;
