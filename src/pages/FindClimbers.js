import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import classNames from "classnames";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { thunkFetchUserMatches, clearOtherUsers } from '../Actions/user'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import UserCard from '../myComponents/UserCard'

const useStyles = makeStyles(styles);


export const FindClimbers = () => {
    const classes = useStyles();
    const [gender, setGender] = useState('Any')
    const [climbing_preference, setClimbing_preference] = useState('Any')
    const [commitment, setCommitment] = useState('Any')
    const [skill_level, setSkill_level] = useState('Any')
    const [distance, setDistance] = useState('Any')
    const dispatch = useDispatch()
    const matches = useSelector(state => state.otherUsers, shallowEqual)
    const loader = useSelector(state => state.loader, shallowEqual)

    useEffect(() => {
        dispatch(clearOtherUsers())
        document.body.style.backgroundColor = 'purple' // changes background color, because the white is blinding
        return () => {
            document.body.style.backgroundColor = 'white'
        }
    },[])

    const handleInput = e => {
        switch(e.target.id){
            case 'climbing_preference':
                setClimbing_preference(e.target.value)
            break;
            case 'commitment':
                setCommitment(e.target.value)
            break;
            case 'skill_level':
                setSkill_level(e.target.value)
            break;
            case 'gender':
                setGender(e.target.value)
            break;
            case 'distance':
                setDistance(e.target.value)
            default:
                return
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(thunkFetchUserMatches(climbing_preference, commitment, skill_level, gender, distance,))
    }

    const renderMatches = () => {
        const id = parseInt(localStorage.getItem('userId'))
        if(loader) return
        return matches.map(user => {
            if(user.id !== id){
                return <UserCard id={user.id} user={user}></UserCard>}
            }
        )
    }

    return(
        <div style={{marginTop: '15%'}}>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <h2 style={{color: 'black'}} className={classes.title}>Find Some Climbers</h2>
                        <Form onSubmit={handleSubmit}>
                        <div className='search-inputs'>
                        <FormGroup>
                                <Label>Climbing Preference</Label>
                                <Input type="select" id="climbing_preference" onChange={handleInput} value={climbing_preference} >
                                <option>Any</option>
                                <option>Top Rope</option>
                                <option>Boulder</option>
                                <option>Lead</option>
                                <option>Trad</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Commitment</Label>
                                <Input type="select" id="commitment" onChange={handleInput} value={commitment}>
                                <option>Any</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Skill Level</Label>
                                <Input type="select" id="skill_level" onChange={handleInput} value={skill_level}>
                                <option>Any</option>
                                <option>5.8</option>
                                <option>5.9</option>
                                <option>5.10</option>
                                <option>5.11</option>
                                <option>5.12</option>
                                <option>5.13</option>
                                <option>5.14</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Gender</Label>
                                <Input type="select" id="gender" onChange={handleInput} value={gender}>
                                <option>Any</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Distance</Label>
                                <Input type="select" id="distance" onChange={handleInput} value={distance}>
                                <option>Any</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                                <option>150</option>
                                <option>200</option>
                                </Input>
                            </FormGroup>
                            <Button style={{margin: '15%'}}>Search</Button>
                        </div>
                    </Form>
                    </div>
                    <div className={classes.section}>
                    <div className='grid-card-container'>
                        {renderMatches()}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
