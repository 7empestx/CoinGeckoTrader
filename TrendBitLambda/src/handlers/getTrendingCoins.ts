import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const db = new AWS.DynamoDB.DocumentClient();

// Function to fetch trending coins from DynamoDB
export const getTrendingCoinsHandler = async (): Promise<any> => {
  const params = {
    TableName: "TrendingCoinsTableV2",
  };

  try {
    const result = await db.scan(params).promise();
    // Sorting the results by 'count' in descending order
    const sortedItems = result.Items.sort((a, b) => a.count - b.count);
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Successfully fetched trending coins data",
        coins: sortedItems,
      }),
    };
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error("Error fetching coin data:", errorMessage);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Failed to fetch trending coins",
        error: errorMessage,
      }),
    };
  }
};
