import { useState } from "react";
import { Copy, RefreshCw, Share2, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  thinkingProcess?: {
    analysis: string;
    plan: string;
    contributions: { agent: string; response: string }[];
    verification: string;
    synthesis: string;
  };
  suggestions?: string[];
  onRegenerate?: () => void;
  onFeedback?: (type: "positive" | "negative") => void;
}

export const Message = ({
  role,
  content,
  thinkingProcess,
  suggestions,
  onRegenerate,
  onFeedback,
}: MessageProps) => {
  const [showThinking, setShowThinking] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Copié dans le presse-papiers");
  };

  const handleShare = () => {
    toast.info("Fonctionnalité de partage à venir");
  };

  if (role === "user") {
    return (
      <div className="flex justify-end mb-6 animate-slide-up">
        <div className="max-w-[80%] md:max-w-[60%]">
          <div className="bg-accent text-accent-foreground rounded-3xl px-6 py-3 shadow-md">
            <p className="whitespace-pre-wrap break-words">{content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 animate-slide-up">
      <div className="max-w-[90%] md:max-w-[80%]">
        {/* Avatar et nom */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-accent font-semibold text-sm">O</span>
          </div>
          <span className="font-medium">ORION</span>
        </div>

        {/* Flux Cognitif */}
        {thinkingProcess && (
          <div className="mb-4 border border-border rounded-2xl overflow-hidden bg-card/50">
            <button
              onClick={() => setShowThinking(!showThinking)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <span className="font-medium text-sm">Processus de Réflexion</span>
              {showThinking ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {showThinking && (
              <div className="px-4 pb-4 space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground mb-1">1. Analyse de la Requête</p>
                  <p className="opacity-80">{thinkingProcess.analysis}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">2. Plan d'Action</p>
                  <p className="opacity-80">{thinkingProcess.plan}</p>
                </div>
                {thinkingProcess.contributions.map((contrib, idx) => (
                  <div key={idx}>
                    <p className="font-medium text-foreground mb-1">
                      {3 + idx}. Contribution de l'Agent {contrib.agent}
                    </p>
                    <p className="opacity-80">{contrib.response}</p>
                  </div>
                ))}
                <div>
                  <p className="font-medium text-foreground mb-1">
                    {3 + thinkingProcess.contributions.length}. Vérification des Faits
                  </p>
                  <p className="opacity-80">{thinkingProcess.verification}</p>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    {4 + thinkingProcess.contributions.length}. Synthèse Finale
                  </p>
                  <p className="opacity-80">{thinkingProcess.synthesis}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Contenu principal */}
        <div
          className="prose prose-sm md:prose-base max-w-none mb-3"
          onMouseEnter={() => setShowToolbar(true)}
          onMouseLeave={() => setShowToolbar(false)}
        >
          <p className="whitespace-pre-wrap break-words leading-relaxed">{content}</p>
        </div>

        {/* Barre d'outils contextuelle */}
        {showToolbar && (
          <div className="flex items-center gap-1 mb-3 animate-slide-up">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full"
              onClick={onRegenerate}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Régénérer
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copier
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Partager
            </Button>
            <div className="flex items-center gap-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-full p-0"
                onClick={() => onFeedback?.("positive")}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-full p-0"
                onClick={() => onFeedback?.("negative")}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Suggestions de suivi */}
        {suggestions && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="rounded-full text-sm"
                onClick={() => {
                  // Envoyer la suggestion comme nouvelle requête
                  toast.info("Fonctionnalité à implémenter");
                }}
              >
                → {suggestion}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
