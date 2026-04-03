'use client'

import NextLink from 'next/link'
import { TextField, Input, Label, Button, Checkbox, Link as HeroLink } from '@heroui/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormValues } from '@/app/lib/schema'

export default function Login() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    }
  })

  const onSubmit = async (data: LoginFormValues) => {
    // TODO: Implement login functionality
    console.log(data)
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access your matrimony account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <TextField isInvalid={!!errors.email} fullWidth>
              <Label className="mb-1 block text-sm font-medium text-gray-700">Email address</Label>
              <Input
                {...register('email')}
                type="email"
                id="email-address"
                autoComplete="email"
                placeholder="you@example.com"
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
              />
              {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
            </TextField>
            <div className="pt-2">
              <TextField isInvalid={!!errors.password} fullWidth>
                <Label className="mb-1 block text-sm font-medium text-gray-700">Password</Label>
                <Input
                  {...register('password')}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                />
                {errors.password && <span className="text-xs text-red-500 mt-1 block">{errors.password.message}</span>}
              </TextField>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="remember-me"
                  isSelected={field.value}
                  onChange={field.onChange}
                >
                  <span className="text-sm text-gray-900">Remember me</span>
                </Checkbox>
              )}
            />

            <div className="text-sm">
              <HeroLink href="#" className="font-medium text-gray-600 hover:text-gray-900">
                Forgot your password?
              </HeroLink>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              isDisabled={isSubmitting}
              className="font-medium bg-rose-600 text-white"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <NextLink href="/register" className="font-medium text-rose-600 hover:text-rose-500">
              Sign up here
            </NextLink>
          </p>
        </div>
      </div>
    </div>
  )
}