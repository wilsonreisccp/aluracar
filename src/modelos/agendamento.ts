export interface Agendamento {
    nomeCliente    : string; 
    enderecoCliente: string;
    emailCliente   : string;
    modeloCliente  : string;
    precoTotal     : number;
    confirmado     : boolean;
    enviado        : boolean;
    data           : string; 
}