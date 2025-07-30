const Organ = require("../models/Organ.js");

const getLanguageField = (lang, type) => {
  const fields = {
    name: { uz: "nameUz", ru: "nameRu", en: "nameEn" },
    description: {
      uz: "descriptionUz",
      ru: "descriptionRu",
      en: "descriptionEn",
    },
  };
  return fields[type]?.[lang];
};

const formatOrgan = (organ, lang, req) => {
  const nameField = getLanguageField(lang, "name");
  const descriptionField = getLanguageField(lang, "description");

  return {
    _id: organ._id,
    name: organ[nameField],
    nameEn: organ.nameEn,
    nameRu: organ.nameRu,
    nameUz: organ.nameUz,
    description: organ[descriptionField],
    descriptionEn: organ.descriptionEn,
    descriptionRu: organ.descriptionRu,
    descriptionUz: organ.descriptionUz,
    model: organ.model,
  };
};

exports.getAllOrgans = async (req, res) => {
  try {
    const { lang } = req.query;
    const organs = await Organ.find({ isDeleted: false });
    const result = organs.map((organ) => formatOrgan(organ, lang, req));
    return res.json({ data: result.reverse() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getOrganById = async (req, res) => {
  try {
    const organ = await Organ.findById(req.params.id, { isDeleted: false });
    if (!organ) {
      return res.status(404).json({ message: "Organ not found" });
    }
    return res.json({ data: formatOrgan(organ, req.query.lang, req) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createOrgan = async (req, res) => {
  try {
    const organ = await Organ.create(req.body);
    return res.status(201).json({ data: organ });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateOrgan = async (req, res) => {
  try {
    const organ = await Organ.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!organ || organ.isDeleted) {
      return res.status(404).json({ message: "Organ not found" });
    }
    return res.json({ data: organ });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteOrgan = async (req, res) => {
  try {
    const organ = await Organ.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!organ) {
      return res.status(404).json({ message: "Organ not found" });
    }
    return res.json({ message: "Organ deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
