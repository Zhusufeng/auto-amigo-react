import { Table } from "antd";

const columns = [
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Previous Mileage",
    dataIndex: "previousMileage",
    key: "previousMileage",
  },
  {
    title: "Current Mileage",
    dataIndex: "currentMileage",
    key: "currentMileage",
  },
  { title: "Miles Driven", dataIndex: "milesDriven", key: "milesDriven" },
  { title: "Gallons", dataIndex: "gallons", key: "gallons" },
  { title: "MPG", dataIndex: "mpg", key: "mpg" },
  {
    title: "Price Per Gallon",
    dataIndex: "pricePerGallon",
    key: "pricePerGallon",
  },
  { title: "Total Spent", dataIndex: "totalSpent", key: "totalSpent" },
  {
    title: "Edit",
    render: () => {
      return <a>Edit</a>;
    },
  },
  {
    title: "Delete",
    render: () => {
      return <a>Delete</a>;
    },
  },
];

type Props = {
  data: GasEntry[];
};

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

const GasTable = (props: Props) => {
  const { data } = props;

  const tableData = data.map(entry => {
    const { id, previousMileage, currentMileage, gallons, pricePerGallon } =
      entry;
    const key = id;
    const milesDriven = currentMileage - previousMileage;
    const mpg = (milesDriven / gallons).toFixed(2);
    const totalSpent = (gallons * pricePerGallon).toFixed(2);
    return { ...entry, key, milesDriven, mpg, totalSpent };
  });

  return (
    <div>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default GasTable;
