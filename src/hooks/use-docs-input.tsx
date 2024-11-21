function CPF_CNPJ_Input(value: string): string {
  const numericValue = value.replace(/\D/g, '') || ''; // Remove caracteres não numéricos
  return numericValue.length > 14 ? '999.999.999-99' : '99.999.999/9999-99';
}

export default CPF_CNPJ_Input;
