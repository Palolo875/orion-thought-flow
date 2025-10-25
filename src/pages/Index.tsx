import { useState, useEffect } from "react";
import { WelcomeMessage } from "@/components/WelcomeMessage";
import { ChatInput } from "@/components/ChatInput";
import { Message } from "@/components/Message";
import { ConversationsSidebar } from "@/components/ConversationsSidebar";
import { CommandPalette } from "@/components/CommandPalette";
import { Header } from "@/components/Header";
import { ControlCenter } from "@/components/ControlCenter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Message {
  id: string;
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
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const mockConversations = [
    {
      id: "1",
      title: "Discussion sur les algorithmes",
      date: "Il y a 2 jours",
    },
    {
      id: "2",
      title: "Projet React avancé",
      date: "Il y a 1 semaine",
    },
  ];

  // Raccourci clavier pour la recherche
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simuler une réponse de l'IA
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `C'est une excellente question ! Voici ma réponse détaillée à votre demande concernant : "${content}". 

Je vais vous expliquer cela de manière claire et structurée. Cette réponse intègre plusieurs perspectives pour vous offrir une vision complète.

Dans un système réel, ORION analyserait votre requête en profondeur et mobiliserait les agents appropriés pour vous fournir la meilleure réponse possible.`,
        thinkingProcess: {
          analysis: "J'ai identifié une demande nécessitant une explication détaillée et contextuelle.",
          plan: "Je vais consulter l'Agent Logique pour la structure, puis l'Agent Créatif pour enrichir la réponse.",
          contributions: [
            {
              agent: "Logique",
              response: "Structuration de la réponse en points clés avec exemples concrets.",
            },
            {
              agent: "Créatif",
              response: "Ajout d'analogies et d'exemples pour améliorer la compréhension.",
            },
          ],
          verification: "L'Agent Vérificateur a confirmé la cohérence des informations dans la base de connaissances.",
          synthesis: "J'assemble maintenant ces éléments en une réponse claire et complète.",
        },
        suggestions: [
          "Peux-tu approfondir ce point ?",
          "Donne-moi un exemple concret",
          "Quelles sont les alternatives ?",
        ],
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleFileUpload = (file: File) => {
    toast.success(`Fichier "${file.name}" importé avec succès`);
  };

  const handleVoiceRecord = () => {
    toast.info("Enregistrement vocal démarré");
  };

  const handleToolSelect = (tool: string) => {
    toast.info(`Outil "${tool}" sélectionné`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <ConversationsSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={mockConversations}
        currentConversationId="1"
        onSelectConversation={(id) => {
          toast.info(`Conversation ${id} sélectionnée`);
          setSidebarOpen(false);
        }}
        onDeleteConversation={(id) => {
          toast.success("Conversation supprimée");
        }}
        onNewConversation={() => {
          setMessages([]);
          setSidebarOpen(false);
          toast.success("Nouvelle conversation créée");
        }}
      />

      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={(convId, msgId) => {
          toast.info(`Navigation vers ${msgId} dans ${convId}`);
        }}
      />

      <ControlCenter
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <main className="flex-1 pt-16 pb-32">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center min-h-[60vh]">
              <WelcomeMessage />
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-14rem)]">
              <div className="space-y-6">
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    thinkingProcess={message.thinkingProcess}
                    suggestions={message.suggestions}
                    onRegenerate={() => toast.info("Régénération...")}
                    onFeedback={(type) =>
                      toast.success(
                        type === "positive"
                          ? "Merci pour votre retour positif !"
                          : "Merci, nous allons améliorer cette réponse."
                      )
                    }
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </main>

      <ChatInput
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        onVoiceRecord={handleVoiceRecord}
        onToolSelect={handleToolSelect}
      />
    </div>
  );
};

export default Index;
