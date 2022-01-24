const natFourAccordion = document.querySelector("#natFours");
createDefenses(counterData);
createOffenses(counterData);

function createOffenses(jsonData) {
  const section = document.querySelector("#offenses");

  for (const offenseDataObject of jsonData.offenses) {
    const accordionHeader = createOffenseAccordion(offenseDataObject);
    section.appendChild(accordionHeader);
  }
  
  
}

function createOffenseAccordion(offenseDataObject) {
  const [monster1, monster2, monster3] = offenseDataObject.monsters;

  const accordionItem = document.createElement("div");
  accordionItem.classList.add("accordion-item");

  const header = document.createElement("h2");
  header.classList.add("accordion-header");
  header.id = `${monster1}-${monster2}-${monster3}-off`;

  const button = document.createElement("button");
  button.classList.add("accordion-button");
  button.classList.add("collapsed");
  button.type = "button";
  button.dataset.bsToggle = "collapse";
  button.dataset.bsTarget = `#${monster1}-${monster2}-${monster3}-offense`;
  button.ariaExpanded = "false";
  button.setAttribute("aria-controls", `${monster1}-${monster2}-${monster3}-offense`);

  const images = createImages(monster1, monster2, monster3);

  const p = document.createElement("p");
  const capitalized1 = monster1[0].toUpperCase() + monster1.slice(1);
  const capitalized2 = monster2[0].toUpperCase() + monster2.slice(1);
  let capitalized3 = "";
  if (monster3.includes("_")) {
    const separated = monster3.split("_");
    for (let i = 0; i < separated.length; i++) {
      capitalized3 += separated[i][0].toUpperCase() + separated[i].slice(1);
      if (i % 2 == 0) {
        capitalized3 += "/"
      }
    } 
  } else {
    capitalized3 = monster3[0].toUpperCase() + monster3.slice(1);
  }
  p.innerText = `${capitalized1} ${capitalized2} ${capitalized3}`;

  for (const img of images) {
    button.appendChild(img);
  }
  button.appendChild(p);

  header.appendChild(button);
  accordionItem.appendChild(header);

  const details = document.createElement("div");
  details.id = `${monster1}-${monster2}-${monster3}-offense`;
  details.classList.add("accordion-collapse");
  details.classList.add("collapse");
  details.setAttribute("aria-labelledby", `${monster1}-${monster2}-${monster3}-off`);
  details.dataset.bsParent = `#${monster1}-${monster2}-${monster3}-off`;

  const detailBody = document.createElement("div");
  detailBody.classList.add("accordion-body");

  const detailP = document.createElement("p");
  detailP.innerText = offenseDataObject.description;

  detailBody.appendChild(detailP);
  
  if (offenseDataObject.goodAgainst) {
    const div = document.createElement("div");
    div.classList.add("good-against");
    const h6 = document.createElement("h6");
    h6.innerText = "Good against:"
    div.appendChild(h6);

    for (const team of offenseDataObject.goodAgainst) {
      const row = document.createElement("p");
      const images = createImages(...team.split(" "))
      for (const img of images) {
        row.appendChild(img);
      }
      div.appendChild(row);
    }
    detailBody.appendChild(div);
  }
  
  details.appendChild(detailBody);
  accordionItem.appendChild(details);
  
  return accordionItem;
}

function createDefenses(jsonData) {
  const section = document.querySelector("#natFours");

  for (const defenseDataObject of jsonData.defenses) {
    const accordionHeader = createAccordionHeader(defenseDataObject);
    const counters = createCounters(defenseDataObject);
    accordionHeader.appendChild(counters);
    section.appendChild(accordionHeader);
  }
}

