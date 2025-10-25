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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 gap-0 rounded-3xl overflow-hidden">
        <div className="flex h-full">
          {/* Navigation latérale */}
          <div className="w-48 border-r bg-card/50">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Control Center</h2>
            </div>
            <ScrollArea className="h-[calc(80vh-4rem)]">
              <nav className="p-2 space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                        activeSection === section.id
                          ? "bg-accent/10 text-accent font-medium"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </ScrollArea>
          </div>

          {/* Contenu */}
          <div className="flex-1">
            <ScrollArea className="h-full">
              <div className="p-6">
                {activeSection === "profile" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Profil Utilisateur</h3>
                    <p className="text-muted-foreground">
                      Configurez vos préférences personnelles et votre profil.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Nom d'affichage</label>
                        <input
                          type="text"
                          className="w-full mt-1 px-4 py-2 rounded-xl border bg-background"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Préférences de communication</label>
                        <select className="w-full mt-1 px-4 py-2 rounded-xl border bg-background">
                          <option>Formel</option>
                          <option>Décontracté</option>
                          <option>Technique</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "agent-studio" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Agent Studio</h3>
                    <p className="text-muted-foreground">
                      Créez et configurez vos agents spécialisés.
                    </p>
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-2xl">
                        <h4 className="font-medium mb-2">Agent Logique</h4>
                        <p className="text-sm text-muted-foreground">
                          Spécialisé dans l'analyse technique et le raisonnement structuré
                        </p>
                      </div>
                      <div className="p-4 border rounded-2xl">
                        <h4 className="font-medium mb-2">Agent Créatif</h4>
                        <p className="text-sm text-muted-foreground">
                          Génère des idées innovantes et des solutions créatives
                        </p>
                      </div>
                      <div className="p-4 border rounded-2xl">
                        <h4 className="font-medium mb-2">Agent Vérificateur</h4>
                        <p className="text-sm text-muted-foreground">
                          Valide les faits et assure la cohérence des informations
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "model-foundry" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Model Foundry</h3>
                    <p className="text-muted-foreground">
                      Sélectionnez et configurez les modèles d'IA.
                    </p>
                  </div>
                )}

                {activeSection === "memory" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Mémoire</h3>
                    <p className="text-muted-foreground">
                      Gérez la base de connaissances et la mémoire vectorielle.
                    </p>
                  </div>
                )}

                {activeSection === "security" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Sécurité</h3>
                    <p className="text-muted-foreground">
                      Configurez les paramètres de sécurité et de confidentialité.
                    </p>
                  </div>
                )}

                {activeSection === "settings" && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold">Paramètres</h3>
                    <p className="text-muted-foreground">
                      Paramètres généraux de l'application.
                    </p>
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
