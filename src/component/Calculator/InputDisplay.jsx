import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

const InputDisplay = ({ input, setInput }) => {
  return (
    <div className="mb-4">
      <input
        className="w-full p-2 border border-gray-300 rounded text-right"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="mt-2 p-2 bg-gray-400 rounded text-sm">
        <MathJaxContext>
          <MathJax>{"\\(" + input + "\\)"}</MathJax>
        </MathJaxContext>
      </div>
    </div>
  );
};

export default InputDisplay;
