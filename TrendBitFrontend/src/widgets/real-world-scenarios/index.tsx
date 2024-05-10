import React from "react";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";
import Box from "@cloudscape-design/components/box";
import { isVisualRefresh } from "./../../common/apply-mode";
import { WidgetConfig } from "../interfaces";

export const realWorldScenarios: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: "table",
    title: "RealWorldScenarios",
    description: "Real World Scenarios",
    disableContentPaddings: !isVisualRefresh,
    header: RealWorldScenariosHeader,
    content: RealWorldScenarios,
    footer: RealWorldScenariosFooter,
  },
};

function RealWorldScenariosHeader() {
  return <Header>Real World Scenarios</Header>;
}

function RealWorldScenariosFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View More
      </Link>
    </Box>
  );
}

export default function RealWorldScenarios() {}
