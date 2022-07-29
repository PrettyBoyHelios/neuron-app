import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { TextField, Button, IconButton, Snackbar } from '@mui/material'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'

type UserRegistration = {
    name: string
    email: string
    phone: string
    password: string
    confirmPassword: string
}

const Register = () => {
    const { register, handleSubmit } = useForm<UserRegistration>()
    const [errorOpen, setErrorOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    let user = localStorage.getItem('user')
    console.log('value: ', user)
    if (user === null) {
        localStorage.setItem('user', '')
    }
    if (user !== '') {
        console.log('user data found: ', user)
        navigate('/dashboard')
    }

    const onSubmit = handleSubmit(async (data) => {

        if (data.password !== data.confirmPassword) {
            setErrorMessage("passwords don't match")
            setErrorOpen(true)
        } else {
            await axios
                .post<UserRegistration>(
                    'http://localhost:8080/register',
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    }
                )
                .then((data) => {
                    localStorage.setItem("user", JSON.stringify(data.data))
                    navigate("/dashboard")
                })
                .catch((error) => {
                    setErrorMessage(error.response.data.errors)
                    setErrorOpen(true)
                })
        }
    })

    const goToLogin = () => {
        navigate('/login')
    }

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
                    <h2>Create Account</h2>
                    <form onSubmit={onSubmit}>
                        <TextField
                            variant="filled"
                            {...register('name')}
                            type="text"
                            id="name"
                            name="name"
                            label="Name"
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

                        <span>{'    '}</span>

                        <TextField
                            variant="filled"
                            {...register('confirmPassword')}
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                        />

                        <br />
                        <br />

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
                            {...register('phone')}
                            type="tel"
                            id="phone"
                            name="phone"
                            label="Phone"
                            inputProps={{
                                inputMode: 'numeric',
                                pattern:
                                    '+(9[976]d|8[987530]d|6[987]d|5[90]d|42d|3[875]d|2[98654321]d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)d{1,14}$',
                            }}
                        />

                        <br />
                        <br />
                        <Button type="submit" variant="contained">
                            Register
                        </Button>
                        <Button
                            variant="contained"
                            onClick={goToLogin}
                            style={{ float: 'right' }}
                        >
                            Already have an account?
                        </Button>

                        <br />
                        <br />
                    </form>
                </div>
            </div>
            <Snackbar
                open={errorOpen}
                autoHideDuration={2000}
                onClose={handleClose}
                message={errorMessage}
                action={action}
            />
        </div>
    )
}

export default Register
