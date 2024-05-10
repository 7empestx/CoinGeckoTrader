import React from "react";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";
import Box from "@cloudscape-design/components/box";
import { isVisualRefresh } from "./../../common/apply-mode";
import { WidgetConfig } from "../interfaces";

export const interactiveExercises: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: "table",
    title: "InteractiveExercises",
    description: "Interactive Exercises",
    disableContentPaddings: !isVisualRefresh,
    header: InteractiveExercisesHeader,
    content: InteractiveExercises,
    footer: InteractiveExercisesFooter,
  },
};

function InteractiveExercisesHeader() {
  return <Header>Interactive Exercises</Header>;
}

function InteractiveExercisesFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View More
      </Link>
    </Box>
  );
}

export default function InteractiveExercises() {}
