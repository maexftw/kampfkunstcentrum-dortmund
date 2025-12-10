"use client";

import { MessageSquare, Layout, Settings, FileText, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
    { icon: Layout, label: "Übersicht", href: "/" },
    { icon: FileText, label: "Seiten", href: "/pages" },
    { icon: Upload, label: "Medien", href: "/media" },
    { icon: Settings, label: "Einstellungen", href: "/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col h-screen border-r border-gray-800">
            <div className="p-6">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                    <span className="bg-red-600 w-8 h-8 rounded flex items-center justify-center font-black">A</span>
                    AgenturApp
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                        )}
                    >
                        <item.icon size={18} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                        JD
                    </div>
                    <div className="text-sm">
                        <p className="font-medium">John Doe</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
