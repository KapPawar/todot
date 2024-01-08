import React, { useState } from "react";
import AIChatBot from "./AIChatBot";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";

const AIChatButton = () => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setChatBoxOpen(true)} className="rounded-full">
        <Bot size={20} />
      </Button>
      <AIChatBot open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
};

export default AIChatButton;
