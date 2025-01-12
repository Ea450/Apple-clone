import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from '../utils'
import VideoCarousel from "./VideoCarousel"

const HighLights = () => {

    useGSAP(() => {
        gsap.to('#title', { opacity: 1, y: 0 })
        gsap.to('.link', { opacity: 1, y: 0, duration:1, stagger: .25 })
    }, [])

    return (
        <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
            <div className="screen-max-width">
                <div className="mb-12 w-full md:flex items-end justify-between">
                    <h1 className="section-heading" id="title">Get the HighLights</h1>
                    <div className="flex flex-wrap items-end gap-5">
                        <p className="link">Watch the film
                            <img src={watchImg} alt="watch" className="ml-2 watch" />
                        </p>
                        <p className="link">Watch the film
                            <img src={rightImg} alt="right" className="ml-2 right" />
                        </p>
                    </div>
                </div>
                <VideoCarousel/>
            </div>
        </section>
    )
}

export default HighLights