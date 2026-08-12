const pptxgen = require('pptxgenjs');
const path = require('path');
// Layout is also verified after export with the course presentation tools.

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Носиров Нодир';
pptx.subject = 'Retail Demand Forecasting — Capstone Defense';
pptx.title = 'Retail Demand Forecasting';
pptx.company = 'Tulpar';
pptx.lang = 'ru-RU';
pptx.theme = {
  headFontFace: 'Aptos Display', bodyFontFace: 'Aptos', lang: 'ru-RU'
};
pptx.defineSlideMaster({
  title: 'MASTER',
  background: { color: 'F7F9FC' },
  objects: [
    { rect: { x: 0, y: 0, w: 13.333, h: 0.12, fill: { color: '1976D2' }, line: { color: '1976D2' } } },
    { text: { text: 'AI/ML FUNDAMENTALS • CAPSTONE', options: { x: 0.55, y: 0.2, w: 4.7, h: 0.25, fontFace: 'Aptos', fontSize: 9, bold: true, color: '1976D2', margin: 0 } } },
    { text: { text: 'Носиров Нодир • Tulpar', options: { x: 9.6, y: 0.2, w: 3.15, h: 0.25, fontFace: 'Aptos', fontSize: 9, color: '64748B', align: 'right', margin: 0 } } },
    { line: { x: 0.55, y: 7.12, w: 12.2, h: 0, line: { color: 'D9E2EC', width: 1 } } },
  ],
  slideNumber: { x: 12.58, y: 7.18, w: 0.2, h: 0.15, fontFace: 'Aptos', fontSize: 8, color: '64748B', align: 'right' }
});

const C = { navy:'102A43', blue:'1976D2', cyan:'2CB1BC', orange:'F59E0B', red:'D64545', green:'178F65', ink:'243B53', muted:'627D98', pale:'EAF2FB', white:'FFFFFF', line:'D9E2EC' };
const out = path.join(__dirname, '..', 'submission', 'defense_presentation_final.pptx');

function addTitle(slide, title, kicker) {
  slide.addText(kicker.toUpperCase(), { x:0.65, y:0.58, w:3.2, h:0.24, fontSize:10, bold:true, color:C.blue, charSpacing:1.1, margin:0 });
  slide.addText(title, { x:0.65, y:0.88, w:12.0, h:0.62, fontSize:27, bold:true, color:C.navy, margin:0, breakLine:false, fit:'shrink' });
}
function addFooterTag(slide, text) {
  slide.addText(text, { x:0.65, y:6.77, w:11.4, h:0.24, fontSize:10, color:C.muted, italic:true, margin:0, fit:'shrink' });
}
function card(slide, x,y,w,h, title, body, accent=C.blue) {
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h,rectRadius:0.08,fill:{color:C.white},line:{color:C.line,width:1.2},shadow:{type:'outer',color:'B8C6D1',opacity:0.16,blur:1.5,angle:45,distance:1}});
  slide.addShape(pptx.ShapeType.rect,{x,y,w:0.08,h,fill:{color:accent},line:{color:accent}});
  slide.addText(title,{x:x+0.28,y:y+0.2,w:w-0.45,h:0.3,fontSize:15,bold:true,color:C.navy,margin:0,fit:'shrink'});
  slide.addText(body,{x:x+0.28,y:y+0.62,w:w-0.48,h:h-0.78,fontSize:11.5,color:C.ink,breakLine:false,margin:0.02,fit:'shrink',valign:'mid'});
}
function metric(slide,x,y,w,value,label,color=C.blue){
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h:1.1,rectRadius:0.06,fill:{color:C.white},line:{color:C.line,width:1}});
  slide.addText(value,{x:x+0.1,y:y+0.14,w:w-0.2,h:0.44,fontSize:24,bold:true,color,align:'center',margin:0,fit:'shrink'});
  slide.addText(label,{x:x+0.12,y:y+0.67,w:w-0.24,h:0.26,fontSize:10.5,color:C.muted,align:'center',margin:0,fit:'shrink'});
}
function notes(slide, text){
  slide.addNotes([
    ...text.split('\n'),
    '',
    '[Sources]',
    '- Local project notebooks, reports, data documentation, and verified artifacts.',
  ]);
}
function arrow(slide,x1,y1,x2,y2,color=C.blue){ slide.addShape(pptx.ShapeType.line,{x:x1,y:y1,w:x2-x1,h:y2-y1,line:{color,width:2,beginArrowType:'none',endArrowType:'triangle'}}); }

