import { Button } from "@/components/ui/button";
import { useSessionsContext } from "@/hooks/use-sessions-context";
import { useParams } from "react-router-dom";

export function AgenticTask() {
  const { id } = useParams();
  const { useAgenticTaskMutation } = useSessionsContext();
  const { mutate: agenticTask } = useAgenticTaskMutation();

  const handleStartAgenticTask = () => {
    agenticTask({ sessionId: id! });
  };

  return (
    <div className="p-4">
      <Button onClick={handleStartAgenticTask}>Start Agentic Task</Button>
    </div>
  );
}
