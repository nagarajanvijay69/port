'use client'

import {
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
  Volume2,
  User,
  MessageCircleMore,
} from 'lucide-react'
import { useState } from 'react'

export default function VideoCallPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callAccepted, setCallAccepted] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop"
          alt="Caller"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Top Info */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-10">
        <div className="text-center">
          <p className="text-sm text-gray-300">
            {callAccepted ? 'End-to-end encrypted' : 'WhatsApp Video Call'}
          </p>

          <div className="mt-8 flex justify-center">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <h1 className="mt-5 text-3xl font-semibold">Priya</h1>
          <p className="mt-2 text-base text-gray-300">
            {callAccepted ? '00:24' : 'Ringing...'}
          </p>
        </div>

        {/* Center Floating Small Self Preview */}
        {callAccepted && (
          <div className="absolute right-5 top-20 z-20 hidden h-36 w-24 overflow-hidden rounded-2xl border border-white/10 bg-zinc-800 shadow-xl sm:block">
            <div className="flex h-full w-full items-center justify-center bg-zinc-700">
              <User className="h-10 w-10 text-white/80" />
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="relative z-10 pb-6">
          {!callAccepted ? (
            <div className="flex items-center justify-center gap-10">
              {/* Reject */}
              <button onClick={()=> setCallAccepted(false)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition hover:scale-105"
              >
                <PhoneOff className="h-7 w-7" />
              </button>

              {/* Accept */}
              <button
                onClick={() => setCallAccepted(true)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg transition hover:scale-105"
              >
                <Video className="h-7 w-7" />
              </button>
            </div>
          ) : (
            <div className=" flex justify-center">
              {/* First Row */}
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
                    isMuted ? 'bg-green-500 text-black' : 'bg-white/15'
                  }`}
                >
                  {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </button>

                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
                    isVideoOff ? 'bg-green-500 text-black' : 'bg-white/15'
                  }`}
                >
                  {isVideoOff ? (
                    <VideoOff className="h-6 w-6" />
                  ) : (
                    <Video className="h-6 w-6" />
                  )}
                </button>

                <button
                  onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                  className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
                    isSpeakerOn ? 'bg-green-500 text-black' : 'bg-white/15'
                  }`}
                >
                  <Volume2 className="h-6 w-6" />
                </button>
              </div>

              {/* Second Row */}
              <div className="flex items-center justify-center gap-6 ml-5">
                {/* <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/20">
                  <MessageCircleMore className="h-6 w-6" />
                </button> */}

                <button onClick={()=> setCallAccepted(false)} className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition hover:scale-105">
                  <PhoneOff className="h-7 w-7" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}