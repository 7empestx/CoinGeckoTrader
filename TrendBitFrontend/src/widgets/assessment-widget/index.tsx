import React, { useState, useEffect } from "react";
import Header from "@cloudscape-design/components/header";
import Link from "@cloudscape-design/components/link";
import Box from "@cloudscape-design/components/box";
import { isVisualRefresh } from "./../../common/apply-mode";
import { WidgetConfig } from "../interfaces";
import Button from "@cloudscape-design/components/button";
import { getQuestionFromGemini } from "./../../api/api";

export const assessmentWidget: WidgetConfig = {
  definition: { defaultRowSpan: 3, defaultColumnSpan: 2 },
  data: {
    icon: "table",
    title: "AssessmentWidget",
    description: "Assessment Widget",
    disableContentPaddings: !isVisualRefresh,
    header: AssessmentWidgetHeader,
    content: AssessmentWidget,
    footer: AssessmentWidgetFooter,
  },
};

function AssessmentWidgetHeader() {
  return <Header>Assessment Widget</Header>;
}

function AssessmentWidgetFooter() {
  return (
    <Box textAlign="center">
      <Link href="#" variant="primary">
        View More
      </Link>
    </Box>
  );
}

export default function AssessmentWidget() {
  const [config, setConfig] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userResponses, setUserResponses] = useState([]);

  useEffect(() => {
    // Fetch the environment configuration dynamically
    fetch("/environment.json")
      .then((response) => response.json())
      .then((data) => {
        setConfig(data);
        console.log("Configuration loaded:", data);
      })
      .catch((error) => console.error("Failed to load configuration:", error));
  }, []);

  useEffect(() => {
    if (config) {
      fetchNextQuestion();
    }
  }, [config]); // This effect runs whenever the config changes

  const fetchNextQuestion = async () => {
    if (!config) return;

    let attempts = 0;
    const maxAttempts = 5; // Set a reasonable limit to avoid infinite loops

    while (attempts < maxAttempts) {
      attempts++;
      try {
        const response = await getQuestionFromGemini(
          {
            previousResponses: userResponses,
          },
          config,
        );
        console.log("Attempt", attempts, "Received data:", response);

        const data = response;

        const questionPattern =
          /Question:\s*(\*\*)?\s*(.+?)\s*(\*\*)?(?=\n[a-d])/s;
        const optionsPattern =
          /\b([a-d])\)\s+(\*\*)?\s*(.+?)\s*(\*\*)?(?=\n[a-d]|$)/g;

        const questionMatch = questionPattern.exec(data.message);
        const questionText = questionMatch
          ? questionMatch[2].trim()
          : "Couldn't parse the question.";

        const answerOptions = [];
        let match;
        while ((match = optionsPattern.exec(data.message)) !== null) {
          answerOptions.push({
            id: match[1],
            text: match[3].trim(),
          });
        }

        if (questionMatch && answerOptions.length > 0) {
          const questionData = {
            id: Date.now(),
            questionText,
            answerOptions,
            correctAnswerId: null,
          };

          setCurrentQuestion(questionData);
          return; // Exit the loop on successful parsing
        } else {
          console.error("Parsing failed, retrying...");
        }
      } catch (error) {
        console.error(
          "Attempt",
          attempts,
          "Failed to fetch or parse question:",
          error,
        );
        if (attempts >= maxAttempts) {
          setCurrentQuestion({
            questionText:
              "Error fetching or parsing question after multiple attempts. Please check the network or contact support.",
            answerOptions: [],
          });
          return; // Exit the loop after reaching the maximum number of attempts
        }
      }
    }
  };

  // Function to handle user's answer and fetch the next question
  const handleAnswer = (questionId, answerId) => {
    setUserResponses([...userResponses, { questionId, answerId }]);
    fetchNextQuestion();
  };

  const renderCurrentQuestion = () => {
    if (!currentQuestion) {
      return <p>Loading question...</p>;
    }

    console.log("Rendering answer options:", currentQuestion.answerOptions); // Debug: log options

    return (
      <div>
        <h2>{currentQuestion.questionText}</h2>
        {currentQuestion.answerOptions.map((answerOption, index) => (
          <Button
            onClick={() => handleAnswer(currentQuestion.id, answerOption.id)}
            key={answerOption.id + index} // Combine id with index to ensure uniqueness
          >
            {answerOption.text}
          </Button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    // Fetch the initial question
    fetchNextQuestion();
  }, []);

  return (
    <div>
      {/* Header */}
      <Header title="Welcome to Your Spanish Journey" />
      <p>Follow the instructions to complete your language level assessment.</p>

      {/* Assessment Area */}
      {renderCurrentQuestion()}

      {/* Footer */}
      <Box textAlign="center">
        <p>Thank you for participating in the assessment.</p>
      </Box>
    </div>
  );
}
