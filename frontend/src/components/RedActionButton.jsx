/* eslint-disable react/prop-types */
export function RedActionButton({ text, onAction }) {
  return (
    <button
      style={{
        padding: "10px 20px",
        color: "#FF030399",
        backgroundColor: "#fff",
        borderRadius: "6px",
        border: "2px solid #FF030399",
        cursor: "pointer",
        margin: "10px",
        fontWeight: "bold"
      }}
      onClick={onAction}
    >
      {text}
    </button>
  );
}
