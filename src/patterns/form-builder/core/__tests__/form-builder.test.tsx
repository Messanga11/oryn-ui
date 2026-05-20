import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

describe("FormBuilder", () => {
  it("renders fields using registered renderers from provider", async () => {
    const { FormBuilder, FormBuilderProvider } = await import("../../index");

    const TextRenderer = ({ config }: { field: unknown; config: { label: string } }) => (
      <label>{config.label}</label>
    );

    const fields = [
      { name: "username", type: "text" as const, label: "Username" },
    ];

    render(
      <FormBuilderProvider renderers={{ text: TextRenderer as never }}>
        <FormBuilder
          fields={fields}
          onSubmit={vi.fn()}
          defaultValues={{ username: "" }}
        />
      </FormBuilderProvider>,
    );

    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("renders component fields directly without a renderer", async () => {
    const { FormBuilder } = await import("../../index");

    const fields = [
      {
        name: "divider",
        type: "component" as const,
        component: <hr data-testid="divider" />,
      },
    ];

    render(
      <FormBuilder
        fields={fields}
        onSubmit={vi.fn()}
        defaultValues={{}}
      />,
    );

    expect(screen.getByTestId("divider")).toBeInTheDocument();
  });

  it("calls onSubmit with cleaned form data (empty strings excluded)", async () => {
    const { FormBuilder, FormBuilderProvider } = await import("../../index");

    const onSubmit = vi.fn().mockResolvedValue({ id: "1" });

    const InputRenderer = ({ field, config }: {
      field: { name: string; state: { value: unknown }; handleChange: (v: string) => void; handleBlur: () => void };
      config: { label: string };
    }) => (
      <div>
        <label>{config.label}</label>
        <input
          data-testid={field.name}
          value={(field.state.value as string) ?? ""}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
      </div>
    );

    const fields = [
      { name: "name", type: "text" as const, label: "Name" },
      { name: "bio", type: "text" as const, label: "Bio" },
    ];

    render(
      <FormBuilderProvider renderers={{ text: InputRenderer as never }}>
        <FormBuilder
          fields={fields}
          onSubmit={onSubmit}
          defaultValues={{ name: "", bio: "" }}
        >
          <button type="submit">Submit</button>
        </FormBuilder>
      </FormBuilderProvider>,
    );

    const user = userEvent.setup();
    await user.type(screen.getByTestId("name"), "John");
    await user.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ name: "John" }),
      );
    });

    // Empty string "bio" should be excluded from the submitted data
    const submittedData = onSubmit.mock.calls[0][0];
    expect(submittedData).not.toHaveProperty("bio");
  });

  it("calls onSuccess after successful submission", async () => {
    const { FormBuilder } = await import("../../index");

    const result = { id: "1" };
    const onSubmit = vi.fn().mockResolvedValue(result);
    const onSuccess = vi.fn();

    render(
      <FormBuilder
        fields={[]}
        onSubmit={onSubmit}
        onSuccess={onSuccess}
        defaultValues={{}}
      >
        <button type="submit">Submit</button>
      </FormBuilder>,
    );

    await userEvent.setup().click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(result, undefined, undefined);
    });
  });

  it("calls onError when submission fails", async () => {
    const { FormBuilder } = await import("../../index");

    const error = new Error("Server error");
    const onSubmit = vi.fn().mockRejectedValue(error);
    const onError = vi.fn();

    render(
      <FormBuilder
        fields={[]}
        onSubmit={onSubmit}
        onError={onError}
        defaultValues={{}}
      >
        <button type="submit">Submit</button>
      </FormBuilder>,
    );

    await userEvent.setup().click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(error);
    });
  });

  it("separates file fields from regular fields on submit", async () => {
    const { FormBuilder, FormBuilderProvider } = await import("../../index");

    const onSubmit = vi.fn().mockResolvedValue({ id: "1" });
    const onSuccess = vi.fn();

    const file = new File(["content"], "photo.jpg", { type: "image/jpeg" });

    const FileRenderer = ({ field, config }: {
      field: { name: string; state: { value: unknown }; handleChange: (v: unknown) => void; handleBlur: () => void };
      config: { label: string };
    }) => (
      <div>
        <label>{config.label}</label>
        <button
          type="button"
          data-testid="add-file"
          onClick={() => field.handleChange([file])}
        >
          Add file
        </button>
      </div>
    );

    const fields = [
      { name: "title", type: "text" as const, label: "Title" },
      { name: "images", type: "file" as const, label: "Images" },
    ];

    render(
      <FormBuilderProvider renderers={{ file: FileRenderer as never }}>
        <FormBuilder
          fields={fields}
          onSubmit={onSubmit}
          onSuccess={onSuccess}
          defaultValues={{ title: "Test", images: [] }}
        >
          <button type="submit">Submit</button>
        </FormBuilder>
      </FormBuilderProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByTestId("add-file"));
    await user.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });

    // onSubmit should receive cleaned data without file fields
    const submittedData = onSubmit.mock.calls[0][0];
    expect(submittedData).toHaveProperty("title", "Test");
    expect(submittedData).not.toHaveProperty("images");

    // onSuccess should receive files separately
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith(
        { id: "1" },
        { images: [file] },
        undefined,
      );
    });
  });

  it("renders children (e.g. submit button)", async () => {
    const { FormBuilder } = await import("../../index");

    render(
      <FormBuilder fields={[]} onSubmit={vi.fn()} defaultValues={{}}>
        <button type="submit">Go</button>
      </FormBuilder>,
    );

    expect(screen.getByText("Go")).toBeInTheDocument();
  });

  it("accepts className prop on the form element", async () => {
    const { FormBuilder } = await import("../../index");

    const { container } = render(
      <FormBuilder
        fields={[]}
        onSubmit={vi.fn()}
        defaultValues={{}}
        className="my-form"
      >
        <button type="submit">Go</button>
      </FormBuilder>,
    );

    expect(container.querySelector("form")).toHaveClass("my-form");
  });

  it("passes validators to field validation functions", async () => {
    const { FormBuilder, FormBuilderProvider, createValidators } = await import("../../index");

    const validators = createValidators({ required: "Champ requis" });

    const InputRenderer = ({ field, config }: {
      field: {
        name: string;
        state: { value: unknown; meta: { errors: unknown[]; errorMap: Record<string, string | undefined> } };
        handleChange: (v: string) => void;
        handleBlur: () => void;
      };
      config: { label: string };
    }) => {
      const error = field.state.meta.errorMap?.onSubmit ?? field.state.meta.errors[0];
      return (
        <div>
          <label>{config.label}</label>
          <input
            data-testid={field.name}
            value={(field.state.value as string) ?? ""}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
          />
          {error && <span data-testid={`${field.name}-error`}>{String(error)}</span>}
        </div>
      );
    };

    const fields = [
      {
        name: "email",
        type: "text" as const,
        label: "Email",
        validation: (v: unknown) => {
          const typed = v as ReturnType<typeof createValidators>;
          return typed.required();
        },
      },
    ];

    render(
      <FormBuilderProvider renderers={{ text: InputRenderer as never }}>
        <FormBuilder
          fields={fields}
          onSubmit={vi.fn()}
          validators={validators}
          defaultValues={{ email: "" }}
        >
          <button type="submit">Submit</button>
        </FormBuilder>
      </FormBuilderProvider>,
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toHaveTextContent("Champ requis");
    });
  });

  it("skips fields without a registered renderer (no crash)", async () => {
    const { FormBuilder } = await import("../../index");

    const fields = [
      { name: "name", type: "text" as const, label: "Name" },
    ];

    // No provider = no renderers registered
    const { container } = render(
      <FormBuilder fields={fields} onSubmit={vi.fn()} defaultValues={{ name: "" }}>
        <button type="submit">Go</button>
      </FormBuilder>,
    );

    // Should render the form without crashing
    expect(container.querySelector("form")).toBeInTheDocument();
  });
});
