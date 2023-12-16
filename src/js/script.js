// Função para inicializar a lista a partir do localStorage
function initializeList() {
  // Recupera a lista do localStorage
  let savedList = localStorage.getItem('shoppingList');

  // Se houver uma lista salva, atualiza o conteúdo da lista na página
  if (savedList) {
    document.querySelector('ol').innerHTML = savedList;
    // Adiciona novamente os manipuladores de eventos após a recarga da lista
    addEventListeners();
  }
}

// Adiciona a função de inicialização à carga da página
document.addEventListener('DOMContentLoaded', function () {
  initializeList();
  // Adiciona novamente os manipuladores de eventos após a recarga da página
  addEventListeners();
});

// Função para adicionar manipuladores de eventos após a recarga da página
function addEventListeners() {
  // Seleciona todos os botões de remoção e adiciona um manipulador de eventos
  let removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', deleteItem);
  });

  // Seleciona todos os itens da lista e adiciona um manipulador de eventos
  let listItems = document.querySelectorAll('ol li');
  listItems.forEach(item => {
    item.addEventListener('click', checkItem);
  });
}

let grocery = document.getElementById('grocery');
grocery.addEventListener('submit', addItem);

function addItem(e) {
  e.preventDefault();
  let data = this.elements.writeList.value;
  let list = document.querySelector('ol');
  let item = document.createElement('li');
  let text = document.createElement('p');

  // Adiciona o texto do formulário ao item da lista
  text.textContent = data;
  this.elements.writeList.value = "";
  item.append(text);
  list.append(item);

  let removeBtn = document.createElement('span');
  removeBtn.classList.add('remove');
  item.append(removeBtn);
  removeBtn.addEventListener('click', deleteItem);

  // Adiciona a imagem dentro do span
  let img = document.createElement('img');
  img.src = './src/img/trash-fill.png';
  img.alt = 'Icone Lixeira';
  removeBtn.append(img);

  item.addEventListener('click', checkItem);

  // Armazena a lista atualizada no localStorage
  updateLocalStorage();

  // Adiciona novamente os manipuladores de eventos após a adição do item
  addEventListeners();
}

function deleteItem(e) {
  // Remove o item pai (o <li>) ao clicar no botão de remoção
  this.parentElement.remove();
  // Atualiza o localStorage após excluir um item
  updateLocalStorage();
}

function checkItem(e) {
  // Alterna a classe 'check' para marcar/desmarcar um item
  this.classList.toggle('check');
  // Atualiza o localStorage após marcar/desmarcar um item
  updateLocalStorage();
}

// Função para atualizar o localStorage com a lista atual
function updateLocalStorage() {
  // Obtém o HTML da lista e armazena no localStorage
  let listHtml = document.querySelector('ol').innerHTML;
  localStorage.setItem('shoppingList', listHtml);
}

// Seleciona o botão de limpar
let clearListBtn = document.getElementById('clearListBtn');

// Adiciona um ouvinte de evento para o clique no botão de limpar
clearListBtn.addEventListener('click', function () {
  // Exibe uma mensagem de confirmação ao usuário
  let userConfirmation = confirm('Tem certeza de que deseja limpar toda a lista?');

  // Se o usuário confirmar, limpa a lista
  if (userConfirmation) {
    clearList();
  }
});

// Função para limpar toda a lista
function clearList() {
  // Seleciona a lista
  let list = document.querySelector('ol');

  // Remove todos os itens da lista
  list.innerHTML = '';

  // Atualiza o localStorage após limpar a lista
  updateLocalStorage();
}


