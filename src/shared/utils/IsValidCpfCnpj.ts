export function isValidCpfCnpj(cpfCnpj: string): boolean {
  const removeDigitCpfCpj = cpfCnpj.replace(/\D/g, '');

  if (!isValidCnpjOrCpf(removeDigitCpfCpj)) {
    return false;
  }

  return true;
}

function isValidCnpjOrCpf(cpfCnpj: string): boolean {
  return (isCnpj(cpfCnpj) || isCpf(cpfCnpj)) && !hasRepeatingDigits(cpfCnpj);
}

function isCnpj(cpfCnpj: string): boolean {
  return cpfCnpj.length === 14;
}

function isCpf(cpfCnpj: string): boolean {
  return cpfCnpj.length === 11;
}

function hasRepeatingDigits(cpfCnpj: string): boolean {
  return /(\d)\1{10,}/.test(cpfCnpj);
}
