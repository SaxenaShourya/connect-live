"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoClientProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  const initializeClient = async () => {
    if (!isLoaded || !user)
      return toast.error("Unexpected Internal Server Error");
    if (!STREAM_API_KEY) return toast.error("Stream API key is missing");

    const client = new StreamVideoClient({
      apiKey: STREAM_API_KEY,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  };

  useEffect(() => {
    initializeClient();
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoClientProvider;