function createAccordionHeader(defenseDataObject) {
  const [monster1, monster2, monster3] = defenseDataObject.monsters;
  
  const accordionItem = document.createElement("div");
  accordionItem.classList.add("accordion-item");

  const header = document.createElement("h2");
  header.classList.add("accordion-header");
  header.id = `${monster1}-${monster2}-${monster3}`;

  const button = document.createElement("button");
  button.classList.add("accordion-button");
  button.classList.add("collapsed");
  button.type = "button";
  button.dataset.bsToggle = "collapse";
  button.dataset.bsTarget = `#${monster1}-${monster2}-${monster3}-counters`;
  button.ariaExpanded = "false";
  button.setAttribute("aria-controls", `${monster1}-${monster2}-${monster3}-counters`);

  const img1 = document.createElement("img");
  img1.src = `images/thumbs/${monster1}.webp`;
  img1.alt = monster1[0].toUpperCase() + monster1.slice(1);
  img1.classList.add("mon-image-sm");

  const img2 = document.createElement("img");
  img2.src = `images/thumbs/${monster2}.webp`;
  img2.alt = monster2[0].toUpperCase() + monster2.slice(1);
  img2.classList.add("mon-image-sm");

  const img3 = document.createElement("img");
  img3.src = `images/thumbs/${monster3}.webp`;
  img3.alt = monster3[0].toUpperCase() + monster3.slice(1);
  img3.classList.add("mon-image-sm");

  const p = document.createElement("p");
  const capitalized1 = monster1[0].toUpperCase() + monster1.slice(1);
  const capitalized2 = monster2[0].toUpperCase() + monster2.slice(1);
  const capitalized3 = monster3[0].toUpperCase() + monster3.slice(1);
  p.innerText = `${capitalized1} ${capitalized2} ${capitalized3}`;

  button.appendChild(img1);
  button.appendChild(img2);
  button.appendChild(img3);
  button.appendChild(p);

  header.appendChild(button);
  accordionItem.appendChild(header);
  return accordionItem;
}

function createCounters(defenseDataObject) {
  const counterArray = defenseDataObject.counters;

  const counterHeaders = createCounterHeader(...defenseDataObject.monsters);


  for (let i = 0; i < counterArray.length; i++) {
    const counter = counterArray[i];
    const counterItem = createCounterItem(counter, i, ...defenseDataObject.monsters); 
    counterHeaders[2].appendChild(counterItem);
  }

  counterHeaders[1].appendChild(counterHeaders[2]);
  counterHeaders[0].appendChild(counterHeaders[1]);
  return counterHeaders[0];
}

function createCounterHeader(monster1, monster2, monster3) {
  const div = document.createElement("div");
  div.id = `${monster1}-${monster2}-${monster3}-counters`;
  div.classList.add("accordion-collapse");
  div.classList.add("collapse");
  div.setAttribute("aria-labelledby", `${monster1}-${monster2}-${monster3}`);
  div.dataset.bsParent = "#natFours";

  const body = document.createElement("div");
  body.classList.add("accordion-body");

  const accordion = document.createElement("div");
  accordion.classList.add("accordion");
  accordion.id = `inside-${monster1}-${monster2}-${monster3}-counters`;

  body.appendChild(accordion);
  return [div, body, accordion];
}

