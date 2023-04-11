import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
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
  const { data: session } = useSession();
  const [data, setData] = useState<GasEntry[]>([]);

  const getData = async () => {
    try {
      const response = await axios.get("/api/gas", {
        params: {
          userId: session?.user?.userId,
        },
      });
      const { data } = response;
      setData(data);
    } catch (error) {
      console.log("error", error);
    }
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
