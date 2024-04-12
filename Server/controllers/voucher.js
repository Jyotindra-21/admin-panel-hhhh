const {
  AddVoucherSchema,
  UpdateVoucherSectionSchema,
} = require("../schemas/voucher");
const {
  ViewAllDetails,
  InsertDetails,
  doesExists,
  DeleteById,
  UpdateDetailsById,
} = require("../utils/operations");

exports.AddVoucherSection = async (req, res, next) => {
  try {
    const VoucherDetails = req.body;
    const validatedFields = AddVoucherSchema.safeParse(VoucherDetails);
    if (!validatedFields.success)
      return res.status(400).json({ error: "Invalid fields" });
    const titleExists = await doesExists(
      "voucher_section",
      "id",
      "title",
      validatedFields.data.title
    );
    if (titleExists)
      return res
        .status(409)
        .json({ error: "Voucher with same title already exists" });

    await InsertDetails("voucher_section", validatedFields.data);
    return res.json({ success: "Voucher section added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.DeleteVoucherSection = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Id is required" });
    if (isNaN(id) || id < 0)
      return res.status(400).json({ error: "Id must be a positive integer" });

    const idExists = await doesExists("voucher_section", "id", "id", id);
    if (!idExists) return res.status(400).json({ error: `Invalid id ${id}` });

    await DeleteById("voucher_section", id);

    return res.json({ success: "Voucher section deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.UpdateVoucherSection = async (req, res, next) => {
  try {
    const VoucherDetails = req.body;
    const validatedFields = UpdateVoucherSectionSchema.safeParse(VoucherDetails);
    if (!validatedFields.success) {
      const errorMessage = validatedFields.error.errors[0].message;
      return res.status(400).json({ error: errorMessage });
    }

    const idExists = await doesExists(
      "voucher_section",
      "id",
      "id",
      validatedFields.data.id
    );
    if (!idExists)
      return res.json({ error: `Voucher with id ${id} doesn't exist` });

    await UpdateDetailsById(
      "voucher_section",
      validatedFields.data,
      validatedFields.data.id
    );
    return res.json({ success: "Voucher successfully updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.ViewAllVoucherDetails = async (req, res, next) => {
  try {
    const voucherSection = await ViewAllDetails("voucher_section");
    return res.json(voucherSection);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
