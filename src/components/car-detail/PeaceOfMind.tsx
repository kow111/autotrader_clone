import {
  FileText,
  ShieldCheck,
  PenTool,
  TriangleAlert,
  Check,
} from "lucide-react";

export const PeaceOfMind: React.FC = () => {
  return (
    <div className="mt-12 bg-[#f4f8fb] py-8 border-t border-gray-100">
      <div className="max-w-350 mx-auto">
        <h2 className="text-3xl font-bold text-[#002b5e] mb-6">
          Have peace of mind when you buy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 bg-[#f4f8fb] rounded-full flex items-center justify-center mb-6">
              <FileText
                className="text-[#004685]"
                size={24}
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-lg font-bold text-[#002b5e] mb-4">
              Vehicle History Report
            </h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <TriangleAlert
                  size={20}
                  className="text-gray-500 shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <span className="text-[#333] text-[15px]">
                  Accident or Damage Reported
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check
                  size={20}
                  className="text-gray-500 shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <span className="text-[#333] text-[15px]">Single Owner</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 bg-[#f4f8fb] rounded-full flex items-center justify-center mb-6">
              <ShieldCheck
                className="text-[#004685]"
                size={24}
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-lg font-bold text-[#002b5e] mb-4">
              Factory Warranty
            </h3>

            <p className="text-[#333] text-[15px] mb-2 leading-relaxed">
              Factory warranty for 3 years/36,000 miles from the...
            </p>
            <button className="text-[#004685] font-medium text-[15px] hover:underline text-left mt-auto">
              View details
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 bg-[#f4f8fb] rounded-full flex items-center justify-center mb-6">
              <PenTool className="text-[#004685]" size={24} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-[#002b5e] mb-4">
              Optional Add-On Protections
            </h3>

            <ul className="space-y-2 mb-6 text-[#333] text-[15px]">
              <li>GAP Protection</li>
              <li>Lifetime Powertrain</li>
              <li>Tires and Wheels</li>
              <li>Paint Protection</li>
            </ul>

            <button className="text-[#004685] font-medium text-[15px] hover:underline text-left mt-auto">
              Explore vehicle protection options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
