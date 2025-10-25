import { Menu, Search, Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import orionLogo from "@/assets/orion-logo.png";

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenSettings: () => void;
}

export const Header = ({ onToggleSidebar, onOpenSearch, onOpenSettings }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/95 backdrop-blur-xl border-border/50 z-30">
      <div className="h-full px-3 md:px-6 flex items-center justify-between max-w-7xl mx-auto">
        {/* Gauche: Menu conversations + Logo */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="rounded-full hover:bg-accent/20 hover:text-accent"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </Button>
          
          <div className="flex items-center gap-2">
            <img 
              src={orionLogo} 
              alt="ORION" 
              className="w-8 h-8 object-contain opacity-90"
            />
            <span className="font-light text-lg tracking-wide hidden sm:inline">ORION</span>
          </div>
        </div>

        {/* Droite: Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSearch}
            className="rounded-full hover:bg-accent/20 hover:text-accent"
            title="Rechercher (Ctrl+K)"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-accent/20 hover:text-accent"
          >
            {isDark ? <Sun className="h-5 w-5" strokeWidth={1.5} /> : <Moon className="h-5 w-5" strokeWidth={1.5} />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenSettings}
            className="rounded-full hover:bg-accent/20 hover:text-accent"
          >
            <Settings className="h-5 w-5" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </header>
  );
};
