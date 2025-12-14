import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getStreamToken } from "../lib/api";
import { StreamChat } from "stream-chat";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const useStreamChat = () => {
  const { user } = useUser();
  const [chatClient, setChatClient] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    const fetchToken = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getStreamToken();
        setTokenData(data);
      } catch (error) {
        setError(error.response.data.message || error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchToken();
  }, [user?.id]);

  useEffect(() => {
    if (!tokenData || !user?.id || !STREAM_API_KEY) return;
    const client = StreamChat.getInstance(STREAM_API_KEY);
    let cancelled = false;

    const connect = async () => {
      try {
        await client.connectUser(
          {
            id: user?.id,
            name:
              user.fullName ??
              user.username ??
              user.primaryEmailAddress?.emailAddress ??
              user.id,
            image: user.imageUrl ?? undefined,
          },
          tokenData
        );

        if (!cancelled) {
          setChatClient(client);
        }
      } catch (error) {
        console.log("Error connecting to stream", error);
      }
    };
    connect();

    return () => {
      cancelled = true;
      client.disconnectUser();
    };
  }, [tokenData, user?.id]);

  return { chatClient, isLoading, error };
};
