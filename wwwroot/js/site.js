const uri = 'items';
let todos = [];

function getItems() {

  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addImageTextBox = document.getElementById('add-image');
  const addNameTextbox = document.getElementById('add-name');
  const addTeamTextbox = document.getElementById('add-team');
  const addPassCompletionsTextbox = document.getElementById('add-passCompletions');
  const addPassAttemptsTextbox = document.getElementById('add-passAttempts');
  const addPassingYardsTextbox = document.getElementById('add-passingYards');
  const addPassingTouchDownsTextbox = document.getElementById('add-passingTouchDowns');
  const addInterceptionsTextbox = document.getElementById('add-interceptions');
  const addRushingYardsTextbox = document.getElementById('add-rushingYards');
  const addRushingTouchDownsTextbox = document.getElementById('add-rushingTouchDowns');

  const item = {
    image: addImageTextBox.value,
    name: addNameTextbox.value.trim(),
    team: addTeamTextbox.value,
    passCompletions: addPassCompletionsTextbox.value,
    passAttempts: addPassAttemptsTextbox.value,
    passingYards: addPassingYardsTextbox.value,
    passingTouchDowns: addPassingTouchDownsTextbox.value,
    interceptions: addInterceptionsTextbox.value,
    rushingYards: addRushingYardsTextbox.value,
    rushingTouchDowns: addRushingTouchDownsTextbox.value,


  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addImageTextBox.value = '';
      addNameTextbox.value = '';
      addTeamTextbox.value = '';
      addPassCompletionsTextbox.value = '';
      addPassAttemptsTextbox.value = '';
      addPassingYardsTextbox.value = '';
      addPassingTouchDownsTextbox.value = '';
      addInterceptionsTextbox.value = '';
      addRushingYardsTextbox.value = '';
      addRushingTouchDownsTextbox.value = '';



    })
    .catch(error => console.error('Unable to add item.', error));
};

function deleteItem(event) {
  event.preventDefault();
  const providedId = event.target.dataset.itemId
  fetch(`${uri}/${providedId}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(event) {
  event.preventDefault();
  
  console.dir(event)
  console.dir(event.target)
  console.log(event.target.dataset)
  const providedId = event.target.dataset.itemId

  const item = todos.find(item => item.id === providedId);

  document.getElementById('edit-image').value = item.image;
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-team').value = item.team;
  document.getElementById('edit-passCompletions').value = item.passCompletions;
  document.getElementById('edit-passAttempts').value = item.passAttempts;
  document.getElementById('edit-passingYards').value = item.passingYards;
  document.getElementById('edit-passingTouchDowns').value = item.passingTouchDowns;
  document.getElementById('edit-interceptions').value = item.interceptions;
  document.getElementById('edit-rushingYards').value = item.rushingYards;
  document.getElementById('edit-rushingTouchDowns').value = item.rushingTouchDowns;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    image: document.getElementById('edit-image').value,
    name: document.getElementById('edit-name').value.trim(),
    team: document.getElementById('edit-team').value,
    passCompletions: document.getElementById('edit-passCompletions').value,
    passAttempts: document.getElementById('edit-passAttempts').value,
    passingYards: document.getElementById('edit-passingYards').value,
    passingTouchDowns: document.getElementById('edit-passingTouchDowns').value,
    interceptions: document.getElementById('edit-interceptions').value,
    rushingYards: document.getElementById('edit-rushingYards').value,
    rushingTouchDowns: document.getElementById('edit-rushingTouchDowns').value,
  };
  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));
  closeInput();
  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  //if statement (ternary statement) condition ? if : else
  const name = (itemCount === 1) ? 'Quarterback' : 'Quarterbacks';
  // What the ternary statement is doing:
  // let name;
  // if(itemCount === 1){
  //   name = 'catalog'
  // }else{
  //   name = 'catalogs'
  // }

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {

    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';
    isCompleteCheckbox.disabled = true;
    isCompleteCheckbox.checked = item.isComplete;

    // console.dir(isCompleteCheckbox)
    // console.log(isCompleteCheckbox)

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.dataset.itemId = item.id;

    editButton.addEventListener('click', displayEditForm)


    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.dataset.itemId = item.id;
    deleteButton.addEventListener('click', deleteItem)


    let tr = tBody.insertRow();

    let td1 = tr.insertCell(0);
    let imageNode = document.createElement("img");
    if(item.image == "" || item.image == null){
      imageNode.src = "/images/silho.png";
    }
    else{
      imageNode.src = item.image;
    }
    //imageNode.setAttribute("id", "images")
    td1.appendChild(imageNode);
    
    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.name);
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    let teamNode = document.createTextNode(item.team);
    td3.appendChild(teamNode);

    let td4 = tr.insertCell(3);
    let passCompletionsNode = document.createTextNode(item.passCompletions);
    td4.appendChild(passCompletionsNode);

    let td5 = tr.insertCell(4);
    let passAttemptsNode = document.createTextNode(item.passAttempts);
    td5.appendChild(passAttemptsNode);

    let td6 = tr.insertCell(5);
    let passingYardsNode = document.createTextNode(item.passingYards);
    td6.appendChild(passingYardsNode);

    let td7 = tr.insertCell(6);
    let passingTouchDownsNode = document.createTextNode(item.passingTouchDowns);
    td7.appendChild(passingTouchDownsNode);

    let td8 = tr.insertCell(7);
    let interceptionsNode = document.createTextNode(item.interceptions);
    td8.appendChild(interceptionsNode);

    let td9 = tr.insertCell(8);
    let rushingYardsNode = document.createTextNode(item.rushingYards);
    td9.appendChild(rushingYardsNode);

    let td10 = tr.insertCell(9);
    let rushingTouchDownsNode = document.createTextNode(item.rushingTouchDowns);
    td10.appendChild(rushingTouchDownsNode);

    let td11 = tr.insertCell(10);
    td11.appendChild(editButton);

    let td12 = tr.insertCell(11);
    td12.appendChild(deleteButton);
  });

  todos = data;
  
}