exports.validarCPF = (req, res) => {
  const cpf = req.query.cpf || "";

  if (validarFormatoCPF(cpf) && validarDigitoVerificadorCPF(cpf)) {
    res.status(200).send("CPF válido");
  } else {
    res.status(400).send("CPF inválido");
  }
};

function validarFormatoCPF(cpf) {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return regex.test(cpf);
}

function validarDigitoVerificadorCPF(cpf) {
  const cpfSemPontuacao = cpf.replace(/\D/g, "");
  if (cpfSemPontuacao.length !== 11) {
    return false;
  }

  const digitos = cpfSemPontuacao.split("").map(Number);
  const digitoVerificador1 = calcularDigitoVerificador(digitos.slice(0, 9));
  const digitoVerificador2 = calcularDigitoVerificador(digitos.slice(0, 10));

  return (
    digitoVerificador1 === digitos[9] && digitoVerificador2 === digitos[10]
  );
}

function calcularDigitoVerificador(digitos) {
  let soma = 0;
  let peso = digitos.length + 1;

  for (let i = 0; i < digitos.length; i++) {
    soma += digitos[i] * peso;
    peso--;
  }

  const resto = soma % 11;
  const digito = 11 - resto;

  return digito < 10 ? digito : 0;
}
