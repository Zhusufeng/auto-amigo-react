import { useState, useEffect } from "react";
import axios from "axios";

type GasEntry = {
  userId: number;
  previousMileage: number;
  currentMileage: number;
  gallons: number;
  pricePerGallon: number;
  updatedAt: string;
  createdAt: string;
};

export default function GasTable() {
  const [data, setData] = useState<GasEntry[]>([]);

  const getData = async () => {
    const response = await axios.get("/api/gas");
    const { data } = await response;
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
    <div>
      <table>
        <thead>
          <tr>
            <td>Date</td>
            <td>Previous Mileage</td>
            <td>Current Mileage</td>
            <td>Miles Driven</td>
            <td>Gallons</td>
            <td>MPG</td>
            <td>Price per Gallon</td>
            <td>Total Spent</td>
          </tr>
        </thead>
        <tbody>
          {data.map(entry => {
            const {
              createdAt,
              previousMileage,
              currentMileage,
              gallons,
              pricePerGallon,
            } = entry;
            const milesDriven = currentMileage - previousMileage;
            const mpg = (milesDriven / gallons).toFixed(2);
            const totalSpent = gallons * pricePerGallon;
            return (
              <tr key={createdAt}>
                <td>{createdAt}</td>
                <td>{previousMileage}</td>
                <td>{currentMileage}</td>
                <td>{milesDriven}</td>
                <td>{gallons}</td>
                <td>{mpg}</td>
                <td>{pricePerGallon}</td>
                <td>{totalSpent}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
