import { useNavigate } from "react-router-dom";
import AdventureLogo from "../assets/images/Adventure.svg";
import DramaLogo from "../assets/images/Drama.svg";
import FictionLogo from "../assets/images/Fiction.svg";
import HistoryLogo from "../assets/images/History.svg";
import HumourLogo from "../assets/images/Humour.svg";
import PhilosophyLogo from "../assets/images/Philosophy.svg";
import PoliticsLogo from "../assets/images/Politics.svg";
import NextImage from "../assets/images/Next.svg";
import HeroBG from "../assets/images/Pattern.svg";

const categories = [
  { name: "FICTION", logo: FictionLogo },
  { name: "DRAMA", logo: DramaLogo },
  { name: "HUMOUR", logo: HumourLogo },
  { name: "POLITICS", logo: PoliticsLogo },
  { name: "PHILOSOPHY", logo: PhilosophyLogo },
  { name: "HISTORY", logo: HistoryLogo },
  { name: "ADVENTURE", logo: AdventureLogo },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-[var(--white-color)]">
      <div
        className="w-full h-52 md:h-64 flex flex-col items-center justify-center px-4 text-left bg-cover"
        style={{ backgroundImage: `url(${HeroBG})` }}
      >
        <div className="max-w-screen-lg mx-auto">
          <h1 className="h1-font text-[var(--blue-color)]">
            Gutenberg Project
          </h1>
          <p className="body-font text-dark-grey max-w-lg mt-2 px-4">
            A social cataloging website that allows you to freely search its
            database of books, annotations, and reviews.
          </p>
        </div>
      </div>

      <div className="max-w-screen-lg w-full mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {categories.map(({ name, logo }) => (
            <button
              key={name}
              className="flex items-center justify-between px-4 h-14 bg-white rounded-[8px] shadow-sm hover:shadow-md transition-all cursor-pointer"
              style={{ boxShadow: "0 2px 5px 0 rgba(211, 209, 238, 0.5)" }}
              onClick={() => navigate(`/books/${name.toLowerCase()}`)}
            >
              <span className="flex items-center gap-3">
                <img src={logo} alt={`${name} logo`} className="h-6 w-6" />
                <span className="text-lg font-semibold text-dark-grey">
                  {name}
                </span>
              </span>
              <span>
                <img src={NextImage} alt="next" className="h-5 w-5" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
