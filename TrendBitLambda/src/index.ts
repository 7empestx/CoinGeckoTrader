import middy from "@middy/core";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpRouterHandler from "@middy/http-router";
import { coinUpdateHandler } from "./handlers/coinUpdate";
import { getTrendingCoinsHandler } from "./handlers/getTrendingCoins";
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const routes = [
  {
    method: HttpMethod.POST,
    path: "/update-trending-coins",
    handler: coinUpdateHandler,
  },
  {
    method: HttpMethod.GET,
    path: "/get-trending-coins",
    handler: getTrendingCoinsHandler,
  },
];

const lambdaHandler = middy()
  .use(httpHeaderNormalizer())
  .handler(httpRouterHandler(routes));

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  // Check if the event is from EventBridge
  if (event.source === "aws.events") {
    event.httpMethod = "POST"; // Set the method expected by the router
    event.path = "/update-trending-coins"; // Direct the function to the correct route
  }

  return lambdaHandler(event, context);
};
