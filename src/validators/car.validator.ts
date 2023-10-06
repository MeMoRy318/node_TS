import joi from "joi";

class CarValidator {
  static model = joi.string();
  static year = joi.number();
  static producer = joi.string();

  static create = joi.object({
    model: this.model.required(),
    year: this.year.required(),
    producer: this.producer.required(),
  });

  static update = joi.object({
    model: this.model,
    year: this.year,
    producer: this.producer,
  });
}

export { CarValidator };
