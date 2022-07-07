import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { themeChange } from "theme-change";

const test = () => {
  const [name, setName] = useLocalStorage("name", "");
  useEffect(() => {
    themeChange(false);
    setName("Bob");
  }, []);

  return (
    <div>
      <button className="btn btn-primary">Button</button>
      <select data-choose-theme>
        <option value="">Default</option>
        <option value="dark">Dark</option>
        <option value="cupcake">cupcake</option>
      </select>
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
