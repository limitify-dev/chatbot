import { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/chatbotApi';
import iteteroIcon from '../assets/itetero-icon.png';

function ChatBot() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: 'Muraho! Ndi Itetero, umufasha wawe w\'ubwenge bw\'ubukorano. Nkore iki kugira ngo ngufashe uyu munsi?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!inputValue.trim()) {
            return;
        }

        // Add user message to the chat
        const userMessage = {
            id: messages.length + 1,
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setError(null);

        try {
            // Send message to the chatbot API
            const botResponse = await sendMessage(inputValue);

            // Add bot response to the chat
            const botMessage = {
                id: messages.length + 2,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            setError(err.message);
            console.error('Error:', err);

            // Add error message to the chat
            const errorMessage = {
                id: messages.length + 2,
                text: `Sorry, I encountered an error: ${err.message}. Please try again.`,
                sender: 'bot',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', backgroundColor: '#ffffff' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 24px',
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e5e7eb'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={iteteroIcon} alt="Itetero" style={{ width: '28px', height: '28px' }} />
                    <h1 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>Itetero</h1>
                </div>
                <button style={{
                    color: '#0ea5e9',
                    fontSize: '14px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px 14px',
                    fontWeight: '500',
                    transition: 'all 0.15s',
                    borderRadius: '6px'
                }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f9ff'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    + New chat
                </button>
            </div>

            {/* Messages Container */}
            <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#fafafa', padding: '20px 0' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
                    {messages.map((message, index) => (
                        <div
                            key={message.id}
                            style={{
                                padding: '0 20px',
                                marginBottom: index < messages.length - 1 ? '20px' : '0',
                                display: 'flex',
                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                            }}
                        >
                            <div style={{ maxWidth: '70%', display: 'flex', gap: '14px', alignItems: 'flex-start', flexDirection: message.sender === 'user' ? 'row-reverse' : 'row' }}>
                                {/* Avatar */}
                                <div style={{ flexShrink: 0 }}>
                                    {message.sender === 'user' ? (
                                        <div
                                            style={{
                                                width: '34px',
                                                height: '34px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#0891b2',
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                backgroundColor: '#fef3c7',
                                                border: '2px solid #fde68a'
                                            }}
                                        >
                                            U
                                        </div>
                                    ) : (
                                        <div style={{
                                            width: '34px',
                                            height: '34px',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            backgroundColor: '#ffffff',
                                            border: '2px solid #e0f2fe',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <img
                                                src={iteteroIcon}
                                                alt="AI"
                                                style={{
                                                    width: '30px',
                                                    height: '30px'
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Message Content */}
                                <div style={{ flex: 1, paddingTop: '2px' }}>
                                    <div style={{
                                        lineHeight: '1.6',
                                        fontSize: '15px',
                                        backgroundColor: message.sender === 'user' ? '#0ea5e9' : '#ffffff',
                                        padding: '12px 16px',
                                        borderRadius: message.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                        border: message.sender === 'user' ? 'none' : '1px solid #e5e7eb',
                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                                        color: message.sender === 'user' ? '#ffffff' : '#1f2937'
                                    }}>
                                        {message.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div style={{ padding: '0 20px', marginTop: '20px' }}>
                            <div style={{ maxWidth: '70%', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                <div style={{ flexShrink: 0 }}>
                                    <div style={{
                                        width: '34px',
                                        height: '34px',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        backgroundColor: '#ffffff',
                                        border: '2px solid #e0f2fe',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <img
                                            src={iteteroIcon}
                                            alt="AI"
                                            style={{
                                                width: '30px',
                                                height: '30px'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div style={{ flex: 1, paddingTop: '6px' }}>
                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <span className="w-2 h-2 rounded-full animate-typing" style={{ backgroundColor: '#0ea5e9' }}></span>
                                        <span className="w-2 h-2 rounded-full animate-typing" style={{ backgroundColor: '#0ea5e9', animationDelay: '0.2s' }}></span>
                                        <span className="w-2 h-2 rounded-full animate-typing" style={{ backgroundColor: '#0ea5e9', animationDelay: '0.4s' }}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div ref={messagesEndRef} />
            </div>

            {/* Error Banner */}
            {error && (
                <div style={{ padding: '12px 20px', backgroundColor: '#fef2f2', borderTop: '1px solid #fecaca' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', color: '#dc2626', fontSize: '14px' }}>
                        {error}
                    </div>
                </div>
            )}

            {/* Input Form */}
            <div style={{
                backgroundColor: '#ffffff',
                padding: '16px 20px 20px 20px',
                borderTop: '1px solid #e5e7eb'
            }}>
                <form style={{ maxWidth: '900px', margin: '0 auto' }} onSubmit={handleSendMessage}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Message Itetero..."
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '13px 50px 13px 16px',
                                backgroundColor: '#f9fafb',
                                border: '1px solid #d1d5db',
                                borderRadius: '14px',
                                color: '#111827',
                                fontSize: '15px',
                                outline: 'none',
                                transition: 'all 0.2s',
                                fontFamily: 'Lexend, sans-serif'
                            }}
                            onFocus={(e) => {
                                e.target.style.backgroundColor = '#ffffff';
                                e.target.style.borderColor = '#0ea5e9';
                                e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.backgroundColor = '#f9fafb';
                                e.target.style.borderColor = '#d1d5db';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputValue.trim()}
                            style={{
                                position: 'absolute',
                                right: '6px',
                                padding: '9px',
                                color: '#ffffff',
                                backgroundColor: isLoading || !inputValue.trim() ? '#cbd5e1' : '#0ea5e9',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseOver={(e) => {
                                if (!isLoading && inputValue.trim()) {
                                    e.currentTarget.style.backgroundColor = '#0284c7';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!isLoading && inputValue.trim()) {
                                    e.currentTarget.style.backgroundColor = '#0ea5e9';
                                }
                            }}
                            aria-label="Send message"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChatBot;
