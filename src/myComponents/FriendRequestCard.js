import React from "react";
import { useDispatch } from 'react-redux'
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
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
const { id, fname, climbing_preference, commitment, photo, skill_level } = props['user']
const dispatch = useDispatch()
const classes = useStyles();

const handleAcceptReq = () => dispatch(thunkFetchAcceptReq(id)) // I know i don't need id but I feel like its more clear this way
// const current_user_id = parseInt(localStorage.getItem('userId')) 
// const reqObj = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({user_id: id, current_user_id})
// }

// fetch('http://localhost:3000/reject-friend', reqObj)
// .then( resp => resp.json())
// .then( data => {
//   debugger
// })
// }
const handleRejectReq = () => dispatch(thunkFetchRejectReq(id))
  // const current_user_id = localStorage.getItem('userId')
  // const reqObj = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({user_id: id, current_user_id})
  // }

  // fetch('http://localhost:3000/accept-friend', reqObj)
  // .then( resp => resp.json())
  // .then( data => {
  //   debugger
  // })

  

// figure out if i need to return anything for either of theses
// also you should go back and actually understand what that ruby code is doing

  

const imgUrl = `http://localhost:3000/${photo}`;
  return (
    <Card className={classes.textCenter} style={{ flexDirection: 'row'}}>
      <img
        style={{height: "auto", width: "10rem", borderRadius: "50%", margin: '2%'}}
        src={imgUrl}
        alt="Card-img-cap"
        id='landing-page-pic'
      />
      <CardBody style={{alignSelf: 'center'}} >
        <h4 className={classes.cardTitle}>{`${fname} wants to climb with you!`}</h4>
        {`Climbing ${climbing_preference} |`} {`Grade: ${skill_level} | `}{`Climbs ${commitment} times a week`}
      </CardBody>
      <div style={{ display: 'flex', flexDirection:'column', alignSelf: 'center', marginRight: '2%'}}> 
        <Button onClick={handleAcceptReq} style={{alignSelf: 'center'}} color="success">Accept</Button>
        <Button onClick={handleRejectReq} style={{alignSelf: 'center'}} color="danger">Decline</Button>
      </div>
    </Card>
  );
}