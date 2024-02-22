import { ActionButton } from "../components/ActionButton";
import { RedActionButton } from "../components/RedActionButton";

/* eslint-disable react/prop-types */
export function FriendDisplay({ friend, onDelete }) {
  if (!friend) {
    return <div>Loading...</div>;
  }
  const { name, phoneNumber, funFact, photoUrl } = friend;
  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Montserrat, sans-serif",
        height: "100vh",
        width: "100%",
        fontWeight: "600"
      }}
    >
      <img src={photoUrl} style={{ width: "250px", height: "250px", borderRadius: "50%" }}></img>
      <h1>{name}</h1>
      <h3 style={{ margin: "0px" }}>{phoneNumber || ""}</h3>
      <p>Fun Fact: {funFact || ""}</p>
      <ActionButton text="Edit" onAction={() => {}} />
      <RedActionButton text="Delete" onAction={onDelete} />
    </div>
  );
}
