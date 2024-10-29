const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(cpf.charAt(10));
};

const isValidCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj.length !== 14) return false;

  const validateDigits = (cnpj: string, length: number): boolean => {
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += parseInt(cnpj.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    const remainder = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return remainder === parseInt(cnpj.charAt(length));
  };

  return validateDigits(cnpj, 12) && validateDigits(cnpj, 13);
};

const validateCPFOrCNPJ = (value: string): boolean => {
  value = value.replace(/[^\d]+/g, '');
  if (value.length === 11) return isValidCPF(value);
  if (value.length === 14) return isValidCNPJ(value);
  return false;
};

export default validateCPFOrCNPJ;
