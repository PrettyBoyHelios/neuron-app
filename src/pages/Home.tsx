import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import './Home.css'

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
            <Card className="userCard" sx={{ maxWidth: 640 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Welcome!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {userData.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {userData.email}
                        <Typography variant="body2" color="text.secondary">
                            {userData.phone}
                        </Typography>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={signOut} size="large">
                        SIGN OUT
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

Home.propTypes = {}

export default Home
