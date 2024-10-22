import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { TextInput, AvatarInput, Button } from "../index"
import axios from 'axios';

function Signup() {

    const [error, setError] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate();


    const registerUser = async (data) => {
        setError("")
        try {
            const formData = new FormData();
        
            formData.append('fullName', data.name);
            formData.append('email', data.email);
            formData.append('username', data.username);
            formData.append('password', data.password);
        

            if (data.avatar.length > 0) {
                formData.append('avatar', data.avatar[0]);
            }
        
            
            const response = await axios.post('/api/v1/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });
        
            console.log('User registered successfully:', response.data);
            if (response.data) {
                navigate("login")
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
                <h1 className="mb-2 text-5xl font-extrabold text-white">Register</h1>
                <p className="text-xs text-slate-400">Before we start, please create your account</p>
            </div>
            <form onSubmit={handleSubmit(registerUser)} className="my-14 flex w-full flex-col items-start justify-start gap-4">
                                
                <AvatarInput 
                    {...register("avatar", {
                        required: true,
                    })} 
                />

                <TextInput
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                /> 
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

export default Signup
