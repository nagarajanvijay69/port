'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star, Camera, UserCircle } from 'lucide-react'
import { useState } from 'react'

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function SignUpPage() {
  const router = useRouter()
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would trigger OTP verification for the given number.
    // After verification, the user would be created.
    // For now, we'll navigate to the OTP page.
    router.push('/verify-otp')
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setPhotoUrl(URL.createObjectURL(file));
      }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-background px-4 py-12">
        <div className="mb-8">
            <Logo />
        </div>
      <Card className="w-full max-w-md border-0 bg-card/80 shadow-xl shadow-primary/5 backdrop-blur-lg sm:border">
        <CardHeader className="items-center text-center">
          <CardTitle className="pt-4 text-3xl font-bold">Create your Account</CardTitle>
          <CardDescription>
            Join our community in a few simple steps.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent className="px-8 pb-6">
            <div className="space-y-6">
                <div className="flex justify-center">
                    <div className="relative">
                        <Avatar className="h-28 w-28 border-2 border-dashed">
                            <AvatarImage src={photoUrl || ''} alt="User photo" />
                            <AvatarFallback className="bg-transparent">
                                <UserCircle className="h-20 w-20 text-muted-foreground" />
                            </AvatarFallback>
                        </Avatar>
                        <label htmlFor="photo-upload" className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90">
                           <Camera className="h-4 w-4" />
                           <input id="photo-upload" type="file" accept="image/*" className="sr-only" onChange={handlePhotoUpload} />
                        </label>
                    </div>
                </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="h-12 text-base"
                    required
                  />
              </div>

               <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
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
            <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                    Sign In
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
