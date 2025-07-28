import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CameraIcon, PaperclipIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router-dom";
import { useSessionsContext } from "@/hooks/use-sessions-context";
import { AgenticTask } from "@/components/agent/AgenticTask";

export function Chat() {
  const { id } = useParams();
  const { useSession, useScreenshot, useChatMutation } = useSessionsContext();
  const { data: session } = useSession(id!);
  const { mutate: screenshot } = useScreenshot();
  const { mutate: chat } = useChatMutation();
  const [messages, setMessages] = useState<{ author: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim() || image) {
      const userMessage = { author: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      chat(
        { message: input, imageUrl: image || undefined },
        {
          onSuccess: (data) => {
            const agentMessage = { author: "agent", text: data.response };
            setMessages((prev) => [...prev, agentMessage]);
          },
        }
      );
      setInput("");
      setImage(null);
    }
  };

  const handleScreenshot = () => {
    if (!session?.url) return;
    screenshot(
      { url: session.url },
      {
        onSuccess: (data) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageDataUrl = reader.result as string;
            setImage(imageDataUrl);
            const userMessage = {
              author: "user",
              text: "Took a screenshot",
            };
            setMessages((prev) => [...prev, userMessage]);
            chat(
              { message: "Here is a screenshot", imageUrl: imageDataUrl },
              {
                onSuccess: (data) => {
                  const agentMessage = {
                    author: "agent",
                    text: data.response,
                  };
                  setMessages((prev) => [...prev, agentMessage]);
                },
              }
            );
          };
          reader.readAsDataURL(data);
        },
      }
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat with your Local Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`rounded-md p-2 ${
                  message.author === "user"
                    ? "bg-blue-100 self-end"
                    : "bg-gray-100 self-start"
                }`}
                dangerouslySetInnerHTML={{ __html: message.text }}
              />
            ))}
          </div>
          {image && (
            <div className="p-2">
              <img
                src={image}
                alt="upload-preview"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <Button onClick={handleSend}>Send</Button>
            <Button onClick={handleScreenshot} variant="outline">
              <CameraIcon />
            </Button>
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
            >
              <PaperclipIcon />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>
          <AgenticTask />
        </div>
      </CardContent>
    </Card>
  );
}
