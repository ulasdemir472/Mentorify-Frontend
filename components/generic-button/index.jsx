import { cn } from "@/lib/utils";
const Index = (props) => {
  return (
    <button
      type={props.type}
      onClick={()=>props.onClick()}
      className={cn(
        "flex items-center justify-center gap-x-1 py-2 px-3 rounded-md border border-1 border-gray-200 bg-indigo-600 text-sm text-white",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};

export default Index;
