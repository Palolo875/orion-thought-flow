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
      <DialogContent className="max-w-6xl w-[98vw] h-[96vh] sm:w-[95vw] sm:h-[92vh] p-0 gap-0 rounded-xl sm:rounded-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row h-full">
          {/* Navigation latérale - Responsive */}
          <div className="w-full sm:w-56 lg:w-64 bg-muted/20 border-b sm:border-b-0 sm:border-r border-border/50 flex-shrink-0">
            <div className="p-3 sm:p-4 md:p-5 border-b border-border/50">
              <h2 className="font-light text-lg sm:text-xl md:text-2xl tracking-wide">Control Center</h2>
            </div>
            <ScrollArea className="h-[100px] sm:h-[calc(92vh-4rem)]">
              <nav className="p-2 sm:p-3 flex sm:flex-col gap-1.5 sm:gap-2 overflow-x-auto sm:overflow-x-visible">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all whitespace-nowrap text-sm ${
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground font-medium shadow-sm"
                          : "hover:bg-accent/10 hover:text-accent text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
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
              <div className="p-4 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-2">
                    {getSectionContent(activeSection).title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    {getSectionContent(activeSection).description}
                  </p>
                </div>

                {activeSection === "profile" && (
                  <div className="space-y-4">
                    <div className="p-4 md:p-6 bg-card/50 backdrop-blur rounded-2xl border border-border/50 space-y-4">
                      <div>
                        <label className="text-sm font-medium">Nom d'affichage</label>
                        <input
                          type="text"
                          className="w-full mt-1 px-3 md:px-4 py-2 md:py-3 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm md:text-base"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Préférences de communication</label>
                        <select className="w-full mt-1 px-3 md:px-4 py-2 md:py-3 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm md:text-base">
                          <option>Formel</option>
                          <option>Décontracté</option>
                          <option>Technique</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "agent-studio" && (
                  <div className="grid gap-3 md:gap-4">
                    <div className="p-4 md:p-6 border border-border/50 rounded-2xl bg-card/30 backdrop-blur hover:bg-card/50 transition-colors">
                      <h4 className="font-medium mb-2 text-sm md:text-base">Agent Logique</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Spécialisé dans l'analyse technique et le raisonnement structuré
                      </p>
                    </div>
                    <div className="p-4 md:p-6 border border-border/50 rounded-2xl bg-card/30 backdrop-blur hover:bg-card/50 transition-colors">
                      <h4 className="font-medium mb-2 text-sm md:text-base">Agent Créatif</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Génère des idées innovantes et des solutions créatives
                      </p>
                    </div>
                    <div className="p-4 md:p-6 border border-border/50 rounded-2xl bg-card/30 backdrop-blur hover:bg-card/50 transition-colors">
                      <h4 className="font-medium mb-2 text-sm md:text-base">Agent Vérificateur</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Valide les faits et assure la cohérence des informations
                      </p>
                    </div>
                  </div>
                )}

                {activeSection === "model-foundry" && (
                  <div className="p-4 md:p-6 bg-card/50 backdrop-blur rounded-2xl border border-border/50">
                    <p className="text-sm md:text-base text-muted-foreground">Configuration des modèles à venir...</p>
                  </div>
                )}

                {activeSection === "memory" && (
                  <div className="p-4 md:p-6 bg-card/50 backdrop-blur rounded-2xl border border-border/50">
                    <p className="text-sm md:text-base text-muted-foreground">Gestion de la mémoire à venir...</p>
                  </div>
                )}

                {activeSection === "security" && (
                  <div className="p-4 md:p-6 bg-card/50 backdrop-blur rounded-2xl border border-border/50">
                    <p className="text-sm md:text-base text-muted-foreground">Paramètres de sécurité à venir...</p>
                  </div>
                )}

                {activeSection === "settings" && (
                  <div className="p-4 md:p-6 bg-card/50 backdrop-blur rounded-2xl border border-border/50 space-y-4">
                    <h4 className="font-medium text-sm md:text-base">Préférences d'affichage</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm md:text-base">Thème</span>
                      <select className="px-3 md:px-4 py-2 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm md:text-base">
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
