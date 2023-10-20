import joi from "joi";

class QueryValidator {
  static page = joi.number();
  static limit = joi.number();
  static sortedBy = joi.string();

  static age = joi.any();

  static queryUsersPagination = joi.object({
    page: this.page.min(1),
    limit: this.limit.min(5).max(20),
    sortedBy: this.sortedBy,
    age: this.age,
  });

  static queryBasePagination = joi.object({
    page: this.page.min(1),
    limit: this.limit.min(5).max(20),
    sortedBy: this.sortedBy,
  });
}

export { QueryValidator };
