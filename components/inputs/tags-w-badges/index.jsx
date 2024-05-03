import { useEffect, useState } from "react";

const Badge = ({ children, badges, setBadges }) => {
  const handleRemove = (e) => {
    e.preventDefault();
    setBadges(badges.filter((badge) => badge !== children));
  };

  return (
    <div className="py-2 flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-x-0.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        {children}
        <button
          type="button"
          className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-blue-600/20"
          onClick={handleRemove}
        >
          <span className="sr-only">Remove</span>
          <svg
            viewBox="0 0 14 14"
            className="h-3.5 w-3.5 stroke-blue-700/50 group-hover:stroke-blue-700/75"
          >
            <path d="M4 4l6 6m0-6l-6 6" />
          </svg>
          <span className="absolute -inset-1" />
        </button>
      </span>
    </div>
  );
};

export default function TagsWithBadges({
  name,
  formik,
  label,
  placeholder,
  initvalue,
}) {
  const [tags, setTags] = useState(initvalue || []);

  useEffect(() => {
    formik.values[name] = tags;
  }, [tags]);

  useEffect(() => {
    setTags(initvalue !== undefined ? initvalue : []);
  }, [initvalue]);

  const handleRemoveTag = (tags) => {
    setTags(tags);
  };

  return (
    <div className="mb-4 w-full">
      <label
        htmlFor="website"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          id="tags"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setTags([...tags, e.target.value]);
              e.target.value = "";
            }
          }}
          className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      </div>
      <div className="flex items-center justify-start gap-8 flex-wrap my-2">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <Badge
              badges={tags}
              setBadges={handleRemoveTag}
              key={index + "-badge"}
            >
              {tag}
            </Badge>
          ))
        ) : (
          <p className="text-xs">No Tags</p>
        )}
      </div>
    </div>
  );
}
