import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axios from "axios";
import GasTable from "./GasTable";
import GasForm from "./GasForm";

type GasEntry = {
  id: number;
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
  const { isLoading, error, data } = useQuery({
    queryKey: "gasLogData",
    queryFn: async () => {
      try {
        const response = await axios.get("/api/gas", {
          params: {
            userId: session?.user?.userId,
          },
        });
        return response.data;
      } catch (gasLogError) {
        throw gasLogError;
      }
    },
  });

  const handleEdit = (entry: GasEntry) => {
    console.log("edit", entry);
  };

  const handleDelete = async (entry: GasEntry) => {
    try {
      console.log("delete", entry);
      const response = await axios.delete("api/gas", {
        data: { gasId: entry.id },
      });
      console.log("response", response);
      // TODO Rerender page
    } catch (error) {
      // Placeholder
      console.log("error", error);
    }
  };

  if (isLoading) {
    return <div>LOADING</div>;
  }
  return (
    <>
      <GasForm />
      <GasTable
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
}
