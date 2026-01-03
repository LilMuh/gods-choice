import React, { useState } from 'react';
import '../styles/GodsChoice.css';

function GodsChoice() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(null);
    const [loading, setLoading] = useState(false);

    const hints = [
        '按照你的直觉去做，你的第一反应往往是正确的。',
        '权衡利弊，列出所有可能的结果。',
        '咨询身边信任的人的意见。',
        '给自己一些时间，不要仓促决定。',
        '相信你的能力，你能处理好任何选择的后果。',
        '想象一年后回顾这个决定，你会庆幸做了吗？',
        '选择能让你成长的那个选项。',
        '听听你内心的声音，它知道什么对你最好。',
    ];

    const handleAsk = (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        setLoading(true);
        // 模拟API调用
        setTimeout(() => {
            const randomHint = hints[Math.floor(Math.random() * hints.length)];
            setAnswer(randomHint);
            setLoading(false);
        }, 1000);
    };

    const handleReset = () => {
        setQuestion('');
        setAnswer(null);
    };

    return (
        <div className="gods-choice-container">
            <div className="content">
                <h1 className="title">Gods Choice</h1>
                <p className="subtitle">God always knows the right one</p>

                <form onSubmit={handleAsk} className="form">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="问一个你不确定的问题..."
                        className="input"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading || !question.trim()}
                    >
                        {loading ? '寻求答案中...' : '获取提示'}
                    </button>
                </form>

                {answer && (
                    <div className="answer-container">
                        <p className="answer-text">{answer}</p>
                        <button onClick={handleReset} className="reset-btn">
                            继续提问
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GodsChoice;
