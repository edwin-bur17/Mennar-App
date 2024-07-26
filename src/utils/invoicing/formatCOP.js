// Formatear el value del input a formato COP
export const formatCOP = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Desformatear el value para poder hacer el cálculo matemático
export const unformatCOP = (value) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};