import joi from "joi";

class CarValidator {
  static model = joi.string().trim().min(3).max(25);
  static year = joi.number().min(2000).max(new Date().getFullYear());
  static producer = joi.string().trim().valid(["audi", "bmw", "opel"]);

  static create = joi.object({
    producer: this.producer.required(),
    model: this.model.required(),
    year: this.year.required(),
  });

  static update = joi.object({
    producer: this.producer,
    model: this.model,
    year: this.year,
  });
}

export { CarValidator };
