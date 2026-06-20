import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono, Syne } from 'next/font/google'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import Sidebar from '@/components/layout/Sidebar'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['300', '400', '500', '600'],
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
})

export const metadata: Metadata = {
  title: 'Next-Gen Learning Dashboard Pro Max',
  description: 'Premium dashboard built with Next.js 14, Supabase, Framer Motion, GSAP, and Three.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${syne.variable}`}
    >
      <body className="font-space antialiased bg-bg text-text min-h-screen">
        <SmoothScrollProvider>
          <div className="ambient" />
          <div className="flex min-h-screen">
            {/* Collapsible Sidebar */}
            <Sidebar />

            {/* Main content scroll context */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
              <main className="flex-1 p-6 md:p-10 lg:p-12 relative z-10 max-w-7xl mx-auto w-full">
                {children}
              </main>

              {/* Footer */}
              <footer className="border-t border-white/5 p-6 md:px-10 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 w-full max-w-7xl mx-auto">
                <span className="text-[10px] font-jetbrains text-muted">
                  Next-Gen Learning Dashboard · Pro Max Edition
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Next.js 14', 'Supabase', 'Framer Motion', 'GSAP', 'Lenis', 'Three.js'].map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-jetbrains border border-white/10 bg-white/2 px-2.5 py-1 rounded-md text-muted2 hover:text-text hover:border-white/20 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </footer>
            </div>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
