const excelElements = (function() {
  let excelRowspan = 0;
  let excelLetters = 0;

  function letterOrder() {
    return {
      english: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split(""),
      spanish: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("")
    };
  }

  function setTable(table, rows, cols) {
    if (rows) {
      addToTable(table, rows).row();
    }
    if (cols) {
      addToTable(table, cols).column();
    }
  }

  function repeat(times, func) {
    for (let i = 0; i < times; i++) {
      func(i);
    }
  }

  function adjustColspan(parent) {
    document
      .getElementById("addSheets")
      .setAttribute("colspan", parent.children[0].children.length - 2); //
  }

  function addToTable(parent, times) {
    const _parent = parent.children[0];
    adjustColspan(_parent);
    function row() {
      repeat(times, () => {
        const _tr = document.createElement("tr");
        _parent.insertBefore(
          _tr,
          _parent.children[_parent.children.length - 1]
        );
        addItems(_parent, _tr);
      });
    }

    
  function addItems(parent, row) {
    for (let i = 0; i < parent.children[0].children.length - 1; i += 1) {
      let item;
      if (i > 0) {
        item = document.createElement("td");
        item.setAttribute("contenteditable", "true");
      } else {
        item = document.createElement("th");
        item.innerText = parent.children.length - 2;
      }
      row.appendChild(item);
    }
  }

    function column() {
      repeat(times, j => {
        repeat(_parent.children.length - 1, i => {
          if (i > 0) {
            const _td = document.createElement("td");
            _td.setAttribute("contenteditable", "true");
            _parent.children[i].appendChild(_td);
          } else {
            const _tdAmount = _parent.children[0].children.length - 2;
            const _th = document.createElement("th");
            _th.innerText = letterOrder().english[excelRowspan].toUpperCase();
            _parent.children[i].insertBefore(
              _th,
              _parent.children[0].children[_tdAmount + 1]
            );
            excelRowspan++;
            if (excelLetters) _th.innerText += rowspanLetters;
            if (excelRowspan >= letterOrder().english.length) {
              excelRowspan = 0;
              rowspanLetters++;
            }
          }
          adjustColspan(_parent);
        });
      });
    }
    return {
      row: row,
      column: column
    };
  }


  return {
    letterOrder: letterOrder,
    addToTable: addToTable,
    setTable: setTable
  };
})();

//Table excel elements
const tableExcel = document.getElementById('tableContainer');
const addButton = {
  addColspan: document.getElementById('addColspan'),
  addRowspan: document.getElementById('addRowspan'),
};
excelElements.setTable(tableExcel, 10, 15);
addButton.addRowspan.addEventListener('click',excelElements.addToTable(tableExcel, 1).row);
addButton.addColspan.addEventListener('click', excelElements.addToTable(tableExcel, 1).column);