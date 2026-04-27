import type { Car } from "@/types/type";
import { formatMoney } from "@/utils/formatMoney";

interface RequestFormProps {
  car: Car;
}

const RequestForm = ({ car }: RequestFormProps) => {
  return (
    <>
      <div className="border border-gray-200 rounded-xs p-5 bg-white">
        <h3 className="text-xl font-bold  text-gray-900 mb-4">
          Got Questions? Contact the Dealer
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-[11px] text-gray-500 uppercase font-bold mb-1">
              Subject
            </label>
            <select className="w-full border border-gray-300 rounded-md p-3 text-[15px] outline-none focus:border-[#004685] bg-white">
              <option>This Vehicle's Availability</option>
              <option>Schedule a Test Drive</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <div className="border border-gray-300 rounded-md p-2 ">
                <label className="block text-[11px] text-gray-500 uppercase font-bold">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full outline-none bg-transparent text-[15px] placeholder-gray-400 text-gray-900"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="border border-gray-300 rounded-md p-2 ">
                <label className="block text-[11px] text-gray-500 uppercase font-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full outline-none bg-transparent text-[15px] placeholder-gray-400 text-gray-900"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 border border-gray-300 rounded-md p-2">
              <label className="block text-[11px] text-gray-500 uppercase font-bold">
                Email
              </label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="w-full outline-none text-[15px] text-gray-900"
              />
            </div>
            <div className="flex-1 border border-gray-300 rounded-md p-2">
              <label className="block text-[11px] text-gray-500 uppercase font-bold">
                Phone (optional)
              </label>
              <input
                type="tel"
                placeholder="(123) 456-7890"
                className="w-full outline-none text-[15px] text-gray-900"
              />
            </div>
          </div>

          <div className="border border-gray-300 rounded-md p-2">
            <label className="block text-[11px] text-gray-500 uppercase font-bold">
              Message
            </label>
            <textarea
              rows={3}
              className="w-full outline-none text-[15px] text-gray-900 resize-none"
              defaultValue={`Is your ${car.condition} ${car.year} ${car.make} ${car.model} listed for ${formatMoney(car.price)} still available?`}
            ></textarea>
          </div>

          <p className="text-[11px] text-gray-500 leading-tight">
            By clicking "Request Info", you accept the terms of our{" "}
            <a href="#" className="text-[#004685] hover:underline">
              Visitor Agreement
            </a>
          </p>

          <button className="w-full bg-[#004685] hover:bg-[#003366] text-white font-bold py-3.5 rounded-md transition-colors text-lg">
            Request Info
          </button>
        </div>
      </div>
    </>
  );
};

export default RequestForm;
