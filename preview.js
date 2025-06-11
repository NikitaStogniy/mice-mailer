const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

// Регистрируем helpers (упрощенные версии)
Handlebars.registerHelper('formatNumber', function (number) {
  if (typeof number !== 'number') {
    number = parseFloat(number);
  }
  return number.toLocaleString('ru-RU');
});

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

Handlebars.registerHelper('formatDate', function (date) {
  const d = new Date(date);
  return d.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
});

Handlebars.registerHelper('tableRowBackgroundColor', function (index) {
  const colorMap = ['#fff', '#F0F0FA', '#C0C4EC'];
  return colorMap[index % 3];
});

Handlebars.registerHelper('isEven', function (index, options) {
  if (index % 2 === 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('displayCompanyNumbers', function (juridicalInfo) {
  const { OKPO, OGRN, INN, KPP } = juridicalInfo;
  let resultParts = [];

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

Handlebars.registerHelper(
  'displayBankAccountDetails',
  function (juridicalInfo) {
    const { bank_name, bank_BIC, bank_INN, bank_KPP, bank_korr, bank_RC } =
      juridicalInfo;
    let resultParts = [];

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

// Генерируем оба предпросмотра
console.log('🔧 Генерация предпросмотров писем...\n');

// Функция для создания HTML страницы с кнопками
function createPreviewPage(templateName, emailHtml, pdfHtml) {
  return `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Превью ${templateName === 'client' ? 'клиентского' : 'отельного'} письма</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1400px; margin: 0 auto; }
        .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .controls { display: flex; gap: 10px; margin-bottom: 20px; }
        .btn { padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 600; }
        .btn-primary { background: #2431A5; color: white; }
        .btn-secondary { background: #6c757d; color: white; }
        .btn:hover { opacity: 0.9; }
        .preview-container { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
        .content { padding: 20px; }
        .version-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-bottom: 10px; }
        .version-email { background: #e7f3ff; color: #0066cc; }
        .version-pdf { background: #fff3cd; color: #856404; }
        #emailVersion { display: block; }
        #pdfVersion { display: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Превью ${templateName === 'client' ? 'клиентского' : 'отельного'} письма</h1>
            <p>Переключайтесь между версиями для email и PDF</p>
            <div class="controls">
                <button class="btn btn-primary" onclick="showVersion('email')">📧 Email версия</button>
                <button class="btn btn-secondary" onclick="showVersion('pdf')">📄 PDF версия</button>
            </div>
        </div>
        
        <div class="preview-container">
            <div id="emailVersion">
                <div class="content">
                    <span class="version-badge version-email">EMAIL ВЕРСИЯ</span>
                    ${emailHtml}
                </div>
            </div>
            
            <div id="pdfVersion">
                <div class="content">
                    <span class="version-badge version-pdf">PDF ВЕРСИЯ</span>
                    ${pdfHtml}
                </div>
            </div>
        </div>
    </div>

    <script>
        function showVersion(type) {
            const emailDiv = document.getElementById('emailVersion');
            const pdfDiv = document.getElementById('pdfVersion');
            const buttons = document.querySelectorAll('.btn');
            
            if (type === 'email') {
                emailDiv.style.display = 'block';
                pdfDiv.style.display = 'none';
                buttons[0].className = 'btn btn-primary';
                buttons[1].className = 'btn btn-secondary';
            } else {
                emailDiv.style.display = 'none';
                pdfDiv.style.display = 'block';
                buttons[0].className = 'btn btn-secondary';
                buttons[1].className = 'btn btn-primary';
            }
        }
    </script>
</body>
</html>`;
}

// Читаем шаблоны и данные
const clientTemplatePath = path.join(__dirname, 'views', 'client.hbs');
const clientTemplateSource = fs.readFileSync(clientTemplatePath, 'utf8');
const clientDataPath = path.join(__dirname, 'fixtures', 'client.json');
const clientData = JSON.parse(fs.readFileSync(clientDataPath, 'utf8'));

const hotelTemplatePath = path.join(__dirname, 'views', 'hotel.hbs');
const hotelTemplateSource = fs.readFileSync(hotelTemplatePath, 'utf8');
const hotelDataPath = path.join(__dirname, 'fixtures', 'hotel.json');
const hotelData = JSON.parse(fs.readFileSync(hotelDataPath, 'utf8'));

// Генерируем обе версии для каждого шаблона
const clientEmailHtml = Handlebars.compile(clientTemplateSource)(clientData);
const clientPdfHtml = Handlebars.compile(clientTemplateSource)({
  ...clientData,
  isPdf: true,
});

const hotelEmailHtml = Handlebars.compile(hotelTemplateSource)(hotelData);
const hotelPdfHtml = Handlebars.compile(hotelTemplateSource)({
  ...hotelData,
  isPdf: true,
});

// Создаем превью страницы
const clientPreviewPage = createPreviewPage(
  'client',
  clientEmailHtml,
  clientPdfHtml,
);
const hotelPreviewPage = createPreviewPage(
  'hotel',
  hotelEmailHtml,
  hotelPdfHtml,
);

// Сохраняем файлы
const clientPath = path.join(__dirname, 'preview_client.html');
const hotelPath = path.join(__dirname, 'preview_hotel.html');

fs.writeFileSync(clientPath, clientPreviewPage);
fs.writeFileSync(hotelPath, hotelPreviewPage);

console.log(`✅ Создан файл: ${clientPath}`);
console.log(`✅ Создан файл: ${hotelPath}`);

console.log('\n🎉 Готово! Откройте файлы в браузере для просмотра:');
console.log(
  '   - preview_client.html - превью клиентского письма (с переключением Email/PDF)',
);
console.log(
  '   - preview_hotel.html - превью отельного письма (с переключением Email/PDF)',
);