// 1 — title
{
 const s=pptx.addSlide('MASTER');
 s.background={color:C.navy};
 s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:7.5,fill:{color:C.navy},line:{color:C.navy}});
 s.addShape(pptx.ShapeType.arc,{x:9.15,y:0.15,w:3.9,h:3.9,adjustPoint:0.3,rotate:25,fill:{color:C.blue,transparency:18},line:{color:C.blue,transparency:100}});
 s.addShape(pptx.ShapeType.arc,{x:8.65,y:4.25,w:4.05,h:2.95,adjustPoint:0.34,rotate:205,fill:{color:C.cyan,transparency:35},line:{color:C.cyan,transparency:100}});
 s.addText('RETAIL DEMAND\nFORECASTING',{x:0.8,y:1.25,w:8.5,h:1.65,fontSize:38,bold:true,color:C.white,margin:0,breakLine:false,fit:'shrink'});
 s.addText('Прогноз недельного спроса на товары FOODS',{x:0.82,y:3.18,w:7.3,h:0.5,fontSize:20,color:'C7DDFC',margin:0});
 s.addShape(pptx.ShapeType.line,{x:0.82,y:3.88,w:4.4,h:0,line:{color:C.orange,width:4}});
 s.addText('Носиров Нодир  •  группа Tulpar\nAI/ML Fundamentals Capstone  •  2026',{x:0.82,y:4.24,w:6.6,h:0.7,fontSize:15,color:C.white,margin:0,breakLine:false});
 s.addText('Цель: поддержать планирование запасов — не заменить решение человека',{x:0.82,y:6.42,w:8.8,h:0.38,fontSize:13,bold:true,color:'D9EAFB',margin:0});
 notes(s,'Здравствуйте. Мой проект прогнозирует спрос на следующую неделю для конкретного товара FOODS в конкретном магазине.\nПользователь — сотрудник розничной сети, который планирует запасы. Модель предлагает ориентир, но не оформляет заказ автоматически.');
}

// 2 — problem
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Какую проблему решает проект','1 • проблема и пользователь');
 card(s,0.7,1.75,3.7,2.0,'Вход','Магазин и товар\nПрошлые продажи\nЦена и календарные признаки',C.blue);
 card(s,4.82,1.75,3.7,2.0,'ML-задача','Регрессия: предсказать количество единиц товара, которое будет продано за следующую неделю.',C.cyan);
 card(s,8.94,1.75,3.7,2.0,'Результат','Одно неотрицательное число — прогноз недельного спроса в единицах.',C.orange);
 arrow(s,4.4,2.75,4.78,2.75); arrow(s,8.52,2.75,8.9,2.75);
 s.addShape(pptx.ShapeType.roundRect,{x:1.55,y:4.45,w:10.2,h:1.25,rectRadius:0.06,fill:{color:C.pale},line:{color:'B9D7F2'}});
 s.addText('Критерий успеха',{x:1.85,y:4.72,w:2.2,h:0.32,fontSize:15,bold:true,color:C.blue,margin:0});
 s.addText('MAE финальной модели должен быть ниже простого baseline на невидимом временном периоде.',{x:4.0,y:4.62,w:7.3,h:0.55,fontSize:16,bold:true,color:C.navy,margin:0.02,fit:'shrink'});
 addFooterTag(s,'Практическое применение: решение о запасах с обязательной проверкой человеком.');
 notes(s,'Это задача регрессии. На входе находятся сведения о товаре и магазине, прошлые продажи, цена и календарь.\nНа выходе — прогноз количества единиц на следующую неделю. Главный критерий успеха — уменьшить среднюю абсолютную ошибку по сравнению с простым baseline.');
}

// 3 — data
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Данные: полный масштаб категории FOODS','2 • данные');
 metric(s,0.7,1.65,2.15,'≈28 млн','дневных продаж',C.blue);
 metric(s,3.05,1.65,2.15,'14 370','товар × магазин',C.cyan);
 metric(s,5.4,1.65,2.15,'1 437','уникальных товаров',C.orange);
 metric(s,7.75,1.65,2.15,'10','магазинов',C.green);
 metric(s,10.1,1.65,2.15,'3','штата США',C.red);
 s.addText('M5 Forecasting — Accuracy',{x:0.75,y:3.25,w:4.3,h:0.42,fontSize:20,bold:true,color:C.navy,margin:0});
 s.addText('Продажи Walmart за 2011–2016 годы. В исходных файлах есть ежедневные продажи, календарь, события и праздники, SNAP и недельные цены.',{x:0.75,y:3.78,w:5.35,h:1.15,fontSize:14,color:C.ink,margin:0.03,breakLine:false,fit:'shrink'});
 card(s,6.55,3.25,2.8,1.7,'Почему FOODS?','Одна связная категория, но полный объём данных и реальная неоднородность спроса.',C.blue);
 card(s,9.65,3.25,2.8,1.7,'Ограничение','Это данные США, поэтому перенос в Узбекистан без местных данных недопустим.',C.red);
 s.addText('После очистки: 3 118 862 недельных строк • 277 недель • 3 отдела FOODS',{x:1.3,y:5.75,w:10.8,h:0.46,fontSize:17,bold:true,color:C.blue,align:'center',margin:0});
 addFooterTag(s,'Источник и условия доступа задокументированы; большие CSV не загружены в GitHub.');
 notes(s,'Я использовал M5 Forecasting — Accuracy. Это крупный набор Walmart: почти 28 миллионов ежедневных значений только для выбранной категории FOODS.\nПосле недельной агрегации и очистки получилось более 3,1 миллиона строк. Важно: это американские данные 2011–2016 годов, поэтому модель нельзя автоматически переносить в Узбекистан.');
}