function createCounterItem(counter, idx, monster1, monster2, monster3) {
  const [counter1, counter2, counter3] = counter.monsters;
  
  const accordionItem = document.createElement("div");
  accordionItem.classList.add("accordion-item");

  const header = document.createElement("h2");
  header.classList.add("accordion-header");
  header.id = `${monster1}-${monster2}-${monster3}-counter-${idx}`;

  const button = document.createElement("button");
  button.classList.add("accordion-button");
  button.classList.add("collapsed");
  button.type = "button";
  button.dataset.bsToggle = "collapse";
  button.dataset.bsTarget = `#${monster1}-${monster2}-${monster3}-counter-${idx}-info`;
  button.ariaExpanded = "false";
  button.setAttribute("aria-controls", `${monster1}-${monster2}-${monster3}-counter-${idx}-info`);

  const images = createImages(counter1, counter2, counter3);

  const p = document.createElement("p");
  const capitalized1 = counter1[0].toUpperCase() + counter1.slice(1);
  const capitalized2 = counter2[0].toUpperCase() + counter2.slice(1);
  const capitalized3 = counter3[0].toUpperCase() + counter3.slice(1);
  p.innerText = `${capitalized1} ${capitalized2} ${capitalized3}`;

  for (const img of images) {
    button.appendChild(img);
  }
  button.appendChild(p);

  header.appendChild(button);
  accordionItem.appendChild(header);

  const details = document.createElement("div");
  details.id = `${monster1}-${monster2}-${monster3}-counter-${idx}-info`;
  details.classList.add("accordion-collapse");
  details.classList.add("collapse");
  details.setAttribute("aria-labelledby", `${monster1}-${monster2}-${monster3}-counter-${idx}`);
  details.dataset.bsParent = `#inside-${monster1}-${monster2}-${monster3}-counters`;

  const detailBody = document.createElement("div");
  detailBody.classList.add("accordion-body");

  const detailP = document.createElement("p");
  detailP.innerText = counter.description;

  detailBody.appendChild(detailP);
  details.appendChild(detailBody);
  accordionItem.appendChild(details);

  return accordionItem;
}

function createImages(counter1, counter2, counter3) {
  let img1 = [];
  if (counter1.includes("/")) {
    let separated = counter1.split("/");
    for (let i = 0; i < separated.length; i++) {
      const mon = separated[i];
      img1.push(createImage(mon));
      if (i % 2 == 0) {
        const separator = document.createElement("p");
        separator.innerText = " or  "
        img1.push(separator);
      }
    }
  } else if (counter1.includes("_")) {
    let separated = counter1.split("_");
    for (let i = 0; i < separated.length; i++) {
      const mon = separated[i];
      img1.push(createImage(mon));
      if (i % 2 == 0) {
        const separator = document.createElement("p");
        separator.innerText = " or  "
        img1.push(separator);
      }
    }
  } else {
    img1.push(createImage(counter1));
  }

  let img2 = [];
  if (counter2.includes("/")) {
    let separated = counter2.split("/");
    for (let i = 0; i < separated.length; i++) {
      const mon = separated[i];
      img2.push(createImage(mon));
      if (i % 2 == 0) {
        const separator = document.createElement("p");
        separator.innerText = " or  "
        img2.push(separator);
      }
    }
  } else if (counter2.includes("_")) {
    let separated = counter2.split("_");
    for (let i = 0; i < separated.length; i++) {
      const mon = separated[i];
      img2.push(createImage(mon));
      if (i % 2 == 0) {
        const separator = document.createElement("p");
        separator.innerText = " or  "
        img2.push(separator);
      }
    }
  } else {
    img2.push(createImage(counter2));
  }

  let img3 = [];
  if (counter3.includes("/")) {
    let separated = counter3.split("/");
    for (let i = 0; i < separated.length; i++) {
      const mon = separated[i];
      img3.push(createImage(mon));
      if (i % 2 == 0) {
        const separator = document.createElement("p");
        separator.innerText = " or  "
        img3.push(separator);
      }
    }
  } else if (counter3.includes("_")) {
    let separated = counter3.split("_");
    for (let i = 0; i < separated.length; i++) {
      const mon = separated[i];
      img3.push(createImage(mon));
      if (i % 2 == 0) {
        const separator = document.createElement("p");
        separator.innerText = " or  "
        img3.push(separator);
      }
    }
  } else {
    img3.push(createImage(counter3));
  }

  return [...img1, ...img2, ...img3]
}

function createImage(counter) {
  const img = document.createElement("img");
  img.src = `images/thumbs/${counter}.webp`;
  img.alt = counter[0].toUpperCase() + counter.slice(1);
  img.classList.add("mon-image-sm");
  return img;
}
