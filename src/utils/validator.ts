export type Valid = {
  value: boolean;
  errorText?: string;
};

export function valid_name(value: string): Valid {
  if (!/^[A-Za-zА-Яа-я\-]*$/.test(value)) {
    return { value: false, errorText: "Используйте латиницу или кириллицу" };
  }

  if (!/^[A-Za-zА-Яа-я]/.test(value)) {
    return { value: false, errorText: "Первая буква должна быть заглавной" };
  }

  return { value: true };
}

export function valid_login(value: string): Valid {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) {
    return { value: false, errorText: "Используйте латиницу" };
  }

  if (value.length < 3 || value.length > 20) {
    return { value: false, errorText: "Логин должен быть от 3 до 20 символов" };
  }

  return { value: true };
}

export function valid_email(value: string): Valid {
  if (!value) {
    return { value: false, errorText: "Почта не должена быть пустой" };
  }

  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
    return { value: false, errorText: "Неправильный формат почты" };
  }

  return { value: true };
}

export function valid_password(value: string): Valid {
  if (value.length < 8 || value.length > 40) {
    return {
      value: false,
      errorText: "Пароль должен быть от 3 до 40 символов",
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

export function valid_phone(value: string): Valid {
  if (!/^\+?\d{10,15}$/.test(value)) {
    return { value: false, errorText: "Неправильный формат телефона" };
  }
  return { value: true };
}

export function valid_empty(value: string): Valid {
  if (value === "") {
    return { value: false, errorText: "Поле не должно быть пустым" };
  }
  return { value: true };
}
