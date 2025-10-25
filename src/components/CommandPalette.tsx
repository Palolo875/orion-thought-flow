import { useState, useEffect } from "react";
import { Search, Clock } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchResult {
  id: string;
  title: string;
  content: string;
  conversationId: string;
  date: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (conversationId: string, messageId: string) => void;
}

export const CommandPalette = ({ isOpen, onClose, onNavigate }: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  // Simuler une recherche sémantique
  useEffect(() => {
    if (query.length > 0) {
      // Dans une vraie implémentation, cela ferait une requête à la base vectorielle
      const mockResults: SearchResult[] = [
        {
          id: "1",
          title: "Discussion sur les algorithmes",
          content: "Explication détaillée du tri par fusion...",
          conversationId: "conv1",
          date: "Il y a 2 jours",
        },
        {
          id: "2",
          title: "Projet React",
          content: "Comment optimiser les performances...",
          conversationId: "conv2",
          date: "Il y a 1 semaine",
        },
      ].filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.content.toLowerCase().includes(query.toLowerCase())
      );
      setResults(mockResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    onNavigate(result.conversationId, result.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 rounded-3xl">
        {/* Barre de recherche */}
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher dans toutes vos conversations..."
            className="border-0 focus-visible:ring-0 text-base"
            autoFocus
          />
          <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-xs font-medium opacity-100 sm:flex">
            <span className="text-xs">ESC</span>
          </kbd>
        </div>

        {/* Résultats */}
        <ScrollArea className="max-h-[400px]">
          {query.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p>Recherchez dans toutes vos conversations</p>
              <p className="text-sm mt-2">La recherche sémantique vous aide à retrouver rapidement n'importe quelle information</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>Aucun résultat trouvé</p>
            </div>
          ) : (
            <div className="p-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full text-left p-4 rounded-2xl hover:bg-muted transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{result.title}</h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {result.date}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {result.content}
                  </p>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer avec raccourcis */}
        <div className="flex items-center justify-center gap-4 p-3 border-t text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-muted rounded">↑↓</kbd>
            Naviguer
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd>
            Ouvrir
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-muted rounded">Esc</kbd>
            Fermer
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
