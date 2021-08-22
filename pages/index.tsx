import { useState } from 'react'

import Player from '../components/Player'
import Episodes, { Episode } from '../components/Episodes'

type HomeProps = {
  data: {
    data: Episode[]
  }
}

export const Home: React.FC<HomeProps> = ({ data }) => {
  const [episodeId, setEpisodeId] = useState(null)

  const getEpisodeData = (id: string) => {
    if (id === null) {
      return data?.data[0]
    }
    return data?.data?.filter((episodes) => episodes.id === id)[0]
  }

  return (
    <div className="relative h-screen w-screen">
      <div className="fixed right-0 bottom-0 h-96 w-64 bg-lars bg-sizeLars bg-no-repeat bg-right-bottom z-0" />
      <div className="flex flex-col p-10">
        <h1 className="text-brand text-6xl md:text-9xl font-semibold font-headline">
          RECAP
        </h1>
        <p className="text-brand text-lg md:text-2xl font-thin ml-1 md:ml-3">
          Web Developer Podcast
        </p>
      </div>
      <div className="p-10 z-50 absolute w-full">
        <Player episode={getEpisodeData(episodeId)} />

        <Episodes
          episodes={data?.data}
          episodeId={episodeId}
          setEpisodeId={setEpisodeId}
          episode={getEpisodeData(episodeId)}
        />
      </div>
    </div>
  )
}

type StaticProps = {
  props?: {
    data: Episode
  }
}

export async function getStaticProps(): Promise<StaticProps> {
  const res = await fetch(`${process.env.API_URL}/api/episodes`)
  const data = await res.json()

  if (!data) {
    return {}
  }

  return {
    props: { data },
  }
}

export default Home
