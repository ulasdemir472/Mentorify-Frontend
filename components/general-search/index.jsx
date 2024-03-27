import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

const GeneralSearch = (props) => {
  const { className } = props;

  return (
    <div className={cn("relative", className)}>
      <MagnifyingGlassIcon
        className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-indigo-500"
        aria-hidden="true"
      />
      <input
        type="text"
        className="bg-transparent ml-1 border border-1 border-gray-300 h-10 w-full px-8 py-6 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg rounded-lg shadow-sm"
        placeholder="Search..."
      />
    </div>
  );
};

export default GeneralSearch;
