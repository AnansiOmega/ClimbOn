import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { thunkUpdateUser } from '../Actions/user'
import { FormGroup, Label, Input, Col, Row, FormText } from 'reactstrap';
import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Popover from "@material-ui/core/Popover";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import classNames from "classnames";
import { useSelector } from 'react-redux';

const useStyles = makeStyles(styles);

export const SettingsPage = () => {
useEffect(() => {
    document.body.style.backgroundColor = 'purple' // changes background color, because the white is blinding
    return () => {
        document.body.style.backgroundColor = 'white'
    }
},[])
const user = useSelector(state => state.user)
const classes = useStyles();
const [anchorElTop, setAnchorElTop] = useState(null);
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [climbing_preference, setClimbing_preference] = useState('Top Rope')
const [commitment, setCommitment] = useState('1')
const [skill_level, setSkill_level] = useState('5.8')
const [bio, setBio] = useState('')
const [street, setStreet] = useState('')
const [city, setCity] = useState('')
const [state, setState] = useState('')
const [photo, setPhoto] = useState('')
const [background_image, setBackgroundImage] = useState('')
const [loginErrors, setLoginErrors] = useState([])
const errors = useSelector(state => state.loginErrors)
useEffect(() => {
    setLoginErrors(errors)
}, [errors])

useEffect(() => {
    // takes the climbing preference of the climber, and checks to see the length ( cause it can be two words) an then changes it to uppercase, the backend holds infor lowercase
    let usersClimbingPrefUppercase = user.climbing_preference?.split(' ').length > 1 ? user.climbing_preference.split(' ').forEach(word => word.charAt(0).toUpperCase() + word.substring(1)) : user.climbing_preference?.charAt(0).toUpperCase() + user.climbing_preference?.substring(1)
    setClimbing_preference(usersClimbingPrefUppercase)
    setCommitment(user.commitment)
    setSkill_level(user.skill_level)
    setBio(user.bio)
}, [user])
const dispatch = useDispatch()
const history = useHistory()

  const handleInput = e => {
    switch(e.target.id){
      case 'username':
          setUsername(e.target.value)
      break;
      case 'password':
          setPassword(e.target.value)
      break;
      case 'confirmPassword':
           setConfirmPassword(e.target.value)
      break;
      case 'climbing_preference':
          setClimbing_preference(e.target.value)
      break;
      case 'commitment':
          setCommitment(e.target.value)
      break;
      case 'skill_level':
          setSkill_level(e.target.value)
      break;
      case 'bio':
          setBio(e.target.value)
      break;
      case 'street':
          setStreet(e.target.value)
      break;
      case 'city':
          setCity(e.target.value)
      break;
      case 'state':
          setState(e.target.value)
      break;
      case 'photo':
          setPhoto(e.target.files[0])
      break;
      case 'backgroundImage':
          setBackgroundImage(e.target.files[0])
      break;
      default:
      return
  }
  }

    
  const handleSubmit = e => {
    e.preventDefault()
    let formState = {
      username,
      password,
      climbing_preference,
      commitment,
      skill_level,
      bio,
      street,
      city,
      state,
      photo,
      background_image
    }

    const formData = new FormData()

    for (const property in formState) {
        if(formState[property] !== ""){
            formData.append(
                property, formState[property]
            )
        }
    }

    
    dispatch(thunkUpdateUser(user.id, formData))
    history.push('/')
  }


    const renderErrors = () => {
        if (loginErrors) {
            return loginErrors.map(error => error.split(' ')[0])
        } else {
            return []
        }
    }



    return(
        <div style={{ marginTop: '15%', paddingBottom: '10%' }}>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <h2 style={{ color: 'black' }} className={classes.title}>Make Some Changes</h2>
                        <form className={classes.form}>
                  <CardBody>
                    <CustomInput
                      labelText={renderErrors().includes('Username') ? 'Username must be valid' : 'New Username'}
                      error={renderErrors().includes('Username')}
                      id='username'
                      value={username}
                      setUsername={setUsername}
                      handleInput={handleInput}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{ type: "text"}}
                    />
                    <CustomInput
                      labelText={renderErrors().includes('Password') ? "Password must be valid" : 'New Password'}
                      error={renderErrors().includes('Password')}
                      id='password'
                      handleInput={handleInput}
                      value={password}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{ type: "password" }}
                    />
                    <CustomInput
                      labelText={password !== confirmPassword ? 'Passwords do not match' : 'Confirm Password'}
                      error={password !== confirmPassword}
                      id='confirmPassword'
                      handleInput={handleInput}
                      value={password}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{ type: "password" }}
                    />
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Climbing Preference</Label>
                                <Input onChange={handleInput} type="select" id="climbing_preference" value={climbing_preference}>
                                <option>Top Rope</option>
                                <option>Boulder</option>
                                <option>Lead</option>
                                <option>Trad</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Commitment <i onMouseOver={e => setAnchorElTop(e.currentTarget)} className="material-icons small">help_outline</i></Label>
                                <Popover
                                classes={{ paper: classes.popover }}
                                open={Boolean(anchorElTop)}
                                anchorEl={anchorElTop}
                                onClose={() => setAnchorElTop(null)}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center'
                                }}
                                >
                                    <div style={{ marginLeft: '1%', marginRight: '1%'}} className={classes.popoverBody}>
                                        Days a week you climb
                                    </div>
                                </Popover>
                                <Input onChange={handleInput} type="select" id="commitment" value={commitment}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Skill Level</Label>
                                <Input onChange={handleInput} type="select" id="skill_level" value={skill_level}>
                                <option>5.8</option>
                                <option>5.9</option>
                                <option>5.10</option>
                                <option>5.11</option>
                                <option>5.12</option>
                                <option>5.13</option>
                                <option>5.14</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                    <CustomInput
                      labelText={renderErrors().includes('Street') ? "Street can't be blank" : 'Address'}
                      error={renderErrors().includes('Street')}
                      id='street'
                      handleInput={handleInput}
                      value={street}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{ type: "text" }}
                    />
                    </Col>
                    <Col>
                    <CustomInput
                    labelText={renderErrors().includes('City') ? "City can't be blank" : 'City'}
                    error={renderErrors().includes('City')}
                    id='city'
                    handleInput={handleInput}
                    value={city}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{ type: "text" }}
                  />
                  </Col>
                  <Col>
                  <CustomInput
                  labelText={renderErrors().includes('State') ? "State can't be blank" : 'State'}
                  error={renderErrors().includes('State')}
                  id='state'
                  handleInput={handleInput}
                  value={state}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{ type: "text" }}
                />
                </Col>
                </Row>
                    <FormGroup>
                        <Label>Bio</Label>
                        <Input type="textarea" id="bio" value={bio} onChange={handleInput} />
                    </FormGroup>
                    <Label>Profile Image</Label>
                    <Input type="file" name="file" accept='image/jpeg, image/jpg' onChange={handleInput} id='photo'/>
                    <FormText color="muted">
                    Select a jpg image to use as your profile photo.
                    </FormText>
                    <Label>Background Image</Label>
                    <Input type="file" name="file" accept='image/jpeg, image/jpg' onChange={handleInput} id='backgroundImage'/>
                    <FormText color="muted">
                    Select a jpg image to use as the background image that is seen on the home page, as well as your profile page.
                    </FormText>
                  </CardBody>
                    <Button onClick={handleSubmit} color="primary" size="lg">
                      Update
                    </Button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}