import React from "react";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";
import Box from "@cloudscape-design/components/box";
import { isVisualRefresh } from "./../../common/apply-mode";
import { WidgetConfig } from "../interfaces";

export const adaptiveFeedback: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: "table",
    title: "AdaptiveFeedback",
    description: "Adaptive Feedback",
    disableContentPaddings: !isVisualRefresh,
    header: AdaptiveFeedbackHeader,
    content: AdaptiveFeedback,
    footer: AdaptiveFeedbackFooter,
  },
};

function AdaptiveFeedbackHeader() {
  return <Header>Adaptive Feedback</Header>;
}

function AdaptiveFeedbackFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View More
      </Link>
    </Box>
  );
}

export default function AdaptiveFeedback() {}
