import React, { useState, useRef } from 'react';
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
import { thunkHandleStartConvo, thunkDeleteNotification, thunkSendMessage } from '../Actions/user'
import { ContactSupportOutlined } from '@material-ui/icons';



const useStyles = makeStyles(modalStyle);



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



export default function Modal(props) {
    const user = props['user']
    const { id, fname } = user
    const [modal, setModal] = useState(false);
    const [body, setBody] = useState('')
    const [messages, setMessages] = useState([])
    const [conversation_id, setConversationId] = useState(null)
    const [notificationDeleted, setNotificationDeleted] = useState(false)
    const typingInput = useRef(null)
    const endOfMessages = useRef(null)
    const dispatch = useDispatch()
    const classes = useStyles();

    const handleStartConvo = () => { // needs other users id to find the conversation that they are already having
      dispatch(thunkHandleStartConvo(id))// needs to load the page because it needs to start up websocket
      setModal(true)// it waits until loader is no longer false ( check redux )
    }

    
    const handleReceivedConversation = conversationData => { // when action cable gets the conversation this updates state
      const { id, messages } = conversationData.conversation // to hold the id of conversation, and the previous messages the users exchanged
      setMessages(messages)
      setConversationId(id)
      endOfMessages.current.scrollIntoView({ behavior: 'smooth' })
    }

    const sendMessage = e => { // sends message to the backend
        e.preventDefault()
        dispatch(thunkSendMessage(conversation_id, body))
        setBody('')
        typingInput.current.focus()
      }

      
      const handleNewMessages = newMessage => {// because of a bug, that i can't figure out yet, active cable sends multiple responses back
        let newMessages = messages.filter(message => message.id !== newMessage.message.id)// this filters duplicates
        newMessages.push(newMessage.message)
        setMessages(newMessages)// updates state to show new messages received
        endOfMessages.current.scrollIntoView({ behavior: 'smooth' })
    }
    
    const renderMessages = () => {
      return messages.map(message => <p>{`${message.fname}:    ${message.body}`}</p>)
    }

    const deleteNotification = () => { // send delete request for this message
      dispatch(thunkDeleteNotification(id))
      setNotificationDeleted(true)
    }



  return (
    <div>
      { notificationDeleted ? null :
      <Button style={props.type === 'MessageBar' ? { borderRadius: '30px 0 0 30px', width: '5rem' } : null} color={ props.type === 'MessageBar' ? 'primary' : 'rose' } onClick={handleStartConvo}>
        {props.type === 'MessageBar' ? fname : 'Message!'}
      </Button>
      }
      { props.type === 'MessageBar' && !notificationDeleted ?
      <Button onClick={deleteNotification} style={{ borderRadius: '0 30px 30px 0', padding: '12px', width: '1rem' }} color='rose'>
        x
      </Button>
       : null }
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