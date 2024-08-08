// handlebars.service.ts
import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HandlebarsService {
  private templatesDir = `${process.cwd()}/views/`;

  async renderTemplate(templateName: string, context: any): Promise<string> {
    const templatePath = path.join(this.templatesDir, `${templateName}.hbs`);

    // Read the template file
    const templateSource = fs.readFileSync(templatePath, 'utf-8');

    // Compile the template
    const template = Handlebars.compile(templateSource);

    // Render the template with context
    return template(context);
  }
}
