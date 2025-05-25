import React, { useState, useEffect, useRef, lazy, Suspense } from "react"; 
import { evaluate, format, config } from "mathjs";
import { db } from "../../service/firebase";
import emailjs from "@emailjs/browser";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import { Mic, LineChart } from "lucide-react";

import CalculatorButtons from "./CalculatorButtons";
import HistoryList from "./HistoryList";
import ThemeToggle from "./ThemeToggle";
import InputDisplay from "./InputDisplay";
import GraphSection from "./GraphSection";
import UnitConverter from "./UnitConverter";

const Calculator = ({ user }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showConverter, setShowConverter] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lastAnswer, setLastAnswer] = useState("");
  const [angleMode, setAngleMode] = useState("Deg");
  const [graphData, setGraphData] = useState(null);
  const [showGraph, setShowGraph] = useState(false);


  const chartRef = useRef(null);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const docRef = doc(db, "user_settings", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDarkMode(docSnap.data().darkMode);
        }
      } catch (e) {
        console.error("Error loading theme settings:", e);
      }
    };
    loadTheme();

    const handleKeyDown = (e) => {
      const key = e.key;
      if (key === "Enter") handleButtonClick("=");
      else if (key === "Backspace") setInput((prev) => prev.slice(0, -1));
      else if (/^[0-9()+\-*/^x.%]$/.test(key)) setInput((prev) => prev + key);
      else if (key.toLowerCase() === "c") setInput("");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lastAnswer]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    const voiceBtn = document.getElementById("voice-btn");
    if (voiceBtn) {
      voiceBtn.addEventListener("click", () => {
        const recognition =
          new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.onresult = (event) => {
          const spokenInput = event.results[0][0].transcript;
          setInput((prev) => prev + spokenInput);
        };
        recognition.start();
      });
    }
  }, []);

  const toggleAngleMode = () => {
    const newMode = angleMode === "Deg" ? "Rad" : "Deg";
    setAngleMode(newMode);
    config({ number: "number", angles: newMode === "Deg" ? "deg" : "rad" });
  };

  const saveThemeToFirebase = async (isDark) => {
    try {
      await setDoc(doc(db, "user_settings", user.uid), {
        darkMode: isDark,
        updatedAt: Timestamp.now(),
      });
    } catch (e) {
      console.error("Failed to save settings:", e);
      toast.error("Failed to save theme settings");
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    saveThemeToFirebase(newDarkMode);
  };

  const handleButtonClick = async (value) => {
    if (value === "C") {
      setInput("");
      return;
    }

    if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
      return;
    }

    if (value === "=") {
      try {
        const replacedInput = input.replace(/Ans/g, `(${lastAnswer})`);
        const result = format(evaluate(replacedInput), { precision: 14 });

        if (input.includes("x")) plotGraph(replacedInput);

        setHistory([...history, { expression: input, result }]);
        setLastAnswer(result);
        setInput(result);

        await addDoc(collection(db, "history"), {
          userId: user.uid,
          expression: input,
          result,
          createdAt: Timestamp.now(),
        });
      } catch (error) {
        console.error("Calculation error:", error);
        toast.error("Invalid calculation input.");
      }
      return;
    }

    setInput((prev) => prev + value);
  };

  const plotGraph = (expr = input) => {
  const values = [];
  const labels = [];
  for (let x = -10; x <= 10; x += 0.5) {
    try {
      const y = evaluate(expr.replace(/x/g, `(${x})`).replace(/Ans/g, `(${lastAnswer})`));
      labels.push(x);
      values.push(y);
    } catch (err) {
      console.warn(`Error at x=${x}:`, err.message);
    }
  }

  setGraphData({
    labels,
    datasets: [
      {
        label: `y = ${expr}`,
        data: values,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  setShowGraph(true); // Show the panel after plotting
};



  const exportToCSV = () => {
    const csv = history.map((h) => `${h.expression},${h.result}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "calculator_history.csv";
    a.click();
  };

  const sendEmail = () => {
    const content = history.map((h) => `${h.expression} = ${h.result}`).join("\n");
    const templateParams = {
      to_email: user.email,
      message: content,
    };

    emailjs
      .send(
        "service_4go46se",
        "template_74g5vhq",
        templateParams,
        "0Jd0ZTHaKRC0W9q2N"
      )
      .then(
        () => alert("Email sent successfully!"),
        (error) => alert("Failed to send email: " + error.text)
      );
  };

  const downloadGraphImage = () => {
    if (chartRef.current) {
      const chartCanvas = chartRef.current.canvas;
      const imageURL = chartCanvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imageURL;
      a.download = "graph.png";
      a.click();
    }
  };

  return (
    <div
      className={`calculator-wrapper bg-white dark:bg-gray-900 text-black dark:text-white p-4 rounded-xl shadow-md transition-all duration-300 ease-in-out ${
        showConverter || showHistory ? "min-h-[700px]" : "min-h-[450px]"
      }`}
    >
      <div className="flex justify-between mb-2">
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

        <button
          id="voice-btn"
          className="flex items-center gap-2 text-sm px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-500"
          >
          <Mic className="w-4 h-4" />
          
        </button>

        <button
          onClick={exportToCSV}
          className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Export CSV
        </button>
      </div>

      <InputDisplay input={input} setInput={setInput} />

      


      <CalculatorButtons
        onClick={handleButtonClick}
        angleMode={angleMode}
        toggleAngleMode={toggleAngleMode}
      />
      <button
  onClick={() => plotGraph()}
  onDoubleClick={() => setShowGraph(false)}
  className="mt-4 w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition flex items-center justify-center gap-2"
>
  <LineChart className="w-5 h-5" />
  Plot Graph
</button>


      {showGraph && graphData && (
  <div className="mt-4 relative bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
    <Suspense fallback={<div>Loading graph...</div>}>
      <GraphSection
        graphData={graphData}
        chartRef={chartRef}
        downloadGraphImage={downloadGraphImage}
      />
    </Suspense>
  </div>
)}

      

      {showHistory && <HistoryList history={history} />}

      {showConverter && (
        <Suspense fallback={<div>Loading converter...</div>}>
          <UnitConverter />
        </Suspense>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setShowConverter((prev) => !prev)}
          className="w-[48%] text-sm px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Unit Converter
        </button>
        <button
          onClick={() => setShowHistory((prev) => !prev)}
          className="w-[48%] text-sm px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          History
        </button>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-white/70 text-center">
        © 2025 GD's Calculator. All rights reserved by{" "}
        <a
          href="https://github.com/gaurav-dixit35"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          Gaurav Dixit
        </a>.
      </footer>
    </div>
  );
};
export default Calculator;
