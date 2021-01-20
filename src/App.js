import "./App.css";

function App() {
  let recorder;
  const videoStream = navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((stream) => {
      const video = document.querySelector("#myVideo");
      video.srcObject = stream;
      recorder = new MediaRecorder(stream);
    });

  const handler = () => {
    const canvas = document.createElement("canvas"),
      video = document.querySelector("#myVideo"),
      img = document.createElement("img"),
      screenshotsContainer = document.getElementById("screenshotsContainer");

    if (recorder.state !== "recording") {
      recorder.start();
      recorder.onstop = function (e) {};
    } else {
      recorder.stop();
    }

    recorder.ondataavailable = function (e) {
      var url = URL.createObjectURL(e.data);
      var save = document.createElement("video");
      save.controls = true;
      save.playsInline = true;
      save.src = url;
      save.load();
      save.onloadeddata = function () {
        save.play();
      };

      screenshotsContainer.appendChild(save);
    };

    // canvas.width = video.videoWidth;
    // canvas.height = video.videoHeight;
    // canvas.getContext("2d").drawImage(video, 0, 0);

    // //maybe save all?
    // Array.from(screenshotsContainer.children).forEach((child) => {
    //   screenshotsContainer.removeChild(child);
    // });

    // img.src = canvas.toDataURL("image/png");
    // screenshotsContainer.prepend(img);
  };

  return (
    <>
      <video autoPlay id="myVideo" muted playsInline></video>
      <input className="snap" type="button" value="S" onClick={handler} />
      <div id="screenshotsContainer"></div>
    </>
  );
}

export default App;
