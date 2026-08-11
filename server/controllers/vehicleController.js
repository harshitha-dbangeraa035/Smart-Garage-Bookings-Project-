import Vehicle from "../models/Vehicle.js";

// @desc Add Vehicle
// @route POST /api/vehicles
// @access Private

export const addVehicle = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      registrationNumber,
      fuelType,
      transmission,
      mileage,
      color,
    } = req.body;

    // Validation
    if (
      !brand ||
      !model ||
      !year ||
      !registrationNumber ||
      !fuelType ||
      !transmission
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check duplicate registration number
    const vehicleExists = await Vehicle.findOne({
      registrationNumber,
    });

    if (vehicleExists) {
      return res.status(400).json({
        success: false,
        message: "Vehicle already exists",
      });
    }

    // Create vehicle
    const vehicle = await Vehicle.create({
      owner: req.user._id,
      brand,
      model,
      year,
      registrationNumber,
      fuelType,
      transmission,
      mileage,
      color,
    });

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      vehicle,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc Get Logged-in User Vehicles
// @route GET /api/vehicles
// @access Private

export const getMyVehicles = async (req, res) => {
  try {

    const vehicles = await Vehicle.find({
      owner: req.user._id,
    });

    res.status(200).json({
      success: true,
      count: vehicles.length,
      vehicles,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// @desc Get Single Vehicle
// @route GET /api/vehicles/:id
// @access Private

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Only owner can view
    if (vehicle.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      vehicle,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc Update Vehicle
// @route PUT /api/vehicles/:id
// @access Private

export const updateVehicle = async (req, res) => {
  try {

    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (vehicle.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};

// @desc Delete Vehicle
// @route DELETE /api/vehicles/:id
// @access Private

export const deleteVehicle = async (req, res) => {
  try {

    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (vehicle.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await vehicle.deleteOne();

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};