"use client";

import { CSSProperties, useRef, useState, useEffect } from "react";
import ZoomVideo, {
  type VideoClient,
  VideoQuality,
  type VideoPlayer,
} from "@zoom/videosdk";
import { CameraButton, MicButton } from "./MuteButtons";
import { PhoneOff, UserPlus } from "lucide-react";
import { Button } from "./ui/button";

const Videocall = (props: { slug: string; JWT: string }) => {
  const session = props.slug;
  const jwt = props.JWT;
  const [inSession, setInSession] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [showPopup, setShowPopup] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const client = useRef<typeof VideoClient>(ZoomVideo.createClient());
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const screenShareVideoRef = useRef<HTMLVideoElement | null>(null);
  const screenShareCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (inSession) {
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= 5 * 60 * 1000 && !showPopup) { // 5 minutes in milliseconds
          setShowPopup(true);
          clearInterval(interval);
        }
      }, 1000); // Check every second

      return () => clearInterval(interval);
    }
  }, [inSession, startTime, showPopup]);

  const joinSession = async () => {
    console.log("Joining session...");
    await client.current.init("en-US", "Global");
    client.current.on("peer-video-state-change", (payload) => void renderVideo(payload));
    await client.current.join(session, jwt, userName).catch((e) => {
      console.log("Join error:", e);
    });
    setInSession(true);
    setStartTime(Date.now());

    const mediaStream = client.current.getMediaStream();
    await mediaStream.startAudio();
    setIsAudioMuted(false);
    await mediaStream.startVideo().catch((e) => {
      console.log("Start video error:", e);
    });
    setIsVideoMuted(false);

    await renderVideo({
      action: "Start",
      userId: client.current.getCurrentUserInfo().userId,
    });
  };

  const renderVideo = async (event: {
    action: "Start" | "Stop";
    userId: number;
  }) => {
    const mediaStream = client.current.getMediaStream();
    if (event.action === "Stop") {
      const element = await mediaStream.detachVideo(event.userId);
      Array.isArray(element)
        ? element.forEach((el) => el.remove())
        : element.remove();
    } else {
      const userVideo = await mediaStream.attachVideo(
        event.userId,
        VideoQuality.Video_360P
      );
      if (videoContainerRef.current) {
        videoContainerRef.current.appendChild(userVideo as VideoPlayer);
      }
    }
  };

  const leaveSession = async () => {
    client.current.off(
      "peer-video-state-change",
      (payload: { action: "Start" | "Stop"; userId: number }) => void renderVideo(payload)
    );
    await client.current.leave().catch((e) => console.log("Leave error:", e));
    window.location.href = "/";
  };

  const startScreenShare = async () => {
    try {
      if (screenShareVideoRef.current) {
        await client.current.getMediaStream().startShareScreen(screenShareVideoRef.current);
      } else if (screenShareCanvasRef.current) {
        await client.current.getMediaStream().startShareScreen(screenShareCanvasRef.current);
      }
      console.log('Screen share started');
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const handlePopupResponse = (continueSession: boolean) => {
    if (continueSession) {
      setShowPopup(false);
      setStartTime(Date.now()); // Reset the timer
    } else {
      leaveSession();
    }
  };

  const toggleParticipants = () => {
    setShowParticipants(!showParticipants);
  };

  return (
    <div className="flex h-full w-full flex-col bg-gray-100">
      <h1 className="text-center text-4xl font-extrabold mb-6 mt-0 text-blue-600">
        Session: {session}
      </h1>
      <div
        className="flex w-full flex-1 bg-white shadow-lg rounded-lg p-4"
        style={inSession ? {} : { display: "none" }}
      >
        <video id="my-screen-share-content-video" ref={screenShareVideoRef} style={videoPlayerStyle} />
        <canvas id="my-screen-share-content-canvas" ref={screenShareCanvasRef} style={videoPlayerStyle} />
        {/* @ts-ignore */}
        <video-player-container ref={videoContainerRef} style={videoPlayerStyle} />
      </div>
      {!inSession ? (
        <div className="mx-auto flex w-64 flex-col self-center">
          <div className="w-4" />
          <Button className="flex flex-1 bg-blue-500 text-white rounded-lg py-2" onClick={joinSession} title="join session">
            Join
          </Button>
        </div>
      ) : (
        <div className="flex w-full flex-col justify-around self-center p-4">
          <div className="flex justify-between mb-4">
            <Button onClick={startScreenShare} title="start screen share" className="bg-blue-500 text-white rounded-lg py-2 px-4">
              Start Screen Share
            </Button>
            <Button onClick={toggleParticipants} title="show participants" className="bg-green-500 text-white rounded-lg py-2 px-4">
              <UserPlus className="mr-2" /> Show Participants
            </Button>
            <Button onClick={leaveSession} title="leave session" className="bg-red-500 text-white rounded-lg py-2 px-4">
              <PhoneOff />
            </Button>
          </div>
          <div className="flex w-full justify-center">
            <div className="mt-4 flex w-full flex-col items-center">
              <CameraButton
                client={client}
                isVideoMuted={isVideoMuted}
                setIsVideoMuted={setIsVideoMuted}
                renderVideo={renderVideo}
              />
              <MicButton
                isAudioMuted={isAudioMuted}
                client={client}
                setIsAudioMuted={setIsAudioMuted}
              />
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">5 minutes have passed. Do you want to continue or end the session?</p>
            <div className="flex justify-around mt-4">
              <Button onClick={() => handlePopupResponse(true)} className="bg-green-500 text-white rounded-lg py-2 px-4">Continue</Button>
              <Button onClick={() => handlePopupResponse(false)} className="bg-red-500 text-white rounded-lg py-2 px-4">End</Button>
            </div>
          </div>
        </div>
      )}
      {showParticipants && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Participants</h2>
            {/* List participants here */}
            <div className="flex flex-col space-y-2">
              {/* Placeholder for participant list */}
              <div className="bg-gray-200 p-2 rounded-md">Participant 1</div>
              <div className="bg-gray-200 p-2 rounded-md">Participant 2</div>
              <div className="bg-gray-200 p-2 rounded-md">Participant 3</div>
            </div>
            <div className="flex justify-center mt-4">
              <Button onClick={toggleParticipants} className="bg-gray-500 text-white rounded-lg py-2 px-4">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videocall;

const videoPlayerStyle = {
  height: "75vh",
  marginTop: "1.5rem",
  marginLeft: "3rem",
  marginRight: "3rem",
  alignContent: "center",
  borderRadius: "10px",
  overflow: "hidden",
} as CSSProperties;

const userName = `User-${new Date().getTime().toString().slice(8)}`;



/*
"use client";

import { CSSProperties, useRef, useState, useEffect } from "react";
import ZoomVideo, {
  type VideoClient,
  VideoQuality,
  type VideoPlayer,
} from "@zoom/videosdk";
import { CameraButton, MicButton } from "./MuteButtons";
import { WorkAroundForSafari } from "lib/utils";
import { PhoneOff } from "lucide-react";
import { Button } from "./ui/button";

const Videocall = (props: { slug: string; JWT: string }) => {
  const session = props.slug;
  const jwt = props.JWT;
  const [inSession, setInSession] = useState(false);
  const client = useRef<typeof VideoClient>(ZoomVideo.createClient());
  const [isVideoMuted, setIsVideoMuted] = useState(false);  // Default to false
  const [isAudioMuted, setIsAudioMuted] = useState(false);  // Default to false
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Video container ref:", videoContainerRef.current);
  }, [videoContainerRef]);

  const joinSession = async () => {
    console.log("Joining session...");
    await client.current.init("en-US", "Global", { patchJsMedia: true });
    client.current.on(
      "peer-video-state-change",
      (payload) => void renderVideo(payload)
    );
    await client.current.join(session, jwt, userName).catch((e) => {
      console.log("Join error:", e);
    });
    setInSession(true);
    const mediaStream = client.current.getMediaStream();
    // @ts-expect-error https://stackoverflow.com/questions/7944460/detect-safari-browser/42189492#42189492
    window.safari
      ? await WorkAroundForSafari(client.current)
      : await mediaStream.startAudio();
    setIsAudioMuted(false);  // Set to false to indicate the audio is on
    await mediaStream.startVideo().catch((e) => {
      console.log("Start video error:", e);
    });
    setIsVideoMuted(false);  // Set to false to indicate the video is on
    await renderVideo({
      action: "Start",
      userId: client.current.getCurrentUserInfo().userId,
    });
  };

  const renderVideo = async (event: {
    action: "Start" | "Stop";
    userId: number;
  }) => {
    const mediaStream = client.current.getMediaStream();
    console.log("Rendering video:", event);
    if (event.action === "Stop") {
      const element = await mediaStream.detachVideo(event.userId);
      Array.isArray(element)
        ? element.forEach((el) => el.remove())
        : element.remove();
    } else {
      const userVideo = await mediaStream.attachVideo(
        event.userId,
        VideoQuality.Video_360P
      );
      console.log("User video:", userVideo);
      videoContainerRef.current!.appendChild(userVideo as VideoPlayer);
    }
  };

  const leaveSession = async () => {
    client.current.off(
      "peer-video-state-change",
      (payload: { action: "Start" | "Stop"; userId: number }) =>
        void renderVideo(payload)
    );
    await client.current.leave().catch((e) => console.log("Leave error:", e));
    // hard refresh to clear the state
    window.location.href = "/";
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <h1 className="text-center text-3xl font-bold mb-4 mt-0">
        Session: {session}
      </h1>
      <div
        className="flex w-full flex-1"
        style={inSession ? {} : { display: "none" }}
      >
        {/* @ts-expect-error html component /}
        <video-player-container ref={videoContainerRef} style={videoPlayerStyle} />
      </div>
      {!inSession ? (
        <div className="mx-auto flex w-64 flex-col self-center">
          <div className="w-4" />
          <Button className="flex flex-1" onClick={joinSession} title="join session">
            Join
          </Button>
        </div>
      ) : (
        <div className="flex w-full flex-col justify-around self-center">
          <div className="mt-4 flex w-[30rem] flex-1 justify-around self-center rounded-md bg-white p-4">
            <CameraButton
              client={client}
              isVideoMuted={isVideoMuted}
              setIsVideoMuted={setIsVideoMuted}
              renderVideo={renderVideo}
            />
            <MicButton
              isAudioMuted={isAudioMuted}
              client={client}
              setIsAudioMuted={setIsAudioMuted}
            />
            <Button onClick={leaveSession} title="leave session">
              <PhoneOff />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videocall;

const videoPlayerStyle = {
  height: "75vh",
  marginTop: "1.5rem",
  marginLeft: "3rem",
  marginRight: "3rem",
  alignContent: "center",
  borderRadius: "10px",
  overflow: "hidden",
} as CSSProperties;

const userName = `User-${new Date().getTime().toString().slice(8)}`;

*/


//_______________________________________________________________________

/*"use client";

import { CSSProperties, useRef, useState } from "react";
import ZoomVideo, {
  type VideoClient,
  VideoQuality,
  type VideoPlayer,
} from "@zoom/videosdk";
import { CameraButton, MicButton } from "./MuteButtons";
import { WorkAroundForSafari } from "@/lib/utils";
import { PhoneOff } from "lucide-react";
import { Button } from "./ui/button";

const Videocall = (props: { slug: string; JWT: string }) => {
  const session = props.slug;
  const jwt = props.JWT;
  const [inSession, setInSession] = useState(false);
  const client = useRef<typeof VideoClient>(ZoomVideo.createClient());
  const [isVideoMuted, setIsVideoMuted] = useState(
    !client.current.getCurrentUserInfo()?.bVideoOn
  );
  const [isAudioMuted, setIsAudioMuted] = useState(
    client.current.getCurrentUserInfo()?.muted ?? true
  );
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const joinSession = async () => {
    await client.current.init("en-US", "Global", { patchJsMedia: true });
    client.current.on(
      "peer-video-state-change",
      (payload) => void renderVideo(payload)
    );
    await client.current.join(session, jwt, userName).catch((e) => {
      console.log(e);
    });
    setInSession(true);
    const mediaStream = client.current.getMediaStream();
    // @ts-expect-error https://stackoverflow.com/questions/7944460/detect-safari-browser/42189492#42189492
    window.safari
      ? await WorkAroundForSafari(client.current)
      : await mediaStream.startAudio();
    setIsAudioMuted(client.current.getCurrentUserInfo().muted ?? true);
    await mediaStream.startVideo();
    setIsVideoMuted(!client.current.getCurrentUserInfo().bVideoOn);
    await renderVideo({
      action: "Start",
      userId: client.current.getCurrentUserInfo().userId,
    });
  };

  const renderVideo = async (event: {
    action: "Start" | "Stop";
    userId: number;
  }) => {
    const mediaStream = client.current.getMediaStream();
    if (event.action === "Stop") {
      const element = await mediaStream.detachVideo(event.userId);
      Array.isArray(element)
        ? element.forEach((el) => el.remove())
        : element.remove();
    } else {
      const userVideo = await mediaStream.attachVideo(
        event.userId,
        VideoQuality.Video_360P
      );
      videoContainerRef.current!.appendChild(userVideo as VideoPlayer);
    }
  };

  const leaveSession = async () => {
    client.current.off(
      "peer-video-state-change",
      (payload: { action: "Start" | "Stop"; userId: number }) =>
        void renderVideo(payload)
    );
    await client.current.leave().catch((e) => console.log("leave error", e));
    // hard refresh to clear the state
    window.location.href = "/";
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <h1 className="text-center text-3xl font-bold mb-4 mt-0">
        Session: {session}
      </h1>
      <div
        className="flex w-full flex-1"
        style={inSession ? {} : { display: "none" }}
      >
        {/* @ts-expect-error html component }
        <video-player-container ref={videoContainerRef} style={videoPlayerStyle} />
      </div>
      {!inSession ? (
        <div className="mx-auto flex w-64 flex-col self-center">
          <div className="w-4" />
          <Button className="flex flex-1" onClick={joinSession} title="join session">
            Join
          </Button>
        </div>
      ) : (
        <div className="flex w-full flex-col justify-around self-center">
          <div className="mt-4 flex w-[30rem] flex-1 justify-around self-center rounded-md bg-white p-4">
            <CameraButton
              client={client}
              isVideoMuted={isVideoMuted}
              setIsVideoMuted={setIsVideoMuted}
              renderVideo={renderVideo}
            />
            <MicButton
              isAudioMuted={isAudioMuted}
              client={client}
              setIsAudioMuted={setIsAudioMuted}
            />
            <Button onClick={leaveSession} title="leave session">
              <PhoneOff />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videocall;

const videoPlayerStyle = {
  height: "75vh",
  marginTop: "1.5rem",
  marginLeft: "3rem",
  marginRight: "3rem",
  alignContent: "center",
  borderRadius: "10px",
  overflow: "hidden",
} as CSSProperties;

const userName = `User-${new Date().getTime().toString().slice(8)}`;
*/