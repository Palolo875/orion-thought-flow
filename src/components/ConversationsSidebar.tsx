import { useState } from "react";
import { X, MessageSquare, Trash2, Edit3, MoreVertical, Archive, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Conversation {
  id: string;
  title: string;
  date: string;
}

interface ConversationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  currentConversationId?: string;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewConversation: () => void;
}

export const ConversationsSidebar = ({
  isOpen,
  onClose,
  conversations,
  currentConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewConversation,
}: ConversationsSidebarProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-80 bg-card border-r z-50 flex flex-col shadow-xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Conversations
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Nouveau Chat */}
        <div className="p-4 border-b">
          <Button
            onClick={onNewConversation}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
          >
            + Nouvelle Conversation
          </Button>
        </div>

        {/* Liste des conversations */}
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`relative group rounded-2xl transition-all border ${
                  currentConversationId === conv.id
                    ? "bg-accent/10 border-accent/30 shadow-sm"
                    : "hover:bg-muted/50 border-transparent hover:border-border/50"
                }`}
                onMouseEnter={() => setHoveredId(conv.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <button
                  onClick={() => onSelectConversation(conv.id)}
                  className="w-full text-left p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MessageSquare className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <p className="font-medium truncate text-sm leading-tight">{conv.title}</p>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-7 w-7 rounded-full shrink-0 transition-opacity ${
                                hoveredId === conv.id ? 'opacity-100' : 'opacity-0'
                              }`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" strokeWidth={1.5} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-52">
                            <DropdownMenuItem className="gap-3 py-2.5">
                              <Pin className="h-4 w-4" strokeWidth={1.5} />
                              <span>Épingler</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 py-2.5">
                              <Edit3 className="h-4 w-4" strokeWidth={1.5} />
                              <span>Renommer</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-3 py-2.5">
                              <Archive className="h-4 w-4" strokeWidth={1.5} />
                              <span>Archiver</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="gap-3 py-2.5 text-destructive focus:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteConversation(conv.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                              <span>Supprimer</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{conv.date}</span>
                        <span>•</span>
                        <span className={`transition-opacity ${
                          hoveredId === conv.id ? 'opacity-100' : 'opacity-0'
                        }`}>
                          12 messages
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};
