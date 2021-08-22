import classNames from 'classnames'
import parseHTML from 'html-react-parser'

export type Episode = {
  id: string
  attributes: {
    title: string
    formatted_published_at: Date
    description: string
    media_url: string
  }
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
      <div className="text-xxs flex space-x-5 text-gray-400">
        <p>Episode 000</p> <p>{episode?.attributes?.formatted_published_at}</p>
      </div>
      <h1 className="text-xl">{episode?.attributes?.title}</h1>
    </div>
  )
}

const Summary = ({ episode }: { episode: Episode }) => {
  if (episode === undefined) {
    return null
  }
  return (
    <div className="w-full flex flex-col bg-gray-900 px-5 py-2 rounded-md">
      <h1 className="prose-xl text-gray-100 tracking-wider">Transcript</h1>
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
    <div className="mt-16 flex w-full md:w-8/12 space-x-5 z-50">
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
      <div className="w-full hidden md:block">
        <Summary episode={episode} />
      </div>
    </div>
  )
}

export default Episodes
