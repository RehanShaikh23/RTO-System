const readlineSync = require('readline-sync');

const records = {
  "ABC123": {
    name: "Toyota Camry",
    company: "Toyota",
    color: "Blue",
    insurance: "INS123",
    owner: "John Doe",
    type: "Sedan",
    details() {
      console.log(`This is a ${this.color} ${this.company} ${this.name}.`);
    }
  },
  "XYZ456": {
    name: "Honda Civic",
    company: "Honda",
    color: "Red",
    insurance: "INS456",
    owner: "Jane Smith",
    type: "Sedan",
    details() {
      console.log(`This is a ${this.color} ${this.company} ${this.name}.`);
    }
  }
};

function addVehicle() {
  const plate = readlineSync.question("Number Plate: ");
  if (records.hasOwnProperty(plate)) {
    console.log("Vehicle already exists!");
    return;
  }

  const fields = ["Name", "Company", "Color", "Insurance Number", "Owner", "Type"];
  const [name, company, color, insurance, owner, type] = fields.map(field =>
    readlineSync.question(`${field}: `)
  );

  records[plate] = {
    name,
    company,
    color,
    insurance,
    owner,
    type,
    details() {
      console.log(`This is a ${this.color} ${this.company} ${this.name}.`);
    }
  };

  console.log(`Vehicle with number plate ${plate} added successfully!`);
}

function checkVehicle() {
  const plate = readlineSync.question("Enter the number plate to check details: ");
  const vehicle = records[plate];

  if (vehicle) {
    console.log(`Details for the vehicle with number plate ${plate}:`, vehicle);
    vehicle.details();
  } else {
    console.log("Vehicle with this number plate does not exist in records.");
  }
}

function deletePlate() {
  const plate = readlineSync.question("Enter the number plate to delete: ");
  if (records.hasOwnProperty(plate)) {
    delete records[plate];
    console.log(`Vehicle with number plate ${plate} deleted successfully!`);
  } else {
    console.log("Vehicle with this number plate does not exist in records.");
  }
}

function updatePlate() {
  const plate = readlineSync.question("Enter number plate to update: ");
  if (!records.hasOwnProperty(plate)) {
    console.log("Vehicle not found.");
    return;
  }

  console.log("Current details:", records[plate]);

  const fields = ["Name", "Company", "Color", "Insurance Number", "Owner", "Type"];
  fields.forEach(field => {
    const newValue = readlineSync.question(`${field}: `);
    records[plate][field.toLowerCase()] = newValue;
  });

  console.log("Details updated successfully:", records[plate]);
}

function showAllVehicles() {
  const entries = Object.entries(records);
  if (entries.length === 0) {
    console.log("No vehicles to display.");
    return;
  }

  console.log("All vehicles:");
  entries.forEach(([plate, data]) => {
    console.log(`Plate: ${plate}`, data);
  });
}

const menu = [
  { label: 'Add Vehicle', action: addVehicle },
  { label: 'Check Vehicle Details', action: checkVehicle },
  { label: 'Delete Vehicle', action: deletePlate },
  { label: 'Update Vehicle Details', action: updatePlate },
  { label: 'Show All Vehicles', action: showAllVehicles },
  { label: 'Exit', action: () => { console.log("Exiting program."); process.exit(); } }
];

function start() {
  while (true) {
    console.log("\n--- Vehicle Records System ---");
    menu.forEach((option, index) => console.log(`${index + 1}. ${option.label}`));
    const choice = readlineSync.question("Your choice: ");
    const selected = menu[parseInt(choice) - 1];
    selected ? selected.action() : console.log("Invalid choice.");
  }
}

start();
