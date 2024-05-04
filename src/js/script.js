// Função para inicializar a lista a partir do localStorage
function initializeList() {
  // Recupera a lista do localStorage
  let savedList = localStorage.getItem('shoppingList');

  // Se houver uma lista salva, atualiza o conteúdo da lista na página
  if (savedList) {
      document.querySelector('ul').innerHTML = savedList;
      // Adiciona novamente os manipuladores de eventos após a recarga da lista
      addEventListeners();
  }
}

// Adiciona a função de inicialização à carga da página
document.addEventListener('DOMContentLoaded', function () {
  initializeList();
});

// Função para adicionar manipuladores de eventos após a recarga da página
function addEventListeners() {
  // Seleciona todos os botões de remoção e adiciona um manipulador de eventos
  let removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach(btn => {
      btn.addEventListener('click', deleteItem);
  });

  // Seleciona todos os itens da lista e adiciona os eventos de adição e subtração
  let listItems = document.querySelectorAll('ul li');
  listItems.forEach(item => {
      let minusButton = item.querySelector('.btn-number[data-type="minus"]');
      let plusButton = item.querySelector('.btn-number[data-type="plus"]');
      let inputField = item.querySelector('.input-number');

      minusButton.addEventListener('click', function() {
          updateQuantity(inputField, -1);
      });
      plusButton.addEventListener('click', function() {
          updateQuantity(inputField, 1);
      });
  });
}

// Função para adicionar um novo item à lista
let grocery = document.getElementById('grocery');
grocery.addEventListener('submit', addItem);

function addItem(e) {
  e.preventDefault();
  let data = this.elements.writeList.value;
  let list = document.querySelector('ul');
  let item = document.createElement('li');

  // Adiciona o conteúdo HTML do novo item
  item.innerHTML = `
      <div class="quantity-input">
          <button type="button" class="btn-number" id="minus" data-type="minus">-</button>
          <input type="text" name="quantidade" class="input-number" value="1" min="1" max="100">
          <button type="button" class="btn-number" id="plus" data-type="plus">+</button>
      </div>
      <p>${data}</p>
      <span class="remove"><img src="./src/img/trash-fill.png" alt="Icone Lixeira"></span>
  `;
  list.appendChild(item);

    // Limpa o campo de entrada
  this.elements.writeList.value = "";

  // Armazena a lista atualizada no localStorage
  updateLocalStorage();

  // Adiciona os eventos de adição e subtração ao novo item
  let minusButton = item.querySelector('.btn-number[data-type="minus"]');
  let plusButton = item.querySelector('.btn-number[data-type="plus"]');
  let inputField = item.querySelector('.input-number');

  minusButton.addEventListener('click', function() {
      updateQuantity(inputField, -1);
  });
  plusButton.addEventListener('click', function() {
      updateQuantity(inputField, 1);
  });
  
  // Adiciona o evento de remoção ao novo item
  let removeBtn = item.querySelector('.remove');
  removeBtn.addEventListener('click', deleteItem);
}

function deleteItem(e) {
  // Remove o item pai (o <li>) ao clicar no botão de remoção
  this.parentElement.remove();
  // Atualiza o localStorage após excluir um item
  updateLocalStorage();
}

// Função para atualizar o valor do campo de entrada de quantidade
function updateQuantity(input, value) {
  let currentValue = parseInt(input.value);
  let newValue = currentValue + value;

  // Verifica se o novo valor está dentro dos limites min e max
  if (newValue >= parseInt(input.min) && newValue <= parseInt(input.max)) {
      input.value = newValue;
      // Dispara o evento 'change' para que o localStorage seja atualizado
      input.dispatchEvent(new Event('change'));
  }
}

// Função para atualizar o localStorage com a lista atual
function updateLocalStorage() {
  // Obtém o HTML da lista e armazena no localStorage
  let listHtml = document.querySelector('ul').innerHTML;
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
  let list = document.querySelector('ul');

  // Remove todos os itens da lista
  list.innerHTML = '';

  // Atualiza o localStorage após limpar a lista
  updateLocalStorage();
}

// Chamada inicial para adicionar manipuladores de eventos
addEventListeners();