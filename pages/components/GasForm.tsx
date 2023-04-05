import { FormEvent, useState } from "react";
import axios from "axios";

export default function GasForm() {
  const [previousMileage, setPreviousMileage] = useState<string>("");
  const [currentMileage, setCurrentMileage] = useState<string>("");
  const [gallons, setGallons] = useState<string>("");
  const [pricePerGallon, setPricePerGallon] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("api/gas", {
      userId: 1,
      previousMileage,
      currentMileage,
      gallons,
      pricePerGallon,
    });
    setPreviousMileage("");
    setCurrentMileage("");
    setGallons("");
    setPricePerGallon("");
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <div>
        <div>
          <label htmlFor="previousMileage">Previous Mileage</label>
          <input
            type="text"
            name="previousMileage"
            required
            value={previousMileage}
            onChange={e => setPreviousMileage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="currentMileage">Current Mileage</label>
          <input
            type="text"
            name="currentMileage"
            required
            value={currentMileage}
            onChange={e => setCurrentMileage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gallons">Gallons</label>
          <input
            type="text"
            name="gallons"
            required
            value={gallons}
            onChange={e => setGallons(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pricePerGallon">Price Per Gallon</label>
          <input
            type="text"
            name="pricePerGallon"
            required
            value={pricePerGallon}
            onChange={e => setPricePerGallon(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </div>
    </form>
  );
}
