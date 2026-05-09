'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Store, MessageSquare, ListOrdered, Camera, UserCircle, CircleDashed } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/story', icon: CircleDashed, label: 'Story' },
  { href: '/chats', icon: MessageSquare, label: 'Chats' },
  { href: '/moments', icon: Camera, label: 'Moments' },
  { href: '/shops', icon: Store, label: 'Shops' },
  { href: '/orders', icon: ListOrdered, label: 'Orders' },
  { href: '/profile', icon: UserCircle, label: 'Profile' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 md:right-auto md:w-20 md:top-0 bg-background border-t z-10 md:border-r">
      <div className="flex md:flex-col justify-around items-center h-16 md:justify-center md:h-[100dvh] md:pb-32 md:pt-5">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Link href={item.href} key={item.href} className="flex flex-col items-center justify-center
             text-muted-foreground w-full h-full hover:text-primary transition-colors">
              <item.icon className={cn("h-6 w-6", isActive && "text-primary")} />
              <span className={cn("text-xs mt-1", isActive && "text-primary")}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
