import "./App.css";
import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

function App() {
  const imgRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = () => {
      faceapi.nets.tinyFaceDetector
        .loadFromUri("/models")
        .then(console.log("done"))
        .catch((e) => console.log(e));
    };
  }, []);

  return (
    <div className="App">
      <img
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
