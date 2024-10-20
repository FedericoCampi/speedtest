'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Share2, Download, Upload, Wifi, Play, Pause, RefreshCw, ChevronUp, ChevronDown, Zap } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'

const SpeedMeter = ({ value, max, color }: { value: number, max: number, color: string }) => {

  const angle = (value / max) * 180 - 10

  return (
    <div className="relative w-48 h-24 overflow-hidden">
      <div className="absolute w-48 h-48 bottom-0 left-0 bg-gray-800 rounded-full"></div>
      <motion.div 
        className="absolute w-1 h-24 bottom-0 left-24 origin-bottom"
        style={{ backgroundColor: color }}
        animate={{ rotate: angle }}
        transition={{ type: "spring", stiffness: 60 }}
      ></motion.div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-2xl font-bold">
        {value.toFixed(2)}
      </div>
    </div>
  )
}

const ParticleEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.5)'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

export default function FuturisticSpeedTest() {
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null)
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null)
  const [ping, setPing] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 1
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 30)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  const runSpeedTest = async () => {
    setIsLoading(true)
    setProgress(0)
    setDownloadSpeed(null)
    setUploadSpeed(null)
    setPing(null)
    
    await controls.start({ scale: [1, 1.2, 1], rotate: [0, 360, 720], transition: { duration: 2 } })
    
    // Simulating API call for speed test
    await new Promise(resolve => setTimeout(resolve, 3000))



    // const response = await axios.get('http://localhost:3000/speedtest');

    // const { downloadSpeed } = response.data;
    // const numericDownloadSpeed = Number(downloadSpeed);
    // console.log(numericDownloadSpeed)
    // // Asigna los valores a los estados correspondientes
    // setDownloadSpeed(numericDownloadSpeed);

    
    setDownloadSpeed(2)
    setUploadSpeed(4)
    setPing(19)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 overflow-hidden relative">
      <ParticleEffect />
      <div className="relative z-10">
        <header className="flex justify-between items-center mb-8">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Zap className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">SPEEDTEST</span>
          </motion.div>
          <nav className="hidden sm:flex gap-4">
            {['Apps', 'Learn', 'Data', 'Acerca de'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-white/10 transition-all duration-300">
                  {item}
                </Button>
              </motion.div>
            ))}
          </nav>
        </header>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-900/50 text-white col-span-1 md:col-span-2 backdrop-blur-md border-2 border-cyan-500/30 overflow-hidden">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Test de Velocidad
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <motion.div 
                className="relative"
                animate={controls}
              >
                <svg className="w-64 h-64">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                  <circle
                    className="text-gray-700"
                    strokeWidth="6"
                    stroke="currentColor"
                    fill="transparent"
                    r="98"
                    cx="128"
                    cy="128"
                  />
                  <motion.circle
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    strokeDasharray={616}
                    strokeDashoffset={616 - (616 * progress) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    r="98"
                    cx="128"
                    cy="128"
                    initial={{ strokeDashoffset: 616 }}
                    animate={{ strokeDashoffset: 616 - (616 * progress) / 100 }}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                <Button
                  onClick={runSpeedTest}
                  disabled={isLoading}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white font-bold text-2xl shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-12 h-12" />
                    </motion.div>
                  ) : (
                    <Play className="w-12 h-12" />
                  )}
                </Button>
              </motion.div>

              <AnimatePresence>
                {downloadSpeed !== null && uploadSpeed !== null && (
                  <motion.div 
                    className="w-full max-w-md grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-gray-800/50 backdrop-blur-md border border-cyan-500/30">
                      <CardHeader>
                        <CardTitle className="text-sm text-cyan-400">DESCARGA</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <SpeedMeter value={downloadSpeed} max={10} color="#06b6d4" />
                      </CardContent>
                    </Card>
                    <Card className="bg-gray-800/50 backdrop-blur-md border border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="text-sm text-purple-400">SUBIDA</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <SpeedMeter value={uploadSpeed} max={5} color="#a855f7" />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {ping !== null && (
                  <motion.div 
                    className="text-center bg-gray-800/50 p-4 rounded-lg backdrop-blur-md border border-blue-500/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-sm text-blue-400">Ping</div>
                    <div className="text-2xl font-bold">{ping} ms</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {[Share2, Download, Upload].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button variant="outline" size="icon" className="rounded-full hover:bg-cyan-500/20 transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {[1, 2].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-gray-900/50 text-white backdrop-blur-md border-2 border-purple-500/30 overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                      Anuncio {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="bg-gray-800/50 h-40 flex items-center justify-center rounded-lg overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image 
                        src="/placeholder.svg?height=160&width=300" 
                        width={300} 
                        height={160} 
                        alt="Ad Space" 
                        className="rounded-lg transition-transform duration-300 group-hover:scale-110" 
                      />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            
            variant="ghost"
            onClick={() => setShowDetails(!showDetails)}
            className="text-cyan-400 hover:text-cyan-300"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
            {showDetails ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </Button>
        </motion.div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-gray-900/50 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4"
            >
              <h3 className="text-xl font-semibold mb-2 text-cyan-400">Test Details</h3>
              <p>Server: New York City, NY</p>
              <p>ISP: Example Internet Provider</p>
              <p>Connection Type: Fiber</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}