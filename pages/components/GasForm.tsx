export default function GasForm() {
  return (
    <form>
      <div>
        <div>
          <label htmlFor="previousMileage">Previous Mileage</label>
          <input type="text" name="previousMileage" required />
        </div>
        <div>
          <label htmlFor="currentMileage">Current Mileage</label>
          <input type="text" name="currentMileage" required />
        </div>
        <div>
          <label htmlFor="gallons">Gallons</label>
          <input type="text" name="gallons" required />
        </div>
        <div>
          <label htmlFor="pricePerGallon">Price Per Gallon</label>
          <input type="text" name="pricePerGallon" required />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </div>
    </form>
  );
}
