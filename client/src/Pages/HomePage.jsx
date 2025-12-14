import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from "stream-chat-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useStreamChat } from "../hooks/useStreamChat";

import "stream-chat-react/dist/css/v2/index.css";
import { UserButton } from "@clerk/clerk-react";
import CreateChannelModal from "../components/CreateChannelModal";

const HomePage = () => {
  const [activeChannel, setActiveChannel] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { chatClient, isLoading, error } = useStreamChat();

  useEffect(() => {
    if (chatClient) {
      const channelId = searchParams.get("channel");
      if (channelId) {
        const channel = chatClient.channel("messaging", channelId);
        setActiveChannel(channel);
      }
    }
  }, [chatClient, searchParams]);

  if (error) return <p>{error || "Something went extremely wrong"}</p>;

  if (isLoading || !chatClient)
    return (
      <div className="h-screen w-full flex justify-center items-center text-2xl">
        Loading....
      </div>
    );

  return (
    <div className="chat-wrapper">
      <Chat client={chatClient}>
        <div className="chat-container">
          {/* Left Side */}
          <div className="str-chat__channel-list">
            <div className="team-channel-list">
              {/* Header */}
              <div className="team-channel-list__header gap-4">
                <div className="brand-container">
                  <span className="brand-name">Slap</span>
                </div>
                <div className="user-button-wrapper">
                  <UserButton />
                </div>
              </div>
              {/* Channel List */}

              <div className="team-channel-list__content">
                <div className="create-channel-section">
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="create-channel-btn"
                  >
                    <span>Create Channel</span>
                  </button>
                </div>
                {/* Channel List Comp */}
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="chat-main">
            <Channel channel={activeChannel}>
              <Window>
                {/* <CustomChannelHeader/> */}

                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>

        {isCreateModalOpen && (
          <CreateChannelModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          />
        )}
      </Chat>
    </div>
  );
};

export default HomePage;
