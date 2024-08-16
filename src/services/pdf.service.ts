import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  async generatePdf(htmlContent: string): Promise<Uint8Array> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: 'shell'
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    return await page.pdf({
      format: 'A4',
      printBackground: true
    });
  }
}
