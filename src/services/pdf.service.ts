import { Injectable } from '@nestjs/common';
import { PassThrough } from 'stream';
import puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  async generatePdf(htmlContent: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    await page.pdf({
      path: 'test-test.pdf', // Path where the PDF will be saved
      format: 'A4',  // Paper size
      printBackground: true, // Include background graphics
    });

    // const pdfBuffer = await page.pdf({
    //   format: 'A4', // Paper size
    // });
    // Close the browser
    await browser.close();

  }
}
