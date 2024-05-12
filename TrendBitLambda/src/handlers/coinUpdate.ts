import AWS from "aws-sdk";
import axios from "axios";
AWS.config.update({ region: "us-east-1" });

const db = new AWS.DynamoDB.DocumentClient();
const COINGECKO_TRENDING_ENDPOINT =
  "https://api.coingecko.com/api/v3/search/trending";

const updateCoinData = async (coin: any): Promise<void> => {
  console.log("Updating coin data:", coin);
  const params = {
    TableName: "TrendingCoinsTableV2",
    Key: { id: coin.id },
    UpdateExpression:
      "SET #n = :name, #s = :symbol, #r = :rank, #c = if_not_exists(#c, :zero) + :inc",
    ExpressionAttributeNames: {
      "#n": "name",
      "#s": "symbol",
      "#r": "marketCapRank",
      "#c": "count",
    },
    ExpressionAttributeValues: {
      ":name": coin.name,
      ":symbol": coin.symbol,
      ":rank": coin.marketCapRank,
      ":zero": 0,
      ":inc": 1,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const response = await db.update(params).promise();
    console.log("Updated response:", response);
  } catch (error) {
    console.error("Error updating coin data:", error);
    throw error; // Re-throwing the error is good for catching it in the higher-level function
  }
};

async function fetchAndStoreTrendingTickers(): Promise<void> {
  const response = await axios.get(COINGECKO_TRENDING_ENDPOINT, {
    headers: {
      accept: "application/json",
      "x-cg-pro-api-key": process.env.COIN_GECKO_API_KEY,
    },
  });
  const coins = response.data.coins.map((coin: any) => ({
    id: coin.item.id,
    name: coin.item.name,
    symbol: coin.item.symbol,
    marketCapRank: coin.item.market_cap_rank,
  }));

  for (const coin of coins) {
    await updateCoinData(coin);
  }
}

export const coinUpdateHandler = async () => {
  try {
    await fetchAndStoreTrendingTickers();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully updated trending coins data",
      }),
    };
  } catch (error) {
    console.error("Failed to update coin data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to fetch and update trending coins",
      }),
    };
  }
};
