import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("FormBuilderProvider", () => {
  it("provides field renderers to descendants", async () => {
    const { FormBuilderProvider, useFieldRenderers } = await import(
      "../../index"
    );

    const MockRenderer = () => <div>mock text renderer</div>;

    function Consumer() {
      const renderers = useFieldRenderers();
      const Renderer = renderers.text;
      return Renderer ? <Renderer field={{} as never} config={{} as never} /> : <div>no renderer</div>;
    }

    render(
      <FormBuilderProvider renderers={{ text: MockRenderer as never }}>
        <Consumer />
      </FormBuilderProvider>,
    );

    expect(screen.getByText("mock text renderer")).toBeInTheDocument();
  });

  it("returns empty object when no provider is present", async () => {
    const { useFieldRenderers } = await import("../../index");

    function Consumer() {
      const renderers = useFieldRenderers();
      return <div>count: {Object.keys(renderers).length}</div>;
    }

    render(<Consumer />);
    expect(screen.getByText("count: 0")).toBeInTheDocument();
  });

  it("merges parent and child providers (child overrides)", async () => {
    const { FormBuilderProvider, useFieldRenderers } = await import(
      "../../index"
    );

    const ParentRenderer = () => <div>parent</div>;
    const ChildRenderer = () => <div>child</div>;
    const SelectRenderer = () => <div>select</div>;

    function Consumer() {
      const renderers = useFieldRenderers();
      return (
        <div>
          <div data-testid="text">
            {renderers.text ? "has-text" : "no-text"}
          </div>
          <div data-testid="select">
            {renderers.select ? "has-select" : "no-select"}
          </div>
        </div>
      );
    }

    render(
      <FormBuilderProvider
        renderers={{
          text: ParentRenderer as never,
          select: SelectRenderer as never,
        }}
      >
        <FormBuilderProvider renderers={{ text: ChildRenderer as never }}>
          <Consumer />
        </FormBuilderProvider>
      </FormBuilderProvider>,
    );

    expect(screen.getByTestId("text")).toHaveTextContent("has-text");
    expect(screen.getByTestId("select")).toHaveTextContent("has-select");
  });
});
