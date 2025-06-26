// handlebars.service.ts
import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HandlebarsService {
  private templatesDir = `${process.cwd()}/views/`;

  constructor() {
    this.initializeHelpers();
  }

  private initializeHelpers() {
    // Helper для форматирования чисел
    Handlebars.registerHelper('formatNumber', function (number) {
      if (typeof number !== 'number') {
        number = parseFloat(number);
      }
      return number.toLocaleString('ru-RU');
    });

    // Helper для склонения русских слов
    Handlebars.registerHelper(
      'pluralizeRussian',
      function (number, singular, few, many) {
        if (typeof number !== 'number') {
          number = parseFloat(number);
        }

        const mod10 = number % 10;
        const mod100 = number % 100;

        if (mod10 === 1 && mod100 !== 11) {
          return `${number} ${singular}`;
        } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
          return `${number} ${few}`;
        } else {
          return `${number} ${many}`;
        }
      },
    );

    // Helper для форматирования дат
    Handlebars.registerHelper('formatDate', function (date) {
      const d = new Date(date);
      return d.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    });

    // Helper для цвета строк таблицы
    Handlebars.registerHelper('tableRowBackgroundColor', function (index) {
      const colorMap = ['#fff', '#F0F0FA', '#C0C4EC'];
      return colorMap[index % 3];
    });

    // Helper для проверки четности
    Handlebars.registerHelper('isEven', function (index, options) {
      if (index % 2 === 0) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });

    // Helper для отображения реквизитов компании
    Handlebars.registerHelper('displayCompanyNumbers', function (juridicalInfo) {
      const { OKPO, OGRN, INN, KPP } = juridicalInfo;
      let resultParts: string[] = [];

      if (INN && KPP) {
        resultParts.push(`ИНН/КПП: ${INN}/${KPP}`);
      } else if (INN) {
        resultParts.push(`ИНН: ${INN}`);
      } else if (KPP) {
        resultParts.push(`КПП: ${KPP}`);
      }
      if (OGRN) {
        resultParts.push(`ОГРН: ${OGRN}`);
      }
      if (OKPO) {
        resultParts.push(`ОКПО: ${OKPO}`);
      }
      return new Handlebars.SafeString(resultParts.join(', '));
    });

    // Helper для отображения банковских реквизитов
    Handlebars.registerHelper(
      'displayBankAccountDetails',
      function (juridicalInfo) {
        const { bank_name, bank_BIC, bank_INN, bank_KPP, bank_korr, bank_RC } =
          juridicalInfo;
        let resultParts: string[] = [];

        if (bank_name) {
          resultParts.push(`Название банка: ${bank_name}`);
        }
        if (bank_BIC) {
          resultParts.push(`БИК: ${bank_BIC}`);
        }
        if (bank_INN && bank_KPP) {
          resultParts.push(`ИНН/КПП: ${bank_INN}/${bank_KPP}`);
        } else if (bank_INN) {
          resultParts.push(`ИНН: ${bank_INN}`);
        } else if (bank_KPP) {
          resultParts.push(`КПП: ${bank_KPP}`);
        }
        if (bank_korr) {
          resultParts.push(`к/с: ${bank_korr}`);
        }
        if (bank_RC) {
          resultParts.push(`р/с: ${bank_RC}`);
        }

        return new Handlebars.SafeString(resultParts.join(', '));
      },
    );

    // Helper для проверки наличия данных о заказчике
    Handlebars.registerHelper('hasCustomerInfo', function (request, options) {
      const { juridicalInfo, owner } = request;
      
      // Проверяем основные поля для отображения секции заказчика
      const hasJuridicalName = juridicalInfo && juridicalInfo.name && juridicalInfo.name.trim();
      const hasJuridicalAddress = juridicalInfo && juridicalInfo.address && juridicalInfo.address.trim();
      const hasOwnerName = owner && owner.name && owner.name.trim();
      const hasOwnerEmail = owner && owner.email && owner.email.trim();
      const hasOwnerPhone = owner && owner.phone && owner.phone.trim();
      
      // Показываем секцию если есть хотя бы основные данные
      if (hasJuridicalName || hasJuridicalAddress || hasOwnerName || hasOwnerEmail || hasOwnerPhone) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });

    // Helper для проверки наличия данных об отеле
    Handlebars.registerHelper('hasHotelInfo', function (request, options) {
      const { hotel } = request;
      
      if (!hotel) {
        return options.inverse(this);
      }
      
      const hasHotelName = hotel.name && hotel.name.trim();
      const hasHotelAddress = hotel.address && hotel.address.trim();
      const hasOwnerEmail = hotel.owner && hotel.owner.email && hotel.owner.email.trim();
      const hasOwnerPhone = hotel.owner && hotel.owner.phone && hotel.owner.phone.trim();
      
      if (hasHotelName || hasHotelAddress || hasOwnerEmail || hasOwnerPhone) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    });
  }

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
