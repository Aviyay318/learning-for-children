import "./MessageBubble.css"
export default function MessageBubble({ message }) {
    return (
        <div className="message-bubble">
            {message}
        </div>
    );
}
