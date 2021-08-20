export const Home = (): JSX.Element => (
  <div className="relative h-screen w-screen">
    <img
      src="/hashdot.png"
      className="w-2/3 md:w-1/3 absolute right-0 bottom-0"
    />
    <div className="flex flex-col absolute left-10 top-10">
      <h1 className="text-brand text-6xl md:text-9xl font-semibold font-headline">
        RECAP
      </h1>
      <p className="text-brand text-lg md:text-2xl font-thin ml-1 md:ml-3">
        Web Developer Podcast
      </p>
    </div>
  </div>
)

export default Home
