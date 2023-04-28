import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  // TODO Show error message if receive an error
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

  // TODO Show error message if receive an error
  const handleDelete = useMutation({
    mutationFn: (entry: GasEntry) => {
      try {
        return axios.delete("api/gas", {
          data: { gasId: entry.id },
        });
      } catch (mutationError) {
        throw mutationError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "gasLogData" });
    },
  });

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
