import ReactPlayer from "react-player";

const VideoPlayer = () => {
  return (
    <div className="divCenter">
      <ReactPlayer
        className="w-full md:min-w-96 h-full"
        url="https://www.youtube.com/watch?v=PIyf0hMc498"
        controls
      />
    </div>
  );
};

export default VideoPlayer;
