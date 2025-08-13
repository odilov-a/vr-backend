const News = require("../models/News.js");

const getLanguageField = (lang, type) => {
  const fields = {
    title: { uz: "titleUz", ru: "titleRu", en: "titleEn" },
    description: {
      uz: "descriptionUz",
      ru: "descriptionRu",
      en: "descriptionEn",
    },
  };
  return fields[type]?.[lang];
};

const formatNews = (news, lang) => {
  const titleField = getLanguageField(lang, "title");
  const descriptionField = getLanguageField(lang, "description");
  return {
    _id: news._id,
    title: news[titleField],
    titleEn: news.titleEn,
    titleRu: news.titleRu,
    titleUz: news.titleUz,
    description: news[descriptionField],
    descriptionEn: news.descriptionEn,
    descriptionRu: news.descriptionRu,
    descriptionUz: news.descriptionUz,
    price: news.price,
    photoUrls: news.photoUrls,
  };
};

exports.getAllNews = async (req, res) => {
  try {
    const { lang } = req.query;
    const newss = await News.find({ isDeleted: false });
    const result = newss.map((news) => formatNews(news, lang));
    return res.json({ data: result.reverse() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id, { isDeleted: false });
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json({ data: formatNews(news, req.query.lang) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    return res.status(201).json({ data: news });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!news || news.isDeleted) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json({ data: news });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json({ message: "News deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
