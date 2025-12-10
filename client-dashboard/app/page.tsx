"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { ChatInterface, Message } from "./components/ChatInterface";
import { LivePreview } from "./components/LivePreview";

// Mock initial content - in a real app this comes from GitHub API
const INITIAL_HTML = `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Kampfkunstcentrum Dortmund</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-gray-900 font-sans">
    <nav class="p-4 bg-white shadow-sm flex justify-between items-center">
        <div class="font-bold text-xl">KAMPFKUNST <span class="text-red-600">DORTMUND</span></div>
        <div class="space-x-4">
            <a href="#" class="hover:text-red-600">Willkommen</a>
            <a href="#" class="bg-red-600 text-white px-4 py-2 rounded">Probetraining</a>
        </div>
    </nav>
    <section class="h-[60vh] bg-gray-900 flex items-center justify-center relative overflow-hidden text-white text-center px-4">
         <div class="relative z-10 max-w-4xl mx-auto">
            <span class="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Fachschule für Ving Tsun und Krav Maga</span>
            <h1 class="text-5xl font-bold mb-4">Wing Chun & Krav Maga Training in Dortmund</h1>
            <p class="text-xl opacity-90 mb-8">Traditionelle Kampfkunst und moderne Selbstverteidigung in Dortmund Sölde</p>
            <div class="flex justify-center gap-4">
                <a href="#" class="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold transition">Probetraining</a>
                <a href="#" class="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded font-bold transition">Mehr erfahren</a>
            </div>
         </div>
    </section>
</body>
</html>
`;

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hallo! Ich bin dein Agentur-Editor. Ich kann dir helfen, Texte zu ändern, Bilder auszutauschen oder das Layout anzupassen. Was möchtest du heute tun?" }
  ]);
  const [htmlContent, setHtmlContent] = useState(INITIAL_HTML);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (input: string) => {
    // Add user message
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    // MOCK AI LOGIC
    // In production: Call API route -> LangChain -> OpenAI -> Parse HTML -> Return Diff
    setTimeout(() => {
      let responseText = "Ich habe die Vorschau für dich aktualisiert.";
      let newHtml = htmlContent;

      const lowerInput = input.toLowerCase();

      if (lowerInput.includes("titel") || lowerInput.includes("überschrift") || lowerInput.includes("title")) {
        newHtml = newHtml.replace(
          "Wing Chun & Krav Maga Training in Dortmund",
          "Selbstverteidigung für alle in Dortmund" // Mock change
        );
        responseText = "Ich habe die Überschrift in 'Selbstverteidigung für alle in Dortmund' geändert. Wie gefällt dir das?";
      } else if (lowerInput.includes("farbe") || lowerInput.includes("blau") || lowerInput.includes("color")) {
        newHtml = newHtml.replaceAll("bg-red-600", "bg-blue-600");
        newHtml = newHtml.replaceAll("text-red-600", "text-blue-600");
        responseText = "Ich habe die Hauptfarbe auf Blau geändert. Besser?";
      } else {
        responseText = "Ich habe verstanden, was du möchtest, aber da dies ein Prototyp ist, kann ich momentan nur 'Titel' oder 'Farbe' ändern. Versuch es mal mit 'Ändere die Überschrift'.";
      }

      setHtmlContent(newHtml);

      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: responseText };
      setMessages(prev => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main Content Area - Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Chat */}
          <div className="w-[400px] flex-shrink-0 flex flex-col border-r border-gray-200 shadow-sm z-10">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isProcessing={isProcessing}
            />
          </div>

          {/* Right: Preview */}
          <div className="flex-1 bg-gray-100 p-4 overflow-hidden flex flex-col">
            <LivePreview htmlContent={htmlContent} />
          </div>
        </div>
      </div>
    </div>
  );
}
