function formatCPFOrCNPJ(value: string): string {
  const numericValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  if (numericValue.length > 11) {
    // CNPJ: Formata como 99.999.999/9999-99
    return numericValue
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/\/(\d{4})(\d)/, '/$1-$2');
  } else {
    // CPF: Formata como 999.999.999-99
    return numericValue
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/\.(\d{3})(\d)/, '.$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
}

export default formatCPFOrCNPJ;