// 4 — original files
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Пять оригинальных файлов выполняют разные роли','3 • исходные файлы M5');
 const rows=[
  ['calendar.csv','даты, d-коды, события, SNAP','использован'],
  ['sales_train_evaluation.csv','продажи d_1–d_1941','главный sales-файл'],
  ['sales_train_validation.csv','та же история до d_1913','проверен, не добавлялся'],
  ['sell_prices.csv','цена по item + store + wm_yr_wk','использован'],
  ['sample_submission.csv','формат ответа Kaggle F1–F28','не нужен для обучения'],
 ];
 s.addTable([['Файл','Содержание','Роль в проекте'],...rows],{
  x:0.72,y:1.6,w:11.9,h:3.65,border:{type:'solid',color:C.line,pt:1},
  fill:C.white,color:C.ink,fontFace:'Aptos',fontSize:14,margin:0.09,
  rowH:[0.5,0.62,0.62,0.62,0.62,0.62],colW:[3.25,5.05,3.6],autoFit:false
 });
 s.addShape(pptx.ShapeType.roundRect,{x:1.15,y:5.65,w:11.0,h:0.72,rectRadius:0.04,fill:{color:'E8F5EE'},line:{color:'9AD2B8'}});
 s.addText('Оригиналы в data/raw не изменялись — Pandas создавал новые Parquet-файлы в interim и processed.',{x:1.45,y:5.87,w:10.4,h:0.28,fontSize:16,bold:true,color:C.green,align:'center',margin:0,fit:'shrink'});
 addFooterTag(s,'Главный принцип воспроизводимости: raw → только чтение; все изменения сохраняются отдельно.');
 notes(s,'В наборе M5 пять исходных файлов. Основные три — продажи, календарь и цены. Validation-файл является сокращённой версией evaluation, а sample submission показывает только формат Kaggle.\nЯ не изменял исходные CSV. Все преобразования сохранены как новые файлы в отдельных папках.');
}

// 5 — rows and unique items
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'30 490 строк — это товар × магазин, а не 30 490 товаров','4 • структура sales-файла');
 s.addText('Одна исходная строка',{x:0.8,y:1.55,w:3.0,h:0.32,fontSize:17,bold:true,color:C.blue,margin:0});
 s.addText('item_id       store_id  d_1  d_2  d_3  ...  d_1941\nFOODS_1_001  CA_1      3    0    1    ...  4',{x:0.8,y:2.02,w:6.55,h:1.2,fontFace:'Consolas',fontSize:17,color:C.navy,fill:{color:'EEF4FA'},line:{color:'C9D9E8',width:1},margin:0.18,fit:'shrink'});
 s.addText('Как посчитать правильно',{x:7.75,y:1.55,w:3.4,h:0.32,fontSize:17,bold:true,color:C.green,margin:0});
 s.addText('sales_df.shape[0]          → 30 490\nsales_df.item_id.nunique() → 3 049\nsales_df.store_id.nunique()→ 10',{x:7.75,y:2.02,w:4.75,h:1.2,fontFace:'Consolas',fontSize:15.5,color:C.navy,fill:{color:'EDF8F3'},line:{color:'B8DDCA',width:1},margin:0.16,fit:'shrink'});
 s.addShape(pptx.ShapeType.roundRect,{x:1.3,y:3.78,w:10.7,h:1.05,rectRadius:0.05,fill:{color:C.pale},line:{color:'B9D7F2'}});
 s.addText('3 049 товаров × 10 магазинов = 30 490 товарно-магазинных рядов',{x:1.65,y:4.12,w:10.0,h:0.32,fontSize:21,bold:true,color:C.blue,align:'center',margin:0,fit:'shrink'});
 s.addText('В категории FOODS: 1 437 уникальных товаров × 10 магазинов = 14 370 строк.',{x:1.4,y:5.32,w:10.5,h:0.4,fontSize:18,bold:true,color:C.navy,align:'center',margin:0});
 addFooterTag(s,'item_id анонимизирован: FOODS_1_001 — идентификатор, а не настоящее название товара.');
 notes(s,'Количество строк нельзя называть количеством товаров. Каждая строка — комбинация item_id и store_id.\nВ полном файле 3 049 уникальных товаров и 10 магазинов, поэтому получается 30 490 строк. Для FOODS осталось 1 437 товаров и 14 370 товарно-магазинных рядов.');
}

