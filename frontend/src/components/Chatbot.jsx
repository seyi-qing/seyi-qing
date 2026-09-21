import { useEffect, useRef, useState } from "react";
import { getChatReply, suggestedPrompts } from "../utils/chatbotEngine.js";
import { brand } from "../data/content.js";

const WELCOME_MESSAGE = {
  role: "assistant",
  content:
    "Hey — I'm the assistant. I can answer questions about services, pricing, chatbots, voice agents, or automation. What would you like to know?",
};

/**
 * Live chatbot demo. This is the interactive centerpiece of the page: a
 * working chat widget, not a screenshot of one. Messages are held in
 * component state; replies come from `chatbotEngine.getChatReply`, which
 * can be swapped between local rule-based answers and a real backend
 * without this component changing at all.
 */
export default function Chatbot() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMessage = { role: "user", content: trimmed };
    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setInput("");
    setIsTyping(true);

    const reply = await getChatReply(trimmed, nextHistory);

    setMessages((current) => [...current, { role: "assistant", content: reply }]);
    setIsTyping(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <section id="chatbot" className="section section--muted">
      <div className="section__inner">
        <div className="section__header">
          <h2>Try the chatbot. Ask it anything.</h2>
          <p>
            This is a real, working preview of how a chatbot I build would handle questions on
            your site. Try asking about pricing, voice agents, or automation.
          </p>
        </div>

        <div className="chat-widget">
          <div className="chat-widget__header">
            <div className="chat-widget__avatar" aria-hidden="true">
              {brand.name.charAt(0)}
            </div>
            <div>
              <p className="chat-widget__title">Assistant</p>
              <p className="chat-widget__status">
                <span className="chat-widget__status-dot" /> Live demo
              </p>
            </div>
          </div>

          <div className="chat-widget__body" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-message chat-message--${m.role}`}>
                <p>{m.content}</p>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message chat-message--assistant chat-message--typing" aria-live="polite">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <div className="chat-widget__prompts">
            {suggestedPrompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => sendMessage(prompt)} disabled={isTyping}>
                {prompt}
              </button>
            ))}
          </div>

          <form className="chat-widget__input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about pricing, services, or how this works…"
              aria-label="Message the assistant"
            />
            <button type="submit" className="btn btn--primary btn--small" disabled={isTyping || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
