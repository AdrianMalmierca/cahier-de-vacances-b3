import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

//after each test unmount the components rendered and empty the document.body, letting the DOM clean for the next step
afterEach(() => { 
    cleanup();
});
//this file prepare the environement 
//to use .toBeInTheDocument() on the expect, cause normally it doesnt exist like .toHaveTextContent(), .toBeVisible()
//is only from this library