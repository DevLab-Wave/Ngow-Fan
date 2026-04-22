'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

export default function Home() {
  const [isAccepted, setIsAccepted] = useState(false)
  const [noButtonScale, setNoButtonScale] = useState(1)
  const [yesButtonScale, setYesButtonScale] = useState(1)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [sorryLevel, setSorryLevel] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleNoClick = () => {
    // ปุ่มไม่หายงอนเล็กลง 80% ต่อครั้ง
    setNoButtonScale(prev => Math.max(prev * 0.8, 0.1))
    // ปุ่มหายงอนขยายใหญ่ขึ้น 120% ต่อครั้ง
    setYesButtonScale(prev => prev * 1.2)
    
    // เปลี่ยนระดับภาพ ไม่เกิน 4
    setSorryLevel(prev => Math.min(prev + 1, 4))
    
    // ขยับปุ่มไม่หายงอน โดยคำนึงถึงขนาดหน้าจอ
    const isMobile = window.innerWidth < 768
    const moveX = isMobile ? 25 + Math.random() * 15 : 40 + Math.random() * 20
    const moveY = isMobile ? 12 + Math.random() * 8 : 15 + Math.random() * 10
    
    // จำกัดตำแหน่งให้ปุ่มไม่ออกนอกจอ
    const maxX = isMobile ? 80 : 150
    const maxY = isMobile ? 60 : 100
    
    setNoButtonPosition(prev => ({
      x: Math.min(prev.x + moveX, maxX),
      y: Math.min(prev.y + moveY, maxY),
    }))
  }

  const handleYesClick = () => {
    setIsAccepted(true)
  }

  if (isAccepted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-3 sm:px-4">
        <div className="text-center space-y-6 sm:space-y-8 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 animate-bounce leading-tight">
            เย้! รักเธอที่สุดเลยยนะค้าบบบ 💕
          </h1>
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto">
            <img
              src="/love.gif"
              alt="Happy cat"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-pink-600 font-semibold leading-relaxed">
            รักเธอนะ 😘✨
          </p>
          <button
            onClick={() => {
              setIsAccepted(false)
              setNoButtonScale(1)
              setYesButtonScale(1)
              setNoButtonPosition({ x: 0, y: 0 })
              setSorryLevel(1)
            }}
            className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-sm sm:text-base rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            เริ่มต้นใหม่
          </button>
        </div>
      </div>
    )
  }

  return (
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
            src={`/images/sorry/sorry_level${sorryLevel}.png`}
            alt={`Sorry level ${sorryLevel}`}
            className="w-full h-full object-contain max-w-sm"
          />
        </div>

        {/* Container สำหรับปุ่มทั้งสอง */}
        <div className="relative w-full min-h-32 sm:min-h-24 flex flex-col md:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 pb-2">
          {/* ปุ่มหายงอน */}
          <button
            onClick={handleYesClick}
            style={{
              transform: `scale(${yesButtonScale})`,
              transition: 'transform 0.2s ease-out',
            }}
            className="px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-base sm:text-lg md:text-xl rounded-full hover:shadow-2xl hover:from-green-500 hover:to-emerald-600 transition-all duration-300 whitespace-nowrap z-20 active:scale-95 relative"
          >
            หายงอน 💚
          </button>

          {/* ปุ่มไม่หายงอน */}
          <div
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: 'transform 0.2s ease-out',
            }}
            className="w-full sm:w-auto flex justify-center md:justify-start md:relative"
          >
            <button
              onClick={handleNoClick}
              style={{
                transform: `scale(${noButtonScale})`,
                transition: 'transform 0.2s ease-out',
              }}
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
  )
}
