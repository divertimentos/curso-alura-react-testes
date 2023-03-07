import React from "react";
import { render } from "@testing-library/react";
import Transacao from "./Transacao";

describe("Componente de transação do extrato", () => {
  it("O snapshot do componente deve permanecer sempre o mesmo", async () => {
    const { container } = render(
      <Transacao data="08/09/2020" tipo="saque" valor="20.00" />
    );
    await expect(container.firstChild).toMatchSnapshot();
  });
});
