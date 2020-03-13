import axios from "axios";

const searchByDrinkName = async query => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/cocktails",
      params: {
        query: query
      }
    );

    await axios.get(
      "http://localhost:3000/api/v1/tracks", {
      params: {
        query: query
      }
    }
    await searchResults(response);
    return results;
  } catch (error) {
    return { message: error.response.data.errors };
  }
};

const searchResults = ({ drinks }) => {
  const results = {
    drinkss: response.data.drinks
  };
};

export { searchByDrinkName };
