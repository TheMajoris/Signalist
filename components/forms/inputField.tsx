import React from 'react'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'

interface FormInputProps {
    name: string
    label: string
    placeholder?: string
    type?: string
    register: any
    error?: { message?: string }
    validation?: any
    disabled?: boolean
    value?: string | number
}

const inputField = ({ name, label, placeholder, type="text", register, error, validation, disabled, value }: FormInputProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>
            <Input 
                type={type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                className={cn('form-input', { 'opacity-50 cursor-not-allowed': disabled })}
                {...register(name, validation)}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    )
}

export default inputField