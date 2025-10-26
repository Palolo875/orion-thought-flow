import { useState, useEffect, useRef } from "react";
import { Send, X } from "lucide-react";
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
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setRecordingTime(0);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
      // Simuler la transcription vocale et l'afficher dans le champ de saisie
      const transcript = "Transcription du message vocal...";
      setVoiceTranscript(transcript);
      setInput(transcript);
      
      if (onVoiceRecord) {
        onVoiceRecord();
      }
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      setVoiceTranscript("");
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 md:p-6 bg-background/95 backdrop-blur-xl border-t border-border/50">
      <div className="max-w-5xl mx-auto">
        {isRecording ? (
          /* Mode Enregistrement Vocal - Style WhatsApp */
          <div className="flex items-center gap-3 bg-card backdrop-blur rounded-3xl shadow-2xl border border-accent/30 p-4 md:p-5 animate-slide-up">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleRecording}
              className="shrink-0 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </Button>
            
            {/* Ondes sonores animées */}
            <div className="flex items-center gap-1 flex-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-accent rounded-full animate-pulse-glow"
                  style={{
                    height: `${20 + Math.random() * 20}px`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            
            {/* Timer */}
            <span className="text-lg font-medium text-accent tabular-nums">
              {formatTime(recordingTime)}
            </span>
            
            {/* Bouton Envoyer */}
            <Button
              onClick={() => {
                toggleRecording();
                // Logique d'envoi de l'audio ici
              }}
              className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
              size="icon"
            >
              <Send className="h-5 w-5" strokeWidth={2} />
            </Button>
          </div>
        ) : (
          /* Mode Saisie Texte Normal */
          <div className="flex items-end gap-2 bg-card backdrop-blur rounded-3xl shadow-2xl border border-border/50 p-4 md:p-5">
            {/* Bouton Upload */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-64 p-3">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    className="justify-start h-auto py-3 hover:bg-accent/20 hover:text-accent"
                    onClick={() => handleFileSelect("image")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </div>
                      <span className="font-medium">Image</span>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start h-auto py-3 hover:bg-accent/20 hover:text-accent"
                    onClick={() => handleFileSelect("document")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <span className="font-medium">Document</span>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start h-auto py-3 hover:bg-accent/20 hover:text-accent"
                    onClick={() => handleFileSelect("*")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                        </svg>
                      </div>
                      <span className="font-medium">Fichier</span>
                    </div>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Zone de saisie */}
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message ORION..."
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
              {!input.trim() && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={toggleRecording}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                </Button>
              )}

              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all disabled:opacity-40"
                size="icon"
              >
                <Send className="h-5 w-5" strokeWidth={2} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
