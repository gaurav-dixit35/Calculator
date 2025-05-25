import React from "react";

const HistoryList = ({ history }) => {
  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">History</h3>
      <ul className="text-sm max-h-32 overflow-y-auto">
        {history.map((entry, i) => (
          <li key={i} className="flex justify-between border-b py-1">
            <span>{entry.expression}</span>
            <span className="font-bold">= {entry.result}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;