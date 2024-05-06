import { cn } from "@/utils/utils";
const Index = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(
        "flex items-center justify-center gap-x-1 py-2 px-3 rounded-md border border-1 border-gray-200 bg-indigo-600 text-sm text-white",
        props.className,
        props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      )}
    >
      {props.children}
    </button>
  );
};

export default Index;
