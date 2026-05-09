'use client'

import Link from 'next/link'
import { ChevronUp, LogOut, UserCircle } from 'lucide-react'
import Image from 'next/image'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useAuth, useUser } from '@/firebase' // Import useUser and useAuth
import { Skeleton } from './ui/skeleton'

export function UserNav() {
  const { user, isUserLoading } = useUser()
  const auth = useAuth()

  const handleLogout = () => {
    if (auth) {
      auth.signOut()
    }
  }

  if (isUserLoading) {
    return (
        <div className="flex items-center gap-2 p-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
        </div>
    )
  }
  
  if (!user) {
    return (
        <Button variant="ghost" asChild className="w-full justify-start">
            <Link href="/login">
                <UserCircle className="mr-2 h-4 w-4" />
                Log In
            </Link>
        </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 px-2"
        >
          <div className="relative h-8 w-8">
            <Image
              src={user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`}
              alt={user.displayName || 'User Avatar'}
              fill
              className="rounded-full object-cover"
              data-ai-hint="person portrait"
            />
          </div>
          <span className="truncate font-medium">{user.displayName || user.email || 'Anonymous User'}</span>
          <ChevronUp className="ml-auto h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
