import { passwordStrength } from 'check-password-strength'


const passwordOptions = [
  {
    id: 0,
    value: "Too weak",
    minDiversity: 0,
    minLength: 0
  },
  {
    id: 1,
    value: "Weak",
    minDiversity: 2,
    minLength: 8
  },
  {
    id: 2,
    value: "Good",
    minDiversity: 3,
    minLength: 8
  },
  {
    id: 3,
    value: "Strong",
    minDiversity: 4,
    minLength: 12
  }
];

export function getPasswordStrength(password: string) {
  return passwordStrength(password, passwordOptions as any);
}

export function validPassowrd(password: string): boolean {
  const strength = getPasswordStrength(password);
  if (strength.id <= 0) {
    return false;
  }
  return true;
}
