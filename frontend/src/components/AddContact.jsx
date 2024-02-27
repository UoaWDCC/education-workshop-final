import { useState, useRef } from 'react'
import { ActionButton } from './ActionButton'

export function AddContact(){

  const [visible, setVisible] = useState(true);
  const modalRef = useRef(null);

  const addFriend = () => {
    console.log("friend added")
  }

  return (
    <>
    { visible ? <div style = {{position: "absolute",
    display: "flex",
    direction: "row",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: "100",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",}} onClick={(e) => {if (modalRef.current.contains(e.target)) {
      return;
    }
    setVisible(false);}}>
    <div className='add-contacts' ref={modalRef}>
      <h3 className='add-contact-header'>Add Contact</h3>

      <div className='add-contact-details'>
        <div>
          <label>Name</label>
          <input placeholder='name'/>
        </div>
       
       <div>
        <label>Phone number</label>
          <input placeholder='Phone number'/>
       </div>
        
        <div>
          <label>Fun fact</label>
          <textarea rows={4} />
        </div>
       
       <ActionButton text="Add Contact" onAction={() => addFriend()} />
      </div>
     
    </div>
    </div> : <></>}
    </>
  )
}