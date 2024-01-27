import { PhotoIcon } from "@heroicons/react/20/solid";

const Index = (props) => {
  const { formik, label, name, fileTypeMessage } = props;

  const fileReader = (uploadedPhoto) => {
    return new Promise((resolve) => {
      const file = uploadedPhoto;
      let previewImage = null;

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          previewImage = reader.result;
          resolve({
            file: file,
            previewImage: previewImage,
          });
        };
        reader.readAsDataURL(file);
      } else {
        resolve({
          file: null,
          previewImage: null,
        });
      }
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileReader(file).then((fileData) => {
      console.log(fileData);
      console.log(fileData.previewImage);
      console.log(fileData.file.name);
      //formik.setFieldValue(name, fileData.previewImage);
    });
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10">
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-lightGreen underline underline-offset-2 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>{"Upload a photo"}</span>
              <input
                id="file-upload"
                name="file-upload"
                onChange={handleFileChange}
                value={formik.values[name]}
                type="file"
                className="sr-only"
              />
            </label>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            {fileTypeMessage} up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
