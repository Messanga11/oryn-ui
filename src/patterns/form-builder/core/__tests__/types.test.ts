import { describe, expect, it } from 'vitest';

describe('Form Builder Types', () => {
  it('exports FieldType as a union of all supported field types', async () => {
    // FieldType should accept all built-in types
    const validTypes: import('../../index').FieldType[] = [
      'text',
      'email',
      'password',
      'phone',
      'otp',
      'checkbox',
      'number',
      'select',
      'async-select',
      'textarea',
      'file',
      'component',
    ];

    expect(validTypes).toHaveLength(12);
  });

  it('exports BaseFieldConfig with required name, type, and label', async () => {
    const mod = await import('../../index');

    const config: mod.BaseFieldConfig = {
      name: 'email',
      type: 'email',
      label: 'Email',
    };

    expect(config.name).toBe('email');
    expect(config.type).toBe('email');
    expect(config.label).toBe('Email');
  });

  it('exports BaseFieldConfig with optional placeholder, helperText, disabled, optional', async () => {
    const mod = await import('../../index');

    const config: mod.BaseFieldConfig = {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter email',
      helperText: "We'll never share your email",
      disabled: false,
      optional: true,
    };

    expect(config.placeholder).toBe('Enter email');
    expect(config.helperText).toBe("We'll never share your email");
    expect(config.disabled).toBe(false);
    expect(config.optional).toBe(true);
  });

  it('exports TextFieldConfig with leftIcon and rightIcon', async () => {
    const mod = await import('../../index');

    const config: mod.TextFieldConfig = {
      name: 'username',
      type: 'text',
      label: 'Username',
      leftIcon: 'icon-left',
      rightIcon: 'icon-right',
    };

    expect(config.leftIcon).toBe('icon-left');
    expect(config.rightIcon).toBe('icon-right');
  });

  it('exports SelectFieldConfig with options array', async () => {
    const mod = await import('../../index');

    const config: mod.SelectFieldConfig = {
      name: 'country',
      type: 'select',
      label: 'Country',
      options: [
        { label: 'France', value: 'fr' },
        { label: 'Cameroon', value: 'cm' },
      ],
    };

    expect(config.options).toHaveLength(2);
    expect(config.options[0]).toEqual({ label: 'France', value: 'fr' });
  });

  it('exports AsyncSelectFieldConfig with fetchOptions', async () => {
    const mod = await import('../../index');

    const fetchOptions = async (_search: string) => [{ label: 'Result', value: '1' }];

    const config: mod.AsyncSelectFieldConfig = {
      name: 'category',
      type: 'async-select',
      label: 'Category',
      fetchOptions,
      debounceMs: 300,
      noResultsText: 'No results',
      loadingText: 'Loading...',
    };

    expect(config.fetchOptions).toBe(fetchOptions);
    expect(config.debounceMs).toBe(300);
  });

  it('exports FileFieldConfig with accept, maxFiles, maxSizeBytes, multiple', async () => {
    const mod = await import('../../index');

    const config: mod.FileFieldConfig = {
      name: 'images',
      type: 'file',
      label: 'Images',
      accept: 'image/*',
      maxFiles: 5,
      maxSizeBytes: 5_000_000,
      multiple: true,
    };

    expect(config.accept).toBe('image/*');
    expect(config.maxFiles).toBe(5);
    expect(config.maxSizeBytes).toBe(5_000_000);
    expect(config.multiple).toBe(true);
  });

  it('exports ComponentFieldConfig with component and no label required', async () => {
    const mod = await import('../../index');

    const config: mod.ComponentFieldConfig = {
      type: 'component',
      name: 'divider',
      component: null, // React node would go here
    };

    expect(config.type).toBe('component');
    expect(config.name).toBe('divider');
  });

  it('exports NumberFieldConfig with leftIcon and rightIcon', async () => {
    const mod = await import('../../index');

    const config: mod.NumberFieldConfig = {
      name: 'quantity',
      type: 'number',
      label: 'Quantity',
      leftIcon: 'icon',
    };

    expect(config.type).toBe('number');
  });

  it('exports SelectOption type with label and value', async () => {
    const mod = await import('../../index');

    const option: mod.SelectOption = {
      label: 'France',
      value: 'fr',
    };

    expect(option.label).toBe('France');
    expect(option.value).toBe('fr');
  });

  it('FieldConfig is a discriminated union of all field configs', async () => {
    const mod = await import('../../index');

    // Should accept any of the field config types
    const configs: mod.FieldConfig[] = [
      { name: 'name', type: 'text', label: 'Name' },
      { name: 'pass', type: 'password', label: 'Password' },
      { name: 'phone', type: 'phone', label: 'Phone' },
      { name: 'otp', type: 'otp', label: 'OTP' },
      { name: 'agree', type: 'checkbox', label: 'Agree' },
      { name: 'qty', type: 'number', label: 'Qty' },
      {
        name: 'country',
        type: 'select',
        label: 'Country',
        options: [],
      },
      {
        name: 'cat',
        type: 'async-select',
        label: 'Cat',
        fetchOptions: async () => [],
      },
      { name: 'bio', type: 'textarea', label: 'Bio' },
      { name: 'img', type: 'file', label: 'Image' },
      { name: 'div', type: 'component', component: null },
    ];

    expect(configs).toHaveLength(11);
  });

  it('exports getFieldError utility', async () => {
    const { getFieldError } = await import('../../index');

    // Returns first error from errors array
    expect(
      getFieldError({
        value: '',
        errors: ['Required'],
        errorMap: {},
      }),
    ).toBe('Required');

    // Returns errorMap.onSubmit when errors is empty
    expect(
      getFieldError({
        value: '',
        errors: [],
        errorMap: { onSubmit: 'Submit error' },
      }),
    ).toBe('Submit error');

    // Returns errorMap.onChange as fallback
    expect(
      getFieldError({
        value: '',
        errors: [],
        errorMap: { onChange: 'Change error' },
      }),
    ).toBe('Change error');

    // Returns errorMap.onBlur as last fallback
    expect(
      getFieldError({
        value: '',
        errors: [],
        errorMap: { onBlur: 'Blur error' },
      }),
    ).toBe('Blur error');

    // Returns undefined when no errors
    expect(
      getFieldError({
        value: '',
        errors: [],
        errorMap: {},
      }),
    ).toBeUndefined();
  });
});
