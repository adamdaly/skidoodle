# 5. shadcn for UX/UI design

Date: 2025-04-01

## Status

Accepted

## Context

Skiddodle is a web application using Next.js, with a focus on delivering a modern, accessible, and visually appealing user interface. The application requires a variety of UI components such as buttons, modals, and forms, which must be consistent in design, performant, and easy to maintain. Key requirements include rapid prototyping, and the ability to adapt components to a specific design system without excessive overhead.

## Decision

We will adopt shadcn/ui as the foundation for UI component development. Shadcn CLI will be used to integrate individual component source code directly. This decision is based on the following factors:

- Customizability: shadcn/ui provides unstyled, accessible primitives (via Radix UI) with default Tailwind CSS styling, allowing customisation without fighting a pre-packaged library’s constraints.

- Accessibility: Built on Radix UI, shadcn/ui ensures components meet WAI-ARIA standards out of the box, reducing the effort needed to make the application accessible.

- Developer Experience: The CLI-based approach allows for selectively adding components, integrating them into the codebase with minimal setup, while leveraging an existing Tailwind CSS configuration.

- Performance: By installing only the components needed, the entire library isn't bundled, keeping the application lightweight and optimized.

## Consequences

### Positive Consequences:

- Faster Iteration: Pre-built, high-quality components with sensible defaults accelerate prototyping and development, allowing us to meet tight deadlines.

- Full Control: Owning the component source code enables easy customised styling.

- Accessibility Compliance: Radix UI’s foundation reduces the risk of accessibility oversights.

- Reduced Bundle Size: Selective component adoption minimizes unnecessary code in production, improving load times.

### Negative Consequences:

- Ownership Responsibility: Since shadcn/ui is not a maintained library, responsiblity for updating components and bug fixes becomes the developer's responsibilty.

- Learning Curve: Developers unfamiliar with Radix UI or the copy-paste philosophy may need time to adapt to shadcn/ui’s workflow.

- Potential Divergence: Without a central update mechanism, the components could diverge from shadcn/ui’s upstream examples over time, requiring manual synchronization if desired.
