
export class InvestimentList {
  nome: string;
  objetivo: string;
  saldoTotal: number;
  indicadorCarencia: string;
  acoes: Array<Actions> = new Array<Actions>();
}

export class Actions {
  id: string;
  nome: string;
  percentual: number;

  saldoAcumulado?: number
}