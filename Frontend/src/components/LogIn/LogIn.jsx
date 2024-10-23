import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { TextInput, Button } from "../index"
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { setUser } from '../../store/userSlice'
import { useDispatch } from "react-redux"

function LogIn() {

    const [error, setError] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const getCurrentUser = async () => {
        try {
            const response = await axios.get('/api/v1/user/current-user', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
                        
            return response.data.data.user

        } catch (error) {
            setError(error.response?.data.message || 'Error fetching current user');
            console.error('Error fetching current user:', error);
        }
    }


    const LoginUser = async (data) => {
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

            
            const response = await axios.post('/api/v1/user/login', loginData);
            
            const { token } = response.data.data.accessToken; 
            localStorage.setItem('token', token)

            const { refreshToken } = response.data.data.refreshToken; 
            localStorage.setItem('refreshToken', refreshToken)
            

            console.log('User logged in successfully:', response.data);


            if (response.data) {
                const user = await getCurrentUser()
                
                if(user) dispatch(setUser(user));
                navigate("/");
            }
        } catch (error) {
            if (error.response?.data) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(error.response.data, 'text/html');
                const preElement = doc.querySelector('pre');
                const errorMessage = preElement ? preElement.textContent.split('\n')[0].replace("Error: ", "") : 'An error occurred';
                setError(errorMessage); 
            } else {
                setError(error.message || 'An error occurred');
            }
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
            <form onSubmit={handleSubmit(LoginUser)} className="my-14 flex w-full flex-col items-start justify-start gap-4">
                
            <TextInput
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

            <TextInput
                label="username: "
                placeholder="Enter your username"
                {...register("username", { required: true })}
            />
            {errors.username && <p className="text-red-500">Username is required.</p>}

                <TextInput
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

export default LogIn
