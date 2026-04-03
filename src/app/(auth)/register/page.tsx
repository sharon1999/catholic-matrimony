'use client'

import React from 'react'
import NextLink from 'next/link'
import { TextField, Input, Label, Button } from '@heroui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormValues } from '@/app/lib/schema'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    // TODO: Implement registration functionality
    console.log(data)
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join the St. Joseph&apos;s Matrimony community
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <TextField isInvalid={!!errors.name} fullWidth>
              <Label className="mb-1 block text-sm font-medium text-gray-700">Full Name</Label>
              <Input
                {...register('name')}
                id="full-name"
                type="text"
                autoComplete="name"
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                placeholder="John Doe"
              />
              {errors.name && <span className="text-xs text-red-500 mt-1 block">{errors.name.message}</span>}
            </TextField>
            <div className="pt-2">
              <TextField isInvalid={!!errors.email} fullWidth>
                <Label className="mb-1 block text-sm font-medium text-gray-700">Email address</Label>
                <Input
                  {...register('email')}
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                  placeholder="you@example.com"
                />
                {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
              </TextField>
            </div>
            <div className="pt-2">
              <TextField isInvalid={!!errors.password} fullWidth>
                <Label className="mb-1 block text-sm font-medium text-gray-700">Password</Label>
                <Input
                  {...register('password')}
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                  placeholder="••••••••"
                />
                {errors.password && <span className="text-xs text-red-500 mt-1 block">{errors.password.message}</span>}
              </TextField>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              isDisabled={isSubmitting}
              className="font-medium bg-rose-600 text-white"
            >
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </Button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <NextLink href="/login" className="font-medium text-rose-600 hover:text-rose-500">
              Sign in here
            </NextLink>
          </p>
        </div>
      </div>
    </div>
  )
}