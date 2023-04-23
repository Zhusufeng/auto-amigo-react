import { Table } from "antd";

const columns = [
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "previousMileage",
    dataIndex: "previousMileage",
    key: "previousMileage",
  },
  {
    title: "currentMileage",
    dataIndex: "currentMileage",
    key: "currentMileage",
  },
  { title: "milesDriven", dataIndex: "milesDriven", key: "milesDriven" },
  { title: "gallons", dataIndex: "gallons", key: "gallons" },
  { title: "mpg", dataIndex: "mpg", key: "mpg" },
  {
    title: "pricePerGallon",
    dataIndex: "pricePerGallon",
    key: "pricePerGallon",
  },
  { title: "totalSpent", dataIndex: "totalSpent", key: "totalSpent" },
];

type Props = {
  data: GasEntry[];
};

type GasEntry = {
  userId: number;
  previousMileage: number;
  currentMileage: number;
  gallons: number;
  pricePerGallon: number;
  updatedAt: string;
  createdAt: string;
};

const GasTable = (props: Props) => {
  const { data } = props;

  const tableData = data.map(entry => {
    const { previousMileage, currentMileage, gallons, pricePerGallon } = entry;
    const milesDriven = currentMileage - previousMileage;
    const mpg = (milesDriven / gallons).toFixed(2);
    const totalSpent = (gallons * pricePerGallon).toFixed(2);
    return { ...entry, milesDriven, mpg, totalSpent };
  });

  return (
    <div>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default GasTable;
