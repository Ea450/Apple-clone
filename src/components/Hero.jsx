import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { heroVideo, smallHeroVideo } from '../utils'
import { useState } from "react"
import { useEffect } from "react"

const Hero = () => {

  //  use state to set videos in variables
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ?
    smallHeroVideo : heroVideo
  )

  // function handle Choose video depend on screen size
  const handleVideoSrc = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  // use effect to set screen size
  useEffect(() => {
    window.addEventListener('resize', handleVideoSrc)

    return window.addEventListener('resize', handleVideoSrc)
  }, [])

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 })
    gsap.to('#cta', { opacity: 1,y:-50, delay: 2 })
  }, [])
  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-col flex-center">
        <p className="hero-title" id="hero">IPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video autoPlay muted playsInline={true} key={videoSrc} className="pointer-events-none">
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn">Buy</a>
        <p className="font-normal text-xl">From $199 /month or $999</p>
      </div>
    </section>
  )
}

export default Hero