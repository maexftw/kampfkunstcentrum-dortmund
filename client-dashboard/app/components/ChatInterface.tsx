"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import clsx from "clsx";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

interface ChatInterfaceProps {
    onSendMessage: (message: string) => void;
    messages: Message[];
    isProcessing: boolean;
}

export function ChatInterface({ onSendMessage, messages, isProcessing }: ChatInterfaceProps) {
    const [input, setInput] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;

        onSendMessage(input);
        setInput("");
    };

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Bot size={18} className="text-red-600" />
                    KI Editor
                </h2>
                <p className="text-xs text-gray-500">Beschreiben Sie, was Sie ändern möchten.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={clsx(
                            "flex gap-3 max-w-[90%]",
                            msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div
                            className={clsx(
                                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                msg.role === "user" ? "bg-gray-200" : "bg-red-100 text-red-600"
                            )}
                        >
                            {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div
                            className={clsx(
                                "p-3 rounded-lg text-sm",
                                msg.role === "user"
                                    ? "bg-gray-900 text-white rounded-tr-none"
                                    : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
                            )}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isProcessing && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                            <Bot size={14} />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none border border-gray-200">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="z.B. Ändere die Überschrift..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm text-gray-900 bg-white"
                    />
                    <button
                        type="submit"
                        disabled={isProcessing || !input.trim()}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}
