import { useRef } from 'react'
import { hightlightsSlides } from '../constants'
import { useState } from 'react';
import { useEffect } from 'react';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
const VideoCarousel = () => {

    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    // set videos in use state 
    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })
    // set loaded data in use state 
    const [loadedData, setLoadedData] = useState([])
    // destructure video keys to implement easily
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

    //use gsap to animate video section
    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })
        gsap.to('#video', {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: "restart none none none"
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                }))
            }
        })
    }, [isEnd, videoId])

    // create a handle progress function

    const handleProgress = (type, i) => {
        switch (type) {
            case 'video-end':
                setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, videoId: i + 1 }))
                break;
            case 'video-last':
                setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }))
                break;
            case 'video-reset':
                setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: false, videoId: 0 }))
                break;
            case 'play':
                setVideo((prevVideo) => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }))
                break;
            case 'pause':
                setVideo((prevVideo) => ({ ...prevVideo, isPlaying: !prevVideo.isPlaying }))
                break;
            default:
                return video
        }
    }

    // create handle loadedData function
    const handleLoadedData = (i, e) => setLoadedData((pre) => [...pre, e])

    // use effect to handle animate button
    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId]) {
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                    if (progress !== currentProgress) {
                        currentProgress = progress;
                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 1200
                                ? '10vw' : '4vw'
                        })
                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        })
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: 'afafaf'
                        })
                    }
                }
            })
            if (videoId === 0) {
                anim.restart();
            }
            const animUpdate = () => {
                anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }
            if (isPlaying) {
                gsap.ticker.add(animUpdate)
            } else {
                gsap.ticker.remove(animUpdate)
            }
        }
    }, [videoId, startPlay, isPlaying])

    // use effect to play and pause videos
    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData])
    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-xl overflow-hidden bg-black">
                                <video id='video' playsInline={true} muted preload='auto'
                                    className={`${list.id === 2 && 'translate-x-44'} pointer-events-none`}
                                    ref={(el) => (videoRef.current[i] = el)}
                                    onEnded={() => i !== 3 ? handleProgress('video-end', i)
                                        : handleProgress('video-last')}
                                    onPlay={() => {
                                        setVideo((prevVideo) => ({
                                            ...prevVideo,
                                            isPlaying: true
                                        }))
                                    }}
                                    onLoadedMetadata={(e) => handleLoadedData(i, e)}
                                >
                                    <source src={list.video} type='video/mp4' />
                                </video>
                            </div>
                            <div className='absolute top-12 left-[5%] z-10'>
                                {list.textLists.map((list) => (
                                    <p key={list} className='md:text-2xl text-xl font-medium'>
                                        {list}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {videoRef.current.map((_, i) => (
                        <span
                            key={i}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                            ref={(el) => (videoDivRef.current[i] = el)}
                        >
                            <span
                                className="absolute h-full w-full rounded-full"
                                ref={(el) => (videoSpanRef.current[i] = el)}
                            />
                        </span>
                    ))}
                </div>
                <button className="control-btn">
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                        onClick={
                            isLastVideo
                                ? () => handleProgress("video-reset")
                                : !isPlaying
                                    ? () => handleProgress("play")
                                    : () => handleProgress("pause")
                        }
                    />
                </button>
            </div>
        </>
    )
}

export default VideoCarousel