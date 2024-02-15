export function objectToFormData(obj) {
  const formData = new FormData();

  function appendFormData(data, parentKey = "") {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const propName = parentKey ? `${parentKey}[${key}]` : key;
        if (data[key] !== "" && typeof data[key] !== "undefined") {
          if (typeof data[key] === "object" && !(data[key] instanceof File)) {
            appendFormData(data[key], propName);
          } else {
            formData.append(propName, data[key]);
          }
        }
      }
    }
  }

  if (typeof obj === "object" && obj !== null) {
    appendFormData(obj);
  } else {
    throw new Error("Error");
  }

  return formData;
}
export default objectToFormData;
