import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Home = (props: any) => {
    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    if (user == '' || user == null) {
        navigate('/')
    }
    const userData = JSON.parse(user!)

    const signOut = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <div>
            <h1>Welcome</h1>
            <p>{userData.name}</p>
            <Button onClick={signOut}>Sign out</Button>
        </div>
    )
}

Home.propTypes = {}

export default Home
