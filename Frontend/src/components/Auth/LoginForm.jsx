import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthInput, Button } from "../index"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { setUser } from '../../store/userSlice'
import { useDispatch } from "react-redux"
import { handleError } from "../../utils/errorHandler"
import authService from "../../services/authService"
import userService from "../../services/userService"

function LoginForm() {

    const [error, setError] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const getCurrentUser = async () => {
        try {
            const response = await userService.getCurrentUser()
                        
            return response.data.user
        } catch (error) {
            setError(error.response?.data.message || 'Error fetching current user');
            console.error('Error fetching current user:', error);
        }
    }


    const handleLoginUser = async (data) => {
        setError("")
        try {
            const loginData = {};

            if (data.email) {
                loginData.email = data.email;
            }
            if (data.username) {
                loginData.username = data.username;
            }
            if (data.password) {
                loginData.password = data.password;
            }    

            
            const response = await authService.loginUser(loginData);
                        
            //console.log('User logged in successfully: ', response);


            if (response) {
                const user = await getCurrentUser()
                
                if(user) dispatch(setUser(user));
                navigate("/");
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
                <h1 className="mb-2 text-5xl font-extrabold text-white">Log in</h1>
                <p className="text-xs text-slate-400">Before we start, please log into your account</p>
            </div>
            <form onSubmit={handleSubmit(handleLoginUser)} className="my-14 flex w-full flex-col items-start justify-start gap-4">
                
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
                    Log in
                </Button>

                {error && <p className="mt-4 text-red-500 font-bold">{error}</p>}


                <p className="my-14 text-sm font-light text-white">
                    Don&#x27;t have an account?{" "}
                    <Link to="signup"> <span className="cursor-pointer font-bold hover:underline">Create an account</span> </Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default LoginForm
