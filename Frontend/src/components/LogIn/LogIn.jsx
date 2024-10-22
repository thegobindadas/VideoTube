import React, { useState } from 'react'
import { TextInput, Button } from "../index"
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';

function LogIn() {

    const [error, setError] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const LoginUser = async (data) => {
        setError("")
        try {
            const formData = new FormData();
    
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.usernameOrEmail)) {
                formData.append('email', data.usernameOrEmail);
            } else {
                formData.append('username', data.usernameOrEmail);
            }
            formData.append('password', data.password);

            const response = await axios.post('/api/v1/user/login', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
      
          console.log('User logged in successfully:', response.data);
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
                    label="Username or Email: "
                    placeholder="Enter username or email"
                    {...register("usernameOrEmail", {
                        required: "Username or email is required",
                    })}
                />
                {errors.usernameOrEmail && (
                    <p className="text-red-500">{errors.usernameOrEmail.message}</p>
                )}

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
