import mainObject from './variables.js';
import aditionalObject from './variables.js';

var state = { options: [], firstBlock: [] };

const onDocumentReady = () => {
  state.options = new Map();
  state.firstBlock = new Map();

  createComponent(mainObject.plastikkarten);
};

document.addEventListener("DOMContentLoaded", onDocumentReady);

const createComponent = inputObject => {
  state.options.set(inputObject.id, inputObject.name);

  if (inputObject.type === "select") {
    createSelect(inputObject);

  } else if (inputObject.type === "input") {
    createInput(inputObject);

    if (inputObject.nextShownElement !== undefined) {
      createComponent(mainObject[inputObject.nextShownElement]);
    }
  } else if (inputObject.type === "lastEl") {
    if (inputObject.nextShownElement !== undefined && (inputObject.name !== "UntenLinks" && inputObject.name !== "ObenLinks" && inputObject.name !== "UntenRechts" && inputObject.name !== "ObenRechts")) {
      let str = inputObject.nextShownElement;
      createComponent(mainObject[`${inputObject.nextShownElement}`]);
    }

    if (state.options.has("blanko")) { //if blanko show austragsdaten
      console.log("BLANKOOOO INTO MAP");
    } else {
      createNecessarilyBlock(mainObject[inputObject.nextShownElement]);
    }

  } else if (inputObject.type === "block") {
    createBlock(inputObject);
  }
};

const addHiddenOption = inputObject => {
  let variables = inputObject.options.map(item => mainObject[`${item}`].type === "defaultSelected");
  if (variables.includes(true)) {
    return "";
  } else {
    return "<option selected disabled hidden>---Select item---</option>";
  }
};

const addTypeForInput = inputObject => {
  if (inputObject.inputType === "text") {
    return `type="${inputObject.inputType}"`;
  } else if (inputObject.inputType === "checkbox") {
    return `type="${inputObject.inputType}" onclick="showCheckboxesSelect()" value="${inputObject.name}"`;
  } else if (inputObject.inputType === "number") {
    return `type="${inputObject.inputType}" min="${inputObject.min}"`;
  } else if (inputObject.inputType === "file") {
    return `type="${inputObject.inputType}" accept=".csv"`;
  }
}

const createSelect = inputObject => {
  let div = document.createElement("div"), inputObjName = inputObject.name,
    elementToAppend = document.querySelector(`${inputObject.appendTo}`);
  div.id = inputObjName;

  div.innerHTML = `<label class="col-md-6">${inputObject.labelName}:</label>
  <select class="${inputObjName} col-md-6 form-control"> ${addHiddenOption(inputObject)}
  ${inputObject.options.map(item => `<option value="${mainObject[`${item}`].name}">
  ${mainObject[`${item}`].optionName}</option>`)}</select>`;

  elementToAppend.append(div);

  let select = document.querySelector(`.${inputObjName}`);
  select.addEventListener("change", function (event) {
    onSelect(select.value, event);
  });
};

const createInput = inputObject => {
  let div = document.createElement("div"), elementToAppend = document.querySelector(`${inputObject.appendTo}`),
    inputObjName = inputObject.name;
  div.id = inputObjName;
  div.innerHTML = `<label class="col-md-6">${inputObject.labelName}:</label>
  <input class="${inputObjName} col-md-6" ${addTypeForInput(inputObject)} required \/>`;

  elementToAppend.append(div);

  /* don't sure if we need eventListener on input, maybe we can add method for writing element to the state */
  // let input = document.querySelector(`.${inputObjName}`);
  // input.addEventListener("change", function () {
  //   onClickInput(event);
  // });
};

const checkState = inputObject => {
  if (state.options.has(inputObject.id)) {
    let size = state.options.size;
    for (let i = inputObject.id; i <= size; i++) {
      if (document.querySelector("#" + state.options.get(i)) !== null) {
        document.querySelector("#" + state.options.get(i)).remove();
      }
      state.options.delete(i);
    }
  }
};

const createNecessarilyBlock = inputObject => {
  console.log("createNecessarilyBlock " + inputObject.name);

  let div = document.createElement("div"), elementToAppend = document.querySelector(`${inputObject.appendTo}`);
  div.id = inputObject.name;
  //div.className = "col-md-12";
  elementToAppend.append(div);

  inputObject.options.map(item => createBlock(mainObject[item]));
  state.firstBlock.set(inputObject.name, inputObject.options);
};

const createBlock = inputObject => {
  console.log("createBlock " + inputObject.name);
  let div = document.createElement("div"), elementToAppend = document.querySelector(`${inputObject.appendTo}`);

  div.id = inputObject.name;
  div.innerHTML = `<hr/><h3>${inputObject.labelName}</h3>`;
  div.className = "col-md-12";
  elementToAppend.append(div);

  state.firstBlock.set(inputObject.name, inputObject.options);

  inputObject.options.map(function (item) {
    div = document.createElement("div");
    div.id = mainObject[item].name;

    if (mainObject[item].type == "select") {
      div.innerHTML = `<label class="col-md-6">${mainObject[item].labelName}:</label>
      <select class="${inputObject.name} col-md-6 form-control"> ${addHiddenOption(inputObject)}
      ${mainObject[item].options.map(newItem => `<option value="${mainObject[`${newItem}`].name}">
      ${mainObject[`${newItem}`].optionName}</option>`)}</select>`;

    } else if (mainObject[item].type == "input") {
      if (mainObject[item].inputType == "checkbox") {
        elementToAppend = document.querySelector(`${mainObject[item].appendTo}`)
        div.innerHTML = `<input ${addTypeForInput(mainObject[item])} \/>
        <label for="${mainObject[item].name}" class="label-pad">${mainObject[item].labelName}</label>`
      } else {
        div.className = "col-md-6";
        div.innerHTML = `<label>${mainObject[item].labelName}:</label>
        <input class="${mainObject[item].name}" ${addTypeForInput(mainObject[item])} required \/>`;
      }
    }

    elementToAppend.append(div);
    state.firstBlock.set(item.name, item.options);

    let input = document.querySelector(`.${mainObject[item].name}`);
    if (!input === null) {
      input.addEventListener("click", function () {
        onSelectForNecessarlyBlock(mainObject[item].nextShownElement);
      });
    }
  });
}

const onSelectForNecessarlyBlock = name => {
  console.log("onSelectForNecessarlyBlock " + name);
  checkState(mainObject[name]);
  createNecessarilyBlock(mainObject[name]);
};

const onSelect = name => {
  checkState(mainObject[name]);
  createComponent(mainObject[name]);
};

const onClickInput = event => {
  let inputName = mainObject[event.target.classList[0]];
  checkState(inputName);
  createComponent(mainObject[inputName.nextShownElement]);
};

const showCheckboxesSelect = name => {
  console.log("showCheckboxesSelect " + name);
}