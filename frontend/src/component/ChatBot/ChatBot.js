import { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn hôm nay?' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        // Hiển thị tin của user
        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');

        try {
            // Gọi API backend của bạn
            const res = await axios.post('http://localhost:4000/api/chat', { text: input });
            const botReply = res.data.reply || 'Xin lỗi, mình không hiểu.';
            setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
        } catch (err) {
            console.error('Lỗi khi gọi backend:', err);
            setMessages((prev) => [...prev, { sender: 'bot', text: 'Xin lỗi, có lỗi xảy ra khi gọi API!' }]);
        }
    };

    return (
        <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
            <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <strong>{msg.sender === 'user' ? 'Bạn' : 'Bot'}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 10, display: 'flex' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    style={{ flex: 1, padding: 8 }}
                    placeholder="Nhập câu hỏi..."
                />
                <button onClick={handleSend} style={{ padding: '8px 12px' }}>
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
