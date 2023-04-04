import { useState, useEffect } from "react";

export default function GasTable() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch("/api/gas");
    const data = await response.json();
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>GAS TABLE</div>;
}
