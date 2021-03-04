import React, { useState } from "react";
import { useDispatch } from 'react-redux'
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import MessageModal from './MessageModal'
import { cardTitle } from "assets/jss/material-kit-react.js";

const styles = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textMuted: {
    color: "#6c757d"
  },
};

const useStyles = makeStyles(styles);

export default function Cards(props) {
const [convoStarted, setConvoStarted] = useState(false)
const user = props['user']
const { id, fname, climbing_preference, commitment, photo, skill_level } = user
const dispatch = useDispatch()
const classes = useStyles()

const imgUrl = `http://localhost:3000/${photo}`;
const userProfileUrl = `/profile/${id}`
  return (
    <Card className={classes.textCenter} style={{ flexDirection: 'row'}}>
      <Link to={userProfileUrl} style={{margin: '2%'}}>
      <img
        style={{height: "auto", width: "4rem", borderRadius: "50%"}}
        src={imgUrl}
        alt="Card-img-cap"
      />
      </Link>
      <CardBody style={{alignSelf: 'center'}} >
        <h4 className={classes.cardTitle}>{fname}</h4>
        {convoStarted ? <div>{"hi"}</div> : null}
      </CardBody>
      <div style={{ display: 'flex', flexDirection:'column', alignSelf: 'center', marginRight: '2%'}}> 
        <MessageModal user={user}/>
      </div>
    </Card>
  );
}