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
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Successfully fetched trending coins data",
        coins: result.Items,
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
