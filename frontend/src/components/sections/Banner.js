import { HiOutlineArrowDown } from "react-icons/hi";
import { IoArrowDownCircleOutline } from "react-icons/io5";

const Banner = () => {
    return (
        <div className="w-full h-screen flex flex-col">
            {/* באנר שמתאים לתמונה */}
            <div className="relative w-full overflow-hidden shadow-lg">
                <picture>
                    {/* תמונה לדסקטופ */}
                    <source
                        media="(min-width: 768px)"
                        srcSet="/images/banner-narrower.jpg"
                    />
                    {/* תמונה למובייל */}
                    <img
                        src="/images/logo.jpg"
                        alt="באנר ראשי"
                        className="w-full h-auto"
                    />
                </picture>
            </div>
            <div className="flex-1 flex items-center justify-end px-8 md:px-16">
                <HiOutlineArrowDown
                    className="animate-bounce text-4xl text-haskurit-gray mx-auto cursor-pointer"
                    onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                />
            </div>
        </div>
    );
}

export default Banner;