import { useState, useRef } from 'react'
import ReactPlayer from 'react-player'
import classNames from 'classnames'
import Marquee from 'react-fast-marquee'

import PlayIcon from './Icons/Play'
import PauseIcon from './Icons/Pause'
import { Episode } from './Episodes'

const playbackRates = [0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5]

const cyclePlaybackRates = (currentRate: number): number => {
  const currentIndex = playbackRates.indexOf(currentRate)
  const nextItem = (currentIndex + 1) % playbackRates.length
  return playbackRates[nextItem]
}

type ControlsProps = {
  isPlaying: boolean
  setIsPlaying: (arg0: boolean) => void
  playbackRate: number
  setPlaybackRate: (arg0: number) => void
}

const Controls = ({
  isPlaying,
  setIsPlaying,
  playbackRate,
  setPlaybackRate,
}: ControlsProps): JSX.Element => {
  return (
    <div className="flex space-x-5 text-gray-50 text-xs justify-between items-end">
      <button
        name="play-pause-button"
        aria-label="Play Pause Button"
        className={classNames(
          'bg-brand hover:bg-brandHover text-gray-900 rounded-md px-2 py-1 transition',
          {
            'bg-brandHover': isPlaying,
          }
        )}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <div className="w-10 h-10">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </div>
      </button>
      <button
        name="playbackrate-button"
        aria-label="Playback Rate Button"
        className="bg-gray-900 hover:bg-gray-800 text-gray-400 rounded-md px-2 py-1 h-6"
        onClick={() => setPlaybackRate(cyclePlaybackRates(playbackRate))}
      >
        SPEED {playbackRate}x
      </button>
    </div>
  )
}

type TimeSpliederProps = {
  duration: number
  current: number
  setCurrent: (arg0: number) => void
  playerRef: any
}

const TimeSlider = ({
  duration,
  current,
  setCurrent,
  playerRef,
}: TimeSpliederProps): JSX.Element => {
  const seekTo = (value: number): void => {
    setCurrent(value)
    playerRef.current.seekTo(value)
  }

  const durationMinutes = String(Math.floor(duration / 60)).padStart(2, '0')
  const durationSeconds = String(Math.floor(duration % 60)).padStart(2, '0')

  const currentMinutes = String(Math.floor(current / 60)).padStart(2, '0')
  const currentSeconds = String(Math.floor(current % 60)).padStart(2, '0')

  return (
    <div>
      <label htmlFor="seek-bar" className="sr-only">
        Seekbar
      </label>
      <input
        id="seek-bar"
        className="rounded-md appearance-none bg-gray-700 h-2 overflow-hidden w-full"
        type="range"
        min="0"
        max={duration}
        value={current}
        onChange={(event) => seekTo(parseFloat(event.target.value))}
      />
      <div className="text-xs text-gray-400 font-mono flex justify-between">
        <span>
          {currentMinutes}m{currentSeconds}s
        </span>
        <span>
          {durationMinutes}m{durationSeconds}s
        </span>
      </div>
    </div>
  )
}

type PlayerProps = {
  episode: Episode
}

const Player: React.FC<PlayerProps> = ({ episode }) => {
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [duration, setDuration] = useState(100)
  const [current, setCurrent] = useState(0)

  return (
    <>
      <ReactPlayer
        ref={playerRef}
        url={episode?.attributes?.media_url}
        playing={isPlaying}
        playbackRate={playbackRate}
        onDuration={(duration) => setDuration(duration)}
        onProgress={(progress) => setCurrent(progress.playedSeconds)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        width={0}
        height={0}
        id="audioPlayer"
      />
      <div className="w-full md:w-8/12 bg-gray-900 p-5 rounded-md z-20 bg-opacity-80">
        <Marquee gradient={false} delay={15} pauseOnHover={true}>
          <h1 className="text-gray-300 mb-3 text-xl line-clamp-1 hover:line-clamp-none transition">
            {episode?.attributes?.title}
          </h1>
          <></>
        </Marquee>

        <Controls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          playbackRate={playbackRate}
          setPlaybackRate={setPlaybackRate}
        />
        <TimeSlider
          playerRef={playerRef}
          duration={duration}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </>
  )
}

export default Player
