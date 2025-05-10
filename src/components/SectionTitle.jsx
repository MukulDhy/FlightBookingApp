import { IoAirplaneSharp } from "react-icons/io5";
import { BsDashLg } from "react-icons/bs";
const SectionTitle = ({ sectionTitle }) => {
  return (
    <div className="mt-20 mb-6">
      <h2 className="text-3xl md:text-3xl dark:text-slate-600 lg:text-4xl font-bold mb-2">
        {sectionTitle}
      </h2>
      <span className="flex dark:text-cyan-100 items-center text-cyan-600 tracking-widest">
        <IoAirplaneSharp />
        <BsDashLg />
        <BsDashLg />
        <BsDashLg />
        <BsDashLg />
        <BsDashLg />
        <BsDashLg />
        <BsDashLg />
        <BsDashLg />
      </span>
    </div>
  );
};

export default SectionTitle;
