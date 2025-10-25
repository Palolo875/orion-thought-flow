import { useState } from "react";
import { Send, Plus, Mic, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload?: (file: File) => void;
  onVoiceRecord?: () => void;
  onToolSelect?: (tool: string) => void;
}

export const ChatInput = ({ 
  onSendMessage, 
  onFileUpload,
  onVoiceRecord,
  onToolSelect 
}: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (type: string) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = type === "image" ? "image/*" : type === "document" ? ".pdf,.doc,.docx" : "*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && onFileUpload) {
        onFileUpload(file);
      }
    };
    input.click();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (onVoiceRecord) {
      onVoiceRecord();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-background/80 backdrop-blur-lg border-t">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-2 bg-card rounded-3xl shadow-lg border p-3">
          {/* Bouton Upload */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 rounded-full hover:bg-muted"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-56 p-2">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleFileSelect("image")}
                >
                  🖼️ Importer une Image
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleFileSelect("document")}
                >
                  📄 Importer un Document
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleFileSelect("*")}
                >
                  📎 Joindre un Fichier
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Zone de saisie */}
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Attribuez une tâche ou explorez une idée..."
            className="min-h-[50px] max-h-[200px] border-0 resize-none focus-visible:ring-0 bg-transparent"
            rows={1}
          />

          {/* Boutons d'action */}
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full hover:bg-muted ${isRecording ? 'text-accent animate-pulse-glow' : ''}`}
              onClick={toggleRecording}
            >
              <Mic className="h-5 w-5" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-muted"
                >
                  <Wrench className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-56 p-2">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => onToolSelect?.("calculator")}
                  >
                    🔢 Calculatrice
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => onToolSelect?.("translator")}
                  >
                    🌐 Traducteur
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => onToolSelect?.("search")}
                  >
                    🔍 Recherche Web
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
              size="icon"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
