import React from "react";
import { HelpPanel, Header } from "@cloudscape-design/components";
import { ExternalLinkGroup, InfoLink, useHelpPanel } from "../commons";

export function DashboardMainInfo() {
  return (
    <HelpPanel
      header={<h2>Voz Amigo</h2>}
      footer={
        <ExternalLinkGroup
          items={[
            { href: "#", text: "" },
            { href: "#", text: "" },
            { href: "#", text: "" },
            { href: "#", text: "" },
            { href: "#", text: "" },
          ]}
        />
      }
    >
      <p>
        Revolutionize your Spanish learning journey with our innovative
        application designed to provide personalized and interactive language
        experiences. Leveraging advanced AI, the AI-Powered Language Learning
        Companion adapts to your learning pace, offering tailored lessons,
        real-world scenarios, and instant feedback to ensure effective and
        enjoyable learning. Embark on a seamless blend of technology and
        language education to achieve fluency faster and more efficiently.
      </p>
    </HelpPanel>
  );
}

export function DashboardHeader({ actions }: { actions: React.ReactNode }) {
  const loadHelpPanelContent = useHelpPanel();
  return (
    <Header
      variant="h1"
      info={
        <InfoLink
          onFollow={() => loadHelpPanelContent(<DashboardMainInfo />)}
        />
      }
      actions={actions}
    >
      Voz Amigo
    </Header>
  );
}
