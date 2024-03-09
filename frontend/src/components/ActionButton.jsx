/* eslint-disable react/prop-types */
export function ActionButton({ text, onAction }) {
  return (
    <button
      style={{
        padding: "12px 30px",
        color: "#fff",
        backgroundColor: "#C22BF8",
        borderRadius: "6px",
        border: "none",
        boxShadow: "0px 4px 4px 0px #888888",
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
