import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const generateInvoice = (payment) => {

    const invoiceName = `invoice-${payment._id}.pdf`;

    const invoicePath = path.join(
        "invoices",
        invoiceName
    );

    const doc = new PDFDocument();

    doc.pipe(
        fs.createWriteStream(invoicePath)
    );

    doc.fontSize(22)
       .text("SMART GARAGE", {
           align: "center"
       });

    doc.moveDown();

    doc.fontSize(16)
       .text(`Invoice ID : ${payment._id}`);

    doc.text(
        `Transaction : ${payment.transactionId}`
    );

    doc.text(
        `Amount : ₹${payment.amount}`
    );

    doc.text(
        `Payment Method : ${payment.paymentMethod}`
    );

    doc.text(
        `Payment Status : ${payment.paymentStatus}`
    );

    doc.moveDown();

    doc.text(
        "Thank you for choosing Smart Garage!"
    );

    doc.end();

    return invoicePath;

};

export default generateInvoice;