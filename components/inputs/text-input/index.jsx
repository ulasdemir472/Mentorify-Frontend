import { cn } from "@/lib/utils";

const TextInput = (props) => {
  const { name, label, formik, id, placeholder, className } = props;

  return (
    <div className="w-full">
      <label
        htmlFor={id || label + "-nonIdd"}
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          id={id}
          onChange={formik.handleChange || props.onChange}
          value={formik.values[name] || props.value}
          className={cn(
            "block w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            className
          )}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextInput;
