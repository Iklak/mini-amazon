const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary");

// const createProduct = async (req, res) => {
//   try {
//     console.log(req.body);
//     console.log(req.file);
//     const { title, description, price, category, brand, stock } = req.body;

//     const imageUrl = req.file ? req.file.path : "";

//     const product = await Product.create({
//       title,
//       description,
//       price,
//       category,
//       brand,
//       stock,
//       images: [imageUrl],
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     console.log("========== ERROR ==========");
//     console.log(error);
//     console.log(error.message);

//     if (error.response) {
//       console.log(error.response.data);
//     }

//     console.log("===========================");

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

const createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, description, price, category, brand, stock } = req.body;

    const imageUrl = req.file ? req.file.path : "";

    console.log("Before Product.create");

    const product = await Product.create({
      title,
      description,
      price,
      category,
      brand,
      stock,
      images: [imageUrl],
    });

    console.log("After Product.create");
    console.log(product);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log("ERROR:");
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 5,
    } = req.query;

    const filter = {};

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }
    if (category) {
      filter.category = category;
    }
    if (brand) {
      filter.brand = brand;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(filter)
      .sort(sort || "-createdAt")
      .skip(skip)
      .limit(Number(limit));
    const totalProducts = await Product.countDocuments(filter);
    return res.status(200).json({
      success: true,
      totalProducts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / limit),

      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "internal server error`",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Validate updated data
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findByIdAndDelete(id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Product deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete image from Cloudinary
    if (product.images.length > 0) {
      const imageUrl = product.images[0];

      // Example URL:
      // https://res.cloudinary.com/.../mini-amazon/i7m8vpazqcsf4k8torkx.png

      const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];

      console.log("Deleting:", publicId);

      await cloudinary.uploader.destroy(publicId);
    }

    // Delete product from MongoDB
    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
module.exports = {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
