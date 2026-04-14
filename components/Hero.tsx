export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black pt-16">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-transparent"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-8">
            <span className="px-4 py-2 border border-amber-400/50 text-amber-400 text-xs font-light tracking-wider rounded-full bg-amber-400/5">
              PREMIUM EVENTS COLLECTIVE
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-6 leading-tight">
            Discover Extraordinary
            <br />
            <span className="text-amber-400">Experiences</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl font-light text-gray-400 mb-12 max-w-2xl mx-auto">
            From world-class festivals to exclusive performances. Flights, accommodations, and premium concierge services included.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-4 bg-amber-400 text-black font-light hover:bg-amber-500 transition text-lg">
              Explore Events
            </button>
            <button className="px-8 py-4 border border-amber-400 text-amber-400 font-light hover:bg-amber-400/10 transition text-lg">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-24">
            <div>
              <p className="text-3xl font-light text-amber-400 mb-2">50+</p>
              <p className="text-sm text-gray-500 font-light">Premium Events</p>
            </div>
            <div>
              <p className="text-3xl font-light text-amber-400 mb-2">150+</p>
              <p className="text-sm text-gray-500 font-light">Destinations</p>
            </div>
            <div>
              <p className="text-3xl font-light text-amber-400 mb-2">10K+</p>
              <p className="text-sm text-gray-500 font-light">Happy Travelers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
