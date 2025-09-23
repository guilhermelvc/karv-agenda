export enum ProfessionalSpecialty {
  DESIGN_DE_SOBRANCELHA = "Design de Sobrancelha",
  DESIGN_DE_SOBRANCELHA_COM_HENNA = "Design de Sobrancelha com Henna",
  EPILACAO_FACIAL = "Epilação Facial",
}

export const professionalSpecialties = Object.entries(
  ProfessionalSpecialty,
).map(([key, value]) => ({
  value: ProfessionalSpecialty[key as keyof typeof ProfessionalSpecialty],
  label: value,
}));
