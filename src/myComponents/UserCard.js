import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom'
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import { cardTitle } from "assets/jss/material-kit-react.js";

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);
export default function Cards(props) {
  const { climbing_preference, username, fname, lname, photo, skill_level, id } = props['user']
  const classes = useStyles();
  const imgUrl = `http://localhost:3000/${photo}`
  const userProfileUrl = `/profile/${id}`
  return (
    <Card style={{width: "15rem", justifySelf: 'center'}}>
      <Link to={userProfileUrl}>
      <img
        style={{height: "10rem", width: "100%", display: "block"}}
        className={classes.imgCardTop}
        src={imgUrl}
        alt="Card-img-cap"
      />
      </Link>
      <CardBody>
        <h4 className={classes.cardTitle}>{username}</h4>
        <h5>{`${fname} ${lname}`}</h5>
        <h5>{`Climbing ${climbing_preference}`}</h5>
        <h5>{`Grade: ${skill_level}`}</h5>
        <Button color="primary">Connect</Button>
      </CardBody>
    </Card>
  );
}