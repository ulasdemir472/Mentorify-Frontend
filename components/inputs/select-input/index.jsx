import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Comboboxy(props) {
  const { formik, label } = props;
  const [options, setOptions] = useState([
    "Yazılım",
    "Mekatronik",
    "Hukuk",
    "Müzik",
    "Yemek",
    "Edebiyat",
    "Teknoloji",
    "Sanat",
    "Sağlık",
    "Spor",
    "Elektrik",
    "Makine",
    "Endüstri",
    "İnşaat",
    "Kimya",
    "Gıda",
    "Metalurji",
    "Malzeme",
    "Bilgisayar",
    "Biyomedikal",
    "Çevre",
    "İşletme",
    "Mimar",
  ]);
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    formik.values.category = selectedOption;
  }, [selectedOption]);

  const filtered =
    query === ""
      ? options
      : options.filter((option) => {
          return option.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      className="w-full"
      value={selectedOption}
      onChange={setSelectedOption}
    >
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </Combobox.Label>
      <div className="relative">
        <Combobox.Input
          className="w-full capitalize rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(option) => option}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filtered.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-44 overflow-y-auto w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filtered.map((option) => (
              <Combobox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate capitalize",
                        selected && "font-semibold"
                      )}
                    >
                      {option}
                    </span>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