// 6 — melt and overlapping sales files
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Pandas melt — это Unpivot Columns в Excel','5 • широкая таблица → длинная');
 s.addText('Было: дни находятся в колонках',{x:0.75,y:1.52,w:4.2,h:0.3,fontSize:17,bold:true,color:C.blue,margin:0});
 s.addText('item_id       d_1  d_2  d_3\nFOODS_1_001  3    0    1',{x:0.75,y:1.93,w:4.4,h:1.0,fontFace:'Consolas',fontSize:17,color:C.navy,fill:{color:'EEF4FA'},line:{color:'C9D9E8',width:1},margin:0.18});
 s.addText('Стало: один день = одна строка',{x:0.75,y:3.24,w:4.2,h:0.3,fontSize:17,bold:true,color:C.green,margin:0});
 s.addText('item_id       d    units_sold\nFOODS_1_001  d_1  3\nFOODS_1_001  d_2  0\nFOODS_1_001  d_3  1',{x:0.75,y:3.66,w:4.4,h:1.52,fontFace:'Consolas',fontSize:16.5,color:C.navy,fill:{color:'EDF8F3'},line:{color:'B8DDCA',width:1},margin:0.18,fit:'shrink'});
 s.addText('Код проекта',{x:5.55,y:1.52,w:2.0,h:0.3,fontSize:17,bold:true,color:C.orange,margin:0});
 s.addText('daily = foods_chunk.melt(\n    id_vars=sales_id_columns,\n    value_vars=day_columns,\n    var_name="d",\n    value_name="units_sold"\n)',{x:5.55,y:1.93,w:6.85,h:1.6,fontFace:'Consolas',fontSize:15,color:C.navy,fill:{color:'FFF7E6'},line:{color:'F7C873',width:1},margin:0.18,fit:'shrink'});
 s.addText('Почему два sales-файла не складывались',{x:5.55,y:3.88,w:5.7,h:0.32,fontSize:17,bold:true,color:C.red,margin:0});
 s.addText('validation: d_1–d_1913\nevaluation: d_1–d_1941\n\nevaluation уже содержит validation + 28 новых дней.\nConcat создал бы дубликаты d_1–d_1913.',{x:5.55,y:4.3,w:6.85,h:1.42,fontFace:'Consolas',fontSize:15.5,color:C.navy,fill:{color:'FDECEC'},line:{color:'E6A2A2',width:1},margin:0.16,fit:'shrink'});
 addFooterTag(s,'После melt FOODS содержит 14 370 × 1 941 = 27 892 170 ежедневных значений.');
 notes(s,'Операция melt в Pandas соответствует Unpivot Columns в Excel Power Query. Она превращает тысячи дневных колонок в две колонки: номер дня и продажи.\nМы не складывали validation и evaluation, потому что evaluation уже содержит все старые дни и ещё 28 новых. Иначе первые 1 913 дней были бы задублированы.');
}

// 7 — merge, dates and weekly output
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Три источника превращаются в одну недельную строку','6 • merge и недельная агрегация');
 s.addText('1. Связываем d с проектной неделей',{x:0.72,y:1.45,w:4.4,h:0.3,fontSize:17,bold:true,color:C.blue,margin:0});
 s.addText('day_to_week = calendar.set_index("d")["week_start"]\ndaily["week_start"] = daily["d"].map(day_to_week)',{x:0.72,y:1.83,w:5.7,h:1.24,fontFace:'Consolas',fontSize:14.5,color:C.navy,fill:{color:'EEF4FA'},line:{color:'C9D9E8',width:1},margin:0.16,fit:'shrink'});
 s.addText('2. Присоединяем подготовленную цену',{x:6.78,y:1.45,w:4.8,h:0.3,fontSize:17,bold:true,color:C.orange,margin:0});
 s.addText('weekly = weekly.merge(\n    weekly_prices,\n    on=["store_id", "item_id", "week_start"],\n    how="left", validate="one_to_one"\n)',{x:6.78,y:1.83,w:5.8,h:1.24,fontFace:'Consolas',fontSize:14,color:C.navy,fill:{color:'FFF7E6'},line:{color:'F7C873',width:1},margin:0.14,fit:'shrink'});
 s.addText('3. Определяем понедельник и суммируем семь дней',{x:0.72,y:3.38,w:5.9,h:0.32,fontSize:17,bold:true,color:C.green,margin:0});
 s.addText('weekly = daily.groupby(\n    sales_id_columns + ["week_start"],\n    as_index=False, observed=True\n).agg(\n    weekly_units_sold=("units_sold", "sum")\n)',{x:0.72,y:3.8,w:7.0,h:1.62,fontFace:'Consolas',fontSize:14.5,color:C.navy,fill:{color:'EDF8F3'},line:{color:'B8DDCA',width:1},margin:0.14,fit:'shrink'});
 s.addText('Реальный недельный результат',{x:8.12,y:3.38,w:3.7,h:0.32,fontSize:17,bold:true,color:C.red,margin:0});
 s.addText('item_id:      FOODS_1_001\nstore_id:     CA_1\nweek_start:   2011-01-31\nweek_end:     2011-02-06\nunits sold:   9\nprice mean:   2.00\nevent:        SuperBowl',{x:8.12,y:3.8,w:4.45,h:1.84,fontFace:'Consolas',fontSize:15.5,color:C.navy,fill:{color:'FDECEC'},line:{color:'E6A2A2',width:1},margin:0.15,fit:'shrink'});
 addFooterTag(s,'Первые два дня d_1–d_2 исключены как неполная неделя; первая полная неделя начинается 31.01.2011.');
 notes(s,'После melt я присоединил календарь по d, а цены — по магазину, товару и ценовой неделе. Затем для каждой даты определил понедельник и сложил семь ежедневных значений.\nНапример, товар FOODS_1_001 в магазине CA_1 за неделю 31 января — 6 февраля был продан 9 раз; средняя цена была 2 доллара, и в календаре был SuperBowl.');
}

