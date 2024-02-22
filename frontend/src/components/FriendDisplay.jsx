import { ActionButton } from "../components/ActionButton";
import { RedActionButton } from "../components/RedActionButton";

/* eslint-disable react/prop-types */
export function FriendDisplay({ friend, onDelete }) {
  console.log(friend);
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
        fontWeight: "600",
        width: "100%"
      }}
    >
      {photoUrl && <img src={photoUrl} style={{ width: "250px", height: "250px", borderRadius: "50%" }}></img>}
      <h1>{name}</h1>
      {phoneNumber && <h3 style={{ margin: "0px" }}>{phoneNumber}</h3>}
      {funFact && <p>Fun Fact: {funFact}</p>}
      <ActionButton text="Edit" onAction={() => {}} />
      <RedActionButton text="Delete" onAction={onDelete} />
    </div>
  );
}
