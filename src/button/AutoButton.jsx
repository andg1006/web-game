import { useState, useEffect } from "react";

function AutoButton({ isTypingDone, onAutoNext }) {
  const [autoMode, setAutoMode] = useState(false);

  // 대사 출력 완료되면 자동으로 다음 대사로 넘어감
  useEffect(() => {
    if (autoMode && isTypingDone) {
      const timer = setTimeout(() => {
        onAutoNext(); // 외부에서 넘겨준 handleClick 호출
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [autoMode, isTypingDone, onAutoNext]);

  return (
    <button
      onClick={() => setAutoMode((prev) => !prev)}
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 10,

        padding: "7.5px 12.5px",

        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: autoMode ? "#ffdd55" : "white",
        border: autoMode ? "3px solid #ffdd55" : "3px solid white",
        borderRadius: "10px",

        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {autoMode ? "AUTO" : "AUTO"}
    </button>
  );
}

export default AutoButton;
