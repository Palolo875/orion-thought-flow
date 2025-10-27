import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Bot, Cpu, Brain, Shield, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const sections = [
  { id: "profile", label: "Profil", icon: User },
  { id: "agent-studio", label: "Agent Studio", icon: Bot },
  { id: "model-foundry", label: "Model Foundry", icon: Cpu },
  { id: "memory", label: "Mémoire", icon: Brain },
  { id: "security", label: "Sécurité", icon: Shield },
  { id: "settings", label: "Paramètres", icon: SettingsIcon },
];

export const ControlCenter = ({ isOpen, onClose }: ControlCenterProps) => {
  const [activeSection, setActiveSection] = useState("profile");

  const getSectionContent = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    return {
      title: section?.label || '',
      description: getDescription(sectionId)
    };
  };

  const getDescription = (sectionId: string) => {
    const descriptions: Record<string, string> = {
      profile: "Configurez vos préférences personnelles et votre profil.",
      "agent-studio": "Créez et configurez vos agents spécialisés.",
      "model-foundry": "Sélectionnez et configurez les modèles d'IA.",
      memory: "Gérez la base de connaissances et la mémoire vectorielle.",
      security: "Configurez les paramètres de sécurité et de confidentialité.",
      settings: "Paramètres généraux de l'application."
    };
    return descriptions[sectionId] || '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] sm:w-[85vw] sm:h-[85vh] md:w-[80vw] p-0 gap-0 rounded-lg sm:rounded-xl overflow-hidden">
        <div className="flex flex-col sm:flex-row h-full">
          {/* Navigation latérale - Responsive */}
          <div className="w-full sm:w-48 bg-muted/20 border-b sm:border-b-0 sm:border-r border-border/50 flex-shrink-0">
            <div className="p-3 sm:p-4 border-b border-border/50">
              <h2 className="font-light text-base sm:text-lg tracking-wide">Control Center</h2>
            </div>
            <ScrollArea className="h-[100px] sm:h-[calc(85vh-3.5rem)]">
              <nav className="p-2 flex sm:flex-col gap-1 sm:gap-1.5 overflow-x-auto sm:overflow-x-visible">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg transition-all whitespace-nowrap text-xs sm:text-sm ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground font-medium shadow-sm"
                          : "hover:bg-accent/10 hover:text-accent text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" strokeWidth={1.5} />
                      <span>{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </ScrollArea>
          </div>

          {/* Contenu */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-light mb-1.5">
                    {getSectionContent(activeSection).title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {getSectionContent(activeSection).description}
                  </p>
                </div>

                {activeSection === "profile" && (
                  <div className="space-y-3">
                    <div className="p-3 sm:p-4 bg-card/50 backdrop-blur rounded-xl border border-border/50 space-y-3">
                      <div className="max-w-md">
                        <label className="text-xs sm:text-sm font-medium block mb-1.5">Nom d'affichage</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent/50 text-xs sm:text-sm"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div className="max-w-md">
                        <label className="text-xs sm:text-sm font-medium block mb-1.5">Préférences de communication</label>
                        <select className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent/50 text-xs sm:text-sm">
                          <option>Formel</option>
                          <option>Décontracté</option>
                          <option>Technique</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "agent-studio" && (
                  <div className="grid gap-2 sm:gap-3">
                    <div className="p-3 sm:p-4 border border-border/50 rounded-xl bg-card/30 backdrop-blur hover:bg-card/50 transition-colors">
                      <h4 className="font-medium mb-1.5 text-xs sm:text-sm">Agent Logique</h4>
                      <p className="text-xs text-muted-foreground">
                        Spécialisé dans l'analyse technique et le raisonnement structuré
                      </p>
                    </div>
                    <div className="p-3 sm:p-4 border border-border/50 rounded-xl bg-card/30 backdrop-blur hover:bg-card/50 transition-colors">
                      <h4 className="font-medium mb-1.5 text-xs sm:text-sm">Agent Créatif</h4>
                      <p className="text-xs text-muted-foreground">
                        Génère des idées innovantes et des solutions créatives
                      </p>
                    </div>
                    <div className="p-3 sm:p-4 border border-border/50 rounded-xl bg-card/30 backdrop-blur hover:bg-card/50 transition-colors">
                      <h4 className="font-medium mb-1.5 text-xs sm:text-sm">Agent Vérificateur</h4>
                      <p className="text-xs text-muted-foreground">
                        Valide les faits et assure la cohérence des informations
                      </p>
                    </div>
                  </div>
                )}

                {activeSection === "model-foundry" && (
                  <div className="p-3 sm:p-4 bg-card/50 backdrop-blur rounded-xl border border-border/50">
                    <p className="text-xs sm:text-sm text-muted-foreground">Configuration des modèles à venir...</p>
                  </div>
                )}

                {activeSection === "memory" && (
                  <div className="p-3 sm:p-4 bg-card/50 backdrop-blur rounded-xl border border-border/50">
                    <p className="text-xs sm:text-sm text-muted-foreground">Gestion de la mémoire à venir...</p>
                  </div>
                )}

                {activeSection === "security" && (
                  <div className="p-3 sm:p-4 bg-card/50 backdrop-blur rounded-xl border border-border/50">
                    <p className="text-xs sm:text-sm text-muted-foreground">Paramètres de sécurité à venir...</p>
                  </div>
                )}

                {activeSection === "settings" && (
                  <div className="p-3 sm:p-4 bg-card/50 backdrop-blur rounded-xl border border-border/50 space-y-3">
                    <h4 className="font-medium text-xs sm:text-sm">Préférences d'affichage</h4>
                    <div className="flex items-center justify-between gap-3 max-w-md">
                      <span className="text-xs sm:text-sm">Thème</span>
                      <select className="px-3 py-2 rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent/50 text-xs sm:text-sm flex-1 max-w-[200px]">
                        <option>Papier de Riz (Clair)</option>
                        <option>Nuit d'Encre (Sombre)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
