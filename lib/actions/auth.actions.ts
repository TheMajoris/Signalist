'use server';

import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const signUpWithEmail = async (data: SignUpFormData) => {
    try {
       const response = await auth.api.signUpEmail({
           body: { email: data.email, password: data.password, name: data.fullName},
       })

       if(response){
            await inngest.send({
                name: 'app/user.created',
                data: {
                    email: data.email,
                    fullName: data.fullName,
                    country: data.country,
                    investmentGoals: data.investmentGoals,
                    riskTolerance: data.riskTolerance,
                    preferredIndustry: data.preferredIndustry,
                },
            })
       }

       return { success: true, data: response }
    } catch (e) {
        console.log('Sign up failed', e);
        return { success: false, error: 'Sign up failed. Please try again.' };
    }
}

export const signInWithEmail = async (data: SignInFormData) => {
    try {
       const response = await auth.api.signInEmail({
           body: { email: data.email, password: data.password},
       })

       return { success: true, data: response }
    } catch (e) {
        console.log('Sign up failed', e);
        return { success: false, error: 'Sign up failed. Please try again.' };
    }
}