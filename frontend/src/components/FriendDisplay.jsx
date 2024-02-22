import {ActionButton} from "../components/ActionButton"
import {RedActionButton} from "../components/RedActionButton"

/* eslint-disable react/prop-types */
export function FriendDisplay ({friend}) {
    console.log(friend);
    const {name, phoneNumber, funFact, photoUrl} = friend;
    return (
        <div style={{
            display:"flex",
            textAlign: "center",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "serif",
            height: "100vh",
        }}>
            <img src={photoUrl} style={{width: "250px", height: "250px", borderRadius: "50%"}}></img><h1>{name}</h1>
            <h3>{phoneNumber}</h3>
           
            <p>Fun Fact: {funFact}</p>
           <ActionButton text="Edit" onAction={() => {console.log("edit!!")}}/>
           <RedActionButton text="Delete" onAction={() => {console.log("delete!!")}}/>
        </div>
    );
}
