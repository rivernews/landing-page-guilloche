"use client";

import styles from "./page.module.css";
import Accordion from "./accordion";
import { pageData } from "./pageData";
import { useState } from "react";

const StickyHero = ({ heading, subheading }) => {
  return (
    <div className={styles.StickyHero}>
      <h2>{heading}</h2>
      <p>{subheading}</p>
    </div>
  )
}

const NavigationBar = () => {
  return (
    <div className={styles.NavigationBar} id="navigation_bar">
      <h1>Our services</h1>
      <a className={styles.NavigationBar__tailLink} href="/">Let's work together</a>
    </div>
  )
}

export default function Home() {
  const [activeSectionTitle, setactiveSectionTitle] = useState()
  const activeSection = activeSectionTitle ? 
    pageData.find((sectionData) => sectionData.accordionHeading === activeSectionTitle) :
    pageData[0];

  return (
    <main className={styles.LandingPage__backgroundImage}>
      <div className={styles.PageContent}>
        <NavigationBar />
        <StickyHero heading={activeSection.sectionHeroHeading} subheading={activeSection.sectionHeroNumber} />
        <Accordion onActiveSectionChange={setactiveSectionTitle} />
      </div>
    </main>
  );
}

