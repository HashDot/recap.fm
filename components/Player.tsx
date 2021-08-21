import { useState, useRef } from 'react'
import ReactPlayer from 'react-player'
import classNames from 'classnames'

import PlayIcon from './Icons/Play'
import PauseIcon from './Icons/Pause'

type PlayerProps = {
  episode: {
    title: string
    url: string
  }
}

const playbackRates = [0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5]

const cyclePlaybackRates = (currentRate: number): number => {
  const currentIndex = playbackRates.indexOf(currentRate)
  const nextItem = (currentIndex + 1) % playbackRates.length
  return playbackRates[nextItem]
}

const Controls = ({
  isPlaying,
  setIsPlaying,
  playbackRate,
  setPlaybackRate,
}): JSX.Element => {
  return (
    <div className="flex space-x-5 text-gray-50 text-sm justify-between">
      <button
        className={classNames(
          'bg-brand hover:bg-brandHover text-gray-900 rounded-md px-2 py-1 transition',
          {
            'bg-brandHover': isPlaying,
          }
        )}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <div className="w-5 h-5">
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </div>
      </button>
      <button
        className="bg-gray-700 hover:bg-gray-800 text-gray-400 rounded-md px-2 py-1"
        onClick={() => setPlaybackRate(cyclePlaybackRates(playbackRate))}
      >
        SPEED {playbackRate}x
      </button>
    </div>
  )
}

const TimeSlider = ({
  duration,
  current,
  setCurrent,
  playerRef,
}): JSX.Element => {
  const seekTo = (value: number): void => {
    setCurrent(value)
    playerRef.current.seekTo(value)
  }

  return (
    <input
      className="rounded-md appearance-none bg-gray-700 h-2 overflow-hidden w-full"
      type="range"
      min="0"
      max={duration}
      value={current}
      onChange={(event) => seekTo(parseFloat(event.target.value))}
    />
  )
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
        url={episode.url}
        playing={isPlaying}
        playbackRate={playbackRate}
        onDuration={(duration) => setDuration(duration)}
        onProgress={(progress) => setCurrent(progress.playedSeconds)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="w-96">
        <h3 className="text-gray-300 mb-3">{episode.title}</h3>
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
