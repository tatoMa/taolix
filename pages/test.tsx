import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const test = () => {
  const [name, setName] = useLocalStorage("name", "");
  useEffect(() => {
    setName("Bob");
  }, []);

  return (
    <div>
      <input
        className="mt-32"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default test;
