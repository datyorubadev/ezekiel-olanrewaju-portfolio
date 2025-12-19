import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        { text: "Hi there! How can I help you today?", isUser: false }
    ]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setMessages([...messages, { text: message, isUser: true }]);
        setMessage('');

        // Simulate response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "Thanks for your message! I'll get back to you shortly.",
                isUser: false
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end md:bottom-6 md:right-6">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[calc(100vw-2rem)] md:w-[410px] bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden origin-bottom-right"
                    >
                        {/* Header */}
                        <div className="bg-black p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium text-sm">Chat with Ezekiel</h3>
                                    <p className="text-white/60 text-xs">Typically replies in a few minutes</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleChat}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-[520px] overflow-y-auto p-4 bg-neutral-50 flex flex-col gap-3">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isUser
                                        ? 'bg-black text-white self-end rounded-tr-sm'
                                        : 'bg-white border border-neutral-200 text-neutral-800 self-start rounded-tl-sm'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-neutral-100 flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Send a message..."
                                className="flex-1 bg-neutral-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                            />
                            <button
                                type="submit"
                                disabled={!message.trim()}
                                className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChat}
                className="w-14 h-14 bg-neutral-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-700 transition-colors border border-white/10"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
};
