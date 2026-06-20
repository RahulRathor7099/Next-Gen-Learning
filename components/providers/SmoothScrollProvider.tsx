'use client'

import { useEffect, ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      syncTouch: false, // matches blueprint
    })

    // Update ScrollTrigger on scroll
    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    // Sync Lenis RAF with GSAP ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Scroll Trigger cleanup
    return () => {
      lenis.destroy()
      gsap.ticker.remove(tick)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <>{children}</>
}
