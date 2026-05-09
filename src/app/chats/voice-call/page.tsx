// app/page.tsx
'use client'

import {
  ArrowLeft,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Volume2,
  MessageCircle,
  Plus,
  User,
} from 'lucide-react'
import { useState } from 'react'

export default function VoiceCallPage() {
  const [callAccepted, setCallAccepted] = useState(false)
  const [micOn, setMicOn] = useState(true)
  const [speakerOn, setSpeakerOn] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0b141a] text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111b21] via-[#0b141a] to-black" />

      {/* Glow */}
      <div className="absolute left-1/2 top-[28%] h-72 w-72 -translate-x-1/2 rounded-full bg-[#1f2c34] blur-3xl" />
      <div className="absolute left-1/2 top-[28%] h-52 w-52 -translate-x-1/2 rounded-full bg-[#2a3942] blur-2xl" />

      {/* Top Bar */}
      {/* <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 py-4">
        <button className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button className="rounded-full bg-white/10 p-2 backdrop-blur-sm">
          <Plus className="h-5 w-5" />
        </button>
      </div> */}

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 py-10">
        <div className="mt-10 text-center">
          <p className="text-sm text-white/70">
            {callAccepted ? 'End-to-end encrypted' : 'voice call'}
          </p>

          {/* Avatar */}
          <div className="mt-10 flex justify-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-[#202c33] shadow-2xl">
              <User className="h-16 w-16 text-white/80" />
            </div>
          </div>

          {/* Name */}
          <h1 className="mt-6 text-3xl font-semibold">Leo</h1>

          {/* Status */}
          <p className="mt-2 text-sm text-white/70">
            {callAccepted ? 'Voice call' : 'Incoming voice call...'}
          </p>

          {/* Timer / Ringing */}
          <p className="mt-3 text-lg text-white/90">
            {callAccepted ? '00:42' : 'Ringing...'}
          </p>
        </div>

        {/* Bottom Controls */}
        <div className="mb-6 w-full max-w-sm">
          {!callAccepted ? (
            /* Incoming Call Buttons */
            <div className="flex items-center justify-center gap-12">
              {/* Reject */}
              <div className="flex flex-col items-center gap-2">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition hover:scale-105">
                  <PhoneOff className="h-7 w-7" />
                </button>
                <span className="text-xs text-white/70">Decline</span>
              </div>

              {/* Accept */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setCallAccepted(true)}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366] shadow-lg transition hover:scale-105"
                >
                  <Phone className="h-7 w-7" />
                </button>
                <span className="text-xs text-white/70">Accept</span>
              </div>
            </div>
          ) : (
            /* Ongoing Call Controls */
            <div className='flex gap-4 justify-center'>
              <div className="mb-6 flex items-center justify-center gap-5">
                {/* Mic */}
                <button
                  onClick={() => setMicOn(!micOn)}
                  className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
                    micOn ? 'bg-white/10 text-white' : 'bg-white text-black'
                  }`}
                >
                  {micOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                </button>

                {/* Message */}
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition">
                  <MessageCircle className="h-6 w-6" />
                </button>

                {/* Speaker */}
                <button
                  onClick={() => setSpeakerOn(!speakerOn)}
                  className={`flex h-14 w-14 items-center justify-center rounded-full transition ${
                    speakerOn ? 'bg-white text-black' : 'bg-white/10 text-white'
                  }`}
                >
                  <Volume2 className="h-6 w-6" />
                </button>
              </div>

              {/* End Call */}
              <div className="flex justify-center">
                <button
                  onClick={() => setCallAccepted(false)}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg transition hover:scale-105"
                >
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