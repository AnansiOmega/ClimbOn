import React, { useState } from "react";
import { useDispatch } from 'react-redux'
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import { thunkFetchAcceptReq, thunkFetchRejectReq } from '../Actions/user'

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
const [requestAccepted, setRequestAccepted] = useState(false)
const [requestDeclined, setRequestDeclined] = useState(false)
const [requestResponded, setRequestResponded] = useState(false)
const { id, fname, climbing_preference, commitment, photo, skill_level } = props['user']
const dispatch = useDispatch()
const classes = useStyles();

const handleAcceptReq = () => {
  dispatch(thunkFetchAcceptReq(id))
  setRequestAccepted(true)
  setRequestResponded(true)
}
const handleRejectReq = () => {
  dispatch(thunkFetchRejectReq(id))
  setRequestDeclined(true)
  setRequestResponded(true)
}
// figure out if i need to return anything for either of theses
// also you should go back and actually understand what that ruby code is doing
const imgUrl = `http://localhost:3000/${photo}`;
const userProfileUrl = `/profile/${id}`
  return (
    <Card className={classes.textCenter} style={{ flexDirection: 'row'}}>
      <Link to={userProfileUrl}>
      <img
        style={{height: "auto", width: "10rem", borderRadius: "50%", margin: '2%'}}
        src={imgUrl}
        alt="Card-img-cap"
        id='landing-page-pic'
      />
      </Link>
      <CardBody style={{alignSelf: 'center'}} >
        <h4 className={classes.cardTitle}>{`${fname} wants to climb with you!`}</h4>
        {`Climbing ${climbing_preference} |`} {`Grade: ${skill_level} | `}{`Climbs ${commitment} times a week`}
      </CardBody>
      <div style={{ display: 'flex', flexDirection:'column', alignSelf: 'center', marginRight: '2%'}}> 
        <Button onClick={handleAcceptReq} style={{alignSelf: 'center'}} color={requestResponded ? '' : 'success'}>{requestAccepted ? 'Accepted!' : 'Accept'}</Button>
        <Button onClick={handleRejectReq} style={{alignSelf: 'center'}} color={requestResponded ? '' : 'danger'}>{requestDeclined ? 'Declined :(' : 'Decline'}</Button>
      </div>
    </Card>
  );
}