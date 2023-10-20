import joi from "joi";

class CarValidator {
  static brand = joi.string();
  static price = joi.number();
  static year = joi.number();

  static create = joi.object({
    brand: this.brand.required().messages({
      "any.required": "Brand is required.",
      "string.base": "Brand must be a string.",
    }),
    price: this.price.max(1000000).min(1000).messages({
      "number.base": "Price must be a number.",
      "number.min": "Price must be at least 1000.",
      "number.max": "Price cannot exceed 1000000.",
    }),
    year: this.year
      .max(new Date().getFullYear())
      .min(1999)
      .messages({
        "number.base": "Year must be a number.",
        "number.min": "Year must be at least 1999.",
        "number.max": `Year cannot exceed the current year (${new Date().getFullYear()}).`,
      }),
  });
}

export { CarValidator };
