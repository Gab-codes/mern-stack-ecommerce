const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    
    // Validate that the keyword is provided and is a non-empty string
    if (!keyword || typeof keyword !== "string" || !keyword.trim()) {
      return res.status(400).json({
        success: false,
        message: "Keyword is required and must be a valid non-empty string.",
      });
    }

    const regEx = new RegExp(keyword.trim(), "i"); // Using trim to remove unnecessary spaces
    
    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    // Optional: Adding pagination
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    // Searching for matching products and applying pagination
    const searchResults = await Product.find(createSearchQuery)
      .skip(skip)
      .limit(parseInt(limit));

    // Return the results in a paginated format
    res.status(200).json({
      success: true,
      data: searchResults,
      pagination: {
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit),
        totalResults: await Product.countDocuments(createSearchQuery), // Get total matching results
      },
    });
  } catch (error) {
    console.error("Error searching for products:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while searching for products.",
    });
  }
};

module.exports = { searchProducts };
