import { ActionButton } from "../components/ActionButton";
import { RedActionButton } from "../components/RedActionButton";

/* eslint-disable react/prop-types */
export function FriendDisplay({ friend, onDelete }) {
  if (!friend) {
    return <div>No friend selected</div>;
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
        fontWeight: "600",
        flexGrow: 1,
        flexShrink: 0,
        paddingTop: "50px"
      }}
    >
      <img
        src={
          photoUrl || "https://th.bing.com/th/id/OIP.PoS7waY4-VeqgNuBSxVUogAAAA?rs=1&pid=ImgDetMain"
        }
        style={{ width: "250px", height: "250px", borderRadius: "50%" }}
      ></img>
      <h1>{name}</h1>
      {phoneNumber && <h3 style={{ margin: "0px" }}>{phoneNumber}</h3>}
      {funFact && <p>Fun Fact: {funFact}</p>}
      <ActionButton text="Edit" onAction={() => {}} />
      <RedActionButton text="Delete" onAction={onDelete} />
    </div>
  );
}
