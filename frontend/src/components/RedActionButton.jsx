/* eslint-disable react/prop-types */
export function RedActionButton({ text, onAction}) {
    return <button style={{
        padding: "10px 20px",
        color: "#FF030399",
        backgroundColor: "#fff",
        borderRadius: "6px",
        border: "2px solid #FF030399",
        boxShadow: "0px 4px 4px 0px #888888",
        margin: "10px",
        fontWeight: "bold",
    }}onClick={onAction}>{text}</button>
}