import React, { useCallback, useState } from "react";

function UseCallBack() {
  const [height, setHeight] = useState(100);
  const [age, setAge] = useState(3);

  const handleSetHeight = useCallback(() => setHeight(height + 10), [height]);
  const handleSetAge = useCallback(() => setAge(age + 1), [age]);
  return (
    <>
      <div>UseCallBack</div>
      <div>
        <p>Height: {height}</p>
        <button onClick={handleSetHeight}>Increase by 10</button>
      </div>
      <p>Age: {age}</p>
      <div>
        <button onClick={handleSetAge}>Increase by 1</button>
      </div>
    </>
  );
}

export default UseCallBack;
