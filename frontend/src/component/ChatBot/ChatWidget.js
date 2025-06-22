// src/components/ChatWidget.jsx
import { useState } from 'react';
import ChatComponent from './ChatComponent';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCableCar, faMessage } from '@fortawesome/free-solid-svg-icons';

function ChatWidget() {
    const [open, setOpen] = useState(false);

    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn hôm nay?' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        const textToSend = input.trim();

        setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
        setInput('');

        try {
            const res = await axios.post('http://localhost:4000/api/chat', { text: textToSend });

            const botReply = res.data.reply || 'Xin lỗi, mình không hiểu.';
            setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
        } catch (err) {
            console.error('Lỗi khi gọi backend:', err);
            setMessages((prev) => [...prev, { sender: 'bot', text: 'Xin lỗi, có lỗi xảy ra khi gọi API!' }]);
        }
    };

    return (
        <>
            {!open && (
                <button
                    className="btn btn-primary rounded-circle shadow"
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '60px',
                        height: '60px',
                        zIndex: 9999,
                    }}
                    onClick={() => setOpen(true)}
                >
                    {/* <i className="fas fa-comments" style={{ fontSize: '24px' }}></i> */}
                    <FontAwesomeIcon icon={faMessage} style={{ fontSize: '24px' }} />
                </button>
            )}

            {open && (
                <div
                    className="card shadow"
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '100%',
                        maxWidth: '350px',
                        zIndex: 9999,
                    }}
                >
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <span className="mb-0">Chat với Bot</span>
                        <button className="btn btn-sm btn-light text-dark" onClick={() => setOpen(false)}>
                            <i className="fas fa-minus"></i>
                        </button>
                    </div>

                    <ChatComponent messages={messages} input={input} setInput={setInput} handleSend={handleSend} />
                </div>
            )}
        </>
    );
}

export default ChatWidget;
