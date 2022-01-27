import "./App.css";
import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

function App() {
  const imgRef = useRef();
  const canvasRef = useRef();

  const handleDetection = async () => {
    const detections = await faceapi.detectAllFaces(
      imgRef.current,
      new faceapi.TinyFaceDetectorOptions()
    );

    canvasRef.current.innerText = faceapi.createCanvasFromMedia(imgRef.current);

    faceapi.matchDimensions(canvasRef.current, {
      width: 500,
      height: 750,
    });

    const resized = faceapi.resizeResults(detections, {
      width: 500,
      height: 750,
    });

    faceapi.draw.drawDetections(canvasRef.current, resized);
  };

  useEffect(() => {
    const loadModels = () => {
      faceapi.nets.tinyFaceDetector
        .loadFromUri("/models")
        .then(handleDetection)
        .catch((e) => console.log(e));
    };

    // Run loadModels() after img has loaded
    imgRef.current && loadModels();
  }, []);

  return (
    <div className="App">
      <img
        crossOrigin="anonymous"
        ref={imgRef}
        src="https://images.pexels.com/photos/9371782/pexels-photo-9371782.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt="default"
        width="500"
        height="750"
      />
      <canvas ref={canvasRef} width="500" height="750" />
    </div>
  );
}

export default App;
