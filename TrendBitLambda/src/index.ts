import axios from "axios";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

const COINGECKO_TRENDING_ENDPOINT =
  "https://api.coingecko.com/api/v3/search/trending";

async function getTrendingTickers(): Promise<string[]> {
  try {
    const response = await axios.get(COINGECKO_TRENDING_ENDPOINT, {
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": process.env.COIN_GECKO_API_KEY,
      },
    });
    const trendingList = response.data.coins.map(
      (coin: { item: { symbol: string } }) => coin.item.symbol.toUpperCase(),
    );
    return trendingList;
  } catch (error: any) {
    console.error(
      "Error fetching CoinGecko trending tickers:",
      error.response?.data || error.message,
    );
    throw error; // rethrow the error to handle it in the upper scope
  }
}

// Execute a trade (placeholder function)
async function executeTrade(ticker: string) {
  console.log(`Executing trade for ${ticker}`);
  // Implement trading logic here
}

// Lambda handler
export const handler = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    const trendingTickers = await getTrendingTickers();
    for (const ticker of trendingTickers) {
      await executeTrade(ticker);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Trading operations completed successfully.",
      }),
    };
  } catch (error) {
    console.error("Error during trading operations:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error during trading operations" }),
    };
  }
};
