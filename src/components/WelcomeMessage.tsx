import { useState, useEffect } from "react";
import decorationFlow from "@/assets/decoration-flow.png";
import orionLogo from "@/assets/orion-logo.png";

export const WelcomeMessage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const updateMessage = () => {
      const hour = new Date().getHours();
      const userName = ""; // Peut être personnalisé avec le profil utilisateur

      let greeting = "";
      
      if (hour >= 5 && hour < 12) {
        const morningMessages = [
          `Bonjour${userName ? ` ${userName}` : ""}. Prêt à commencer la journée ?`,
          "Un café, une idée ? Bonjour !",
          "Que pouvons-nous créer ce matin ?"
        ];
        greeting = morningMessages[Math.floor(Math.random() * morningMessages.length)];
      } else if (hour >= 12 && hour < 18) {
        const afternoonMessages = [
          "Bon après-midi ! Comment puis-je vous aider à avancer ?",
          "J'espère que votre journée se passe bien. Quelle est notre prochaine tâche ?",
          "Une pause créative ? Ou un problème à résoudre ?"
        ];
        greeting = afternoonMessages[Math.floor(Math.random() * afternoonMessages.length)];
      } else if (hour >= 18 && hour < 22) {
        const eveningMessages = [
          "Bonsoir. Le moment idéal pour explorer une nouvelle idée.",
          "Comment s'est passée votre journée ? Prêt à vous détendre ou à finaliser un projet ?",
          "La soirée est propice à la réflexion. Que puis-je faire pour vous ?"
        ];
        greeting = eveningMessages[Math.floor(Math.random() * eveningMessages.length)];
      } else {
        const nightMessages = [
          "Il se fait tard. Une dernière pensée ou une question pour la nuit ?",
          "Les meilleures idées naissent souvent la nuit. En avez-vous une à me confier ?",
          "Bonsoir. Je suis là si l'inspiration vous empêche de dormir."
        ];
        greeting = nightMessages[Math.floor(Math.random() * nightMessages.length)];
      }
      
      setMessage(greeting);
    };

    updateMessage();
    // Mettre à jour le message toutes les heures
    const interval = setInterval(updateMessage, 3600000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-6 animate-slide-up relative">
      {/* Background avec effet d'aurore - fusionné sans bordures */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url(${decorationFlow})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.85,
          }}
          aria-hidden="true"
        />
      </div>
      
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          {/* Halo lumineux animé */}
          <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-50 blur-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-purple-600" />
          
          {/* Avatar ORION énergétique */}
          <img 
            src={orionLogo}
            alt="ORION Avatar"
            className="relative w-full h-full object-contain animate-float animate-orb-pulse"
          />
        </div>
      </div>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">
        ORION
      </h1>
      <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {message}
      </p>
    </div>
  );
};
