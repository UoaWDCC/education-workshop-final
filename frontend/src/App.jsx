import ContactCard from "./components/ContactCard";
import Sidebar from "./components/Sidebar";

export default function App() {

  const dummyFriend = {name: "Sam", phoneNumber: "02321231231", funFact: "I like climbing trees!", photoUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"};
  return (
    <div>
      <Sidebar />
      <h1>Hello, world!</h1>
      <p>This is an app.</p>
    </div>
  );
}
