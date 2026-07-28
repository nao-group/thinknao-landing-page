import type { Metadata } from "next";
import { CscaClient } from "./CscaClient";

export const metadata: Metadata = {
  title: "CSCA Exam Guide — ThinkNAO",
  description:
    "Everything you need to know about the CSCA exam — subjects, format, schedule, fees, and scoring. The independent study guide for Indonesian students.",
};

export default function CscaPage() {
  return <CscaClient />;
}