// 8 — timeline and feature-ready files
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Временной порядок защищает модель от будущих данных','7 • split и model-ready таблицы');
 const y=1.8;
 s.addShape(pptx.ShapeType.roundRect,{x:0.75,y,w:5.0,h:1.05,rectRadius:0.04,fill:{color:'E8F5EE'},line:{color:'9AD2B8'}});
 s.addText('TRAIN\n31.01.2011–27.03.2016',{x:0.95,y:y+0.18,w:4.6,h:0.58,fontSize:18,bold:true,color:C.green,align:'center',margin:0});
 s.addShape(pptx.ShapeType.roundRect,{x:5.9,y,w:2.45,h:1.05,rectRadius:0.04,fill:{color:'FFF7E6'},line:{color:'F7C873'}});
 s.addText('VALIDATION\n28.03–24.04',{x:6.1,y:y+0.18,w:2.05,h:0.58,fontSize:16.5,bold:true,color:'B66A00',align:'center',margin:0});
 s.addShape(pptx.ShapeType.roundRect,{x:8.5,y,w:2.35,h:1.05,rectRadius:0.04,fill:{color:'FDECEC'},line:{color:'E6A2A2'}});
 s.addText('TEST\n25.04–22.05',{x:8.7,y:y+0.18,w:1.95,h:0.58,fontSize:16.5,bold:true,color:C.red,align:'center',margin:0});
 s.addShape(pptx.ShapeType.roundRect,{x:11.0,y,w:1.6,h:1.05,rectRadius:0.04,fill:{color:C.pale},line:{color:'B9D7F2'}});
 s.addText('DEMO\n23–29.05',{x:11.12,y:y+0.18,w:1.36,h:0.58,fontSize:15,bold:true,color:C.blue,align:'center',margin:0,fit:'shrink'});
 arrow(s,5.76,2.32,5.88,2.32,C.muted); arrow(s,8.36,2.32,8.48,2.32,C.muted); arrow(s,10.86,2.32,10.98,2.32,C.muted);
 s.addText('После создания lag и rolling признаков',{x:0.8,y:3.42,w:4.6,h:0.34,fontSize:18,bold:true,color:C.navy,margin:0});
 s.addText('data/processed/m5_foods_features/\n├── train.parquet       2 888 944 строк\n├── validation.parquet     57 478 строк\n└── test.parquet           57 480 строк',{x:0.8,y:3.9,w:5.75,h:1.5,fontFace:'Consolas',fontSize:16,color:C.navy,fill:{color:'EEF4FA'},line:{color:'C9D9E8',width:1},margin:0.18,fit:'shrink'});
 s.addText('Что получает Random Forest',{x:7.0,y:3.42,w:4.1,h:0.34,fontSize:18,bold:true,color:C.green,margin:0});
 s.addText('20 числовых признаков:\n• прошлые продажи и rolling statistics;\n• цена и изменение цены;\n• год, месяц, неделя, квартал;\n• события и SNAP.\nTarget: weekly_units_sold',{x:7.0,y:3.9,w:5.3,h:1.72,fontSize:15.5,color:C.ink,fill:{color:'EDF8F3'},line:{color:'B8DDCA',width:1},margin:0.18,fit:'shrink'});
 addFooterTag(s,'Test не выбирал модель: Random Forest был зафиксирован по validation до открытия test target.');
 notes(s,'После недельной таблицы я создал лаги и rolling-признаки только из прошлых недель. Затем сохранил отдельные train, validation и test Parquet-файлы.\nМодель получает 20 числовых признаков, а правильный ответ — weekly_units_sold. Порядок времени не нарушается: validation выбирает модель, test только подтверждает результат.');
}

// 9 — audit cleaning
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Аудит и очистка — цепочка решений','3 • подготовка данных');
 const xs=[0.7,3.17,5.64,8.11,10.58]; const titles=['Проверить','Собрать неделю','Отфильтровать','Сохранить','Зафиксировать'];
 const bodies=['Схемы, пропуски, дубликаты, типы, отрицательные значения','Сумма 7 дней, цена, события и SNAP','Неполные недели и недели без действительной цены','Нули и выбросы как валидные наблюдения с флагом','Количество строк и причины каждого решения'];
 xs.forEach((x,i)=>{card(s,x,1.75,2.05,2.45,titles[i],bodies[i],[C.blue,C.cyan,C.orange,C.green,C.red][i]); if(i<4) arrow(s,x+2.06,2.9,x+2.42,2.9,C.muted);});
 s.addShape(pptx.ShapeType.roundRect,{x:1.0,y:4.65,w:11.3,h:1.15,rectRadius:0.05,fill:{color:'FFF7E6'},line:{color:'F7C873'}});
 s.addText('Главное решение',{x:1.3,y:4.93,w:2.1,h:0.32,fontSize:15,bold:true,color:'B66A00',margin:0});
 s.addText('Нулевой спрос и высокие продажи не удалялись автоматически: они отражают реальное поведение и анализировались отдельно.',{x:3.4,y:4.8,w:8.45,h:0.58,fontSize:15,bold:true,color:C.navy,margin:0.02,fit:'shrink'});
 addFooterTag(s,'Оригинальные CSV остались неизменными; обработанные данные воспроизводятся ноутбуками 01–02.');
 notes(s,'Сначала я проверил структуру всех файлов, пропуски, дубликаты, типы и недопустимые значения. Затем перевёл ежедневные продажи в недели.\nЯ исключил неполные недели и неактивные недели без цены. Нулевой спрос и высокие значения не удалял автоматически — они могут быть реальными. Все решения и количества строк записаны в отчётах.');
}

