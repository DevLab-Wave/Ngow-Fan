'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

export default function Home() {
  const [isAccepted, setIsAccepted] = useState(false)
  const [noButtonScale, setNoButtonScale] = useState(1)
  const [yesButtonScale, setYesButtonScale] = useState(1)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [sorryLevel, setSorryLevel] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasStartedRef = useRef(false)
  const fadeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    if (fadeRef.current) clearTimeout(fadeRef.current)
    audio.volume = 0
    const target = 0.35
    const step = () => {
      if (audio.volume < target - 0.005) {
        audio.volume = Math.min(audio.volume + 0.008, target)
        fadeRef.current = setTimeout(step, 40)
      } else {
        audio.volume = target
      }
    }
    step()
  }, [])

  const startAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio || hasStartedRef.current) return
    audio.play()
      .then(() => {
        hasStartedRef.current = true
        fadeIn(audio)
      })
      .catch(() => {/* autoplay blocked */})
  }, [fadeIn])

  useEffect(() => {
    startAudio()
    const handleFirstInteraction = () => startAudio()
    window.addEventListener('pointerdown', handleFirstInteraction, { once: true })
    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction)
      if (fadeRef.current) clearTimeout(fadeRef.current)
    }
  }, [startAudio])

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    if (!hasStartedRef.current) {
      startAudio()
      return
    }
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }

  const handleNoClick = () => {
    setNoButtonScale(prev => Math.max(prev * 0.8, 0.1))
    setYesButtonScale(prev => prev * 1.2)
    setSorryLevel(prev => Math.min(prev + 1, 4))
    const isMobile = window.innerWidth < 768
    const moveX = isMobile ? 25 + Math.random() * 15 : 40 + Math.random() * 20
    const moveY = isMobile ? 12 + Math.random() * 8 : 15 + Math.random() * 10
    const maxX = isMobile ? 80 : 150
    const maxY = isMobile ? 60 : 100
    setNoButtonPosition(prev => ({
      x: Math.min(prev.x + moveX, maxX),
      y: Math.min(prev.y + moveY, maxY),
    }))
  }

  const handleReset = () => {
    setIsAccepted(false)
    setNoButtonScale(1)
    setYesButtonScale(1)
    setNoButtonPosition({ x: 0, y: 0 })
    setSorryLevel(1)
  }

  const MuteButton = () => (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
      title={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
      className="fixed top-4 right-4 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-white/85 backdrop-blur-sm shadow-md border border-pink-200 hover:bg-pink-50 hover:scale-110 active:scale-95 transition-all duration-200"
    >
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  )

  return (
    <>
      {/* Audio อยู่นอก conditional เสมอ ไม่ถูก unmount */}
      <audio ref={audioRef} src="/sound/Coffee_on_the_Sill.mp3" loop preload="auto">
        <track kind="captions" />
      </audio>

      <MuteButton />

      {isAccepted ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-3 sm:px-4">
          <div className="text-center space-y-6 sm:space-y-8 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 animate-bounce leading-tight">
              เย้! รักเธอที่สุดเลยยนะค้าบบบ 💕
            </h1>
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto">
              <img src="/love.gif" alt="Happy cat" className="w-full h-full object-contain" />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-pink-600 font-semibold leading-relaxed">
              รักเธอนะ 😘✨
            </p>
            <button
              onClick={handleReset}
              className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-sm sm:text-base rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              เริ่มต้นใหม่
            </button>
          </div>
        </div>
      ) : (
        <main className="flex flex-col items-center justify-center min-h-screen px-3 sm:px-4" ref={containerRef}>
          <div className="text-center space-y-8 sm:space-y-10 md:space-y-12 w-full max-w-2xl">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-red-500 leading-tight">
                ฝนนนน เรามาง้ออ เราขอโทษเราจะไม่ทำอีกแล้ววค้าบบ 😢
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-pink-600 font-semibold leading-relaxed">
                ดีกันนะค้าบบบบบ? 💔
              </p>
            </div>

            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-80 flex items-center justify-center">
              <img
                src={`/images/Sorry/sorry_level${sorryLevel}.png`}
                alt={`Sorry level ${sorryLevel}`}
                className="w-full h-full object-contain max-w-sm"
              />
            </div>

            <div className="relative w-full min-h-32 sm:min-h-24 flex flex-col md:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 pb-2">
              <button
                onClick={() => setIsAccepted(true)}
                style={{ transform: `scale(${yesButtonScale})`, transition: 'transform 0.2s ease-out' }}
                className="px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-base sm:text-lg md:text-xl rounded-full hover:shadow-2xl hover:from-green-500 hover:to-emerald-600 transition-all duration-300 whitespace-nowrap z-20 active:scale-95 relative"
              >
                หายงอน 💚
              </button>

              <div
                style={{ transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`, transition: 'transform 0.2s ease-out' }}
                className="w-full sm:w-auto flex justify-center md:justify-start md:relative"
              >
                <button
                  onClick={handleNoClick}
                  style={{ transform: `scale(${noButtonScale})`, transition: 'transform 0.2s ease-out' }}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold text-base sm:text-lg md:text-xl rounded-full hover:shadow-2xl hover:from-red-500 hover:to-rose-600 transition-all duration-300 whitespace-nowrap z-10 active:scale-95"
                >
                  ไม่หายงอน
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-gray-600 px-2">
              * ขอโอกาสอีกครั้งได้มั้ยยยงับบบบบ 🥺
            </p>
          </div>
        </main>
      )}
    </>
  )
}
