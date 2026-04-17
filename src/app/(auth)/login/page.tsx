'use client'

import NextLink from 'next/link'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormValues } from '@/app/lib/schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

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
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</Label>
              <Input
                {...register('email')}
                type="email"
                id="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`w-full ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.email && <span className="text-xs text-red-500 mt-1 block">{errors.email.message}</span>}
            </div>
            <div className="space-y-2 pt-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input
                {...register('password')}
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className={`w-full ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.password && <span className="text-xs text-red-500 mt-1 block">{errors.password.message}</span>}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-2">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="remember-me"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="remember-me" className="text-sm text-gray-900 cursor-pointer">
                Remember me
              </Label>
            </div>

            <div className="text-sm">
              <NextLink href="#" className="font-medium text-rose-600 hover:text-rose-500">
                Forgot your password?
              </NextLink>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full font-medium bg-rose-600 hover:bg-rose-700 text-white"
              disabled={isSubmitting}
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