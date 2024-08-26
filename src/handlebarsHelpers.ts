import * as Handlebars from 'handlebars';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { formatDate } from './utils/formatDate';
import { JuridicalInfo } from './model/appTypes';

Handlebars.registerHelper('isEven', function (index, options) {
  if (index % 2 === 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('formatNumber', function (number) {
  if (typeof number !== 'number') {
    number = parseFloat(number);
  }
  return number.toLocaleString();
});

Handlebars.registerHelper('pluralizeRussian', function (number, singular, few, many) {
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
});

Handlebars.registerHelper('formatDate', date => formatDate(date));

Handlebars.registerHelper('displayCompanyNumbers', (juridicalInfo: JuridicalInfo) => {
  const {
    OKPO,
    OGRN,
    INN,
    KPP,
  } = juridicalInfo;
  let resultParts = [];


  if (INN && KPP) {
    resultParts.push([noWrap(`ИНН/КПП: ${INN}/${KPP}`)]);
  } else if (INN) {
    resultParts.push([noWrap(`ИНН: ${INN}`)]);
  } else if (KPP) {
    resultParts.push([noWrap(`КПП: ${KPP}`)]);
  }
  if (OGRN) {
    resultParts.push([noWrap(`ОГРН: ${OGRN}`)]);
  }
  if (OKPO) {
    resultParts.push([noWrap(`ОКПО: ${OKPO}`)]);
  }
  return new Handlebars.SafeString(resultParts.join(', '));
});

Handlebars.registerHelper('displayBankAccountDetails', (juridicalInfo: JuridicalInfo) => {
  const {
    bank_name,
    bank_BIC,
    bank_INN,
    bank_KPP,
    bank_korr,
    bank_RC
  } = juridicalInfo;
  let resultParts = [];

  if (bank_name) {
    resultParts.push([`Название банка: ${bank_name}`]);
  }
  if (bank_BIC) {
    resultParts.push([noWrap(`БИК: ${bank_BIC}`)]);
  }
  if (bank_INN && bank_KPP) {
    resultParts.push([noWrap(`ИНН/КПП: ${bank_INN}/${bank_KPP}`)]);
  } else if (bank_INN) {
    resultParts.push([noWrap(`ИНН: ${bank_INN}`)]);
  } else if (bank_KPP) {
    resultParts.push([noWrap(`КПП: ${bank_KPP}`)]);
  }
  if (bank_korr) {
    resultParts.push([noWrap(`к/с: ${bank_korr}`)]);
  }
  if (bank_RC) {
    resultParts.push([noWrap(`р/с: ${bank_RC}`)]);
  }

  return new Handlebars.SafeString(resultParts.join(', '));
});

function noWrap(content: string): string {
  return `<span style="white-space: nowrap">${content}</span>`;
}
