import React, { useState } from "react";
import WordDocumentCreator from "./WordDocumentCreator";
import ExperienceLetter from "./ExperienceLetter";
import AppreciationLetter from "./AppreciationLetter";
import ResignationLetter from "./ResignationLetter";
import TestimonalLetter from "./TestimonialLetter";
import "./TabPages.css"

function TabbedInterface() {
  // Define the tabs and their content
  const tabs = [
    { label: "Experience Letter", content: <ExperienceLetter/>},
    { label: "Apprectiaon Letter", content: <AppreciationLetter />},
    { label: "Resignation Letter", content: <ResignationLetter /> },
    { label: "Testimonial Letter", content: <TestimonalLetter />},
    { label: "Download Templates", content: <WordDocumentCreator />},
  ];

  // Define the state for the active tab
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Handle tab click events
  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  // Render the tabs and their content
  return (
    <div>
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab)}
            className={activeTab.label === tab.label ? "active btn btn-primary myfont" : "btn btn myfont" }
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{activeTab.content}</div>
    </div>
  );
}

export default TabbedInterface;