import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';

// helper to convert date to Hijri (mocked)
const getHijriDate = () => '1446/10/03';

export const generateTripPDF = async (trip, qrUrl) => {
  const doc = new jsPDF();

  // ----------------- PAGE 1 -------------------
  doc.setFontSize(16);
  doc.setTextColor(40);
  doc.text('Passenger Transport Report', 70, 20);

  doc.setFontSize(12);
  doc.text(`Driver Name: ${trip.driverName}`, 20, 35);
  doc.text(`Residency Number: ${trip.residencyNumber}`, 20, 42);
  doc.text(`Company: ${trip.company}`, 20, 49);
  doc.text(`Vehicle: ${trip.vehicleType} (${trip.registrationNumber})`, 20, 56);
  doc.text(`Trip Date: ${trip.tripDate}`, 20, 63);
  doc.text(`Total Passengers: ${trip.passengers.length}`, 20, 70);

  const tableData = trip.passengers.map((p, index) => [
    index + 1,
    p.name,
    p.idNumber,
    p.nationality,
    p.from,
    p.to,
  ]);

  autoTable(doc, {
    startY: 80,
    head: [['#', 'Name', 'ID Number', 'Nationality', 'From', 'To']],
    body: tableData,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  const qrImage = await QRCode.toDataURL(qrUrl);
  doc.addImage(qrImage, 'PNG', 160, 20, 35, 35);

  // ----------------- PAGE 2 -------------------
  doc.addPage();
  doc.setFontSize(12);

  doc.text('شركة التميز الشاملة الرائدة للنقل', 100, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`التاريخ الهجري: ${getHijriDate()}`, 180, 30, { align: 'right' });
  doc.text(`التاريخ الميلادي: ${trip.tripDate}`, 180, 36, { align: 'right' });

  doc.setFontSize(16);
  doc.text('عقد نقل ركاب بالحافلات', 105, 48, { align: 'center' });

  doc.setFontSize(12);
  doc.setTextColor(0);

  doc.text(`الطرف الأول : شركة التميز الشاملة الرائدة للنقل`, 20, 65);
  doc.text(`الطرف الثاني : ${trip.driverName} (رقم الهوية : ${trip.residencyNumber})`, 20, 73);

  doc.setFontSize(10);
  doc.text(`تم الاتفاق على قيام الطرف الأول بعملية نقل الطرف الثاني،`, 20, 85);
  doc.text(`نقطة الانطلاق : ${trip.passengers[0]?.from || '---'}`, 20, 95);
  doc.text(`نقطة الوصول : ${trip.passengers[0]?.to || '---'}`, 20, 102);

  doc.setFontSize(9);
  doc.text('سياسة الإلغاء والاستبدال:', 20, 115);
  doc.text('1. يتم الغاء العقد قبل ٢٤ ساعة بدون أي التزامات.', 20, 122);
  doc.text('2. لا يمكن التبديل بعد بدء الرحلة.', 20, 128);

  // Footer (fake stamp and contact)
  doc.setFontSize(8);
  doc.text('License no. 35/0000058', 20, 285);
  doc.text('celtco07u@gmail.com', 90, 285);
  doc.text('CR.4650077231', 170, 285, { align: 'right' });

  doc.save(`TripReport_${trip.id}.pdf`);
};
