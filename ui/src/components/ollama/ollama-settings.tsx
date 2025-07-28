import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function OllamaSettings() {
  const [model, setModel] = useState("deepseek-r1");
  const [host, setHost] = useState("http://localhost:11434");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ollama Settings</CardTitle>
        <CardDescription>
          Configure your Ollama integration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="model">Model</Label>
              <Select onValueChange={setModel} defaultValue={model}>
                <SelectTrigger id="model">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="deepseek-r1">deepseek-r1</SelectItem>
                  <SelectItem value="qwen3">qwen3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="host">Host</Label>
              <Input
                id="host"
                placeholder="Ollama Host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
}
