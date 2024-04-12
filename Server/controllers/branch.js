const { updateBranchSchema, addBranchSchema } = require("../schemas/branch");
const {
  doesExists,
  DeleteById,
  UpdateDetailsById,
  ViewAllDetails,
  InsertDetails,
} = require("../utils/operations");
// Branches section

exports.CreateBranch = async (req, res, next) => {
  try {
    const branchDetails = req.body;
    console.log(branchDetails);
    const validatedFields = addBranchSchema.safeParse(branchDetails);

    if (!validatedFields.success) {
      const errorMessage = validatedFields.error.errors[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    const exists = await doesExists(
      "branches",
      "id",
      "name",
      validatedFields.data.name
    );
    if (exists) return res.status(409).json({ error: "Branch already exists" });
    await InsertDetails("branches", branchDetails);
    return res.json({ success: "Branch added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.DeleteBranches = async (req, res, next) => {
  try {
    const branchesId = req.body;
    if (isNaN(branchesId.id) || branchesId.id < 0)
      return res.status(500).json({ error: "id must be a positive integer" });
    const isDeleted = await DeleteById("branches", branchesId.id);
    if (!isDeleted)
      return res
        .status(400)
        .json({ error: `Id ${branchesId.id} doesn't exist` });
    return res.json({ success: "Branch deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

exports.UpdateBranches = async (req, res, next) => {
  try {
    const branchDetails = req.body;

    const validatedFields = updateBranchSchema.safeParse(branchDetails);
    if (!validatedFields.success) {
      const errorMessage = validatedFields.error.errors[0].message;
      return res.status(400).json({ error: errorMessage });
    }

    const idExists = await doesExists(
      "branches",
      "id",
      "id",
      validatedFields.data.id
    );
    if (!idExists)
      return res
        .status(400)
        .json({ error: `Branch with id ${validatedFields.data.id} not found` });

    await UpdateDetailsById(
      "branches",
      validatedFields.data,
      validatedFields.data.id
    );

    return res.json({ success: "Branches Updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.ViewAllBranchDetails = async (req, res, next) => {
  try {
    const BranchDetails = await ViewAllDetails("branches");
    return res.json(BranchDetails);
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ error: error.message });
  }
};
