// import logger from '../logger.js';
import City from '../models/City.js';
import { cityValidation } from '../validations/cityValidation.js';

export const cityService = {
  /* ⬇️ save new city - NOT DONE YET */
  async saveCity(cityData) {
    const { error } = cityValidation(cityData);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }
    const cityName = await City.findOne({
      name: cityData.name,
    });
    if (cityName)
      return {
        status: 400,
        message: 'City already exists!',
      };

    const city = new City({
      name: cityData.name,
      value: cityData.value,
    });

    try {
      await city.save();
      return {
        status: 200,
        message: 'City saved',
      };
    } catch (err) {
      next(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },
};
