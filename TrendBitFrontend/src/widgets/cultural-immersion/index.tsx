import React from "react";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";
import Box from "@cloudscape-design/components/box";
import { isVisualRefresh } from "./../../common/apply-mode";
import { WidgetConfig } from "../interfaces";

export const culturalImmersion: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: "table",
    title: "CulturalImmersion",
    description: "Cultural Immersion",
    disableContentPaddings: !isVisualRefresh,
    header: CulturalImmersionHeader,
    content: CulturalImmersion,
    footer: CulturalImmersionFooter,
  },
};

function CulturalImmersionHeader() {
  return <Header>Cultural Immersion</Header>;
}

function CulturalImmersionFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View More
      </Link>
    </Box>
  );
}

export default function CulturalImmersion() {}
