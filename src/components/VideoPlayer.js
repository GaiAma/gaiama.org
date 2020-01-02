/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'
import { useState, useRef, useEffect } from 'react'
import { Box } from '@theme-ui/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'

/**
 * https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video
 * https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/cross_browser_video_player
 * https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php
 */

export const VideoPlayer = ({ video, poster, wrapperStyles, ...props }) => {
  const videoEl = useRef()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const onPlayPauseEvent = event => {
    console.log(`onPlayPauseEvent`, event)

    if (event.type === `play`) {
      setIsPlaying(true)
    } else if (event.type === `pause`) {
      setIsPlaying(false)
    }
  }

  // const onLoadedMetadata = event => {
  //   setProgress(videoEl.current.duration)
  // }

  const onTimeUpdate = event => {
    setProgress(
      Math.floor((videoEl.current.currentTime / videoEl.current.duration) * 100)
    )
  }

  useEffect(() => {
    const el = videoEl.current
    if (!el.canPlayType) return () => {}
    if (!el.paused) setIsPlaying(true)

    // window.setInterval(() => {
    //   console.log(el)
    // }, 1000)

    el.addEventListener(`pause`, onPlayPauseEvent)
    el.addEventListener(`play`, onPlayPauseEvent)
    // el.addEventListener(`loadedmetadata`, onLoadedMetadata)
    el.addEventListener(`timeupdate`, onTimeUpdate)
    return () => {
      el.removeEventListener(`pause`, onPlayPauseEvent)
      el.removeEventListener(`play`, onPlayPauseEvent)
      // el.removeEventListener(`loadedmetadata`, onLoadedMetadata)
      el.removeEventListener(`timeupdate`, onTimeUpdate)
    }
  }, [videoEl])

  const handlePlayPause = event => {
    if (!videoEl.current) return
    if (isPlaying) {
      videoEl.current.pause()
    } else {
      videoEl.current.play()
    }
  }

  // const onProgressClick = ({ pageX, target, ...event }) => {
  //   console.log(pageX, target, event)
  //   const pos = (pageX - target.offsetLeft) / target.offsetWidth
  //   videoEl.current.currentTime = pos * videoEl.current.duration
  // }

  return (
    <Box sx={{ position: `relative`, ...wrapperStyles }} {...props}>
      <button
        onClick={handlePlayPause}
        sx={{ background: `none`, border: `none`, p: 0 }}
      >
        <video
          ref={videoEl}
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          sx={{ display: `block`, width: `100%`, height: `auto` }}
        >
          {video.map(x => (
            <source
              key={x.file.publicURL}
              src={x.file.publicURL}
              type={x.type}
            />
          ))}
        </video>
        {!isPlaying && (
          <FontAwesomeIcon
            icon={faPlay}
            size="4x"
            sx={{
              color: `primary`,
              position: `absolute`,
              top: `50%`,
              left: `50%`,
              transform: `translate(-50%, -50%)`,
            }}
          />
        )}

        <div
        // onClick={onProgressClick}
        >
          <div
            sx={{
              height: `0.2rem`,
              width: `${progress}%`,
              backgroundColor: `primary`,
            }}
          ></div>
        </div>
      </button>
    </Box>
  )
}
VideoPlayer.propTypes = {
  poster: PropTypes.string,
  video: PropTypes.object,
  wrapperStyles: PropTypes.object,
}
