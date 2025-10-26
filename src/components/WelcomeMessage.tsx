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
      {/* Illustration décorative en arrière-plan fusionnée avec des dégradés multiples */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-10">
        <div 
          className="w-full h-full scale-125 animate-float"
          style={{
            backgroundImage: `url(${decorationFlow})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </div>
      
      <div className="flex items-center justify-center gap-4 mb-4">
        <img 
          src={orionLogo}
          alt="ORION"
          className="w-20 h-20 md:w-32 md:h-32 animate-float object-contain"
          style={{
            filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.08))',
            mixBlendMode: 'normal'
          }}
        />
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
