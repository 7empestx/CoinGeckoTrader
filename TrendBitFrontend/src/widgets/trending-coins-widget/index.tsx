import React from "react";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";
import Box from "@cloudscape-design/components/box";
import { isVisualRefresh } from "./../../common/apply-mode";
import { WidgetConfig } from "../interfaces";
import Table from "@cloudscape-design/components/table";
import { useState, useEffect } from "react";
import body from "../../../../config/body.json";

export const trendingCoins: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: "table",
    title: "TrendingCoins",
    description: "Trending Coins",
    disableContentPaddings: !isVisualRefresh,
    header: TrendingCoinsHeader,
    content: TrendingCoins,
    footer: TrendingCoinsFooter,
  },
};

function TrendingCoinsHeader() {
  return <Header>Trending Coins</Header>;
}

function TrendingCoinsFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View More
      </Link>
    </Box>
  );
}

export default function TrendingCoins() {
  console.log(body);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await
          fetch('https://api.trendbit.grantstarkman.com/get-trending-coins', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        const data = await response.json();
        setCoins(data.coins);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Table
        items={coins}
        columnDefinitions={[
          { heading: "Name", cell: item => item.name },
          { heading: "Symbol", cell: item => item.symbol },
          { heading: "Market Cap Rank", cell: item => item.marketCapRank },
          { heading: "Count", cell: item => item.count }
        ]}
        variant="embedded"
      />
    </>
  );
}

