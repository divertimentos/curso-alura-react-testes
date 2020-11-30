import React from "react";
import {
  fireEvent,
  getByLabelText,
  getByTestId,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import App, { calcularNovoSaldo } from "./app";

describe("Componente principal", () => {
  describe("Quando eu abro o app do banco", () => {
    it("O nome é exibido", () => {
      render(<App />);

      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });

    it("O saldo é exibido", () => {
      render(<App />);

      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });

    it("O botão de realizar transação é exibido", () => {
      render(<App />);

      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });
});

describe("Quando eu realizo uma transação", () => {
  it("que é um saque, o valor vai diminuir", () => {
    const valores = {
      transacao: "saque",
      valor: 50,
    };
    const novoSaldo = calcularNovoSaldo(valores, 150);
    expect(novoSaldo).toBe(100);
  });

  it("que é um saque, a transação deve ser realizada", () => {
    const { getByText, getByLabelText, getByTestId } = render(<App />);

    const saldo = getByText("R$ 1000");
    const transacao = getByLabelText("Saque");
    const valor = getByTestId("valor");
    const botaoTransacao = getByText("Realizar operação");

    expect(saldo.textContent).toBe("R$ 1000");

    fireEvent.click(transacao, { target: { value: "saque" } });
    fireEvent.change(valor, { target: { value: 10 } });
    fireEvent.click(botaoTransacao);

    expect(saldo.textContent).toBe("R$ 990");
  });

  it("que é um depósito, o valor vai aumentar", () => {
    const valores = {
      transacao: "deposito",
      valor: 50,
    };

    const novoSaldo = calcularNovoSaldo(valores, 150);
    expect(novoSaldo).toBe(200);
  });
});
