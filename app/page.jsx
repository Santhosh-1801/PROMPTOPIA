import Feeds from "@components/Feeds"


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
        Explore and Share
        <br className="max-md:hidden"/>
          <span className="orange_gradient text-center">AI-powered prompts</span>
        </h1>
        <p className="desc text-center">
          Promptopia is an open-sourced AI prompting tool for modern world to discover,create and search for related prompts
        </p>
        <Feeds/>
    </section>
  )
}

export default Home