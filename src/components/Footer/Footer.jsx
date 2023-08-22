import React, { useContext } from 'react'
import './Footer.css'
import Modal from 'react-modal';
import { ThemeContext } from '../../contexts/ThemeContext';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgrounColor:"rgba(0, 0, 0, 0.5)"
  }
};


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'));


function Footer() {
      // Change to use global state
    // NOTE {} Not []
    const {darkMode, setDarkMode} = useContext(ThemeContext)

  // I need to create the State to control my modal
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className={darkMode ? 'footer-container footer-dark' : 'footer-container'} >
        <button className="contact-btn" onClick={() => setIsOpen(true)}>Contact Us</button>
        <Modal
        isOpen={isOpen}
        onRequestClose={()=>setIsOpen(false)}
        style={customStyles}
        contentLabel="Contact Us Modal"
      >
        <div className='modal-header'>
          <h2>Contact Us</h2>
          <button className='modal-close-btn' onClick={() => setIsOpen(false)}>X</button>
        </div>
        
        <form>
        <label htmlFor="name">Name</label>
          <input type="text" id="name" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="4"></textarea>
          <button type="submit">Send</button>
        </form>
      </Modal>
    </div>
  )
}

export default Footer