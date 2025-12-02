import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Check, AlertCircle } from "lucide-react";

type ChatMessage = {
    text: string;
    fromAI?: boolean;
    status?: "sending" | "sent" | "error";
    errorMessage?: string;
};

export default function AIHelper() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    // const [isTestingConnection, setIsTestingConnection] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    // Test connection
    // const testConnection = async () => {
    //   setIsTestingConnection(true);
    //   try {
    //     const res = await fetch(
    //       `https://api.telegram.org/bot${botToken}/getMe`
    //     );
    //     const data = await res.json();

    //     if (data.ok) {
    //       setMessages([{
    //         text: `✅ Bot ulanish muvaffaqiyatli! Bot nomi: ${data.result.first_name}`,
    //         fromAI: true
    //       }]);
    //     } else {
    //       setMessages([{
    //         text: `❌ Xato: ${data.description}`,
    //         fromAI: true
    //       }]);
    //     }
    //   } catch (error) {
    //     setMessages([{
    //       text: `❌ Ulanish xatosi: ${error instanceof Error ? error.message : 'Noma\'lum xato'}`,
    //       fromAI: true
    //     }]);
    //   }
    //   setIsTestingConnection(false);
    // };

    // Get chat ID
    // const getChatId = async () => {
    //   try {
    //     const res = await fetch(
    //       `https://api.telegram.org/bot${botToken}/getUpdates`
    //     );
    //     const data = await res.json();

    //     if (data.ok && data.result.length > 0) {
    //       const lastMessage = data.result[data.result.length - 1];
    //       const foundChatId = lastMessage.message?.chat?.id || lastMessage.my_chat_member?.chat?.id;

    //       setMessages(prev => [...prev, {
    //         text: `📱 Topilgan Chat ID: ${foundChatId}\n\nBu ID ni kodingizda ishlatishingiz mumkin!`,
    //         fromAI: true
    //       }]);
    //     } else {
    //       setMessages(prev => [...prev, {
    //         text: `⚠️ Chat ID topilmadi. Avval botga /start buyrug'ini yuboring va qayta urinib ko'ring.`,
    //         fromAI: true
    //       }]);
    //     }
    //   } catch (error) {
    //     setMessages(prev => [...prev, {
    //       text: `❌ Xato: ${error instanceof Error ? error.message : 'Noma\'lum xato'}`,
    //       fromAI: true
    //     }]);
    //   }
    // };

    // Send to Telegram
    const sendToTelegram = async (text: string) => {
        try {
            const res = await fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: text,
                        parse_mode: "HTML"
                    }),
                }
            );

            const data = await res.json();

            if (!data.ok) {
                throw new Error(data.description || "Xabar yuborishda xatolik");
            }

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : "Noma'lum xato"
            };
        }
    };

    // Auto scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send message
    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        if (chatId === "YOUR_CHAT_ID") {
            setMessages(prev => [...prev, {
                text: "⚠️ Chat ID ni sozlamagan ekansiz! Avval 'Chat ID ni olish' tugmasini bosing.",
                fromAI: true
            }]);
            return;
        }

        const newMsg: ChatMessage = {
            text,
            fromAI: false,
            status: "sending",
        };

        setMessages((prev) => [...prev, newMsg]);
        setInputValue("");

        const msgIndex = messages.length;

        const result = await sendToTelegram(text);

        setMessages((prev) => {
            const updated = [...prev];
            updated[msgIndex].status = result.success ? "sent" : "error";
            if (!result.success) {
                updated[msgIndex].errorMessage = result.error;
            }
            return updated;
        });

        if (result.success) {
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { text: "✅ Xabaringiz muvaffaqiyatli yuborildi!", fromAI: true },
                ]);
            }, 500);
        } else {
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { text: `❌ Xato: ${result.error}`, fromAI: true },
                ]);
            }, 500);
        }
    };

    const toggleChat = () => setOpen(!open);

    const defaultTemplates = [
        "Menga yordam kerak!",
        "Savol berish",
        "Texnik qo'llab-quvvatlash",
    ];

    // Status icon
    const renderStatus = (msg: ChatMessage) => {
        if (msg.status === "sending")
            return <Loader2 className="ml-2 text-white text-xs animate-spin" size={12} />;
        if (msg.status === "sent")
            return (
                <span className="ml-2 text-white text-xs flex items-center">
                    <Check size={10} />
                    <Check size={10} className="-ml-1" />
                </span>
            );
        if (msg.status === "error")
            return (
                <span className="ml-2 text-red-300 text-xs flex items-center gap-1" title={msg.errorMessage}>
                    <AlertCircle size={12} />
                </span>
            );
        return null;
    };

    return (
        <div className="fixed bottom-18 right-4 z-50 flex flex-col items-start">
            <button
                onClick={toggleChat}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" color="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </button>

            {open && (
                <div className="mt-2 max-w-90 max-h-[500px] bg-white shadow-xl rounded-lg flex flex-col border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 bg-linear-to-r from-blue-500 to-blue-600 text-white">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                            </svg>
                            <span className="font-semibold">AI Yordamchi</span>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="hover:bg-white/20 rounded-full p-1 transition"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Connection Test Buttons */}
                    {/* <div className="p-3 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2">
            <button
              onClick={testConnection}
              disabled={isTestingConnection}
              className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm rounded-md disabled:opacity-50 flex items-center gap-1"
            >
              {isTestingConnection && <Loader2 size={14} className="animate-spin" />}
              Ulanishni tekshirish
            </button>
            <button
              onClick={getChatId}
              className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded-md"
            >
              Chat ID ni olish
            </button>
          </div> */}

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 text-sm mt-8">
                                <p>👋 Salom! Sizga qanday yordam bera olaman?</p>
                                {/* <p className="mt-2 text-xs">Avval yuqoridagi tugmalar orqali botni sozlang</p> */}
                            </div>
                        )}
                        {messages.map((m, idx) => (
                            <div
                                key={idx}
                                className={`px-4 py-2 rounded-lg max-w-[85%] flex items-center shadow-sm ${m.fromAI
                                    ? "bg-white border border-gray-200 self-start text-gray-800"
                                    : "bg-blue-500 text-white self-end"
                                    }`}
                            >
                                <span className="text-sm whitespace-pre-line">{m.text}</span>
                                {!m.fromAI && renderStatus(m)}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Templates */}
                    {messages.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-3 border-t border-gray-200 bg-white">
                            {defaultTemplates.map((t, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => sendMessage(t)}
                                    className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 text-white text-sm rounded-full transition"
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white">
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage(inputValue)}
                            placeholder="Xabar yozing..."
                            className="
                  flex-1 px-4 py-2 border border-gray-300 
                text-black placeholder:text-gray-500
                dark:text-white dark:placeholder:text-gray-400
                  rounded-full focus:outline-none focus:ring-2 
                focus:ring-blue-500 text-sm
               "
                        />

                        <button
                            onClick={() => sendMessage(inputValue)}
                            disabled={!inputValue.trim()}
                            className="bg-blue-500 hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 transition w-10 h-10 flex items-center justify-center"
                        >
                            <Send size={18} color="#fff" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}