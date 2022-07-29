import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { TextField, Button, IconButton, Snackbar } from '@mui/material'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'

type LoginParams = {
    name: string
    email: string
    phone: string
    password: string
}

type UserResponse = {
    name: string
    email: string
    phone: string
    password: string
    _id: string
}

const Login = (props: any) => {
    const { register, handleSubmit } = useForm<LoginParams>()
    const [errorOpen, setErrorOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const goToRegister = () => {
        navigate('/register')
    }

    const onSubmit = handleSubmit(async (data) => {
        await axios
            .post<UserResponse>('http://localhost:8080/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            })
            .then((data) => {
                console.log(data.data)
                localStorage.setItem('user', JSON.stringify(data.data))
                navigate('/dashboard')
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(error.response.data.errors)
                setErrorOpen(true)
            })
    })

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }

        setErrorOpen(false)
    }

    const action = (
        <React.Fragment>
            <Button color="error" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="error"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    return (
        <div className="registerForm">
            <div className="card">
                <div className="container">
                    <h2>Sign in into your Account</h2>
                    <form onSubmit={onSubmit}>
                        <TextField
                            variant="filled"
                            {...register('email')}
                            type="email"
                            id="email"
                            name="email"
                            label="email"
                        />
                        <br />
                        <br />

                        <TextField
                            variant="filled"
                            {...register('password')}
                            type="password"
                            id="password"
                            name="password"
                            label="Password"
                        />

                        <br />
                        <br />
                        <Button type="submit" variant="contained">
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            onClick={goToRegister}
                            style={{ float: 'right' }}
                        >
                            Don't have an account?
                        </Button>

                        <br />
                        <br />
                    </form>
                </div>
                <Snackbar
                    open={errorOpen}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    message={errorMessage}
                    action={action}
                />
            </div>
        </div>
    )
}

Login.propTypes = {}

export default Login
