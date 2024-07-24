import XLSX from 'xlsx-js-style';
import categories from '../constants/categories';
import dayjs from 'dayjs';

const exportMachineListToXlsx = (machines) => {
  const wb = XLSX.utils.book_new();
  const appendData = [];
  const rowHeights = [];

  const alignCenter = { vertical: "center" };
  const headerStyle = { font: { bold: true, color: { rgb: "000" } }, fill: { fgColor: { rgb: "EF9904" } }, alignment: { ...alignCenter, horizontal: "center" } }

  const headers = [
    "Kateqori",
    "Alt Kateqori",
    "Üretim Tarihi",
    "Durum",
    "Fiyat",
    "Açıklama"
  ]

  const firstHeaderRow = headers.map(header => ({ v: header, t: 's', s: headerStyle }));

  appendData.push(firstHeaderRow);
  rowHeights[0] = { hpx: 30 };

  machines.forEach((machine, index) => {
    const category = categories.find(x => x.value === machine.categoryId);
    const subcategoryLabel = category?.subcategories.find(x => x.value === machine.subcategoryId)?.label;
    const manufacturingDate = dayjs(machine?.manufacturingDate).format('DD/MM/YYYY');

    const row = [
      { v: category?.label, t: 's', s: { alignment: alignCenter } },
      { v: subcategoryLabel, t: 's', s: { alignment: alignCenter } },
      { v: manufacturingDate, t: 's', s: { alignment: alignCenter } },
      { v: machine.status, t: 's', s: { alignment: alignCenter } },
      { v: machine.price, t: 'n', s: { alignment: alignCenter } },
      { v: machine.description, t: 's', s: { alignment: alignCenter } }
    ];

    appendData.push(row);
  })

  const ws = XLSX.utils.aoa_to_sheet(appendData);
  const cols = [{ wpx: 150 }, { wpx: 150 }, { wpx: 150 }, { wpx: 150 }, { wpx: 150 }, { wpx: 300 }];

  ws['!cols'] = cols

  XLSX.utils.book_append_sheet(wb, ws, "Makine Listesi");
  XLSX.writeFile(wb, "Makine Listesi.xlsx");


};

export default exportMachineListToXlsx;