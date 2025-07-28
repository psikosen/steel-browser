import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CameraIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router-dom";
import { useSessionsContext } from "@/hooks/use-sessions-context";

export function Chat() {
  const { id } = useParams();
  const { useSession, useScreenshot } = useSessionsContext();
  const { data: session } = useSession(id!);
  const { mutate: screenshot } = useScreenshot();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
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
            setMessages([...messages, `Screenshot taken: ${reader.result}`]);
          };
          reader.readAsDataURL(data);
        },
      }
    );
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
              <div key={index} className="bg-gray-100 rounded-md p-2">
                {message}
              </div>
            ))}
          </div>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
