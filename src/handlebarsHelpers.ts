import * as Handlebars from 'handlebars';

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
