"use client";

import { jsPDF } from "jspdf";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadReport({ report }: { report: any }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // PDF Content Formatting
    doc.setFontSize(20);
    doc.text("Medical Consultation Report", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Title: ${report.title}`, 20, 40);
    doc.text(`Date: ${new Date(report.createdAt).toLocaleDateString()}`, 20, 50);
    doc.text(`Urgency: ${report.urgency}`, 20, 60);
    
    doc.line(20, 65, 190, 65); // Horizontal line

    doc.text("Symptoms:", 20, 80);
    doc.text(report.symptoms || "N/A", 30, 90);

    doc.text("Diagnosis/Disease:", 20, 110);
    doc.text(report.disease || "N/A", 30, 120);

    doc.text("Medication:", 20, 140);
    doc.text(report.medication || "None prescribed", 30, 150);

    doc.text("Advice:", 20, 170);
    doc.text(report.advice || "Follow up as needed", 30, 180);

    // Save the PDF
    doc.save(`Medical_Report_${report.id}.pdf`);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={generatePDF}
      className="rounded-xl flex gap-2 text-xs font-bold border-slate-200"
    >
      <Download size={14} /> Download PDF
    </Button>
  );
}