const handleFileChange = (uploadedPhoto) => {
  return new Promise((resolve) => {
    const file = uploadedPhoto;
    let previewImage = null;

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        previewImage = typeof reader.result === "string" ? reader.result : "";
        resolve({
          file,
          previewImage,
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
export default handleFileChange;
