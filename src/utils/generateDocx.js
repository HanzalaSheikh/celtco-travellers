// src/utils/generateDocx.js
import { Document, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType } from "docx";

export async function generateTripDOCX(tripData) {
  // Use dynamic import to load the docx library
  const docx = await import('docx');

      // Check if the import was successful
    if (!docx || !docx.default) {
      throw new Error('DOCX library failed to load');
    }
  
  // Access the required components from the default export
  const {
    Document,
    Paragraph,
    TextRun,
    HeadingLevel,
    Table,
    TableRow,
    TableCell,
    WidthType,
    AlignmentType,
    Packer
  } = docx.default; // Note the .default here

  // Helper function for Arabic text with RTL alignment
  const arabicText = (text) => {
    return new Paragraph({
      text: text,
      alignment: AlignmentType.RIGHT,
      bidirectional: true
    });
  };

  // Create the document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Page 1 - English/Arabic Header
          new Paragraph({
            text: "Comprehensive Excellence Leading Transportation Company",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER
          }),
          arabicText("شركة التميز الشاملة الرائدة للنقل"),
          
          // Driver Info Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Driver Name:")],
                    width: { size: 25, type: WidthType.PERCENTAGE }
                  }),
                  new TableCell({
                    children: [new Paragraph(tripData.driverName)],
                    width: { size: 25, type: WidthType.PERCENTAGE }
                  }),
                  new TableCell({
                    children: [new Paragraph("Residency Number:")],
                    width: { size: 25, type: WidthType.PERCENTAGE }
                  }),
                  new TableCell({
                    children: [new Paragraph(tripData.residencyNumber)],
                    width: { size: 25, type: WidthType.PERCENTAGE }
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Type of Vehicle:")]
                  }),
                  new TableCell({
                    children: [new Paragraph(`${tripData.vehicleType} ${tripData.registrationNumber}`)]
                  }),
                  new TableCell({
                    children: [new Paragraph("Registration Number:")]
                  }),
                  new TableCell({
                    children: [new Paragraph(tripData.registrationNumber)]
                  })
                ]
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph("Total Passengers:")]
                  }),
                  new TableCell({
                    children: [new Paragraph(tripData.passengers.length.toString())]
                  }),
                  new TableCell({
                    children: [new Paragraph("Date:")]
                  }),
                  new TableCell({
                    children: [new Paragraph(tripData.tripDate)]
                  })
                ]
              })
            ]
          }),

          // Passenger Data Header
          new Paragraph({
            text: "Passenger Data",
            heading: HeadingLevel.HEADING_2
          }),

          // Passenger Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // Table Header
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("No")] }),
                  new TableCell({ children: [new Paragraph("Passenger Name")] }),
                  new TableCell({ children: [new Paragraph("Passport/Logama No.")] }),
                  new TableCell({ children: [new Paragraph("Nationality")] }),
                  new TableCell({ children: [new Paragraph("From")] }),
                  new TableCell({ children: [new Paragraph("To")] })
                ]
              }),
              // Passenger Rows
              ...tripData.passengers.map((passenger, index) => (
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph((index + 1).toString())] }),
                    new TableCell({ children: [new Paragraph(passenger.name)] }),
                    new TableCell({ children: [new Paragraph(passenger.idNumber)] }),
                    new TableCell({ children: [new Paragraph(passenger.nationality)] }),
                    new TableCell({ children: [new Paragraph("Jeddah Airport")] }),
                    new TableCell({ children: [new Paragraph("Madinah")] })
                  ]
                })
              )),
              // Empty Rows (up to 11)
              ...Array.from({ length: 11 - tripData.passengers.length }).map((_, i) => (
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph((tripData.passengers.length + i + 1).toString())] }),
                    new TableCell({ children: [new Paragraph("")] }),
                    new TableCell({ children: [new Paragraph("")] }),
                    new TableCell({ children: [new Paragraph("")] }),
                    new TableCell({ children: [new Paragraph("")] }),
                    new TableCell({ children: [new Paragraph("")] })
                  ]
                })
              ))
            ]
          }),

          // QR Code Note
          new Paragraph({
            text: "Scan the QR code to view or print this form:",
            spacing: { after: 400 }
          }),

          // Footer Info
          new Paragraph({
            children: [
              new TextRun({
                text: "+966 537051718",
                break: 1
              }),
              new TextRun({
                text: "License no. 35/00005058",
                break: 1
              }),
              new TextRun({
                text: "celtco07us@gmail.com",
                break: 1
              }),
              new TextRun({
                text: "CR.4650277231",
                break: 1
              })
            ]
          }),

          // Page Break
          new Paragraph({
            text: "",
            pageBreakBefore: true
          }),

          // Page 2 - Arabic Contract
          arabicText("عقد نقل ركاب بالحافلات"),
          arabicText("تم إبرام هذا العقد بين:"),
          arabicText(`- الطرف الأول: شركة التميز الشاملة الرائدة للنقل`),
          arabicText(`- الطرف الثاني: ${tripData.driverName}`),
          arabicText("- رقم الجوال: +966 537051718"),
          
          arabicText("بناءً على:"),
          arabicText("- المادة (39) من اللائحة المنظمة لنشاط النقل البري للركاب وتوجيه الحافلات"),
          arabicText("- المادة (1) من المادة (39) التي تنص على وجوب إبرام الناقل لعقد نقل مع الأطراف التجارية الأخرى، إذا تضمنت عمليات النقل على الطرق البرية، وبما لا يتعارض مع أحكام هذه اللائحة"),
          
          arabicText("اتفق الطرفان على ما يلي:"),
          arabicText("موضوع العقد:"),
          arabicText("- يتعهد الطرف الأول بتنفيذ عملية نقل للطرف الثاني، مع مراقبة وتوجيه الركاب من الموقع المحدد مسبقاً، وتوصيلهم إلى الوجهة المحددة في هذا العقد"),
          arabicText("- نقطة الإنطلاق: Jeddah Airport"),
          arabicText("- نقطة الوصول: Madinah"),
          
          arabicText("سياسة الإلغاء والاستبدال:"),
          arabicText("- في حال كان التعاقد بين شخصين أو لأسباب أخرى تتعلق بالحجوزات أو الأنظمة، تخضع سياسة الإلغاء والاستبدال لأحكام نظام وزارة التجارة السعودية"),
          arabicText("- في حالة إلغاء الحجز قبل موعد الرحلة بأكثر من 24 ساعة، يتم استرداد المبلغ بالكامل"),

          // Footer
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "+966 537051718",
                break: 1
              }),
              new TextRun({
                text: "License no. 35/00005058",
                break: 1
              }),
              new TextRun({
                text: "celtco07us@gmail.com",
                break: 1
              }),
              new TextRun({
                text: "CR.4650277231",
                break: 1
              })
            ]
          })
        ]
      }
    ]
  });

   return { doc, Packer };
   catch (error) {
    console.error('Error in generateTripDOCX:', error);
    throw error;
   }
}
export async function downloadDOCX(doc, Packer, fileName = "trip_report.docx") {
  try {
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error in downloadDOCX:', error);
    throw error;
  }

}