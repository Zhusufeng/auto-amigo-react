import { useState, useEffect } from "react";
import axios from "axios";
import GasTable from "./GasTable";
import GasForm from "./GasForm";

type GasEntry = {
  userId: number;
  previousMileage: number;
  currentMileage: number;
  gallons: number;
  pricePerGallon: number;
  updatedAt: string;
  createdAt: string;
};

export default function GasContainer() {
  const [data, setData] = useState<GasEntry[]>([]);

  const getData = async () => {
    const response = await axios.get("/api/gas");
    const { data } = response;
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return <div>LOADING</div>;
  }
  return (
    <>
      <GasForm getData={getData} />
      <GasTable data={data} />
    </>
  );
}
