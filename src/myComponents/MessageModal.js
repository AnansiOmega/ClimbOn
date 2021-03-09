import React, { useState, useRef, useEffect } from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";
import { FormGroup, Input, Form } from 'reactstrap'
import modalStyle from "../assets/jss/material-kit-react/modalStyle";
import { ActionCableConsumer } from 'react-actioncable-provider'
import { useDispatch } from 'react-redux'
import { thunkHandleStartConvo } from '../Actions/user'
import { ContactSupportOutlined } from '@material-ui/icons';



const useStyles = makeStyles(modalStyle);



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



export default function Modal(props) {
    const user = props['user'] // annoying bug that happens when using these styled components
    const { id, fname } = user
    const [modal, setModal] = useState(false);
    const [body, setBody] = useState('')
    const [messages, setMessages] = useState([])
    const [conversation_id, setConversationId] = useState(null)
    const typingInput = useRef(null)
    const endOfMessages = useRef(null)
    const dispatch = useDispatch()
    const classes = useStyles();

    const handleStartConvo = () => {
      dispatch(thunkHandleStartConvo(id))
      setModal(true)
    }


    const sendMessage = e => {
        const user_id = localStorage.getItem('userId')// thunk this next time. 
        e.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({conversation_id, user_id, body})
        }
        
        fetch('http://localhost:3000/messages', reqObj)
        setBody('')
        typingInput.current.focus()
      }
      
      const handleReceivedConversation = conversationData => {
        const { id, messages } = conversationData.conversation
        setMessages(messages)
        setConversationId(id)
        endOfMessages.current.scrollIntoView({ behavior: 'smooth' })
      }

      
      const handleNewMessages = newMessage => {
        let newMessages = messages.filter(message => message.id !== newMessage.message.id)
        newMessages.push(newMessage.message)
        setMessages(newMessages)
        endOfMessages.current.scrollIntoView({ behavior: 'smooth' })
    }
    
    const renderMessages = () => {
      return messages.map(message => <p>{`${message.fname}:    ${message.body}`}</p>)
    }



  return (
    <div>
      <Button color={props.type === 'MessageBar' ? 'primary' : 'rose'} round onClick={handleStartConvo}>
        {props.type === 'MessageBar' ? fname : 'Message!'}
      </Button>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal
        }}
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
          <h4 className={classes.modalTitle}>{`Your conversation with ${fname}`}</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <ActionCableConsumer
            channel={{ channel: 'MessagesChannel', conversation_id }}
            onReceived={handleNewMessages}
          />
          <ActionCableConsumer
            channel={{ channel: 'ConversationsChannel' }}
            onReceived={handleReceivedConversation}
          />
          {renderMessages()}
          <div ref={endOfMessages}></div>
          <Form onSubmit={sendMessage}>
            <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
              <Input ref={typingInput} type="text" name="message" placeholder="send a message" onChange={e => setBody(e.target.value)} value={body} />
              <Button type='submit'>Send</Button>
            </FormGroup>
          </Form>
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
        </DialogActions>
      </Dialog>
    </div>
  );
}

// import { makeStyles } from '@material-ui/core/styles';

// export default function SimpleBackdrop() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleToggle = () => {
//     setOpen(!open);
//   };

//   return (
//     <div>
//       <Button variant="outlined" color="primary" onClick={handleToggle}>
//         Show backdrop
//       </Button>
//       <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </div>
//   );
// }

      