// 5 — leakage
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Как я защитил проект от утечки данных','4 • leakage-safe pipeline');
 const y=2.15;
 s.addShape(pptx.ShapeType.roundRect,{x:0.8,y,w:5.25,h:1.15,rectRadius:0.04,fill:{color:'E8F5EE'},line:{color:'9AD2B8'}});
 s.addText('TRAIN',{x:1.05,y:y+0.18,w:1.15,h:0.3,fontSize:18,bold:true,color:C.green,margin:0});
 s.addText('обучение признаков и модели',{x:2.18,y:y+0.2,w:3.45,h:0.3,fontSize:13,color:C.ink,margin:0});
 s.addShape(pptx.ShapeType.roundRect,{x:6.15,y,w:2.7,h:1.15,rectRadius:0.04,fill:{color:'FFF7E6'},line:{color:'F7C873'}});
 s.addText('VALIDATION',{x:6.42,y:y+0.18,w:2.15,h:0.3,fontSize:17,bold:true,color:'B66A00',align:'center',margin:0});
 s.addText('выбор модели',{x:6.48,y:y+0.62,w:2.0,h:0.25,fontSize:12,color:C.ink,align:'center',margin:0});
 s.addShape(pptx.ShapeType.roundRect,{x:8.95,y,w:3.55,h:1.15,rectRadius:0.04,fill:{color:'FDECEC'},line:{color:'E6A2A2'}});
 s.addText('PROTECTED TEST',{x:9.22,y:y+0.18,w:3.0,h:0.3,fontSize:17,bold:true,color:C.red,align:'center',margin:0});
 s.addText('одна финальная проверка',{x:9.25,y:y+0.62,w:2.95,h:0.25,fontSize:12,color:C.ink,align:'center',margin:0});
 arrow(s,6.02,2.73,6.12,2.73,C.muted); arrow(s,8.83,2.73,8.93,2.73,C.muted);
 card(s,0.8,4.05,3.7,1.45,'Прошлое → будущее','Хронологическое разделение вместо случайного перемешивания.',C.blue);
 card(s,4.82,4.05,3.7,1.45,'Только прошлые продажи','lag и rolling используют shift(1): текущий target не входит в свои признаки.',C.cyan);
 card(s,8.84,4.05,3.7,1.45,'Test не выбирает победителя','После test модель не настраивалась повторно.',C.red);
 addFooterTag(s,'Проверки: временной порядок, точность lag, дубликаты ключей, пропуски и доступность признаков.');
 notes(s,'Для временных данных случайное разделение дало бы нереалистичный результат. Поэтому сначала идёт train, затем более поздняя validation и только потом test.\nВсе rolling-признаки сдвинуты на одну неделю, поэтому текущие продажи не попадают во вход модели. Победитель выбран по validation, а test открыт один раз после фиксации Random Forest.');
}

// 6 — experiments
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Эксперименты: почему выбран Random Forest','5 • baseline и модели');
 s.addChart(pptx.ChartType.bar,[{name:'Validation MAE',labels:['4-week baseline','Linear Regression','Random Forest'],values:[4.517,4.766,4.270]}],{
   x:0.75,y:1.7,w:6.15,h:4.3,catAxisLabelFontSize:12,valAxisLabelFontSize:10,valAxisMinVal:0,valAxisMaxVal:5.2,
   showTitle:false,showLegend:false,showValue:true,showCatName:false,dataLabelPosition:'outEnd',dataLabelColor:C.navy,
   chartColors:[C.blue,C.orange,C.green],showCatName:false,showValue:true,showBorder:false,showGridLines:true,
   valGridLine:{color:'DCE6EF',width:1},catAxisLabelColor:C.ink,valAxisLabelColor:C.muted
 });
 card(s,7.35,1.75,5.05,1.2,'Baseline: 4.517 MAE','Среднее продаж за предыдущие четыре недели.',C.blue);
 card(s,7.35,3.15,5.05,1.2,'Linear Regression: 4.766','Простая модель не уловила нелинейные зависимости и была хуже baseline.',C.orange);
 card(s,7.35,4.55,5.05,1.2,'Random Forest: 4.270','Лучший validation MAE: улучшение относительно baseline на 5.48%.',C.green);
 addFooterTag(s,'Одинаковые split, 20 признаков и метрика; параметры и артефакты каждого запуска сохранены в MLflow.');
 notes(s,'Я сравнил три подхода на одном validation-периоде и по одной метрике. Baseline MAE равен 4,517. Linear Regression оказалась хуже — 4,766.\nRandom Forest получил 4,270 и улучшил baseline на 5,48 процента. Поэтому именно его я зафиксировал как финального кандидата.');
}

