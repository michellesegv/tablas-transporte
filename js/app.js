const Table = (function () {
  const data = {
    tabsTables: document.querySelectorAll('nav ul li'),
    tablas: document.querySelectorAll('.tabla'),
    selects: document.querySelectorAll('.container-select'),
    opsSelect: document.querySelectorAll('.container-select ul li'),
    filters: document.querySelectorAll('.show-filters'),
    rowsContainers: document.querySelectorAll('.ctn-rows .first-row > div:first-child'),
    urlTable1: 'js/tabla_1.json',
    urlTable2: 'js/tabla_2.json',
    indexTabla1: [
      {
        id: "codigo",
        name: "Código"
      },
      {
        id: "expediente",
        name: "Expediente"
      },
      {
        id: "pais-origen",
        name: "País origen"
      },
      {
        id: "origen",
        name: "Origen"
      },
      {
        id: "destino",
        name: "destino"
      },
      {
        id: "largo-total",
        name: "Largo total"
      },
      {
        id: "ancho-total",
        name: "Ancho total"
      },
      {
        id: "alto-total",
        name: "Alto total"
      },
      {
        id: "peso-total",
        name: "Peso total"
      },
      {
        id: "vehiculo-apoyo",
        name: "Vehiculo Apoyo"
      },
      {
        id: "razon-social",
        name: "Razón social"
      },
      {
        id: "representante-legal",
        name: "Representante legal"
      },
      {
        id: "observacion",
        name: "Observación"
      },
      {
        id: "notificacion-observacion",
        name: "NotifObservación"
      }
      // ,
      // {
      //   id: "subsanado",
      //   name: "Subsanado"
      // },
      // {
      //   id: "notificacion-autorizacion",
      //   name: "Notificado Autorización"
      // },
      // {
      //   id: "especialista",
      //   name: "Especialista"
      // },
      // {
      //   id: "estado",
      //   name: "Estado"
      // }
    ],
    indexTabla2: [
      {
        id: "expediente",
        name: "Expediente"
      },
      {
        id: "fecha-exp",
        name: "Fecha Exp"
      },
      {
        id: "certificado",
        name: "Certificado"
      },
      {
        id: "placa",
        name: "Placa"
      },
      {
        id: "categoria",
        name: "Categoría"
      },
      {
        id: "tipo",
        name: "Tipo"
      },
      {
        id: "descripcion",
        name: "Descripción"
      },
      {
        id: "ruc",
        name: "RUC"
      },
      {
        id: "razon-social",
        name: "Razon Social"
      },
      {
        id: "tipo-doc-ident",
        name: "Tipo Doc. Indentifi"
      },
      {
        id: "representante-legal",
        name: "Representante Legal"
      },
      {
        id: "observacion",
        name: "Observación"
      },
      {
        id: "notificacion-observacion",
        name: "NotifObservación"
      },
      {
        id: "subsanado",
        name: "Subsanado"
      },
      {
        id: "permiso",
        name: "Permiso"
      },
      {
        id: "notificado",
        name: "Notificado"
      },
      {
        id: "especialista",
        name: "Especialista"
      },
      {
        id: "estado",
        name: "Estado"
      },
      {
        id: "accion",
        name: "Acción"
      },
    ]
  };

  const events = {
    onTabsTable: function (elem) {
      elem.addEventListener('click', (e) => {
        data.tabsTables.forEach((e) => { e.classList.remove('active') })
        data.tablas.forEach((e) => { e.classList.add('is-hidden') })
        e.target.classList.add('active')
        const table = e.target.getAttribute('datta-tabla')
        document.querySelector(`.${table}`).classList.remove('is-hidden')
      });
    },
    showMoreOptions: function (elem) {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const parent = e.target.closest('.more-ops')
        parent.classList.toggle('show')
      })
    },
    selectedOption: function (elem) {
      elem.addEventListener('click', (e) => {
        const text = e.target.innerText
        const textSelected = e.target.parentNode.parentNode.children[0].children[0]
        textSelected.innerText = text
      })
    },
    hideMoreOps: function () {
      document.addEventListener('click', (e) => {
        const moreOps = e.target.closest('.more-ops');
        
        moreOps == null ?
          document.querySelectorAll('.more-ops').forEach((e) => { e.classList.remove('show') }) : true
      })
    },
    showFilters: function (elem) {
      elem.addEventListener('click', (e) => {
        const elem = e.target
        const id = elem.parentNode.parentNode.parentNode.id
        document.querySelector(`#${id} .tbody`).classList.toggle('hide-inputs')
      })
    },
    showSubTabla: function (elem) {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();

        const elem = e.target
        const ctn = e.target.parentNode.parentNode

        ctn.classList.toggle('show-sub-tabla')
      })
    }
  };

  const methods = {
    queryAxios: function (_url, _callback) {
      axios.get(_url, {
        responseType: 'json'
      })
        .then(function (res) {
          if (res.status == 200) {
            let info = res.data.result
            _callback(info)
          }
        })
        .catch(function (err) {
          console.log(err)
        });
    },
    getDataTable: function (_url, _table, _index) {
      methods.queryAxios(_url, (data) => {
        if (data != null) {
          methods.makeTableBody(data, _table, _index)
          methods.makeTableHeader(_index, _table)
        }
        else
          console.log('error')
      });
    },
    makeTableBody: function (_data, _table, _index) {
      const tBody = document.querySelector(`.${_table} .table .tbody`)
      for (let i = 0; i < _data.length; i++) {
        let renderInput = i == 0 ? true : false

        renderInput ?
          rowInputs = document.createElement('div') : true

        let row = document.createElement('div')
        row.classList.add('ctn-rows')
        let subRow = document.createElement('div')
        subRow.classList.add('first-row')
        for (let y = 0; y < _index.length; y++) {
          if (renderInput) {
            let cellInput = document.createElement('div')
            cellInput.appendChild(document.createElement('input'))
            rowInputs.appendChild(cellInput)
          }
          let cell = document.createElement('div')
          let textCell = document.createTextNode(_data[i][_index[y].id])
          cell.appendChild(textCell)
          subRow.appendChild(cell)
          if (y == _index.length - 1) {
            subRow.appendChild(methods.makeOptions())
          }
        }
        renderInput ? tBody.appendChild(rowInputs) : true
        row.appendChild(subRow);
        row.appendChild(methods.makeSubTabla())
        tBody.appendChild(row);
      }

      document.querySelectorAll('.ctn-rows .first-row > div:first-child').forEach((e) => { events.showSubTabla(e) })
      document.querySelectorAll('.more-ops').forEach((e) => { events.showMoreOptions(e) })
    },
    makeTableHeader: function (_data, _table) {
      const lengthHeader = _data.length;
      const tHead = document.querySelector(`.${_table} .table .thead`)
      for (let i = 0; i < lengthHeader; i++) {
        let cell = document.createElement('div')
        let textCell = document.createTextNode(_data[i].name)

        cell.appendChild(textCell)
        tHead.appendChild(cell)

        if (i == lengthHeader - 1) {
          let cell = document.createElement('div')
          let textCell = document.createTextNode('Acción')
          cell.appendChild(textCell)
          tHead.appendChild(cell)
        }
      }
    },
    makeOptions: function () {
      let cell = document.createElement('div')
      cell.innerHTML = `<div class="more-ops">
                          <div class="circles">
                            <span>stop_circle</span>
                            <span>stop_circle</span>
                            <span>stop_circle</span>
                          </div>
                          <div>
                            <ul>
                              <li><span>chat_bubble_outline</span> Consultar</li>
                              <li><span>print</span>Imprimir</li>
                            </ul>
                          </div>
                        </div>`
      return cell
    },
    makeSubTabla: function () {
      let tabla = document.createElement('div')
      tabla.classList.add('ctn-sub-tabla')
      tabla.innerHTML = `<div class="sub-tabla">
      <div class="sub-tabla-thead">
        <div>Órden</div>
        <div>Documento</div>
        <div>TIPOLOGÍA DOCUMENTAL</div>
        <div>FECHA DOC</div>
        <div>FECHA INCORPORACIÓN</div>
        <div>FOLIOS</div>
        <div>PAG. INICIO - FIN</div>
        <div>FORMATO</div>
        <div>TAMAÑO</div>
        <div>ORIGEN</div>
        <div>ver</div>
      </div>
      <div class="sub-tabla-tbody">
        <div class="row">
          <div>1</div>
          <div>Solicitud de Autorización</div>
          <div>Solicitud</div>
          <div>10/10/2020</div>
          <div>10/10/2020</div>
          <div>2</div>
          <div>1 - 1</div>
          <div>web</div>
          <div>12kb</div>
          <div>Electrónico</div>
          <div><span>remove_red_eye</span></div>
        </div>
        <div class="row">
          <div>2</div>
          <div>Solicitud de Autorización</div>
          <div>Solicitud</div>
          <div>10/10/2020</div>
          <div>10/10/2020</div>
          <div>2</div>
          <div>1 - 1</div>
          <div>web</div>
          <div>12kb</div>
          <div>Electrónico</div>
          <div><span>remove_red_eye</span></div>
        </div>
        <div class="row">
          <div>3</div>
          <div>Solicitud de Autorización</div>
          <div>Solicitud</div>
          <div>10/10/2020</div>
          <div>10/10/2020</div>
          <div>2</div>
          <div>1 - 1</div>
          <div>web</div>
          <div>12kb</div>
          <div>Electrónico</div>
          <div><span>remove_red_eye</span></div>
        </div>
      </div>
    </div>`
      return tabla
    }
  };

  const initialize = function () {
    // Creando tablas en base al json
    methods.getDataTable(data.urlTable1, 'tabla-1', data.indexTabla1)
    methods.getDataTable(data.urlTable2, 'tabla-2', data.indexTabla2)

    // Evento de tabs
    data.tabsTables.forEach((e) => {
      events.onTabsTable(e)
    })

    // Evento para mostrar filtros 
    data.filters.forEach((e) => {
      events.showFilters(e)
    })

    events.hideMoreOps()
  };

  return {
    init: initialize
  };
})();

document.addEventListener(
  'DOMContentLoaded',
  function () {
    Table.init();
  },
  false
);
