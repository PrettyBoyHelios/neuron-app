import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { TextField, Button } from '@mui/material'
import './Register.css'

type UserRegistration = {
    name: string
    email: string
    phone: string
    password: string
}

const Register = () => {
    const { register, handleSubmit } = useForm<UserRegistration>()

    const onSubmit = handleSubmit(async (data) => {
        alert(JSON.stringify(data))

        await axios.post<UserRegistration>(
            'http://localhost:8080/register',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        )
    })

    return (
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
                    <Button type="submit" variant="contained">
                        Register
                    </Button>
                    <br />
                    <br />
                </form>
            </div>
        </div>
    )
}

export default Register
