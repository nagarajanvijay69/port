'use client';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ListOrdered, Settings, ChevronRight, Store, MapPin, Gift, LogOut } from 'lucide-react'

// Mock user data for UI demonstration purposes
const sampleUser = {
  uid: 'sample-user-id',
  displayName: 'Alex',
  phoneNumber: '+91 98765 43210',
  photoURL: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NzIzNjE1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080'
};


export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    if (auth) {
      auth.signOut().then(() => {
        router.push('/login');
      });
    } else {
        // If auth is not available (e.g., in preview mode without firebase)
        router.push('/login');
    }
  };

  // Use the real user if logged in, otherwise fall back to the sample user for UI preview
  const displayUser = user ? {
    ...user,
    phoneNumber: user.phoneNumber || sampleUser.phoneNumber // Fallback for phone
  } : sampleUser;

  const menuItems = [
    { icon: Store, label: 'Register a Shop', href: '/register-shop' },
    { icon: ListOrdered, label: 'Order History', href: '/orders' },
    { icon: MapPin, label: 'Track My Order', href: '/track-order/ORD003' }, // Example order ID
    { icon: Gift, label: 'Donate', href: '/donate' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: LogOut, label: 'Log Out', onClick: handleLogout },
  ];

  if (isUserLoading && !user) {
    return (
        <div className="h-full bg-muted/20">
            <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="h-5 w-5" />
                                        <Skeleton className="h-5 w-32" />
                                    </div>
                                    <Skeleton className="h-5 w-5" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="space-y-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Skeleton className="h-10 w-32" />
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
  }

  return (
    <div className="h-full bg-muted/20">
      <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
        <div className="flex items-center gap-4">
            <div className="relative h-24 w-24 shrink-0">
            <Image
                src={displayUser.photoURL || `https://picsum.photos/seed/${displayUser.uid}/200/200`}
                alt={displayUser.displayName || 'User'}
                fill
                className="rounded-full object-cover"
                data-ai-hint="person portrait"
            />
            </div>
            <div>
                <h1 className="text-2xl font-bold">{displayUser.displayName || 'Anonymous User'}</h1>
                <p className="text-muted-foreground">{displayUser.phoneNumber}</p>
            </div>
        </div>

        <Card>
            <CardContent className="p-0">
                 <ul className="divide-y">
                    {menuItems.map(item => (
                        <li key={item.label}>
                           {item.href ? (
                                <Link href={item.href} className="flex items-center justify-between p-4 hover:bg-muted/50">
                                    <div className="flex items-center gap-4">
                                        <item.icon className="h-5 w-5 text-muted-foreground" />
                                        <span>{item.label}</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                </Link>
                           ) : (
                                <button onClick={item.onClick} className="w-full flex items-center justify-between p-4 hover:bg-muted/50">
                                     <div className="flex items-center gap-4 text-foreground">
                                        <item.icon className="h-5 w-5 text-muted-foreground" />
                                        <span>{item.label}</span>
                                    </div>
                                </button>
                           )}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              This information can be updated at any time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" defaultValue={displayUser.displayName || ''} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                defaultValue={'A passionate foodie and developer exploring the world one bite at a time.'}
                placeholder="Tell us a little about yourself"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
