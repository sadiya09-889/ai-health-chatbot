import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send, AlertCircle } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-gradient-to-t from-slate-50 to-white p-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your symptoms or ask a health question... (Press Enter to send, Shift+Enter for new line)"
              disabled={disabled}
              className="min-h-[56px] max-h-[200px] resize-none border-slate-300 focus:ring-blue-500"
            />
          </div>
          <Button
            type="submit"
            disabled={!message.trim() || disabled}
            className="h-[56px] w-[56px] shrink-0 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <AlertCircle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
          <p>This tool provides general health information. Always consult with healthcare professionals for medical decisions.</p>
        </div>
      </div>
    </form>
  );
};
