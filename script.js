// script.js

// Importar a classe de calculadora
import { Calculator } from "./calculator.js";

// Variáveis globais
var history = [];
var showAllHistory = false;

/**
 * Trata o evento de cálculo e realiza as operações necessárias.
 */
const calculateHandle = (event) => {
  // Previnir o comportamento padrão do formulário
  event.preventDefault();

  // Pegar os valores do formulário
  let number1 = document.querySelector("#number1").value;
  let number2 = document.querySelector("#number2").value;
  let operator = document.querySelector("#operator").value;
  let result = document.querySelector("#result");

  // Verificar se os campos foram preenchidos
  if (number1 === "" || number2 === "" || operator === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Criar um objeto de operação
  const operation = {
    number1,
    number2,
    operator,
  };

  // Criar um objeto de calculadora
  const calculator = new Calculator(operation);

  // Realizar a operação
  calculator.calculate();

  // Verificar se o resultado é um número
  let resultIsNumber = typeof calculator.result === "number";

  // Atualizar o campo de resultado e o histórico
  if (resultIsNumber) {
    // Se o resultado é um número, mostrar o resultado
    let calculated = `${number1} ${operator} ${number2} = ${calculator.result}`;

    // Atualizar o campo de resultado
    result.value = calculated;

    // Verificar se o novo valor é igual ao último valor do histórico
    if (history.length === 0 || history[0] !== calculated) {
      // Atualizar o histórico usando o spread operator
      history = [calculated, ...history];
    }

    // Atualizar a exibição do histórico
    updateHistoryDisplay();
  } else {
    // Se o resultado não é um número, mostrar uma mensagem de erro
    result.value = calculator.result;
  }
};

/**
 * Função para mostrar mais ou menos histórico
 */
const updateHistoryDisplay = () => {
  const historyElement = document.querySelector("#history");
  const recentHistory = showAllHistory ? history : history.slice(0, 5);
  historyElement.innerHTML = recentHistory
    .map((item) => `<li>${item}</li>`)
    .join("");
  document.querySelector("#showMoreButton").textContent = showAllHistory
    ? "Mostrar menos (-)"
    : "Mostrar mais (+)";

  // Habilitar ou desabilitar o botão "Mostrar mais/menos"
  if (history.length > 5) {
    showMoreButton.disabled = false;
    showMoreButton.textContent = showAllHistory
      ? "Mostrar menos (-)"
      : "Mostrar mais (+)";
  } else {
    showMoreButton.disabled = true;
  }

  // Habilitar ou desabilitar o botão "Limpar Histórico"
  resetButton.disabled = history.length === 0;
};

/**
 * Função para limpar os campos do formulário
 */
const clearFields = () => {
  document.querySelector("#number1").value = "";
  document.querySelector("#number2").value = "";
  document.querySelector("#operator").value = "";
  document.querySelector("#result").value = "";
};

/**
 * Função para mostrar ou ocultar o histórico
 */
function toggleHistoryDisplay() {
  showAllHistory = !showAllHistory;
  updateHistoryDisplay();
}

/**
 * Função para limpar o historico
 */
const resetHistory = () => {
  history = [];
  updateHistoryDisplay();
};

/**
 * Quando a janela carregar, configure os ouvintes de eventos
 */
window.onload = () => {
  // Adicione o ouvinte de eventos para o botão "Calcular"
  document
    .querySelector("#calculateButton")
    .addEventListener("click", calculateHandle);

  // Adicione o ouvinte de eventos para o botão "Limpar"
  document.querySelector("#clearButton").addEventListener("click", clearFields);

  // Adicione o ouvinte de eventos para o botão "Limpar Histórico"
  document
    .querySelector("#resetButton")
    .addEventListener("click", resetHistory);

  // Adicione o ouvinte de eventos para o botão "Mostrar mais"
  document
    .querySelector("#showMoreButton")
    .addEventListener("click", toggleHistoryDisplay);
};
