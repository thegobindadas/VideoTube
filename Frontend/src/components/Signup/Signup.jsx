import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextInput, AvatarInput, Button } from "../index"

function Signup() {

    const [error, setError] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()

    const registerUser = async (data) => {
        setError("")
        try {
            console.log(data);
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
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
                    <TextInput
                        label="username: "
                        placeholder="Enter your username"
                        {...register("username", { required: true })}
                    />
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

                    <Button
                    type="submit"
                    className="p-3"
                    >
                        Create Account
                    </Button>


                    <p className="my-14 text-sm font-light text-white">
                    Already registered?
                    <span className="cursor-pointer font-bold hover:underline">Sign in to your account</span>
                    </p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup
