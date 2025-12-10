"use client";

import { RefreshCw, Eye } from "lucide-react";

interface LivePreviewProps {
    htmlContent: string;
}

export function LivePreview({ htmlContent }: LivePreviewProps) {
    return (
        <div className="flex flex-col h-full bg-gray-100">
            <div className="p-3 border-b border-gray-200 bg-white flex justify-between items-center px-6">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Eye size={16} />
                    Live Preview
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <RefreshCw size={14} />
                </button>
            </div>

            <div className="flex-1 p-6 overflow-hidden">
                <div className="w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
                    {/* Safety Sandbox: render HTML via iframe or blob to avoid script execution issues in this prototype environment 
                For prototype, we use srcDoc.
            */}
                    <iframe
                        srcDoc={htmlContent}
                        className="w-full h-full border-0"
                        title="Preview"
                        sandbox="allow-scripts"
                    />
                </div>
            </div>
        </div>
    );
}
