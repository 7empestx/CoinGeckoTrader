import middy from "@middy/core";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpRouterHandler from "@middy/http-router";
import { coinUpdateHandler } from "./handlers/coinUpdate";
import { getTrendingCoinsHandler } from "./handlers/getTrendingCoins";

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

export const handler = middy()
  .use(httpHeaderNormalizer())
  .handler(httpRouterHandler(routes));
