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

export default function GasTable(props: Props) {
  const { data } = props;
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
            const totalSpent = (gallons * pricePerGallon).toFixed(2);
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
