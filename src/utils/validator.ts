export type Valid = {
  value: boolean;
  errorText?: string;
};

export function validName(value: string): Valid {
  if (!value) {
    return { value: true };
  }

  if (!/^[A-Za-zА-Яа-я\-]*$/.test(value)) {
    return { value: false, errorText: "Используйте латиницу или кириллицу" };
  }

  if (value[0] !== value[0].toUpperCase()) {
    return { value: false, errorText: "Первая буква должна быть заглавной" };
  }

  return { value: true };
}

export function validLogin(value: string): Valid {
  if (!value) {
    return { value: true };
  }

  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    return { value: false, errorText: "Используйте латиницу" };
  }

  if (value.length < 3 || value.length > 20) {
    return { value: false, errorText: "Логин должен быть от 3 до 20 символов" };
  }

  return { value: true };
}

export function validEmail(value: string): Valid {
  if (!value) {
    return { value: true };
  }

  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
    return { value: false, errorText: "Неправильный формат почты" };
  }

  return { value: true };
}

export function validPassword(value: string): Valid {
  if (!value) {
    return { value: true };
  }

  if (value.length < 8 || value.length > 40) {
    return {
      value: false,
      errorText: "Пароль должен быть от 8 до 40 символов",
    };
  }

  if (!/[A-Z]/.test(value)) {
    return {
      value: false,
      errorText: "Пароль должен содержать хотя бы одну заглавную букву",
    };
  }

  if (!/\d/.test(value)) {
    return {
      value: false,
      errorText: "Пароль должен содержать хотя бы одну цифру",
    };
  }

  return { value: true };
}

export function validPhone(value: string): Valid {
  if (!value) {
    return { value: true };
  }

  if (!/^\+?\d{10,15}$/.test(value)) {
    return { value: false, errorText: "Неправильный формат телефона" };
  }
  return { value: true };
}

export function validEmpty(value: string): Valid {
  if (value === "") {
    return { value: false, errorText: "Поле не должно быть пустым" };
  }
  return { value: true };
}
