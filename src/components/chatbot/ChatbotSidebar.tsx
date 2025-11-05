import React, { useEffect, useState } from "react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle
} from "../../components/ui/alert-dialog";
import api, { getData } from "../apis/baseUrl";


interface Session {
    id: string;
    title: string;
}

export interface ChatbotSidebarProps {
    open: boolean;
    onClose: () => void;
    onSessionSelect: (sessionId: string) => void;
    onNewChat: () => void;
}

export const ChatbotSidebar: React.FC<ChatbotSidebarProps> = ({ open, onClose, onSessionSelect, onNewChat }) => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [editSession, setEditSession] = useState<string | null>(null);
    const [sTitle, setSTitle] = useState<string>("");
    const token = localStorage.getItem('token');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);


    const loadSessions = async () => {
        const result = await getData("/chat-session/sessions?user_id=&page=1&page_size=20");
        if (result.success) {
            const sessionsArray = result.data?.data?.sessions;
            setSessions(sessionsArray || []);
        } else {
            setSessions([]);
        }
    };

    useEffect(() => {
        if (open) {
            loadSessions();
        }
    }, [open]);

    const handleSelectSession = async () => {
        if (!sessionId) return;
        onSessionSelect(sessionId);
        onClose();
    };

    const deleteSession = async () => {
        if (!sessionId) {
            console.error("No session selected for deletion");
            return;
        }
        try {
            const response = await api.delete(`/chat-session/sessions/${sessionId}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            });
            await loadSessions();
            return response.data;
        } catch (error: any) {
            throw error;
        }
    };

    const renameSession = async () => {
        if (!editSession) return;
        try {
            const response = await api.patch(
                `/chat-session/sessions/${editSession}`,
                { title: sTitle },
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                    },
                }
            );
            setEditSession(null);
            await loadSessions();
        } catch (error: any) {
            throw error;
        }
    };

    if (!open) return null;

    return (
        <div className="absolute top-0 left-0 h-full w-64 bg-[#242730] text-white shadow-lg z-40 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">Chat Sessions</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    ✕
                </button>
            </div>

            {/* Create New Session */}
            <div className="p-4 border-b border-gray-700">
                <button
                    className="w-full bg-[#1FBAD6] hover:bg-[#08aecc] py-2 px-3 rounded text-white font-medium"
                    onClick={() => {
                        onNewChat();
                        onClose();
                    }}
                >
                    + New Chat
                </button>
            </div>

            {/* Session List */}
            <div className="flex-1 p-2 overflow-y-auto space-y-1 custom-scrollbar">
                {sessions.map((session) => (
                    <div
                        key={session.id}
                        className="relative group flex items-center justify-between rounded hover:bg-gray-700 p-2 cursor-pointer"
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        {editSession === session.id ? (
                            <input
                                type="text"
                                value={sTitle}
                                onChange={(e) => setSTitle(e.target.value)}
                                onBlur={() => renameSession()}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") renameSession();
                                    if (e.key === "Escape") setEditSession(null);
                                }}
                                className="flex-1 bg-transparent border-b border-gray-500 text-white outline-none"
                                autoFocus
                            />
                        ) : (
                            <div
                                onClick={() => {
                                    setSessionId(session.id)
                                    handleSelectSession()
                                }}
                                className="flex-1 truncate"
                            >
                                {session.title}
                            </div>
                        )}

                        <div className="relative">
                            <button
                                onClick={() => {
                                    setActiveMenu(activeMenu === session.id ? null : session.id);
                                    setSessionId(session.id);
                                }}

                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded hover:bg-gray-600"
                            >
                                ⋯
                            </button>

                            {/* Dropdown */}
                            {activeMenu === session.id && (
                                <div className="absolute right-0 top-full mt-1 w-32 bg-gray-800 border border-gray-700 rounded shadow-lg z-50">
                                    <button
                                        className="w-full text-left px-3 py-2 hover:bg-gray-700"
                                        onClick={() => {
                                            setEditSession(session.id);
                                            setSTitle(session.title);
                                            setActiveMenu(null);
                                        }}
                                    >
                                        Rename
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSessionId(session.id);
                                            setActiveMenu(null);
                                            setShowDeleteDialog(true);
                                        }}
                                        className="w-full text-left px-3 py-2 hover:bg-red-600 text-red-400"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent
                    className="bg-[#1e2128] border border-gray-700 text-white max-w-sm mx-auto text-center rounded-2xl p-6 flex flex-col items-center justify-center space-y-6">                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Chat?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this session? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600">
                            No
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-500"
                            onClick={async () => {
                                await deleteSession();
                                setShowDeleteDialog(false);
                            }}>
                            Yes
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};