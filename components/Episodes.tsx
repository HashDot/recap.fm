import classNames from 'classnames'
import parseHTML from 'html-react-parser'

export type Episode = {
  id: string
  attributes: {
    title: string
    formatted_published_at: Date
    description: string
    media_url: string
    number: number
  }
}

const getEpisodeNumber = ({ episode }: { episode: Episode }) => {
  if (episode?.attributes?.number === null) {
    return '000'
  }
  return String(episode?.attributes?.number).padStart(3, '0')
}

const Item = ({
  episode,
  setEpisodeId,
  episodeId,
}: {
  episode: Episode
  setEpisodeId: (arg0: string) => void
  episodeId: string
}) => {
  return (
    <div
      key={episode?.id}
      className={classNames(
        'flex flex-col bg-gray-900 text-gray-300 px-5 py-2 rounded-md hover:bg-gray-800 cursor-pointer transition',
        { 'bg-gray-800': episode.id === episodeId }
      )}
      onClick={() => setEpisodeId(episode.id)}
    >
      <div className="flex space-x-5 text-gray-400 text-xxs">
        <p>Episode {getEpisodeNumber({ episode })}</p>{' '}
        <p>{episode?.attributes?.formatted_published_at}</p>
      </div>
      <h1 className="text-xl">{episode?.attributes?.title}</h1>
    </div>
  )
}

const textAnalysis = ({ episode }: { episode: Episode }) => {
  const wordsPerMinute = 200
  const wordCount = episode?.attributes?.description?.trim().split(/\s+/).length
  const readTime = Math.ceil(wordCount / wordsPerMinute)
  return { readTime, wordCount }
}

const Summary = ({ episode }: { episode: Episode }) => {
  if (episode === undefined) {
    return null
  }
  const { readTime, wordCount } = textAnalysis({ episode })
  return (
    <div className="flex flex-col w-full px-5 py-2 bg-gray-900 rounded-md">
      <div className="flex justify-between text-xs text-gray-500">
        <p>Episode {getEpisodeNumber({ episode })}</p>{' '}
        <p>{episode?.attributes?.formatted_published_at}</p>
      </div>
      <h1 className="mb-4 text-3xl text-gray-400">
        {episode?.attributes?.title}
      </h1>
      <hr className="mt-2 mb-4" />
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="tracking-wider prose-xl text-gray-100">Transcript</h2>
        <span className="prose-sm text-gray-400">
          Read Time: {readTime}min - Words: {wordCount}
        </span>
      </div>
      <div className="prose-lg text-gray-300">
        {parseHTML(episode?.attributes?.description)}
      </div>
    </div>
  )
}

const Episodes = ({
  episodes,
  setEpisodeId,
  episodeId,
  episode,
}: {
  episodes: Episode[]
  setEpisodeId: (arg0: string) => void
  episodeId: string
  episode: Episode
}): JSX.Element => {
  return (
    <div className="z-50 flex w-full mt-16 space-x-5 md:w-8/12">
      <div className="w-full md:w-4/12">
        {episodes?.map((episode) => (
          <Item
            key={episode.id}
            episode={episode}
            setEpisodeId={setEpisodeId}
            episodeId={episodeId}
          />
        ))}
      </div>
      <div className="hidden w-full md:block">
        <Summary episode={episode} />
      </div>
    </div>
  )
}

export default Episodes
