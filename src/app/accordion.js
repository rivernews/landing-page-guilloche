"use client";

import styles from "./accordion.module.css";
import { useEffect, useState, useRef } from "react";
import { pageData } from "./pageData";


export default function Accordion({
    onActiveSectionChange
}) {
    const observerRef = useRef();
    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry?.isIntersecting) {
                    onActiveSectionChange?.(entry.target.innerHTML);
                }
            })
        }, {
            root: null,
            rootMargin: "500px 0px -500px 0px"
        })

        return () => {
            observerRef.current?.disconnect();
        }
    }, [])

    return (
        <div>
            {pageData.map((sectionData) => 
                <AccordionSection
                    key={sectionData.accordionHeading}
                    heading={sectionData.accordionHeading}
                    accordionItems={sectionData.accordionItems}
                    observerRef={observerRef}
                />)}
        </div>
    )
}

const AccordionSection = ({
    heading,
    accordionItems = [],
    observerRef
}) => {
    const [headingElement, setHeadingElement] = useState();
    useEffect(() => {
        if (!(observerRef.current && headingElement)) return;
        observerRef.current.observe(headingElement);
        return () => {
            if (!(observerRef.current && headingElement)) return;
            observerRef.current?.unobserve(headingElement);
        }
    }, [headingElement])
    return (
        <div className={styles.AccordionSection}>
            <h3 className={styles.AccordionSection__heading} ref={setHeadingElement}>{heading}</h3>
            {accordionItems.map((accordionItem) => <AccordionItem key={accordionItem.title} {...accordionItem} />)}
        </div>
    )
}

const AccordionItem = ({ title, description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className={styles.AccordionItem} onClick={() => setIsExpanded(!isExpanded)}>
            <h4 className={styles.AccordionItem__title}>{title}</h4>
            <p className={styles.AccordionItem__description + ` ${isExpanded ? styles["AccordionItem__description--expanded"] : ""}`}>{description}</p>
        </div>
    )
}