// 7 — final result
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Финальный результат на невидимых данных','6 • protected test');
 metric(s,0.8,1.75,2.55,'57 480','test-строк',C.blue);
 metric(s,3.65,1.75,2.55,'4.4179','Random Forest MAE',C.green);
 metric(s,6.5,1.75,2.55,'4.7874','baseline MAE',C.orange);
 metric(s,9.35,1.75,2.55,'7.72%','улучшение MAE',C.green);
 s.addShape(pptx.ShapeType.roundRect,{x:1.0,y:3.55,w:11.3,h:1.45,rectRadius:0.06,fill:{color:'E8F5EE'},line:{color:'9AD2B8'}});
 s.addText('Что означает MAE 4.4179?',{x:1.35,y:3.86,w:3.2,h:0.38,fontSize:18,bold:true,color:C.green,margin:0});
 s.addText('В среднем прогноз отличается от фактических недельных продаж примерно на 4.42 единицы товара.',{x:4.3,y:3.72,w:7.35,h:0.65,fontSize:17,bold:true,color:C.navy,margin:0.02,fit:'shrink'});
 s.addText('Дополнительная метрика: RMSE = 9.1329. Она сильнее штрафует крупные ошибки и показывает, что редкие сложные недели всё ещё важны.',{x:1.35,y:5.45,w:10.65,h:0.68,fontSize:14,color:C.ink,align:'center',margin:0.02,fit:'shrink'});
 addFooterTag(s,'Честный вывод: модель лучше baseline, но улучшение не отменяет анализ ошибок.');
 notes(s,'После выбора я переобучил зафиксированный Random Forest на train плюс validation и один раз проверил на 57 480 новых строках.\nMAE модели — 4,4179 против 4,7874 у baseline. Улучшение составило 7,72 процента. Простыми словами, средняя ошибка — около 4,42 единицы товара в неделю.');
}

// 8 — errors
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Где модель ошибается сильнее','7 • error analysis');
 metric(s,0.8,1.65,2.65,'76.08%','ошибок ≤ 5 единиц',C.green);
 metric(s,3.75,1.65,2.65,'2.34','медианная ошибка',C.blue);
 metric(s,6.7,1.65,2.65,'12.33','MAE при спросе 21+',C.red);
 metric(s,9.65,1.65,2.65,'−5.10','среднее недопредсказание 21+',C.red);
 card(s,0.8,3.35,3.65,1.55,'Слабый магазин','WI_2 имеет самый высокий test MAE среди магазинов.',C.orange);
 card(s,4.85,3.35,3.65,1.55,'Слабый отдел','FOODS_3 — самый сложный отдел по test MAE.',C.orange);
 card(s,8.9,3.35,3.65,1.55,'Главный риск','Во время всплесков модель склонна недооценивать спрос — возможен недостаток запасов.',C.red);
 s.addShape(pptx.ShapeType.roundRect,{x:1.5,y:5.45,w:10.3,h:0.72,rectRadius:0.04,fill:{color:'FFF7E6'},line:{color:'F7C873'}});
 s.addText('Решение: прогнозы высоких объёмов должны проходить human review.',{x:1.8,y:5.67,w:9.7,h:0.28,fontSize:17,bold:true,color:'9A5B00',align:'center',margin:0});
 addFooterTag(s,'Сохранены 25 конкретных худших случаев; ошибки не скрываются и не используются для повторной настройки test.');
 notes(s,'Средняя метрика скрывает слабые места. 76 процентов прогнозов находятся в пределах пяти единиц, но при фактическом спросе 21 и выше MAE растёт до 12,33.\nТакже модель в среднем недооценивает такие недели на 5,10 единицы. Поэтому прогнозы высокого спроса должны обязательно проверяться человеком.');
}

// 9 — feature importance
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Что использует Random Forest','8 • важность признаков');
 s.addChart(pptx.ChartType.bar,[{name:'Importance',labels:['sales_lag_1','roll mean 4','roll mean 8','sales_lag_2','остальные'],values:[50.41,35.15,6.65,4.93,2.86]}],{
  x:0.8,y:1.65,w:6.2,h:4.6,catAxisLabelFontSize:11,valAxisLabelFontSize:10,valAxisMinVal:0,valAxisMaxVal:60,
  showLegend:false,showValue:true,dataLabelPosition:'outEnd',dataLabelFormatCode:'0.0"%"',chartColors:[C.blue,C.cyan,C.orange,C.green,C.muted],
  showTitle:false,showBorder:false,showGridLines:true,valGridLine:{color:'DCE6EF',width:1}
 });
 card(s,7.45,1.7,4.95,1.3,'sales_lag_1','Продажи того же товара в том же магазине одну неделю назад.',C.blue);
 card(s,7.45,3.2,4.95,1.3,'sales_roll_mean_4','Средние продажи за четыре предыдущие недели; текущая неделя исключена.',C.cyan);
 card(s,7.45,4.7,4.95,1.3,'Важность ≠ причина','Модель чаще использует эти признаки, но это не доказывает причинное влияние.',C.red);
 addFooterTag(s,'Главный сигнал модели — недавняя история спроса; календарь и цена дополняют её.');
 notes(s,'Самые важные признаки — продажи неделю назад и среднее за четыре прошлые недели. Это логично: недавний спрос обычно лучше всего описывает следующий период.\nНо feature importance нельзя называть причинностью. Она только показывает, какие признаки модель чаще использовала для уменьшения ошибки.');
}

