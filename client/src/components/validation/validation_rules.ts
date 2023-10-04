export type ValidationFunction = (value: string) => string | undefined;

export const maxLength = (max: number) => {
  return (value: string) =>
    value.length <= max ? undefined : `Must be shorter than ${max} characters.`;
};

export const minLength = (min: number) => {
  return (value: string) =>
    min <= value.length ? undefined : `Must be longer than ${min} characters.`;
};

export const mustNotBeNull = () => {
  return (value: string) => {
    return value === null || value === undefined
      ? `Must not be null.`
      : undefined;
  };
};
export const mustNotEqual = (undesiredValue: string) => {
  return (value: string) => {
    return value === undesiredValue ? `Please select a Reason` : undefined;
  };
};
