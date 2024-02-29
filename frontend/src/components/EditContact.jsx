/* eslint-disable react/prop-types */
import { useRef } from 'react'
import { ActionButton } from './ActionButton'

export function EditContact({visible, setVisible, editContact, contact }){
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
      <h3 className='add-contact-header'>Edit Contact</h3>

      <div className='add-contact-details'>
        
        {/* Replace this with a HTML form??? */}
        <div>
          <label>Name</label>
          <input id="name" placeholder='name' defaultValue={contact?.name ?? ''}/>
        </div>
       
       <div>
        <label>Phone number</label>
          <input id="phoneNumber" placeholder='Phone number' defaultValue ={contact?.phoneNumber ?? ''}/>
       </div>
        
        <div>
          <label>Fun fact</label>
          <textarea id="funFact" rows={4} defaultValue ={contact?.funFact ?? ''}/>
        </div>
     
       <ActionButton text="Save" onAction={() => { 
        const name = document.getElementById("name")?.value;
        const phoneNumber = document.getElementById("phoneNumber")?.value;
        const funFact = document.getElementById("funFact")?.value;
        
        editContact(name, phoneNumber, funFact); 
        setVisible(false);}} />
      </div>
     
    </div>
    </div> : <></>}
    </>
  )
}