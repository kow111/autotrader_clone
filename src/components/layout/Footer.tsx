import { Link } from "react-router-dom";

// Component phụ để vẽ Icon "Mở sang tab mới" (External Link)
const ExternalLinkIcon = () => (
  <svg
    className="w-3.5 h-3.5 inline-block ml-1.5 text-blue-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-4 border-[#f06c00] pt-12 pb-20 mt-auto">
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block"></div>

          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-[15px]">
                Shop for a Car
              </h3>
              <ul className="space-y-3 text-[14px] text-[#004685]">
                <li>
                  <Link to="/used-cars" className="hover:underline">
                    Used Cars For Sale
                  </Link>
                </li>
                <li>
                  <Link to="/certified-cars" className="hover:underline">
                    Certified Cars
                  </Link>
                </li>
                <li>
                  <Link to="/car-deals" className="hover:underline">
                    Car Deals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-[15px]">
                Car Research
              </h3>
              <ul className="space-y-3 text-[14px] text-[#004685]">
                <li>
                  <a href="#" className="hover:underline flex items-center">
                    Trade-In Values and Car Pricing <ExternalLinkIcon />
                  </a>
                </li>
                <li>
                  <Link to="/subscription" className="hover:underline">
                    Car Subscription Services
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-[15px]">
              About Us
            </h3>
            <ul className="space-y-3 text-[14px] text-[#004685]">
              <li>
                <Link to="/company" className="hover:underline">
                  Company Information
                </Link>
              </li>
              <li>
                <Link to="/corporate" className="hover:underline">
                  Corporate Information
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:underline">
                  Jobs at Autotrader
                </Link>
              </li>
              <li>
                <Link to="/dealer" className="hover:underline">
                  Become an Autotrader Dealer
                </Link>
              </li>
              <li>
                <Link to="/press" className="hover:underline">
                  Press Room
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:underline">
                  Site Map
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About Autotrader
                </Link>
              </li>
              <li>
                <Link to="/privacy-do-not-sell" className="hover:underline">
                  Do Not Sell or Share My Personal Information
                </Link>
              </li>
              <li>
                <Link to="/privacy-limit" className="hover:underline">
                  Limit the Use of My Sensitive Personal Information
                </Link>
              </li>
              <li>
                <Link to="/fraud-awareness" className="hover:underline">
                  Fraud Awareness
                </Link>
              </li>
              <li>
                <button className="hover:underline cursor-pointer">
                  Manage Cookies
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-[15px]">
              Autotrader Affiliates
            </h3>
            <ul className="space-y-3 text-[14px] text-[#004685]">
              <li>
                <a
                  href="#"
                  className="hover:underline inline-flex items-center"
                >
                  Classic Cars & Trucks for Sale <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline inline-flex items-center"
                >
                  Motorcycles for Sale <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline inline-flex items-center"
                >
                  RVs for Sale <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline inline-flex items-center"
                >
                  Cars for Bad Credit Buyers <ExternalLinkIcon />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline inline-flex items-center"
                >
                  Find Cars for Sale in Australia <ExternalLinkIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
