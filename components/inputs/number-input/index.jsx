const NumberInput = (props) => {
  const { name, label, formik, id, placeholder, value } = props;
  return (
    <div className="w-full ">
      <label
        htmlFor="name"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="number"
          name={name}
          id={id}
          onWheel={(e) => e.currentTarget.blur()}
          onChange={formik.handleChange}
          value={formik.values[name] || value}
          className="block hide-number-arrows w-full pl-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default NumberInput;
