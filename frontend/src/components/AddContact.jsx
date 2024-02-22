import React from 'react'
import { ActionButton } from './ActionButton'

export function AddContact(){

  const addFriend = () => {
    console.log("friend added")
  }

  return (
    <div className='add-contacts'>
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
  )
}