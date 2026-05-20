import { describe, expect, it } from 'vitest';

describe('createValidators', () => {
  it('creates validators with default messages', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();

    expect(v.required).toBeDefined();
    expect(v.email).toBeDefined();
    expect(v.min).toBeDefined();
    expect(v.max).toBeDefined();
    expect(v.number).toBeDefined();
    expect(v.numberMin).toBeDefined();
    expect(v.numberMax).toBeDefined();
    expect(v.boolean).toBeDefined();
    expect(v.string).toBeDefined();
  });

  it('creates validators with custom messages', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators({
      required: 'Ce champ est requis',
      email: 'Email invalide',
    });

    const result = v.required().safeParse('');
    expect(result.success).toBe(false);
  });

  it('required() rejects empty strings', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();
    const schema = v.required();

    expect(schema.safeParse('').success).toBe(false);
    expect(schema.safeParse('hello').success).toBe(true);
  });

  it('required() accepts custom message', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();
    const schema = v.required('Custom required');

    const result = schema.safeParse('');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Custom required');
    }
  });

  it('email() validates email format', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();
    const schema = v.email();

    expect(schema.safeParse('invalid').success).toBe(false);
    expect(schema.safeParse('test@example.com').success).toBe(true);
  });

  it('min() validates minimum string length', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();
    const schema = v.min(3);

    expect(schema.safeParse('ab').success).toBe(false);
    expect(schema.safeParse('abc').success).toBe(true);
  });

  it('max() validates maximum string length', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();
    const schema = v.max(5);

    expect(schema.safeParse('abcdef').success).toBe(false);
    expect(schema.safeParse('abcde').success).toBe(true);
  });

  it('number() validates number type', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();
    const schema = v.number();

    expect(schema.safeParse('hello').success).toBe(false);
    expect(schema.safeParse(42).success).toBe(true);
  });

  it('numberMin() validates minimum number value', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();
    const schema = v.numberMin(10);

    expect(schema.safeParse(5).success).toBe(false);
    expect(schema.safeParse(10).success).toBe(true);
  });

  it('numberMax() validates maximum number value', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();
    const schema = v.numberMax(100);

    expect(schema.safeParse(101).success).toBe(false);
    expect(schema.safeParse(100).success).toBe(true);
  });

  it('boolean() validates boolean type', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();
    const schema = v.boolean();

    expect(schema.safeParse('hello').success).toBe(false);
    expect(schema.safeParse(true).success).toBe(true);
    expect(schema.safeParse(false).success).toBe(true);
  });

  it('string() creates a basic string schema', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();
    const schema = v.string();

    expect(schema.safeParse(42).success).toBe(false);
    expect(schema.safeParse('hello').success).toBe(true);
  });

  it('confirmPassword() validates non-empty string', async () => {
    const { createValidators } = await import('../index');

    const v = createValidators();
    const schema = v.confirmPassword('secret123');

    expect(schema.safeParse('').success).toBe(false);
    expect(schema.safeParse('secret123').success).toBe(true);
  });
});
