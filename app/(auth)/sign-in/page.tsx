'use client';

import React from 'react'
import { useForm } from 'react-hook-form'
import InputField from '@/components/forms/inputField'
import SelectField from '@/components/forms/selectField'
import { CountrySelectField } from '@/components/forms/CountrySelectField'
import FooterLink from '@/components/forms/FooterLink'
import { Button } from '@/components/ui/button'
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constants'

const SignIn = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
        email: '',
        password: '',
        },
        mode: 'onBlur'
    })

    const onSubmit = async (data: SignInFormData) => {
        try {
            console.log(data);
        } catch (e){
            console.error(e);
        }    
    }

  return (
    <>
            <h1 className="form-title">Log in to your account</h1> 

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField 
                    name="email"
                    label="Email"
                    placeholder="john@example.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email address is required', pattern: /^\w+@\w+\.\w+$/ }}
                />
                
                <InputField 
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password longer than 8 characters is required', minLength: 8 }}
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    { isSubmitting ? 'Creating account' : 'Start Your Investing Journey' }
                </Button>

                <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
            </form>
        </>
  )
}

export default SignIn