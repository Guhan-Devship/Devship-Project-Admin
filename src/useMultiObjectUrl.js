import { useState, useEffect } from "react";

export function useMultiObjectUrl(initialObject = null) {
  const [objectURL, setObjectURL] = useState([null]);
  const [object, setObject] = useState(initialObject);
  console.log(object);

  useEffect(() => {
    if (!object) return;
    let array = [];
    for (let i = 0; i < object[0].length; i++) {
      const objectURL = URL.createObjectURL(object[0][i]);
      console.log(objectURL);
      array.push(objectURL);
    }
    setObjectURL(array);

    return () => {
      URL.revokeObjectURL(objectURL);
      setObjectURL(null);
    };
  }, [object]);

  return {
    objectURL,
    object,
    setObject,
  };
}
