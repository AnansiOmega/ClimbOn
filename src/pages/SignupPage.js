import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCreateNewUser } from '../Actions/user'
import { FormGroup, Label, Input, Col, Row, FormText } from 'reactstrap';
import Popover from "@material-ui/core/Popover";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from '../imgs/login-page-bckgrnd.jpg'

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const history = useHistory()
  const [anchorElTop, setAnchorElTop] = useState(null);
  const dispatch = useDispatch()
  const errors = useSelector(state => state.loginErrors)
  useEffect(() => {
    setLoginErrors(errors)
  }, [errors])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
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
      case 'fname':
          setFname(e.target.value)
      break;
      case 'lname':
          setLname(e.target.value)
      break;
      case 'age':
          setAge(e.target.value)
      break;
      case 'gender':
          setGender(e.target.value.toLowerCase())
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
    // creates an object of the current state so that it can be packaged in Formdata
    let formState = {
      username,
      password,
      fname,
      lname,
      age,
      gender,
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

    /// packages up state with key value pairs, and send it to backend
    for (const property in formState) {
        formData.append(
            property, formState[property]
        )
    }

    dispatch(thunkCreateNewUser(formData))
    const id = localStorage.getItem('userId')
    if(id) history.push('/')
  }


  const renderErrors = () => {
    if(loginErrors){
      return loginErrors.map(error => error.split(' ')[0])
    } else {
      return []
    }
}

  const classes = useStyles();
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={7}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardBody>
                    <CustomInput
                      labelText={renderErrors().includes('Username') ? "Username must be valid" : 'Username'}
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
                      labelText={renderErrors().includes('Password') ? "Password must be valid" : 'Password'}
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
                            <CustomInput
                            labelText={renderErrors().includes('Fname') ? "First Name can't be blank" : 'First Name'}
                            error={renderErrors().includes('Fname')}
                            id='fname'
                            handleInput={handleInput}
                            value={fname}
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{ type: "text" }}
                            />
                        </Col>
                        <Col>
                            <CustomInput
                            labelText={renderErrors().includes('Lname') ? "Last Name can't be blank" : 'Last Name'}
                            error={renderErrors().includes('Lname')}
                            id='lname'
                            handleInput={handleInput}
                            value={lname}
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{ type: "text" }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CustomInput
                            labelText={renderErrors().includes('Age') ? "Age can't be blank" : 'Age'}
                            error={renderErrors().includes('Age')}
                            id='age'
                            handleInput={handleInput}
                            value={age}
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{ type: "number" }}
                            />
                        </Col>
                        <Col>
                            <CustomInput
                            labelText={renderErrors().includes('Gender') ? "Gender can't be blank" : 'Gender'}
                            error={renderErrors().includes('Gender')}
                            id='gender'
                            handleInput={handleInput}
                            value={gender}
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{ type: "text" }}
                            />
                        </Col>
                    </Row>
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
                    <Input type="file" name="file" accept='image/jpeg, image/jpg, image/webp' onChange={handleInput} id='photo'/>
                    <FormText color="muted">
                    Select a jpg image to use as your profile photo.
                    </FormText>
                    <Label>Background Image</Label>
                    <Input type="file" name="file" accept='image/jpeg, image/jpg' onChange={handleInput} id='backgroundImage'/>
                    <FormText color="muted">
                    Select a jpg image to use as the background image that is seen on the home page, as well as your profile page.
                    </FormText>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button onClick={handleSubmit} simple color="primary" size="lg">
                      Signup
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
