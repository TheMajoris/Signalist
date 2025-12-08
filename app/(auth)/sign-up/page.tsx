'use client';

import { Button } from '@/components/ui/button';
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
        },

        mode: 'onBlur'
    })
    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log(data);
        } catch (e){
            console.error(e);
        }    
    }
    

    return (
        <>
            <h1 className="form-title">Sign Up & Personalise</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/*Input fields */}

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Creating account' : 'Start Your Investing Journey'}
                </Button>
            </form>
        </>
    )
}

export default SignUp