// src/components/ChatComponent.jsx
import { useRef, useEffect } from 'react';

function ChatComponent({ messages, input, setInput, handleSend }) {
    const chatBodyRef = useRef(null);

    // Cuộn xuống cuối mỗi khi có tin nhắn mới
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="card shadow-sm" style={{ width: '100%', maxWidth: '350px' }}>
            <div
                className="card-body p-3 overflow-auto"
                style={{ height: '300px', backgroundColor: '#fefefe' }}
                ref={chatBodyRef}
            >
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`d-flex mb-3 ${
                            msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'
                        }`}
                    >
                        <div
                            className={`px-3 py-2 ${
                                msg.sender === 'user'
                                    ? 'bg-primary text-white rounded-pill rounded-bottom-right-0'
                                    : 'bg-light text-dark rounded-pill rounded-bottom-left-0'
                            }`}
                            style={{ maxWidth: '75%', wordWrap: 'break-word' }}
                        >
                            <small className="font-weight-bold">{msg.sender === 'user' ? 'Bạn' : 'Bot'}:</small>{' '}
                            <span>{msg.text}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer: ô nhập và nút Gửi */}
            <div className="card-footer bg-white p-2">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập câu hỏi..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        style={{
                            outline: 'none',
                            boxShadow: 'none',
                            borderColor: '#ced4da',
                        }}
                    />
                    <button className="btn btn-primary" type="button" onClick={handleSend}>
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatComponent;
