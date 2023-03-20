export const confirmInformations = (nome: string, cpf: string, email: string, telefone: string) => {
    return `Os dados de usuário correspondente a este CPF, estão corretos?⬇‍️ \n`+
        `Nome: ${nome}\n` +
        `CPF: ${cpf}\n` +
        `Email: ${email}\n` +
        `Telefone: ${telefone}\n`+
        '1️⃣ - ```SIM``` \n' +
        '2️⃣ - ```NÃO```';
}