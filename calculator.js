// calculator.js
class Calculator {
  /**
   * Inicializa uma nova instância da classe Calculator.
   */
  constructor({ number1 = 0, number2 = 0, operator = "" } = {}) {
    this.number1 = Number(number1);
    this.number2 = Number(number2);
    this.operator = operator;
    this.result = result;
  }

  /**
   * Realiza uma operação matemática com base no operador e números fornecidos.
   */
  calculate() {
    // Verificar se os campos foram preenchidos
    if (
      this.number1 !== null &&
      this.number1 !== undefined &&
      this.number2 !== null &&
      this.number2 !== undefined
    ) {
      // Realizar a operação com base no operador
      switch (this.operator) {
        case "+":
          this.result = this.number1 + this.number2;
          break;
        case "-":
          this.result = this.number1 - this.number2;
          break;
        case "*":
          this.result = this.number1 * this.number2;
          break;
        case "/":
          this.result =
            this.number2 == 0
              ? "Divisão por zero!"
              : this.number1 / this.number2;
          break;
        default:
          // Se o operador não for encontrado, mostrar uma mensagem de erro
          this.result = "Operador inválido!";
      }
    } else {
      // Se os campos não forem preenchidos, mostrar uma mensagem de erro
      this.result = "Preencha todos os campos!";
    }
  }
}

export { Calculator };
