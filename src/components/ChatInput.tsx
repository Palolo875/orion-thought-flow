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
    <div className="fixed bottom-0 left-0 right-0 p-3 md:p-6 bg-background/95 backdrop-blur-xl border-t border-border/50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end gap-2 bg-card/50 backdrop-blur rounded-3xl shadow-2xl border border-border/50 p-4 md:p-5">
          {/* Bouton Upload */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 rounded-full hover:bg-accent/20 hover:text-accent transition-colors"
              >
                <Plus className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-56 p-2">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  className="justify-start hover:bg-accent/20 hover:text-accent"
                  onClick={() => handleFileSelect("image")}
                >
                  <span className="mr-2">🖼️</span> Importer une Image
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start hover:bg-accent/20 hover:text-accent"
                  onClick={() => handleFileSelect("document")}
                >
                  <span className="mr-2">📄</span> Importer un Document
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start hover:bg-accent/20 hover:text-accent"
                  onClick={() => handleFileSelect("*")}
                >
                  <span className="mr-2">📎</span> Joindre un Fichier
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Zone de saisie - Now auto-expands */}
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Attribuez une tâche ou explorez une idée..."
            className="min-h-[56px] max-h-[300px] border-0 resize-none focus-visible:ring-0 bg-transparent text-base md:text-lg leading-relaxed px-2"
            rows={1}
            style={{
              height: 'auto',
              overflow: 'hidden'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
          />

          {/* Boutons d'action */}
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full hover:bg-accent/20 transition-all ${isRecording ? 'text-accent animate-pulse-glow bg-accent/10' : 'hover:text-accent'}`}
              onClick={toggleRecording}
            >
              <Mic className="h-5 w-5" strokeWidth={1.5} />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-accent/20 hover:text-accent transition-colors"
                >
                  <Wrench className="h-5 w-5" strokeWidth={1.5} />
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-56 p-2">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    className="justify-start hover:bg-accent/20 hover:text-accent"
                    onClick={() => onToolSelect?.("calculator")}
                  >
                    <span className="mr-2">🔢</span> Calculatrice
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start hover:bg-accent/20 hover:text-accent"
                    onClick={() => onToolSelect?.("translator")}
                  >
                    <span className="mr-2">🌐</span> Traducteur
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start hover:bg-accent/20 hover:text-accent"
                    onClick={() => onToolSelect?.("search")}
                  >
                    <span className="mr-2">🔍</span> Recherche Web
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              onClick={handleSend}
              disabled={!input.trim()}
              className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all disabled:opacity-40"
              size="icon"
            >
              <Send className="h-5 w-5" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
