const Index = (props) => {
  const { name, label, message, formik, id, placeholder, value } = props;
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          name={name}
          id={id}
          onChange={formik.handleChange}
          value={formik.values[name] || value}
          className="block w-full pl-3 h-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
          placeholder={placeholder || ""}
        />
        {message && (
          <span className="text-sm text-gray-400 leading-5 font-normal">
            {message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Index;
