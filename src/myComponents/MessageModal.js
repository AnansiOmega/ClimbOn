import React, { useState} from 'react';
// material-ui components
import {makeStyles} from "@material-ui/core/styles";
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
import { FormGroup, Input } from 'reactstrap'
import modalStyle from "../assets/jss/material-kit-react/modalStyle";

const useStyles = makeStyles(modalStyle);


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



export default function Modal(props) {
    const user = props['user'] // annoying bug that happens when using these styled components
    const { id } = user
    const [modal, setModal] = useState(false);
    const [body, setBody] = useState('')
    const [messages, setMessages] = useState([])
    const [conversation_id, setConversationId] = useState('')

    const classes = useStyles();

    const handleStartConvo = () => {
        const current_user_id = localStorage.getItem('userId')
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({current_user_id, user_id: id})
        }
        fetch('http://localhost:3000/conversations', reqObj)
            .then(resp => resp.json())
            .then(conversation => {
                console.log(conversation)
                setConversationId(conversation.id)
                // setUserId(conversation.sender_id)
                setMessages(conversation.messages)
                setModal(true)
            })
    }


    const sendMessage = e => {
        const user_id = localStorage.getItem('userId')
        e.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({conversation_id, user_id, body})
        }
        
        fetch('http://localhost:3000/messages', reqObj)
        .then( resp => resp.json())
        .then( data => {
            debugger
        })
        setBody('')
    }

    const renderMessages = () => {
        return messages.map(message => <p>{`${message.user.fname}:    ${message.body}`}</p>)
    }
    
  return (
    <div>
        <Button color="rose" round onClick={handleStartConvo}>
          Message!
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
          <h4 className={classes.modalTitle}>Your conversation with Gortat</h4>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
            {renderMessages()}
        <FormGroup style={{display: 'flex', alignItems:'center'}}>
            <Input type="text" name="message" placeholder="send a message" onChange={e => setBody(e.target.value)} value={body}/>
            <Button onClick={sendMessage}>Send</Button>
        </FormGroup>
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + " " + classes.modalFooterCenter}
        >
        </DialogActions>
      </Dialog>
    </div>
  );
}