// 10 — demo
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Рабочий путь демонстрации','9 • end-to-end demo');
 const xs=[0.65,2.78,4.91,7.04,9.17,11.3]; const labs=['INPUT','VALIDATE','PREPROCESS','LOAD MODEL','PREDICT','EXPLAIN'];
 const subs=['20 признаков','ошибки и диапазоны','точный порядок полей','model.skops','недельный прогноз','значение и limits'];
 xs.forEach((x,i)=>{s.addShape(pptx.ShapeType.ellipse,{x,y:1.8,w:1.35,h:1.35,fill:{color:i===5?'FFF7E6':'EAF2FB'},line:{color:i===5?C.orange:C.blue,width:1.5}});s.addText(String(i+1),{x:x+0.42,y:2.08,w:0.5,h:0.35,fontSize:20,bold:true,color:i===5?C.orange:C.blue,align:'center',margin:0});s.addText(labs[i],{x:x-0.18,y:3.32,w:1.72,h:0.3,fontSize:12,bold:true,color:C.navy,align:'center',margin:0,fit:'shrink'});s.addText(subs[i],{x:x-0.25,y:3.7,w:1.86,h:0.42,fontSize:9.5,color:C.muted,align:'center',margin:0.01,fit:'shrink'});if(i<5)arrow(s,x+1.4,2.48,x+2.08,2.48,C.muted)});
 card(s,0.8,4.65,3.65,1.15,'Основной маршрут','Colab: открыть demo.ipynb и Run all.',C.blue);
 card(s,4.85,4.65,3.65,1.15,'Локальный маршрут','Flask UI: python -m src.app',C.cyan);
 card(s,8.9,4.65,3.65,1.15,'Проверка','21 тест + valid и invalid input.',C.green);
 addFooterTag(s,'Пример возвращает 10.4885 единицы; модель не переобучается при каждом запросе.');
 notes(s,'Для демонстрации я открываю demo.ipynb в Colab и запускаю все ячейки. Он устанавливает зависимости, загружает сохранённую модель и проверяет корректный и некорректный ввод.\nТот же inference core используется во Flask API и браузерном UI. При запросе модель только загружается и предсказывает — переобучения нет.');
}

// 11 — reproducibility / limits
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Воспроизводимость и границы применения','10 • responsible use');
 card(s,0.75,1.65,3.75,2.1,'Что проверено','Чистый GitHub clone\nНовая Python 3.10 среда\nУстановка requirements\n21 тест PASS\nТот же прогноз 10.4885',C.green);
 card(s,4.8,1.65,3.75,2.1,'Где не применять','Автоматические закупки без проверки\nДругой retailer без retraining\nУзбекистан без локальных данных\nСовременный рынок без нового test',C.red);
 card(s,8.85,1.65,3.75,2.1,'Что улучшить дальше','Локальные данные\nПромо и остатки на складе\nИнтервалы неопределённости\nМониторинг drift и retraining',C.blue);
 s.addShape(pptx.ShapeType.roundRect,{x:1.25,y:4.45,w:10.8,h:1.25,rectRadius:0.06,fill:{color:C.navy},line:{color:C.navy}});
 s.addText('Итог',{x:1.6,y:4.77,w:1.0,h:0.34,fontSize:18,bold:true,color:C.orange,margin:0});
 s.addText('Random Forest даёт полезное улучшение, но остаётся инструментом поддержки решения с human review.',{x:2.55,y:4.65,w:8.9,h:0.56,fontSize:18,bold:true,color:C.white,margin:0.02,fit:'shrink'});
 addFooterTag(s,'Проект готов к объяснению через доказательства: данные → решения → метрики → ошибки → ограничения.');
 notes(s,'Проект проверен в чистой среде: зависимости установились, demo выполнился без исходных CSV и локальной базы MLflow. После добавления проверки согласованности цен текущий набор из 21 теста также проходит полностью.\nОднако модель обучена на старых данных Walmart США. Для Узбекистана или другого магазина нужны местные данные, переобучение и новый хронологический test. Итог: это поддержка решения с human review.');
}

// 12 — close
{
 const s=pptx.addSlide('MASTER');
 s.background={color:C.navy};
 s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:7.5,fill:{color:C.navy},line:{color:C.navy}});
 s.addText('Спасибо',{x:0.85,y:1.05,w:5.0,h:0.8,fontSize:42,bold:true,color:C.white,margin:0});
 s.addText('Вопросы?',{x:0.87,y:1.95,w:4.6,h:0.55,fontSize:28,bold:true,color:C.orange,margin:0});
 s.addText('Decision  →  Evidence  →  Limitation',{x:0.9,y:3.0,w:6.2,h:0.48,fontSize:20,color:'C7DDFC',margin:0});
 card(s,7.55,1.05,4.65,1.25,'Главный результат','Test MAE 4.4179 • улучшение 7.72%',C.green);
 card(s,7.55,2.6,4.65,1.25,'Главный риск','Высокий спрос сложнее: MAE 12.33',C.red);
 card(s,7.55,4.15,4.65,1.25,'Главный вывод','Использовать с human review',C.orange);
 s.addText('GitHub: retail-demand-forecasting\nDemo: demo.ipynb / Flask UI',{x:0.9,y:5.65,w:6.0,h:0.7,fontSize:15,color:C.white,margin:0});
 notes(s,'Спасибо за внимание. Я готов ответить на вопросы о данных, защите от leakage, выборе Random Forest, метриках, ошибках и демонстрации.\nДля ответа я использую структуру: решение, затем доказательство из проекта, затем ограничение.');
}

pptx.writeFile({ fileName: out });
