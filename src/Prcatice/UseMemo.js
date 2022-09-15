import React, { useCallback, useMemo, useState } from "react";

function UseMemo() {
  const [myState, setMyState] = useState(1);

  const calculate = useCallback((number) => {
    return number * 10;
  }, []);

  const memoizedNumber = useMemo(() => {
    return calculate(myState);
  }, [myState, calculate]);

  const handleClick = useCallback(() => {
    setMyState((prevState) => memoizedNumber);
  }, [memoizedNumber]);
  return (
    <>
      <div>myState: {myState}</div>
      <button onClick={handleClick}>Click</button>
    </>
  );
}

export default UseMemo;
