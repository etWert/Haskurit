const Hero = ({ onLogoClick }) => {
  return (
    <section className="bg-gradient-to-b from-haskurit-white to-haskurit-white min-h-screen flex items-center justify-center">
      <div className="text-center px-4 max-w-4xl mx-auto">
        <h1
          className="text-6xl md:text-8xl font-bold text-haskurit-yellow mb-8 hover:scale-105 transition-transform duration-200"
          onClick={onLogoClick}
          title="השכרת כלי עבודה מקצועיים"
        >
          השכורית
        </h1>
        <p className="text-xl md:text-2xl text-haskurit-gray mb-12 leading-relaxed">
          השכרת כלי עבודה מקצועיים לקבלנים ובעלי מלאכה
          <br />
          <span className="text-lg">כלים איכותיים • מחירים הוגנים • שירות מקצועי</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-haskurit-gray text-haskurit-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all duration-200 hover:shadow-lg"
            onClick={() => document.getElementById('tools').scrollIntoView({ behavior: 'smooth' })}
          >
            צפייה בכלים
          </button>
          <button
            className="border-2 border-haskurit-gray text-haskurit-gray px-8 py-4 rounded-lg text-lg font-semibold hover:bg-haskurit-gray hover:text-haskurit-white transition-all duration-200"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            צור קשר
          </button>
        </div>
        <div className="mt-16 animate-bounce">
          <svg
            className="w-6 h-6 mx-auto text-haskurit-gray"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero