import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

type Props = {
  getData: () => void;
};

export default function GasForm(props: Props) {
  const { getData } = props;
  const { data: session } = useSession();
  const [previousMileage, setPreviousMileage] = useState<string>("");
  const [currentMileage, setCurrentMileage] = useState<string>("");
  const [gallons, setGallons] = useState<string>("");
  const [pricePerGallon, setPricePerGallon] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("api/gas", {
      userId: session?.user?.userId,
      previousMileage,
      currentMileage,
      gallons,
      pricePerGallon,
    });
    setPreviousMileage("");
    setCurrentMileage("");
    setGallons("");
    setPricePerGallon("");
    await getData();
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
