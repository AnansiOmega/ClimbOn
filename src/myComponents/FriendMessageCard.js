import React from "react";
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
const user = props['user']
const { id, fname, lname, photo } = user
const classes = useStyles()

const imgUrl = `http://localhost:3000/${photo}`;
const userProfileUrl = `/profile/${id}`
  return (
    <Card style={{width: "10rem", height:'auto', justifySelf: 'center', alignItems: 'center'}}>
      <Link to={userProfileUrl}>
      <img
        style={{height: "7rem", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src={imgUrl}
        alt="Card-img-cap"
      />
      </Link>
      <CardBody>
        <h4 className={classes.cardTitle}>{fname}</h4>
        <h4 className={classes.cardTitle}>{lname}</h4>
        <div style={{ display: 'flex', flexDirection:'column', alignSelf: 'center', marginRight: '2%'}}> 
        <MessageModal user={user} style={{alignSelf: 'flex-end'}}/>
        </div>
      </CardBody>
    </Card>
  );
}