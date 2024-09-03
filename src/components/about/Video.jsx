import { useRef } from "react";
import { FaExpand } from "react-icons/fa";
import videoBg from "../../assets/video/re.mp4";

const Video = () => {
  const videoRef = useRef(null);

  const handleFullscreen = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      } else if (videoElement.webkitEnterFullscreen) {
        // Fallback for older iOS devices
        videoElement.webkitEnterFullscreen();
      }
    }
  };

  return (
    <div className="flex justify-center items-center flex-col text-center pt-0 mb-24 z-0 inset-0 py-10 mx-auto">
      <div className="relative overflow-hidden w-full max-w-9xl h-[500px]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover absolute inset-0 grayscale" // Añadir la clase grayscale
          autoPlay
          loop
          muted
          playsInline // Ensure this attribute is properly added
        >
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex justify-end items-end p-4">
          <button
            onClick={handleFullscreen}
            className="bg-transparent text-white p-2"
          >
            <FaExpand size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Video;
