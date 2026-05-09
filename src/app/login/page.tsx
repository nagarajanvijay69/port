'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/logo'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger OTP verification with Firebase
    // For now, we'll navigate to the OTP page.
    router.push('/verify-otp')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-background px-4 py-12">
        <div className="mb-8">
            <Logo />
        </div>
      <Card className="w-full max-w-md border-0 bg-card/80 shadow-xl shadow-primary/5 backdrop-blur-lg sm:border">
        <CardHeader className="items-center text-center">
          <CardTitle className="pt-4 text-3xl font-bold">Sign in to Port</CardTitle>
          <CardDescription>
            Welcome back! Please sign in to continue
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="px-8 pb-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-medium uppercase text-muted-foreground tracking-wider">Enter mobile number</Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-sm text-muted-foreground">+91</span>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    className="h-12 pl-12 text-base"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4 px-8 pb-8">
            <Button type="submit" className="w-full h-12 text-base font-semibold border-primary/20 border">
              Send OTP
            </Button>
            <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-semibold text-primary hover:underline">
                    Sign up
                </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
      <div className="absolute bottom-4 w-full text-center text-xs text-muted-foreground">
        <div className="inline-flex items-center justify-center gap-1">
            <div className="flex items-center gap-0.5">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </div>
            <span>Powered by Port</span>
        </div>
      </div>
    </div>
  )
}
