
import { useState, useEffect } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import Editor from "react-simple-code-editor";
import "./App.css";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { motion } from "framer-motion";

function App() {
    const [code, setCode] = useState(`function sum() { return 1+1; }`);
    const [review, setReview] = useState("");
    const [language, setLanguage] = useState("Python");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        prism.highlightAll();
    }, []);

    async function reviewCode() {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/ai/get-review", { code, language });
            setReview(response.data);
        } catch (error) {
            setReview("Error fetching review. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container neon-theme"
            style={{ background: "radial-gradient(circle, #1a1a1a, #000000)", padding: "20px" }}
        >
            <motion.div className="left" initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                <motion.div className="code" whileHover={{ scale: 1.02 }}>
                    <Editor
                        value={code}
                        onValueChange={setCode}
                        highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
                        padding={10}
                        style={{
                            fontFamily: '"Orbitron", monospace',
                            fontSize: 16,
                            border: "2px solid #0ff",
                            borderRadius: "10px",
                            height: "100%",
                            width: "100%",
                            transition: "box-shadow 0.3s ease-in-out",
                            background: "rgba(0, 0, 0, 0.8)",
                            color: "#0ff",
                            boxShadow: "0 0 20px #0ff",
                        }}
                        className="editor neon-glow"
                    />
                </motion.div>
                <div className="controls">
                    <motion.select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value)} 
                        whileHover={{ scale: 1.05 }}
                        style={{ background: "#000", color: "#0ff", border: "1px solid #0ff", boxShadow: "0 0 10px #0ff" }}
                    >
                        <option value="Python">Python</option>
                        <option value="C++">C++</option>
                        <option value="Java">Java</option>
                        <option value="Go">Go</option>
                    </motion.select>
                    <motion.button 
                        onClick={reviewCode} 
                        className="review neon-button" 
                        whileHover={{ scale: 1.1, backgroundColor: "#0ff", color: "#000" }} 
                        whileTap={{ scale: 0.9 }} 
                        disabled={loading}
                        style={{ background: "#000", border: "2px solid #0ff", boxShadow: "0 0 15px #0ff", color: "#0ff" }}
                    >
                        {loading ? "LOADING..." : "REVIEW"}
                    </motion.button>
                </div>
            </motion.div>
            <motion.div className="right" initial={{ x: 50 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                <motion.div 
                    className="review-box neon-glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    style={{ background: "rgba(0, 0, 0, 0.8)", color: "#0ff", padding: "20px", border: "2px solid #0ff", boxShadow: "0 0 20px #0ff" }}
                >
                    <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
                </motion.div>
                <motion.div 
                    className="ai-assistant"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    style={{ position: "absolute", bottom: "20px", right: "20px", width: "80px", height: "80px", borderRadius: "50%", background: "#0ff", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 0 15px #0ff" }}
                >
                    <motion.div 
                        animate={{ y: loading ? [0, -5, 0] : 0 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        style={{ fontSize: "24px", fontWeight: "bold", color: "#000" }}
                    >
                        {loading ? "🤖" : "✅"}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.main>
    );
}

export default App;


