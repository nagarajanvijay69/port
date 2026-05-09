'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { MessageInput } from './message-input';
import React, { useState } from 'react';
import { ArrowLeft, Info, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';

const chatPartners: { [key: string]: { name: string, avatarId: string } } = {
  '1': { name: 'Alex', avatarId: 'user-alex' },
  '2': { name: 'Sam', avatarId: 'user-sam' },
  '3': { name: 'Jamie', avatarId: 'user-jamie' },
};



const messages = [
  { sender: 'other', text: 'Hey, how is it going?' },
  { sender: 'me', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis eos quia sit a iusto sunt ab nostrum quod quas amet?' },
  { sender: 'other', text: 'Oh nice! The marketplace one?' },
  { sender: 'me', text: 'Yep, that\'s the one. Adding back the chat feature now.' },
  { sender: 'other', text: 'Awesome! Let me know if you need any help testing.' },
];

type ChatPageProps = {
  id: string,
  setIsList: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ChatInterface({ id, setIsList }: ChatPageProps) {

  let timer: NodeJS.Timeout;
  const [selected, setSelected] = useState(false);

  const handleFunction = () => {
    setSelected(true);
  }

  const [doubleClicked, setDoubleClicked] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [translateIndex, setTranslateIndex] = useState<null | number>(null);
  const [translateX, setTranslateX] = useState<number[]>(
    new Array(messages.length).fill(0)
  );
  const handleDoubleClick = (message: string) => {
    setDoubleClicked(true);
    setSelectedMessage(message);
  }


  console.log(selected);

  const startLongPress = () => {
    timer = setTimeout(() => {
      handleFunction()
    }, 500)
  }

  const cancelLongPress = () => {
    clearTimeout(timer)
  }

  const chatId = id;
  const partner = chatPartners[chatId] || { name: 'Unknown', avatarId: 'user-drew' };
  const getAvatarUrl = (avatarId: string) => {
    return PlaceHolderImages.find(img => img.id === avatarId)?.imageUrl || `https://picsum.photos/seed/${avatarId}/100/100`;
  }
  const myAvatarUrl = PlaceHolderImages.find(img => img.id === 'user-drew')?.imageUrl || 'https://picsum.photos/seed/user-drew/100/100';

  return (
    <div className="flex h-full flex-col bg-background relative z-10">
      {
        !selected ? (
          <div className="flex items-center gap-4 border-b p-4 cursor-pointer">
            <div className="back-icon text-gray-400 md:hidden">
              <ArrowLeft className='h-8 w-8' onClick={() => setIsList(true)} />
            </div>
            <Avatar>
              <AvatarImage src={getAvatarUrl(partner.avatarId)} alt={partner.name} />
              <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold">{partner.name}</h2>
          </div>
        ) : (
          <div className="flex items-center h-[73px] border-b relative z-20">
            <div className="back-icon text-gray-400 ml-2 cursor-pointer" onClick={() => {
              // setDoubleClicked(true);
              setSelected(false);
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
                  <Info size={25} className="sm:w-6 sm:h-6" />
                </button>

                <button className="p-2 rounded-full text-gray-500">
                  <Pencil size={25} className="sm:w-6 sm:h-6" />
                </button>

                <button className="p-2 rounded-full text-red-500">
                  <Trash2 size={25} className="sm:w-6 sm:h-6" />
                </button>

                <button className="p-2 rounded-full text-gray-500">
                  <MoreVertical size={25} className="sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>
        )
      }
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg, index) => {
          const handlers = useSwipeable({
            onSwiping: (e) => {
              setTranslateX(prev => {
                const arr = [...prev];
                arr[index] = e.deltaX; // or limit it
                return arr;
              });
            },
            onSwiped: () => {
              setTranslateX(prev => {
                const arr = [...prev];
                arr[index] = 0; // reset
                return arr;
              });
              handleDoubleClick(msg.text);
            },
            trackMouse: true,
          });
          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : ''}`}
            >
              {msg.sender === 'other' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={getAvatarUrl(partner.avatarId)} alt={partner.name} />
                  <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div onContextMenu={(e) => {
                e.preventDefault()
                handleFunction()
              }}
                {...handlers}
                onTouchStart={startLongPress}
                onTouchEnd={cancelLongPress}
                onTouchMove={cancelLongPress}
                onDoubleClick={() => handleDoubleClick(msg.text)}
                className={`max-w-xs rounded-lg p-3 text-sm lg:max-w-md ${msg.sender === 'me'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
                  } relative z-20 bg-blue-500 flex items-center justify-center rounded-xl
                 shadow-lg transition-transform duration-200 select-none`}
                style={{ transform: `translateX(${translateX[index]}px)` }}
              >
                <p>{msg.text}</p>
              </div>
              {msg.sender === 'me' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={myAvatarUrl} alt="My Avatar" />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
              )}
            </div>
          )
        })}
      </div>
      <div>
        <MessageInput
          click={doubleClicked}
          message={selectedMessage}
          setClick={setDoubleClicked}
          setMessage={setSelectedMessage}
        />
      </div>
    </div>
  );
}
