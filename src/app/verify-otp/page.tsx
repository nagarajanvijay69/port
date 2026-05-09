'use client'

import { useRouter } from 'next/navigation'
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

export default function VerifyOtpPage() {
  const router = useRouter()

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would verify the OTP with Firebase
    // and then navigate to the main page upon success.
    router.push('/chats')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-background px-4 py-12">
        <div className="mb-8">
            <Logo />
        </div>
      <Card className="w-full max-w-md border-0 bg-card/80 shadow-xl shadow-primary/5 backdrop-blur-lg sm:border">
        <CardHeader className="items-center text-center">
          <CardTitle className="pt-4 text-3xl font-bold">Enter OTP</CardTitle>
          <CardDescription>
            We&apos;ve sent a one-time password to your mobile number.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleVerifyOtp}>
          <CardContent className="px-8 pb-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-xs font-medium uppercase text-muted-foreground tracking-wider">Enter the 6-digit code</Label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                placeholder="------"
                className="h-12 text-center text-2xl tracking-[0.5em]"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4 px-8 pb-8">
            <Button type="submit" className="w-full h-12 text-base font-semibold border-primary/20 border">
              Verify OTP
            </Button>
            <p className="text-sm text-muted-foreground">
                Didn&apos;t receive the code?{' '}
                <button type="button" className="font-semibold text-primary hover:underline">
                    Resend OTP
                </button>
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
