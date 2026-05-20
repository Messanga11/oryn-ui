import { z } from "zod";

export interface ValidatorMessages {
  required?: string;
  email?: string;
  min?: string;
  max?: string;
  numberMin?: string;
  numberMax?: string;
  confirmPassword?: string;
}

const DEFAULTS: Required<ValidatorMessages> = {
  required: "This field is required",
  email: "Invalid email address",
  min: "Too short",
  max: "Too long",
  numberMin: "Value is too small",
  numberMax: "Value is too large",
  confirmPassword: "Passwords must match",
};

export function createValidators(messages?: ValidatorMessages) {
  const m = { ...DEFAULTS, ...messages };

  return {
    boolean: () => z.boolean(),

    confirmPassword: (_password: string, message?: string) =>
      z
        .string({ error: message ?? m.required })
        .min(1, message ?? m.confirmPassword),

    email: (message?: string) =>
      z.string({ error: m.required }).email(message ?? m.email),

    min: (min: number, message?: string) =>
      z.string({ error: m.required }).min(min, message ?? m.min),

    max: (max: number, message?: string) =>
      z.string({ error: m.required }).max(max, message ?? m.max),

    number: () => z.number({ error: m.required }),

    numberMin: (min: number, message?: string) =>
      z.number({ error: m.required }).min(min, message ?? m.numberMin),

    numberMax: (max: number, message?: string) =>
      z.number({ error: m.required }).max(max, message ?? m.numberMax),

    required: (message?: string) =>
      z.string({ error: message ?? m.required }).min(1, message ?? m.required),

    string: () => z.string({ error: m.required }),
  };
}

export type Validators = ReturnType<typeof createValidators>;
