import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthInput, AvatarInput, Button } from "../index"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { handleError } from "../../utils/errorHandler"
import authService from "../../services/authService"

function SignupForm() {

    const [error, setError] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate();


    const handleRegisterUser = async (data) => {
        setError("")
        try {

            const registerData = {}

            registerData.fullName = data.fullName;
            registerData.email = data.email;
            registerData.username = data.username;
            registerData.password = data.password;

            if (data.avatar.length > 0) {
                registerData.avatar = data.avatar[0]
            }
        

            const response = await authService.registerUser(registerData)
        
            if (response) {
                console.log('User registered successfully:', response);
                navigate("/login")
            }
            
        } catch (error) {
            setError(handleError(error));
            console.error('Error registering user:', error.response?.data || error.message);
        }
    }
    

  return (
    <div className="flex w-full max-w-2xl items-stretch justify-between gap-10">
        <div className="mt-20 flex w-full flex-col items-start justify-start p-6 lg:px-10">
            <div className="w-full">
                <h1 className="mb-2 text-5xl font-extrabold text-white">Register</h1>
                <p className="text-xs text-slate-400">Before we start, please create your account</p>
            </div>
            <form onSubmit={handleSubmit(handleRegisterUser)} className="my-14 flex w-full flex-col items-start justify-start gap-4">
                                
                <AvatarInput 
                    {...register("avatar", {
                        required: true,
                    })} 
                />

                <AuthInput
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("fullName", {
                        required: true,
                    })}
                />

                <AuthInput
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <AuthInput
                    label="username: "
                    placeholder="Enter your username"
                    {...register("username", { required: true })}
                />
                {errors.username && <p className="text-red-500">Username is required.</p>}

                <AuthInput
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { 
                        required: true, 
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long"
                        }
                    })}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <Button
                type="submit"
                className="p-3"
                >
                    Create Account
                </Button>

                {error && <p className="mt-4 text-red-500 font-bold">{error}</p>}


                <p className="my-14 text-sm font-light text-white">
                    Already registered?{" "}
                    <Link to="login">
                        <span className="cursor-pointer font-bold hover:underline">Sign in to your account</span>
                    </Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default SignupForm
