import { ECurrency } from "../enums";
import { ICar } from "../interfaces";
import { privateBankService } from "../services";

class CarPresenter {
  public async present(data: ICar): Promise<Partial<ICar>> {
    const exchangeRates = await privateBankService.getExchangeRates();
    const currency = exchangeRates.find((value) => value.ccy === data.currency);
    let buy;
    if (currency?.buy) {
      buy = +currency.buy;
    } else {
      buy = 1;
    }
    return {
      currency: ECurrency.UAH,
      price: data.price * buy,
      producer: data.producer,
      year: data.year,
      _id: data._id,
      _userId: data._userId,
      model: data.model,
    };
  }
}

const carPresenter = new CarPresenter();

export { carPresenter };
