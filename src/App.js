import logo from "./logo.svg";
import "./App.css";

function App() {
  const videoStream = navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      const video = document.querySelector("#myVideo");
      video.srcObject = stream;
    });
  const handler = () => {
    const canvas = document.createElement("canvas"),
      video = document.querySelector("#myVideo"),
      img = document.createElement("img"),
      screenshotsContainer = document.getElementById("screenshotsContainer");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    //maybe save all?
    Array.from(screenshotsContainer.children).forEach((child) => {
      screenshotsContainer.removeChild(child);
    });

    img.src = canvas.toDataURL("image/png");
    screenshotsContainer.appendChild(img);
  };
  return (
    <>
      <video id="myVideo" autoPlay></video>
      <div className="player">
        <input type="button" value="Snap" onClick={handler} />
      </div>
      <div id="screenshotsContainer"></div>
    </>
  );
}

export default App;
