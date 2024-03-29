/* eslint-disable react/prop-types */
import { useRef } from 'react'
import { ActionButton } from './ActionButton'

export function AddContact({visible, setVisible, addContact }){
  const modalRef = useRef(null);

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
        
        {/* Replace this with a HTML form??? */}
        <div>
          <label>Name</label>
          <input id="name" placeholder='name' />
        </div>
       
       <div>
        <label>Phone number</label>
          <input id="phoneNumber" placeholder='Phone number' />
       </div>
        
        <div>
          <label>Fun fact</label>
          <textarea id="funFact" rows={4}/>
        </div>
     
       <ActionButton text="Add Contact" onAction={() => { 
        const name = document.getElementById("name")?.value;
        const phoneNumber = document.getElementById("phoneNumber")?.value;
        const funFact = document.getElementById("funFact")?.value;
        
        addContact(name, phoneNumber, funFact); 
        setVisible(false);}} />
      </div>
     
    </div>
    </div> : <></>}
    </>
  )
}