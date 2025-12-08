'use client';

import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>()
    const onSubmit: SubmitHandler<SignUpFormData> = (data) => console.log(data)
    
    
        return (
        <>
            <h1 className="form-title">Sign Up & Personalise</h1>
        </>
    )
}

export default SignUp