import "../styles/Message.css"

interface ThankYouMessageProps {
    onReset: () => void;
}

export const ThankYouMessage = ({ onReset }: ThankYouMessageProps) => (
    <div className="thank-you-message">
        <p>Отправлено! Однажды я его прочитаю...</p>
        <button className = "resetButton" onClick={onReset}>Отправить новое сообщение</button>
    </div>
);