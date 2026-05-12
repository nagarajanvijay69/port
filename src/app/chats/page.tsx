'use client'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'
import { ListChecks, MoreVertical, Search, Check, Bell, UserRoundPlus, Trash2, Info, Pin, BellOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge';
import Image from 'next/image'
import { ArrowLeft, Camera, QrCode, Pencil } from 'lucide-react'
// import ChatPage from './[id]/page'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ChatPage from './[id]/page'
import { BottomNav } from '@/components/bottom-nav'
import { useRef, useState } from 'react'


const chats = [
  { id: '1', name: 'John Warren', lastMessage: 'Hey, how is it going?', avatarId: 'user-alex', unread: 3, time: '07:39 pm', read: true },
  { id: '2', name: 'Sam andreson', lastMessage: 'saptiya', avatarId: 'user-sam', unread: 0, time: '05:20 pm', read: true },
  { id: '3', name: 'Jamie Lannister', lastMessage: 'See you tomorrow!', avatarId: 'user-jamie', unread: 0, time: '04:19 am', read: false },
  { id: '4', name: 'Taylor Swift', lastMessage: 'On my way.', avatarId: 'user-taylor', unread: 2, time: 'yesterday', read: true },
  { id: '5', name: 'Casey Becker', lastMessage: 'Photo', avatarId: 'user-casey', unread: 0, time: 'yesterday', read: true },
  { id: '6', name: 'Jordan Peele', lastMessage: 'That\'s hilarious 😂', avatarId: 'user-jordan', unread: 1, time: 'tuesday', read: false },
  { id: '7', name: 'Drew Barrymore', lastMessage: 'Let\'s catch up soon!', avatarId: 'user-drew', unread: 0, time: 'monday', read: true },
  { id: '8', name: 'Reese Witherspoon', lastMessage: 'Got it, thanks!', avatarId: 'user-reese', unread: 0, time: 'sunday', read: true },
  { id: '9', name: 'Alex Rodriguez', lastMessage: 'Can you send the file?', avatarId: 'user-alex', unread: 0, time: '12/07/2024', read: true },
]

const filterChips = ['All', 'Contacts', 'Media', 'Others'];


export default function ChatsPage() {



  const handleChatNavigate = (id: string) => {
    setSelectedUser(id);
    setIsList(false);
  }

  const [selectedUser, setSelectedUser] = useState('');
  const [isList, setIsList] = useState(true);
  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedChat, setSelectedChat] = useState(false);


  const startPress = () => {
    timeRef.current = setTimeout(() => {
      console.log("long pressed");
    }, 500);
  }

  const handleUserChat = (id: string) => {
    console.log(id); // chat id
    setSelectedChat(true);
  }

  const endPress = () => {
    if (timeRef.current) clearTimeout(timeRef.current);
  }

  const getAvatarUrl = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || `https://picsum.photos/seed/${avatarId}/100/100`;
  }

  return (
    <div className='chat-page md:grid md:grid-cols-6 xl:grid-cols-9 xl:h-[100dvh]'>
      {
        <div className={`${!isList && 'hidden md:block'}  col-span-3 flex flex-col
         h-[100dvh] bg-background md:pl-24 border-r`}>
          <header className="pt-3 px-2  border-b sticky top-0 bg-background z-10">
            {
              selectedChat ?
                <div className='flex justify-between items-center h-12'>
                  <div className="back-icon text-gray-400 ml-2 cursor-pointer" onClick={() => {
                    setSelectedChat(false);
                  }}>
                    <ArrowLeft className='h-8 w-8' />
                  </div>
                  <div className="w-full px-3 sm:px-4 py-3 flex items-center justify-between">
                    {/* left side */}
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <p className="text-sm sm:text-base font-medium truncate">1 selected</p>
                    </div>

                    {/* right side actions */}
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button className="p-2 rounded-full text-gray-500">
                        <Pin size={25} className="sm:w-6 sm:h-6" />
                      </button>

                      <button className="p-2 rounded-full text-gray-500">
                        <Pencil size={25} className="sm:w-6 sm:h-6" />
                      </button>

                      <button className="p-2 rounded-full text-gray-500">
                        <BellOff size={25} className="sm:w-6 sm:h-6" />
                      </button>

                      <button className="p-2 rounded-full text-red-500">
                        <Trash2 size={25} className="sm:w-6 sm:h-6" />
                      </button>
                    </div>
                  </div>
                </div>
                :
                <div className="flex justify-between items-center h-8">
                  <Logo />
                  <div className="flex items-center gap-4">
                    <Link href="/contacts">
                      <UserRoundPlus className="h-6 w-6 text-muted-foreground" />
                    </Link>
                    <Link href="/notification">
                      <Bell className="h-6 w-6 text-muted-foreground" />
                    </Link>
                    <button><ListChecks className="h-6 w-6 text-muted-foreground" /></button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button><MoreVertical className="h-6 w-6 text-muted-foreground" /></button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>New Group</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Archived</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
            }
            <h1 className="text-3xl font-bold mt-2">Chats</h1>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search people." className="pl-10 bg-muted border-none rounded-full" />
            </div>
            <div className="flex gap-2 mt-2 overflow-x-auto  pb-2 -mx-4 px-4">
              {filterChips.map(chip => (
                <Button key={chip} variant={chip === 'All' ? 'default' : 'outline'} className="rounded-full flex-shrink-0">
                  {chip}
                </Button>
              ))}
            </div>
          </header>
          <div className="flex-1 overflow-y-scroll scrollbar-none pb-20 md:pb-auto">
            {chats.map((chat) => (
              <div onClick={() => {
                if (selectedChat) setSelectedChat(false);
                handleChatNavigate(chat.id);
              }} onContextMenu={(e) => {
                e.preventDefault();
                handleUserChat(chat.id);
              }}
                // handling long press 
                onMouseDown={startPress}
                onMouseUp={endPress}
                onMouseLeave={endPress}
                onTouchStart={startPress}
                onTouchEnd={endPress}
                key={chat.id} className="flex items-center gap-4 p-4 hover:bg-muted cursor-pointer border-b">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage src={getAvatarUrl(chat.avatarId)} alt={chat.name} />
                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold truncate">{chat.name}</p>
                  <div className="flex items-center gap-1">
                    {chat.read && <Check className="h-4 w-4 text-muted-foreground" />}
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end text-xs space-y-1">
                  <p className="text-muted-foreground whitespace-nowrap">{chat.time}</p>
                  {chat.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground h-5 w-5 flex items-center justify-center p-0">{chat.unread}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      {
        <div className={`${isList ? 'hidden md:block h-full md:col-span-3 xl:col-span-4' : 'md:col-span-3 xl:col-span-4'} h-[100dvh] overflow-y-scroll`}>
          <ChatPage id={selectedUser} setIsList={setIsList} />
        </div>
      }
      {
        <div className='hidden xl:block col-span-2 h-[100dvh] overflow-y-scroll border-l border-2 border-gray-300 shadow-lg'>
          <div className="flex justify-center items-center p-4">
            <div className="w-full rounded-2xl overflow-hidden">

              {/* Header */}
              <div className="flex items-center gap-4 px-4 py-4 border-b border-gray-300">
                <h1 className="text-black text-lg font-semibold">Profile</h1>
              </div>

              {/* Profile Image */}
              <div className="flex flex-col items-center px-6 py-6 border-b border-gray-300">
                <div className="relative">
                  <Image
                    src="https://picsum.photos/seed/user-drew/100/100"
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full object-cover w-[120px] h-[120px]"
                  />
                  <button className="absolute bottom-1 right-1 bg-[#00a884] p-2 rounded-full">
                    <Camera className="text-white w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Name Section */}
              <div className="px-4 py-4 border-b border-gray-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-[#8696a0] text-sm mb-1">Name</p>
                    <p className="text-gray-600 text-base font-medium">Alex Johnson</p>
                    <p className="text-gray-500 text-xs mt-2 leading-5">
                      This is not your username or pin. This name will be visible to your contacts.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-1">
                    <Pencil className="text-[#00a884] w-5 h-5 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="px-4 py-4 border-b border-gray-300">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-[#8696a0] text-sm mb-1">About</p>
                    <p className="text-gray-600 text-base">Available</p>
                  </div>

                  <Pencil className="text-[#00a884] w-5 h-5 cursor-pointer mt-1" />
                </div>
              </div>

              {/* Phone Section */}
              <div className="px-4 py-4">
                <p className="text-[#8696a0] text-sm mb-1">Phone</p>
                <p className="text-gray-600 text-base">+91 98454 34692</p>
              </div>
            </div>
          </div>
        </div>
      }
      <div className={`${!isList && 'hidden md:block'}`}>
        <BottomNav />
      </div>
    </div>
  );
}