import { fstat, mkdir, writeFile } from "fs";
import { join } from "path";
import slugify from "slugify";

const createLayout = (post) => {
  const { title, publishedAt } = post;

  return `import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata & {
  publishedAt: string;
} = {
  title: "${title}",
  publishedAt: "${new Date(publishedAt).toISOString()}",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
`;
};

// Function to slugify a string and create a directory
function createSlugDirectoryAndWriteFile(post) {
  const { title, content, publishedAt } = post;

  // Slugify the input string
  const slug = slugify(title, {
    lower: true, // Convert to lowercase
    strict: true, // Remove special characters
  });

  console.log(slug);

  // Define the path for the new directory
  const dirPath = join("./app/posts", slug);

  // Create the directory
  mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error creating directory: ${err.message}`);
    } else {
      console.log(`Directory created at: ${dirPath}`);
    }
  });

  writeFile(`${dirPath}/page.mdx`, content, {}, (err) => {
    if (err) {
      console.error(`Error writing page.mdx file: ${err.message}`);
    } else {
      console.log(`File written: ${dirPaths}`);
    }
  });

  writeFile(`${dirPath}/layout.tsx`, createLayout(post), {}, (err) => {
    if (err) {
      console.error(`Error writing layout.tsx file: ${err.message}`);
    } else {
      console.log(`File written: ${dirPaths}`);
    }
  });

  return dirPath;
}

const posts = [
  {
    title: "Organization repo + hobby plan in Vercel",
    publishedAt: "May 3 2024",
    content: `
Vercel doesn't support deploying an organization repository for free, you will need some workaround if you want to stay on the hobby plan. In this post, I'll talk how you can do it with github actions. I hope the pricing boundary doesn't stop student developers from building and shipping new ideas.

This post is entirely inspired by [A github gist tutorial](https://gist.github.com/ky28059/1c9af929a9030105da8cf00006b50484).

## Requirements

- This guideline assumes that you're working on a Next.js project.
- Be careful not to leak vercel keys and tokens.

## How to 

- Install vercel cli by running the following command:

\`\`\`
yarn global add vercel
\`\`\`

- Check if vercel cil has been successfully installed.

\`\`\`
vercel --version
\`\`\`

- Run vercel cli. You'll get some inquiries on how to set up your deployment. **Make sure to deploy to your [username].**

\`\`\`
vercel
\`\`\`

- Visit https://vercel.com/account/tokens and generate a token. **Don't leak the generated token anywhere else.**.

![Vercel website - create tokens](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jdy9xepmgqxmlzv6d645.png)

- Write github workflow to run github actions. vercel-action[https://github.com/amondnet/vercel-action] will help you deploy to your hobby plan project.

.github/workflows/vercel-merge.yml
\`\`\`yml
# vercel-merge.yml
name: Deploy to vercel on merge
on:
  push:
    branches:
      - main
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          github-token: \${{ secrets.GITHUB_TOKEN }}
          vercel-args: "--prod"
          vercel-org-id: \${{ secrets.ORG_ID}}
          vercel-project-id: \${{ secrets.PROJECT_ID}}
\`\`\`
This workflow deploys to vercel on merging to main.

- .github/workflows/vercel-pull-request.yml

\`\`\`yml
name: Create vercel preview URL on pull request
on:
  pull_request:
    branches: [main, master]
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        id: vercel-deploy
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          github-token: \${{ secrets.GITHUB_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID}}
          vercel-project-id: \${{ secrets.PROJECT_ID}}
      - name: preview-url
        run: |
          echo \${{ steps.vercel-deploy.outputs.preview-url }}
\`\`\`
This workflow creates a preview on pull request.

- VERCEL_TOKEN is the token you created on the vercel website.
- You can find ORG_ID, PROJECT_ID in \`package.json\`. They should be created when you run \`vercel\` command.

Happy Coding!
`,
  },
  {
    title: "Opinionated Frontend Tool Comparison🎈",
    publishedAt: "May 18",
    content: `
## Javascript vs. Typescript

### Comparison Table

|  | Javascript | Typescript |
|---|---|---|
| **Velocity** | You can write code faster. | Writing typescript code might be slower than javascript. |
| **Code Quality** | It's tricky to track down \`TypeError\`s. Your code always has a risk of errors | You can track down \`TypeError\`s before your application is shipped to production. |

#### Notes
- Inferring data types gives you more hints about how your code works. It can boost productivity especially when you're collaborating with other devs.
- \`TypeError\` is one of the most common javascript errors. The top 8 javascript errors out of 10 are TypeErrors. [Check this website.](https://rollbar.com/blog/top-10-javascript-errors-from-1000-projects-and-how-to-avoid-them/)
- Typescript has the largest community among javascript typing tools. That's why this tool is chosen for comparison.  
## Next.js vs. React

## React vs. Next.js

### Comparison Table

|  | React | Next.js |
|---|---|---|
| **Subsequent routing and navigating** | React app always guarantees fast subsequent navigating and routing. | Subsequent navigating and routing in Next.js app is likely to be slower and less smooth. |
| **Initial Page Load** | React app needs to download and parse the entire bundle without code splitting, so initial page loads slowly. | Next.js server creates HTML immediately and sends it to the client, so initial page loads shortly. |
| **SEO(Search Engine Optimization)** | Not all search engine bots can run javascript, so some of them cannot index(visit and read) react app. It is not SEO-friendly. | Next.js app has better SEO becauase bots don't need to run javascript to see the content and initial page loads shortly. Also, Dynamic meta tags and open-graph tags let users preview the content on social media and search engines. |
| **Code Splitting** | You need to split code manually. | Next.js provides route-based code splitting by default. |
| **Font Optimization** | Not supported by default | \`next/@font\` prevents CLS(Cumulative Layout Shift). |
| **Image Optimization** | Not supported by default | Size optimization provides a minimal-sized and quality-assured copy of image for each device Images are lazy-loaded for faster page loading. Placeholders prevent CLS while page loading as well. |
| **Cost** | Rendering HTML doesn't take any money. | Redering HTML on the server side takes money. |

### Notes
- Next.js app might be slower on subsequent navigation. However, it can mitigate the problem by caching and prefetching routes.

### Performance: CSR problems vs. SSR solutions

|  | Client Side Rendering | Server Side Rendering |
|---|---|---|
| **Downloading javascript** | It takes much time to download a javascript bundle, preventing the initial page from rendering. | Next.js server creates HTML on the server side and sends it to the client immediately, so the initial page loads faster. Route-based code splitting is set by default, so each route downloads minimal javascript required to load itself. |
| **Running javascript** | It takes much time to run a javascript bundle, preventing the initial page from rendering. | Full Route cache caches each route. Caching routes on the server side would be faster than parsing and running a javascript bundle for rendering HTML. Also, partial prerendering caches static parts of each route and only fills the dynamic parts, rendering HTML on the server side even faster. This feature is still experimental, but hopefully, it's stable soon!  |
| **Data-fetching** | It takes a lot of time to fetch the API server. | Data cache caches API response for each request. Caching response data on the server side would be faster than fetching the API server on the client side every single time. |

## CSS-in-JS vs. TailwindCSS

### CSS-in-JS

#### Benefits
- You can write JavaScript expressions for styling.
- It has a large community support for react-native.

#### Drawbacks
- Currently, Runtime CSS-in-JS libraries, such as styled-components and emotions, are not supported by Server Components. Only build-time CSS-in-JS libraries are supported.
- Even if you can write CSS in a javascript file components and styling are separated.

### TailwindCSS

#### Benefits
- You can write CSS faster.
- CSS and HTML are tied completely together.
- Most CSS properties depend on parents or children, so it's easier to read CSS once you get used to it.

#### Drawbacks
- It's hard to get used to it
- When you use JavaScript expressions, you need to do repetitive work. 

https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
`,
  },
  {
    title: "🩺Deep dive into ShadCN UI",
    publishedAt: "Apr 24 2024",
    content: `
## Introduction

Radix-UI is a headless UI library that guarantees accessibility and ShadCN UI are components built on top of it, styled with tailwindCSS. These libraries are leading the trend and I got curious about them, so I jumped into it and I'm using them in my project. So far, I'm satisfied with its approach, but there were some issues since I missed some details while they abstracted away the HTML. In this post, I will talk about **the issues I had while styling and customizing ShadCN UI Components**.

## Troubleshooting: Style \`<label/>\` element based on radio input state

### Requirements

![Design Requirement](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9lcu6tdm0o5rat7esgxu.png)

  - It should satisfy the styling of the given design.
  - Both buttons should work as radio buttons
  - It should take accessibility into consideration

Since ShadCN UI already takes consider of accessibility and radio functionalities are supported, I decided to use \`RadioGroup\` and \`RadioGroupItem\`.


### First Approach: Use TailwindCSS pseudoclass
\`peer-{modifier}\` lets style a specific element based on sibling state. You can the sibling element with \`peer\` className and style the target element by using \`peer-{modifier}\` like \`peer-checked/peername:bg-green\`.

Here's the blueprint of the code.

\`\`\`tsx
<RadioGroup>
  <RadioGroupItem
    className="peer/overview"
    value="overview"
    id="overview"
  />
  <Label
    htmlFor="overview"
    className="peer-checked/overview:border-pink"
  >
    ...
  </Label>
</RadioGroup>
\`\`\`

However, the \`<Label/>\` element was not styled with the \`peer-checked/overview:border-pink\` className. I wrapped my head around this issue for a few hours, closely looked at Chrome Devtools for a few hours, and found the reason why it doesn't work.

HTML Element on Chrome Devtools

![Rendered HTML Elements on Devtools](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/plqc3ytx00nu23aoyina.png)

The actual rendered result of \`<RadioGroupItem/>\` component is \`<button aria-role="radio"/>\`, instead of \`<input type="radio"/>\`. \`checked\`. CSS does not evaluate aria-role unless it's specified directly like this:

\`\`\`css
[role="checked"]{
  background-color: white;
}
\`\`\`

At this stage, I realized it's not feasible to style \`<label/>\` based on \`<input/>\` state here, so I moved forward with another approach: dynamic styling.


### Dynamic Styling
Since I saw that it's difficult to manage the input state(\`checked\`) supported in native HTML in this case, I managed the state by using \`useState()\` react hook. After that, I constructed a dynamic className computed with the state and injected it.

At first, I tried it like this.
- Note that \`onValueChange()\` is the event handler prop for \`<RadioGroup/>\` Component.
- Note that \`checked\` prop is used in \`<RadioGroupItem/>\` Component.
- The dynamic style \`border-pink even:text-pink\` of <Label/> specifies the text color of its second child element.

However, this element had a limitation. Since the direct declaration(\`className='text-black'\`) is applied by \`@utilities\` and the pseudoclass(\`even:text-pink\`) is applied by \`@base\` in the \`global.css\` file, \`className='text-black\` takes precedence over the pseudoclass and the text color of the second child doesn't change even if the radio button is set to \`checked\`. You can check the results below provided by Chrome Devtools.

- Applied text color on Chrome Devtools

![Applied text color on Chrome Devtools](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hhm6yovjbfc3ru3hctnm.png)

- Overrided text color on Chrome Devtools

![Overrided text color on Chrome Devtools](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/epys8zzswo9ul421r8k5.png)

- The order of tailwind styling

![The content of global.css file](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uwe5i2mu6kuiea31romk.png)

Therefore, instead of staying the child element in the parent component, I was bound to pass the js expression to the child component.

Here's the refactored code.

\`\`\`tsx
<RadioGroup
  value={selectedOption}
  onValueChange={setSelectedOption}
>
  <RadioGroupItem
    value="overview"
    id="overview"
    checked={selectedOption === "overview"}
  />
  <Label
    htmlFor="overview"
    className={\`\${selectedOption === "overview" ? "border-pink even:text-pink" : ""}\`}
  >
    <div>
      ...
    </div>
    <div
      className='text-black'
    >
      this should turn pink when its radio input is checked, but it's still black.
    </div>
  </Label>
</RadioGroup>
\`\`\`

## Troubleshooting: \`<RadioGroupItem/>\` should be hidden from the screen but still be accessible
It was necessary to hide radio buttons and display only labeled texts.

### Using \`display: none\` attribute
This attribute removes the element from the accessibility tree, causing the UI to be inaccessible to screen readers.

\`\`\`tsx
<RadioGroupItem
  className="hidden"
  value="overview"
  id="overview"
  checked={selectedOption === "overview"}
/>
\`\`\`

![Accessibility Tree on Chrome Devtools when display: none is used](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wju54az2216crzt2psap.png)

### Using \`visibility: hidden\` attribute
This attribute also eliminates the element from the tree. Plus, the element still takes up the box of the area.

\`\`\`tsx
<RadioGroupItem
  className="invisible"
  value="overview"
  id="overview"
  checked={selectedOption === "overview"}
/>
\`\`\`

![Accessibility Tree on Chrome Devtools when visibility: hidden is used](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dmgwne4mhf0vgvcu6h49.png)

## Using \`height: 0\` attribute
It also removes the element from the tree.

## Using \`sr-only\` className in tailwindCSS
\`sr-only\` applies the following CSS attributes to the element.

\`\`\`css
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
white-space: nowrap;
border-width: 0;
\`\`\`

It hides the element from the screen completely. Plus it's still accessible.
![UI when sr-only is used](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dgf0uktqi15urvsgfpbd.png)

![Accessibility Tree on Chrome Devtools when sr-only is used](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/s2um4izc11abe2oekpxr.png)

## Form Component

ShadCN UI introduces how to use its \`<Form />\` component. However, it was my first time using \`react-hook-form\` and runtime validation library \`zod\` altogether, so I didn't have any clue how I should write down some code. I decided to break all the example into pieces and take a look at what's really going on.

Here's the example. It's quite overwhelming.
\`\`\`tsx
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
\`\`\`

### zod
You define schema using this library. Schema is a set of more strict rules for each data type than static typescript.

### \`react-hook-form\`
\`react-hook-form\` helps you build forms faster and more performant. Each child component wouldn't cause rerender of any other children components.

- \`useForm()\`
\`useForm()\` hook returns form state including props like \`register\`, \`handleSubmit\` and \`formState\`.

\`\`\`tsx
export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
\`\`\` 

- \`<FormProvider/>\`: This \`react-hook-form\` component allows your components to subscribe to the \`useForm()\` props and methods.

- \`<FormField/>\`:This component provides \`name\` context to \`<Controller />\` component. \`<Controller />\` component is a \`react-hook-form\` component that gets props such as 'name', 'control', 'render'. [A blog post here](https://www.patterns.dev/react/render-props-pattern/) explains render prop pattern in detail, so check it out if you're interested.

\`\`\`tsx
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}
\`\`\`

- \`useFormField()\`: it extracts all the values given by \`FormFieldContext\`, \`FormItemContext\`, and \`useFormContext()\`. \`useFormContext()\` allows you to access form state(\`getFieldState\` and \`formState\` props). It returns \`fieldState\`, \`formItemId\` for each item, \`formDescriptionId\`, \`formMessageId\`, etc.

\`\`\`tsx
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: \`\${id}-form-item\`,
    formDescriptionId: \`\${id}-form-item-description\`,
    formMessageId: \`\${id}-form-item-message\`,
    ...fieldState,
  }
}
\`\`\`

\`<FormItem/>\`: This component generates an unique accessibility id for each component and wraps its children with the \`id\` Provider.

\`\`\`tsx
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
\`\`\`

- \`<FormLabel/>\`: This component gets \`error\`, \`formItemId\` from \`useFormField()\` hook. \`error\` is used to style the label text, and \`formItemId\` is used to refer to the target form item using \`htmlFor\` attribute.

\`\`\`tsx
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-red-500 dark:text-red-900", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
\`\`\`

- \`<FormControl/>\`: This component gets \`error\`, \`formItemId\`, \`formDescriptionId\`, \`formMessageId\` from \`useFormField()\` hook. \`Slot\` component merges props onto its immediate child. You can see [the full code in its repo](https://github.com/radix-ui/primitives/blob/main/packages/react/slot/src/Slot.tsx).

\`\`\`tsx
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? \`\${formDescriptionId}\`
          : \`\${formDescriptionId} \${formMessageId}\`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
\`\`\`

- \`<FormDescription/>\`: This component gets \`formDescriptionId\` from \`useFormField()\` hook. \`formDescriptionId\` is used to target the element and refer to it using \`aria-describedby\` in the input element.

\`\`\`tsx
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-slate-500 dark:text-slate-400", className)}
      {...props}
    />
  )
})
\`\`\`

- \`<FormMessage/>\`: This component gets \`formMessageId\`, \`error\` from \`useFormField()\` hook. \`formMessageId\` is used to target the element with the id and refer to it using \`aria-describedby\` in the input element. \`error\` is used to display the error message.

\`\`\`tsx
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-red-500 dark:text-red-900", className)}
      {...props}
    >
      {body}
    </p>
  )
})
\`\`\`

## Conclusion
ShadCN UI is a powerful tool since you don't need to write all the repeated HTML/CSS. Custom styling ShandCN UI components might be tricky since they abstract away everything, so it's necessary to stay up to date with Radix-UI docs.

## References
[Styling based on sibling state - Official Docs](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-sibling-state)
[Dynamic class names - Official Docs](https://tailwindcss.com/docs/content-configuration#dynamic-class-names)
[Specificity - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
[zod](https://zod.dev)
[FormProvider](https://react-hook-form.com/docs/formprovider)
[useForm](https://react-hook-form.com/docs/useform)
[useFormContext](https://react-hook-form.com/docs/useformcontext)
[getFieldState](https://react-hook-form.com/docs/useform/getfieldstate)
[Controller](https://react-hook-form.com/docs/usecontroller/controller)
[Render Props Pattern](https://www.patterns.dev/react/render-props-pattern/)
`,
  },
  {
    title: "Hands on favicons👻",
    publishedAt: "Jun 11 2024",
    content: `
[Masa's blog post](https://dev.to/masakudamatsu/favicon-nightmare-how-to-maintain-sanity-3al7) introduces how you can use favicon in 2023. In summary, he says you only need to include four types of images: ico favicon, svg favicon, apple-touch-icons, and web manifest icons. I wanted to play around with it to test if it works in 2024.

## What we can achieve from appropriate favicons
- It can give customers a sense of your brand if you're running a business.

## Project Settings

### Directory Structure
![Directory structure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xzrb7siw1v0ofyd425jw.png)

### \`favicon.svg\` preview

![SVG icon preview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4gxlyopnx4n17dxkyqwm.png)

- For the future-proof favicon, we should use **\`.svg\` favicons**. Display technology improves consistently, at the same time there are existing devices we should support. \`.svg\` icons solve this problem since \`.svg\` icons don't get affected by screen size or resolutions since they consist of vectors and shapes. You'll be able to ensure your favicon looks good on all upcoming and current devices.

- When the browser tab is dark, you need to change the color of the favicon. It's only possible with \`.svg\` favicons.

- [If you want to show your icon as a search result of google, the favicon should be in the multiple of 48*48px or 1:1 ratio svg](https://developers.google.com/search/docs/appearance/favicon-in-search). Since adding more 48px icon is a conversome, SVG is a go-to option.

### \`favicon.ico\` preview
![.ico favicon preview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gnkbahz3po6cx2yq6htm.png)

![SVG icon compatibility in CanIUse.com](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q0slbte3rjlj4nb5mx3a.png)

- According to [CanIUse.com](https://caniuse.com/link-icon-svg), only 72% of the browsers support svg icons. What's worse, the latest version of Safari(iOS, iPadOS, and macOS) doesn't fully support .svg icons. Therefore, you should polyfill svg icons for legacy browsers using \`.ico\` favicons. \`.ico\` favicons are supported by all browsers.

> [Polyfill means putting a piece of code to support older browsers that natively don't support some features.](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill)

## Test Results

- I'm using the latest version of Chrome, so it supports \`svg\` favicons.
- However, the favicon selection algorithm of the browser chooses \`.ico\` favicons over \`svg\` favicons depending on how they are placed in the markup.
- Note that \`size\` attribute plays an important role here.

### 1. Both without \`size\` attribute

\`\`\`HTML
<link rel="icon" href="/favicon.ico" />
<link rel="icon" href="/favicon.svg" />
\`\`\`

![.ico favicon on the browser tab](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ek70ogzhl01tv93srpdt.png)

- \`.ico\` icon rendered instead of \`.svg\` icon on the tab.

### 2. Both with \`sizes='any'\`

\`\`\`HTML
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
\`\`\`

![.ico favicon on the browser tab](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xy5h4bx8kml765088in4.png)

- \`.ico\` icon rendered on the tab instead of \`.svg\` icon.

### 3. Only '.ico' favicon with \`sizes='any'\`

\`\`\`HTML
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
\`\`\`

![.ico favicon on the browser tab](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/sn1syev9lpqhdzjo70pv.png)

- \`.ico\` icon rendered on the tab instead of \`.svg\` icon.

### 4. Only '.svg' favicon with \`sizes='any'\`

\`\`\`HTML
<link rel="icon" href="/favicon.ico" />
<link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
\`\`\`

![.ico favicon on the browser tab](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v0lsz5s2x85d5m8axyix.png)

- \`.ico\` icon rendered on the tab instead of \`.svg\` icon.

### 5. Setting \`sizes='48x48'\`

\`\`\`HTML
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
\`\`\`

![.svg favicon on the browser tab](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6mgi30g2d1jlnr8uqij5.png)

- \`.svg\` icon rendered on the tab
- We can see it finally does what we intend to. According to the original post, the favicon selection algorithm choose the last icon among the best appropriate ones in the markup, and it finds \`svg\` favicon more appropriate when \`.svg\` favicon is set to \`sizes='any'\` and \`.ico\` favicon is set to \`sizes=numberxnumber\`.

## Conclusion

To make favicons work properly, you can set your icons this way.

\`\`\`HTML
<link rel="icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
\`\`\`
`,
  },
  {
    title: "Edge Database Benchmarks",
    publishedAt: "Jun 08 2024",
    content: `Many database services are out there to solve your problems. However, you might be overwhelmed with all the options available(Was it only me?🥲). I found a database benchmark tool that Vercel built. This may help you make your database decisions. In this post, I'll go over the basic terminologies, my benchmark results, and some insights. Hopefully, it'll be able to give you a general idea about performance.

## Terminologies
Let's sort out all the terms we need to understand before moving on to the main point.

### CDN(Content Delivery Network)
CDN caches static contents such as HTML, CSS, and media files distributed to servers around users so that users can receive the contents faster.

### Edge Computing
Instead of running a distant server, you place multiple servers near the users to run computations. It reduces long-distance client-server communications.

### Edge Database
We just said edge computing came out to reduce client-server communications. It will lose its main purpose if the database is far from the edge servers since most edge computations require database access. You can put data and computing around users altogether. That's where people came up with the idea of an edge database.

## Distributed SQLite
- SQLite is fast so the server can read and write SQLite quickly.
- Vendors like Cloudflare D1, Turso, and fly.io offer distributed SQLite.
- Since they can be distributed, they align with edge databases and can be placed next to edge functions for fast access times.
- Turso stores the replicas of all databases in multiple regions by default.

## What's the point of Edge Database?


![Turso's Selling point](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kkheocvr32go0wzr195w.png)
- Turso's Selling point

You can consider edge databases when you want your users to get consistent latency wherever they are. This is more beneficial when your application needs to serve multiple regions(or countries). I'm planning to build travel apps and that's how I got more interested in Edge Database. The following is the real-life scenario I could think of.

![An American guy in Paris](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/08tlulov600yivqdmfjz.jpg)

Let's say you're American and traveling to Europe at the moment. When you open a mobile app, it loads slowly since your data should be in America. To solve this, the application can store your data around your current location(Europe) now and data access time will be reduced. 

Note that using SQLite as a distributed database is not a matured technology and [many people are still discussing(arguing).](https://news.ycombinator.com/item?id=39975596).


## Benchmarks
I'll use a database benchmark tool [a database benchmark tool](https://github.com/vercel-labs/function-database-latency) to see how well each database provider performs. Note that I'm testing this in South Korea, so I'm far away from the original database enough to test the performance(US East). I set the test options in the following manner.

![Test options](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wzk708ajc4d1kb0q4olq.png)

- Location option: Global function (Edge), Regional function(Edge / US East), and Serverless function (Node / US East)
- Waterfall: 5 sequential queries
- The number of samples for each location: 50

⚠️ Testing 50 requests might not be enough, but at least it gives you a general idea of the performance. Plus I set the Waterfall option to '5 sequential queries' to ensure real-life querying scenarios because each query usually depends on the result of the preceding queries(data dependency).

### Supabase with Drizzle ORM

- Latency distribution(processing time)
![Processing time of Supabase with Drizzle ORM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k377a5y59ypqaiibdqvv.png)

- Latency distribution(end-to-end)
![End-to-end latency of Supabase with Drizzle ORM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/92n9n36350li02nl0uqd.png)

- Supabase only runs on node, not on edge.
- Its processing time is ~30ms, and end-to-end access time is ~250ms. The end-to-end access time increases since the database lives in US East region.


### Neon with Drizzle ORM

- Latency distribution(processing time)

![Processing time of Neon with Drizzle ORM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/toquz5ooe9fr7ih38i7u.png)


- Latency distribution(end-to-end)

![End-to-end latency of Neon with Drizzle ORM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jfgtyey64vsjxfcpqdfu.png)

- Global edge takes an extremely longer time than regional edge/node.


### PlanetScale with Drizzle ORM

- Latency distribution(processing time)
![Processing time of PlanetScale with Drizzle ORM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m66h5ol65jg0nvbhtehq.png)

- Latency distribution(end-to-end)
![End-to-end latency of PlanetScale with Drizzle ORM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gtpqkwtdi02zqzwzwanu.png)

- Global edge takes an extremely longer time than regional edge/node.

### Upstash with Drizzle ORM

- Latency distribution(processing time)
![Processing time of Upstash with Drizzle ORM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w18cvpifi1wlg5sro9bi.png)

- Latency distribution(end-to-end)
![End-to-end latency of Upstash with Drizzle ORM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lgnjqlkly33mq3vd0ygf.png)

- Global edge still takes longer time than regional edge/node


### Turso with Drizzle ORM

- Latency distribution(processing time)
![Processing time of Turso with Drizzle ORM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wdkfav54s6mt2db0hiyc.png)

- Latency distribution(end-to-end)
![End-to-end latency of Turso with Drizzle ORM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dyok11ygl54braxzmves.png)

- Global edge still takes about the same time as edge/node.

## Test Results in Korea

- Actually, there was no point in using edge databases in Korea.
- Apparently, it's better to access data on the origin server.

Since this result is significantly different from [Turso's test result](https://turso.tech/blog/vercel-benchmarks-show-turso-has-low-latencies-everywhere-what-the-data-edge-is-good-for-7407579d4c88), I asked my friend in France to run Upstage and Turso tests there. Here's what she sent me.

### Turso with Drizzle ORM in France

- Latency distribution(processing time)
![Processing time of Turso with Drizzle ORM in Lille, France](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iu6k1wb9fqs6yapls175.png)

- Latency distribution(end-to-end)
![End-to-end latency of Turso with Drizzle ORM in Lille, France](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bej6a0hsfufrub34u64y.png)

- The real-life latency of the global edge is about 2 times lower than the others.

## Upstash with Drizzle ORM in France

- Latency distribution(processing time)
![Processing time of Upstash with Drizzle ORM in Lille, France](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8skqfx7van08a1h2kdhc.png)


- Latency distribution(end-to-end)
![End-to-end time of Upstash with Drizzle ORM in Lille, France](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cvhqqeqre8n6ib2yicba.png)

- The real-life latency of the global edge is about the same as the others.

## Conclusion
- Turso's edge database approach didn't work in South Korea. The rest of them either.
- Turso worked significantly better in France and Brazil.
- I assume this difference came from the fact that the closest edge location to Korea is Japan, while the other two countries have their own edge locations.
- Database Services other than Turso didn't work with Global Edge. While this means default Turso replicas outperform the others, [PlanetScale can improve performance if you set up replicas in other 15 regions(enterprise plan).](https://planetscale.com/docs/concepts/replicas). [Supabase supports 12 cross-regional read replicas configuration](https://supabase.com/docs/guides/database/replication).
Unfortunately, Neon only supports read replicas in the same region.

## References
- [Vercel's database benchmark tool](https://github.com/vercel-labs/function-database-latency)
- [Turso's benchmark result comparison between US and Brazil](https://turso.tech/blog/vercel-benchmarks-show-turso-has-low-latencies-everywhere-what-the-data-edge-is-good-for-7407579d4c88)
- [Why a company migrated from PlanetScale to Turso](https://www.openstatus.dev/blog/migration-planetscale-to-turso)`,
  },
  {
    title: "isFetching vs isFetchingNextPage",
    publishedAt: "Jun 6 2024",
    content: `
Here's what the docs says:
The isFetchingNextPage and isFetchingPreviousPage booleans are now available to distinguish between a background refresh state and a loading more state

isFetching
\`isFetching\` checks if the there is ongoing data fetching. Therefore, it could be true on initial page load and background refresh(when the data is stale)

isFetchingNextPage(isFetchingPreviousPage too)
\`isFetchingNextPage\` is a boolean flag that represents if the query is fetching next page or not. Therefore, it doesn't turn true even on initial page load and background refreshing. It only turns true when you already fetched the first page and the next page is being loaded.
`,
  },
  {
    title:
      "Why Intersection Observer is Better than Scroll Event for Infinite Scrolling List",
    publishedAt: "Jun 4 2024",
    content: `Intersection Observer가 scroll event handler에 비해서 성능이 좋다.

실험
Intersection Observer로 구현한 infinite scrolling list와 scroll event handler로 구현한 infinite scrolling list를 비교하였다.
scroll event handler에는 throttling과 caching이 적용되어 있다.

실험 결과
Scroll event handler에서 frame drop 현상이 크게 나타났다. 노란색, 빨간색 영역이 컸다.
CPU를 6배로 느리게 하고 실행한 결과, frame drop 현상이 실험 중 체감이 될 정도로 크게 느껴졌다. 스크롤링으로 페이지의 다른 부분으로 이동했을 때 screen을 paint하는데 3초 이상 소요되는 경우가 있었다.
core web vitals에서 interaction to next paint는 200ms 이하를 권장하고 있기에 이는 안 좋은 UX를 초래할 수 있다.

원인 분석
Intersection Observer 경우는 element간 교차가 발생할 경우만 비동기로 실행되어 main thread를 blocking하지 않지만, scroll event handler의 경우 스크롤 event가 발생할 때마다 main thread를 blocking한다.
throttling을 하더라도 element가 교차하지 않는 시점에 event handler가 호출되고, caching을 시키더라도 cache된 값을 가져오는function call은 여전히 발생하는 것이 원인으로 보인다.

결과
공수 비교: scroll event handler 구현은 caching과 throttling에서 복잡하게 구현하게 되므로 Intersection Observer보다 공수가 크다.
쓸데없는 main thread blocking 유무: caching과 throttling을 구현하더라도, main thread blocking 빈도는 본질적으로 scroll event handler가 훨씬 더 많을 수밖에 없어 극한의 디바이스 환경에서는 frame drop을 겪을 수도 있다. 반면 Intersection Observer는 소모적은 main thread blocking이 발생하지 않는다.
픽셀 단위 customization: scroll event에서 요소의 정확한 픽셀 단위를 파악할 수는 있겠다.
따라서 요소의 픽셀 단위 절대 위치가 필요한 게 아니라면 IntersectionObserver를 쓰는게 사용자 경험에 좋다.

https://itnext.io/1v1-scroll-listener-vs-intersection-observers-469a26ab9eb6
https://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/ 
Medium
`,
  },
  {
    title: "Client state vs. Server state",
    publishedAt: "Jun 1 2024",
    content: `I tried to manage state using state management libraries. However, if you look closer, the state can be divided into two categories.'

## Server State
- The client doesn't know the state's most recent and accurate data.
- The client only knows the snapshot of the state at the time it's fetched.

## Client State
- The client knows the state's most recent and accurate data since the client created it.

If you need to copy the server state from the client state, setting the data of the server state as the default value is the most common approach, especially if you're building a form.

`,
  },
  {
    title: "Type-safe APIs Solutions💡",
    publishedAt: "May 29 2024",
    content: `Note that this post is the ongoing work. It's yet to be finished.

## Introduction
I felt like I wasted a lot of time communicating with the Backend Engineers about what types JSON properties actually are. They provided me with some API spec written by their own, but I spent a lot of time pointing out what's wrong and waiting for the fix. Therefore, I decided to look into type-safe API solutions.

## Example
This is the common situation you run into:
\`\`\`typescript
export const addBooth = async (booth: Booth) => {
  const response = await fetch(\`\${API_URL}/api/booths\`, {
    method: HTTPMethod.POST,
  });
  const data = await response.json();
  return data;
};
\`\`\`
Here, the type of the variable \`data\` is \`any\`, since typescript cannot deduce the type of http response. Therefore, our frontend developers entirely relied on API specifiaction written by our backend developers on Notion. 

![Our API spec on Notion](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tg090guaf2nfj5uxr0si.png)

However, I found this process pretty inefficient. First off, backend developers need to spend time writing the API spec. Second, they might make mistakes and sometimes it takes a lot of time when I report the issues and get the answers. Lastly, I also report issues created by my own mistakes. That's how I got interested in type-safe solutions to reduce miscommunication issues and errors.

## OpenAPI
- It's a way to describe RESTful APIs. It started as Swagger API, but later changed its name to OpanAPI.
- Swagger is a toolkit that lets you write OpenAPI spec using JSON and renders OpenAPI Spec documents on the web.
- If your team uses Restful APIs, then you can take advantage of Swagger.


![Swagger UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k0krsxjuxnnhxb84hgcn.png)
In Swagger UI like this, you can check the types and rules of JSON properties by checking the schema backend engineers wrote for you. Note it doesn't work well by default, so you should kindly ask your backend developers for a double-check.

## GraphQL
- In GraphQL, requests and responses are defined in the schema formats.
- It can also solve the problem of overfetching and underfetching.
- Overfetching means receiving more data than the client needs.
- Underfetching means receiving less data than the client needs, and the client sends multiple requests.
- The whole team needs to work their asses off to learn GraphQL.
- It would be great when your application has a lot of endpoints, the team has separated frontend and backend developers, overfetching and underfetching happen quite often, and has enough time to learn GraphQL.

## tRPC(typescript Remote Procedure Control)
- Type definitions are shared between the client and the server.
- The API server must be written in typescript. If you're in a large team and the server should be used in a different language, tRPC is not a good choice.
- You should retain a monorepo or deploy an npm package to share the types between the client and the server.
- If you're using Server Actions, you can ditch tRPC. Once your server action logic gets complicated, you can consider using them altogether.

## Other solutions
Dear readers: language-neutral protocols have been around even before tRPC and GraphQL came out. You can check out these protocol-level type-safety tools as well.

- Protobuf: it's a data-serialization protocol. Instead of transferring JSON, this protocol sends protocol buffers.

> Data serialization process transforms objects into binary format so that data can be sent to the network. On the physical layer, these objects are just sent in the form of binary via cables.

## Conclusion
I haven't used GraphQL and tRPC. When I get a chance to use them I'll add more thoughts.`,
  },
  {
    title: "Data handling in Next.js🍕",
    publishedAt: "May 26 2024",
    content: `
## Data Handling strategies
Server components give you more options on how you fetch/update data since you can query the database directly in your next.js app or use REST or GraphQL to communicate with a remote API server.

### Using APIs
This is the most common way to manage data fetching. Frontend Engineers and backend Engineers decide the endpoints and communicate over HTTP(s) to send requests and responses. REST and GraphQL are the most common API architectures. If you have your backend team taking care of the database, then you will probably stick to this approach. Your backend team is free to **choose their own programming language** to build their server, and they can **scale out** in whatever way they want. This would be the most desirable approach if your server needs to **support other platforms** such as iOS, Android, MacOS, and Windows.

### Querying Database in Next.js
You can get data directly inside Server Components and update data inside Server Actions. Especially if you're using ORMs like \`Prisma\` or \`Drizzle\`, they are type safe. This means you don't need to remember the endpoint and the type of body, and you can always check the type definitions and warnings provided by their vscode extensions. One major downside is that Server Actions are not supported by other platforms, so you need to migrate all the logic in a different form. However, Expo Router lets you use Server Components in React Native, so stay up to date! We might be able to use Server Actions one day!

## Data fetching

### Using \`fetch()\` on the server
Next.js extends the native fetch() API if you use them inside Server Components. You can make a Server Component \`async\` and get the data by putting \`await\` syntax in front of \`fetch()\`. You must create a \`loading.js\` or use \`Suspense\` component if you don't want it to block other components from fetching.

### Using Route Handlers on the Client
Route handlers can be used when you don't want to expose credentials like API tokens to the client. Route handlers are cached when you use \`GET\` HTTP method inside them. Using \`cookies()\`, \`headers()\`, or any other HTTP methods will make them uncached.

### Data Fetching on the Client
You can fetch data on the client based on user interactions like infinite scrolling or real-time updates like messaging. Also, there might be some situations where you want to support native platforms, and you might not be able to use server components. 

## Benefits of Data Fetching on the Server

### Multiple round-trips become single
If you \`fetch()\` multiple times with the same URL and options across a single route, Next.js stores the result of that \`fetch()\` the first time it runs and reuses it for the same fetch invocations. This makes multiple requests into a single one.

### Reducing Latency and Improves Performance
The distance between the client and the API server is likely longer than between the rendering server and the API server because the rendering server and the API server are mostly located at the same data center, while the client and the API server communicate over the internet. Therefore, data fetching on the server has lower latency.

#### Data fetching on the client

\`\`\`
Client                  Rendering Server         API Server
   |                       |                      |
   |--Request HTML-------->|                      |
   |                       |                      |
   |<--Response HTML-------|                      |
   |                       |                      |
   |--Request Data------------------------------->| (Long distance over the internet)
   |                       |                      |
   |                       |                      |
   |<--Response Data------------------------------| (Long distance over the internet)
   |                       |                      |
   |                       |                      |
\`\`\`

#### Data fetching on the server

\`\`\`
Client                  Rendering Server         API Server
   |                       |                      |
   |--Request HTML-------->|                      |
   |                       |--Request Data------->| (Short distance within region)
   |                       |                      |
   |                       |<--Response Data------| (Short distance within region)
   |                       |                      |
   |<--Response HTML (with data)------------------|
   |                       |                      |
\`\`\`

**However, note that your next.js server and API server might not be to each other if you deployed them on different cloud service providers.** These cloud service providers are physically located in separate places and don't even have optimized network connections. This means the latency might not reduce, and performance doesn't improve dramatically. Let's take an extreme example. Imagine you deployed next.js on vercel and node.js server on Google Cloud. Vercel might deploy your server in Florida while Google Cloud might deploy your server in Paris. The connection between AWS and Vercel is not optimized and the distance is long, causing a lot of latency even though you fetch data on the server.

#### Fetching data on the server with a short distance
\`\`\`
Client                  Rendering Server (CSP1 Region1)         API Server (CSP1 Region1)
   |                       |                                      |
   |--Request HTML-------->|                                      |
   |                       |--Request Data----------------------->|
   |                       |                                      |
   |                       |<--Response Data----------------------|
   |<--Response HTML (with data)----------------------------------|
   |                       |                                      |
\`\`\`

### Fetching on the server with a long distance
\`\`\`
Client                  Rendering Server (CSP1 Region1)         API Server (CSP2 Region2)
   |                       |                                      |
   |--Request HTML-------->|                                      |
   |                       |                                      |
   |                       |--Request Data----------------------->| (Long distance over the internet)
   |                       |                                      |
   |                       |<--Response Data----------------------| (Long distance over the internet)
   |<--Response HTML (with data)----------------------------------|
   |                       |                                      |
\`\`\`

#### Keep your main thread less busy
By default, the browser uses a single thread to execute JavaScript and perform layout, reflows, and garbage collection. If event processing and painting get delayed, users are probably not happy with using our website. Data fetching on the server can help the main thread with these jobs, making our website more responsive.

- Initializing requests and processing responses
- Rendering HTML by evaluating javascript

#### Reducing Network Waterfalls

There are two types of data fetching.

- Sequential Data fetching
- Parallel data fetching

https://nextjs.org/docs/app/building-your-application/caching#opting-out-2
https://nextjs.org/docs/app/building-your-application/caching#generatestaticparams

https://developer.mozilla.org/en-US/docs/Glossary/Main_thread
https://nextjs.org/blog/security-nextjs-server-components-actions#http-apis
`,
  },
  {
    title: "TLS",
    publishedAt: "May 23 2024",
    content: `1. Server generates its own public/private key pairs before deployment.
2. Server sends a certificate signing request to the CA before deployment.
3. Server receives the certificate signed by the CA before deployment.
4. Client and Server establishes a TCP connection.
5. Client send a 'ClientHello' request. It includes cipher suites, session id, and ssl protcol version.
4. Client receives the signed CA from server and unsigns it using the public key provided by the CA.
5. Client validates the unsigned CA by checking validity period, certificate revocation and domain name matching.
6. If the certificate is valid, client generates a symmetric key(generates pre-master secrete) and signs it using the server's public key.
7. server unsigns the signed key using its private key.
8. handshake finished.

`,
  },
  {
    title: "2132131",
    publishedAt: "May 19 2024",
    content: `
\`\`\`tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../provider/auth-store-provider";
import React, { useCallback, useEffect, useMemo } from "react";
import { restoreAccessToken } from "@/src/features/auth/model/auth";
import {
  HTTPHeaderKey,
  HTTPHeaderValue,
  getAccessToken,
  getAuthorziationValue,
} from "../../api/config";

type FetchFunc = (accessToken: string, ...params: any[]) => Promise<any>;

export default function useAuthFetchList(fetchFunc: FetchFunc) {
  const [accessToken, refreshToken, refresh, reset] = useAuthStore((state) => [
    state.accessToken,
    state.refreshToken,
    state.refresh,
    state.reset,
  ]);
  const router = useRouter();

  useEffect(() => {
    console.log("????");
    if (!accessToken || !refreshToken) {
      console.log("??");
      router.push("/sign-in");
    }
  }, [accessToken, refreshToken, router]);

  console.log("리렌더링");

  const authFetchFunc = async (...params: any[]): Promise<any> => {
    const { code: originalCode, data: originalData } = await fetchFunc(
      accessToken,
      ...params,
    );

    if (originalCode !== 2000) {
      return originalData;
    }

    console.log("access token 만료");

    const restoredResponse = await restoreAccessToken(refreshToken);
    const { headers: restoredHeaders } = restoredResponse;

    if (!restoredResponse.ok) {
      const { code: restoredCode } = await restoredResponse.json();
      if (restoredCode === 2003) {
        console.log("refresh token 만료");
        // reset();
      }
    }

    const authorization = restoredHeaders.get(HTTPHeaderKey.AUTHORIZATION)!;
    const reissuedAccessToken = getAccessToken(authorization);
    console.log("reissuedAccessToken");
    console.log(reissuedAccessToken);
    refresh(reissuedAccessToken);

    return await fetchFunc(reissuedAccessToken, ...params);
  };

  return authFetchFunc;
}

// const authFetchFuncList = useMemo(
//   () =>
//     fetchFuncList.map((func) => async (...params: any[]): Promise<any> => {
//       const { code: originalCode, data: originalData } = await func(
//         accessToken,
//         ...params,
//       );

//       if (originalCode !== 2000) {
//         return originalData;
//       }

//       console.log("access token 만료");

//       const restoredResponse = await restoreAccessToken(refreshToken);
//       const { headers: restoredHeaders } = restoredResponse;

//       if (!restoredResponse.ok) {
//         const { code: restoredCode } = await restoredResponse.json();
//         if (restoredCode === 2003) {
//           console.log("refresh token 만료");
//           // reset();
//         }
//       }

//       const authorization = restoredHeaders.get(HTTPHeaderKey.AUTHORIZATION)!;
//       const reissuedAccessToken = getAccessToken(authorization);
//       console.log("reissuedAccessToken");
//       console.log(reissuedAccessToken);
//       refresh(reissuedAccessToken);

//       return await func(reissuedAccessToken, ...params);
//     }),
//   [accessToken, refreshToken, fetchFuncList, refresh],
// );

\`\`\`
`,
  },
  {
    title: "2019-2024 회고",
    publishedAt: "May 10 2024",
    content: `2019년
개발 관련 지식을 얻기위해 여러 컨퍼런스를 전전하였다. if kakao 2019에 참여했을 때는 javascript로 게임을 만들 때 코드퀄리티를 유지하기 위한 여러가지 기법들에 대해 들었었다. (한번에 하나의 기능만 넣을 수 있도록 코드 분리하기)


2020년
코로나 유행으로 인해 집에만 있으면서 우울감이 많이 커졌던 것 같다. 코드를 치는 날보다 코드를 치지 않는 날이 더 많았다.
- 가드너 프로젝트를 통하여 깃헙 프로젝트 협업 커뮤니티를 조성하고자 했으나 실패했던 경험

2021년
- 군장병해커톤을 시도했지만 끝내 프로젝트를 완성시키지 못했던 경험

2022년
- 알고리즘, 컴퓨터구조 책을 들고 와서 야간근무 때마다 완독을 시도해본 경험
 


2023년
- 백엔드 개발자로 밀려나서 스프링 백엔드를 했었는데 크게 기여를 못했던 경험(Spring Security)
- 해외에 살아보면서 여러가지 문제 해결을 스스로 해야했던 점

2024년
- 이력서를 150군데 넣어봤는데 떨어진 경험
- 메이저폴리오 런칭
- 유니패스트 런칭
- 매주 프리코드캠프 또는 코드서울 참여

하고싶은 것들
- 유럽 여행 계획 세워주는 것을 도와주는 앱 
- 파업 정보 보여주는 사이트
- 

`,
  },
  {
    title: "Prevent useEffect()'s infinite rendering with useCallback()",
    publishedAt: "May 7 2024",
    content: "",
  },
  {
    title: "Stop rerendering with useCallback()",
    publishedAt: "May 5 2024",
    content: `
\`\`\`tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../provider/auth-store-provider";
import React, { useCallback, useEffect, useMemo } from "react";
import { restoreAccessToken } from "@/src/features/auth/model/auth";
import {
  HTTPHeaderKey,
  HTTPHeaderValue,
  getAccessToken,
  getAuthorziationValue,
} from "../../api/config";

type FetchFunc = (accessToken: string, ...params: any[]) => Promise<any>;

export default function useAuthFetchList(fetchFunc: FetchFunc) {
  const [accessToken, refreshToken, refresh, reset] = useAuthStore((state) => [
    state.accessToken,
    state.refreshToken,
    state.refresh,
    state.reset,
  ]);
  const router = useRouter();

  useEffect(() => {
    console.log("????");
    if (!accessToken || !refreshToken) {
      console.log("??");
      router.push("/sign-in");
    }
  }, [accessToken, refreshToken, router]);

  console.log("리렌더링");

  const authFetchFunc = async (...params: any[]): Promise<any> => {
    const { code: originalCode, data: originalData } = await fetchFunc(
      accessToken,
      ...params,
    );

    if (originalCode !== 2000) {
      return originalData;
    }

    console.log("access token 만료");

    const restoredResponse = await restoreAccessToken(refreshToken);
    const { headers: restoredHeaders } = restoredResponse;

    if (!restoredResponse.ok) {
      const { code: restoredCode } = await restoredResponse.json();
      if (restoredCode === 2003) {
        console.log("refresh token 만료");
        // reset();
      }
    }

    const authorization = restoredHeaders.get(HTTPHeaderKey.AUTHORIZATION)!;
    const reissuedAccessToken = getAccessToken(authorization);
    console.log("reissuedAccessToken");
    console.log(reissuedAccessToken);
    refresh(reissuedAccessToken);

    return await fetchFunc(reissuedAccessToken, ...params);
  };

  return authFetchFunc;
}

// const authFetchFuncList = useMemo(
//   () =>
//     fetchFuncList.map((func) => async (...params: any[]): Promise<any> => {
//       const { code: originalCode, data: originalData } = await func(
//         accessToken,
//         ...params,
//       );

//       if (originalCode !== 2000) {
//         return originalData;
//       }

//       console.log("access token 만료");

//       const restoredResponse = await restoreAccessToken(refreshToken);
//       const { headers: restoredHeaders } = restoredResponse;

//       if (!restoredResponse.ok) {
//         const { code: restoredCode } = await restoredResponse.json();
//         if (restoredCode === 2003) {
//           console.log("refresh token 만료");
//           // reset();
//         }
//       }

//       const authorization = restoredHeaders.get(HTTPHeaderKey.AUTHORIZATION)!;
//       const reissuedAccessToken = getAccessToken(authorization);
//       console.log("reissuedAccessToken");
//       console.log(reissuedAccessToken);
//       refresh(reissuedAccessToken);

//       return await func(reissuedAccessToken, ...params);
//     }),
//   [accessToken, refreshToken, fetchFuncList, refresh],
// );


## create a fetch e

\`\`\`tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../provider/auth-store-provider";
import React, { useCallback, useEffect, useMemo } from "react";
import { restoreAccessToken } from "@/src/features/auth/model/auth";
import {
  HTTPHeaderKey,
  HTTPHeaderValue,
  getAccessToken,
  getAuthorziationValue,
} from "../../api/config";

type FetchFunc = (accessToken: string, ...params: any[]) => Promise<any>;

export default function useAuthFetchList(fetchFunc: FetchFunc) {
  const [accessToken, refreshToken, refresh, reset] = useAuthStore((state) => [
    state.accessToken,
    state.refreshToken,
    state.refresh,
    state.reset,
  ]);
  const router = useRouter();

  const authFetchFunc = useCallback(
    async (...params: any[]): Promise<any> => {
      const { code: originalCode, data: originalData } = await fetchFunc(
        accessToken,
        ...params,
      );

      if (originalCode !== 2000) {
        return originalData;
      }

      const restoredResponse = await restoreAccessToken(refreshToken);
      const { headers: restoredHeaders } = restoredResponse;

      if (!restoredResponse.ok) {
        const { code: restoredCode } = await restoredResponse.json();
        if (restoredCode === 2003) {
          reset();
          router.push("/");
        }
      }

      const authorization = restoredHeaders.get(HTTPHeaderKey.AUTHORIZATION)!;
      const reissuedAccessToken = getAccessToken(authorization);
      console.log("reissuedAccessToken");
      console.log(reissuedAccessToken);
      refresh(reissuedAccessToken);

      return await fetchFunc(reissuedAccessToken, ...params);
    },
    [accessToken, fetchFunc, refresh, refreshToken, reset, router],
  );

  return authFetchFunc;
}
\`\`\`
`,
  },
  {
    title: "Dev log 2",
    publishedAt: "May 2 2024",
    content: `
zod

.refine
When you need to customize with your own rules, you can use \`.refine()\` method.
some methods take errorMap instead of errorMessage itself.

\`\`\`tsx
const getEnvVariable = (key: string) => {
  console.log(key); // "BASE_URL"
  console.log(process.env[key]); // undefined
  console.log(process.env["BASE_URL"]); // http://localhost:3000

  if (process.env[key] === undefined) {
    throw new Error(\`Environment variable is undefined\`);
  }
  return process.env[key];
};
\`\`\`

devtools only picks up one store
\`\`\`tsx
<BoothStoreProvider>
  <AuthStoreProvider>
    <div className="mx-auto flex min-h-screen flex-col items-stretch justify-start sm:w-[640px]">
      <Header />
      <div className="flex flex-auto flex-col items-stretch justify-start px-5">
        {children}
      </div>
    </div>
  </AuthStoreProvider>
</BoothStoreProvider>
\`\`\`
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rh5jb0vn340c4bkzwtc9.png)

When BoothStoreProvider is wrapping AuthSToreProvider, BoothStoreProvider is displayed.

While AuthStoreProvider is wrapping BoothStoreProvider,
AuthStoreProvider is displayed.

\`\`\`tsx
<AuthStoreProvider>
  <BoothStoreProvider>
    <div className="mx-auto flex min-h-screen flex-col items-stretch justify-start sm:w-[640px]">
      <Header />
      <div className="flex flex-auto flex-col items-stretch justify-start px-5">
        {children}
      </div>
    </div>
 </BoothStoreProvider>
</AuthStoreProvider>
\`\`\`

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3o1kixe3k6sjpfadgmvx.png)

\`\`\`tsx
const authFetchFuncList = fetchFuncList.map(
    (func) =>
      async (...params: any[]): Promise<any> => {
        const originalResponse = await func(accessToken, params);

        const { code: originalCode, data: originalData } =
          await originalResponse.json();

        if (originalCode !== 2000) {
          return originalData;
        }

        console.log("access token 만료");

        const restoredResponse = await restoreAccessToken(refreshToken);
        const { headers: restoredHeaders } = restoredResponse;
        const { code: restoredCode } = await restoredResponse.json();

        if (restoredCode !== 2003) {
          const authorization = restoredHeaders.get(
            HTTPHeaderKey.AUTHORIZATION,
          )!;
          const reissuedAccessToken = getAccessToken(authorization);
          refresh(reissuedAccessToken);

          return await func(reissuedAccessToken, ...params);
        }
        console.log("refresh token 만료");
        reset();
      },
  );
\`\`\`

Why did I write this code?
I don't want every function to get authFetch as an argument and run it. Every time we need it, we call them.

## React effects run before the store has been fully hydrated by loading from localStorage
\`\`\`tsx
useEffect(() => {
    if (!isHydrated) {
      return;
    }
    router.push("/sign-in");
  }, [router, currentAuthType, requiredAuthType, isHydrated]);
\`\`\`

auth-store.tsx
\`\`\`tsx
export type AuthState = {
  accessToken: string;
  refreshToken: string;
  isHydrated: boolean;
};

export type AuthActions = {
  setCredentials: (credentials: AuthState) => void;
  refresh: (newAccessToken: string) => void;
  reset: () => void;
  setHydrated: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState = {
  accessToken: "",
  refreshToken: "",
  isHydrated: false,
} satisfies AuthState;

...inside createStore()
{
    name: "auth-storage",
    onRehydrateStorage: () => (state, error) => {
        state?.setHydrated();
    },
},
\`\`\`
After the hydration of localStorage has finished, onRehydrateStorage() will be invoked. By setting the flag variable to be true, we can run the effect when data has been loaded from localStorage.
`,
  },
  {
    title: "⚠️AutoAnimate Warning",
    publishedAt: "Apr 28 2024",
    content: `
## Adding Element to the DOM and Removing Element from the DOM
You can set the state in any form.

\`\`\`ts
const [parent] = useAutoAnimate();
const [show, setShow] = useState(false);

const change = () => setShow((show) => !show);

return (
  <div ref={parent}>
    <button onClick={change}>Click here</button>
    {show && <div>I popped up!</div>}
  </div>
);
\`\`\`

## Moving element from the DOM

- If you want to move elements as if you juggle with them, you must change the order of items in the array instead of conditionally rendering using a boolean or a number state.

❌ Each element will disappear and appear instead of moving around to its new position.

\`\`\`tsx
const [progress, setProgress] = useState(0);
const [parent] = useAutoAnimate();

<div
  ref={parent}
  className="flex h-[15px] w-[70px] items-center justify-between"
>
  {[0, 1, 2].map((element) =>
    element === progress ? (
      <RedDotIcon key={element} />
    ) : (
      <DotIcon key={element} />
    ),
  )}
</div>
\`\`\`

- AutoAnimate will not work when you use the index as \`key\` value instead of the array item itself.

❌ AutoAnimate won't work here
\`\`\`tsx
// Use array instead of a primitive value if you want to see them switching their positions  
const [colors, setColors] = useState(["red", "gray", "gray"]);
const [parent] = useAutoAnimate();

const change = () => {
  const juggled = [...colors];
  juggled.unshift(juggled.pop()!);
  setBalls(juggled);
};

<div ref={parent} className="flex justify-between">
  {balls.map((color, index) => (
    <li key={index}>
      {color === "red" ? <RedDotIcon /> : <DotIcon />}
    </li>
  ))}
</div>
\`\`\`

✅ It works!
\`\`\`tsx
<div ref={parent} className="flex justify-between">
  {balls.map((color, index) => (
    <li key={index}>
      {color === "red" ? <RedDotIcon /> : <DotIcon />}
    </li>
  ))}
</div>
\`\`\`
`,
  },
  {
    title: "🧱Next.js 14에 Pretendard 폰트 적용하기",
    publishedAt: "Apr 19 2024",
    content: `
이번 글에서는 Next.js 14 버전에서 Pretendard 폰트를 적용하는 법과, 기존에 cdn에서 폰트를 적용하는 것에 비해서 어떤 최적화가 이루어지는지 다루겠습니다. 현재 Next.js 14에 대한 자료는 한글화된 문서가 많지 않아서 도움을 받으실 분들이 많으셨으면 좋겠습니다.

## Pretenard
- 사실상 현업 표준으로 자리잡은 한글 폰트입니다. 여러 회사들이 프로젝트에 적용하고 있습니다. 
- 아이콘, 숫자와의 배치가 자연스러운 것이 장점입니다.
- 폰트 굵기가 다양하여 섬세한 폰트 스타일링이 가능합니다.
- 무료 상업용 폰트로 누구나 가져다 쓸 수 있습니다.

## 설치
1. [Prendtendard releast note](https://github.com/orioncactus/pretendard/releases/latest)로 들어가서 파일을 다운로드 받아주세요.

    ![Release note assets](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vd6afqtbbjnuodpl3jn2.png)


2. 압축을 풀고 \`.../Pretendard-1.3.9/web/variable/woff2/PretendardVariable.woff2\` 파일을 프로젝트 디렉토리에 넣어주세요. 제 프로젝트에는 /static/fonts 디렉토리에 넣었습니다.

    ![Project directory](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u9g8i4gg6lznefx2ryz9.png)

3. global font로 적용시키기 위해서 \`app/layout.tsx\`에 className을 전달합니다.

    \`\`\`ts
    import localFont from "next/font/local";

    const pretendard = localFont({
      src: "../static/fonts/PretendardVariable.woff2",
      display: "swap",
      weight: "45 920",
      variable: "--font-pretendard",
    });

    export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
        <html lang="kr" className={\`\${pretendard.variable}\`}>
          <body className={pretendard.className}>
            <Header/>
            {children}
          </body>
        </html>
      );
    }
    \`\`\`

## tailwindcss에 css varaible로 등록하고 사용하기
전역적으로 폰트를 적용시키는 대신에 부분적으로 폰트를 적용하고 싶을 때는 tailwind의 css variable으로 등록할 수 있습니다.

1. \`app/layout.tsx\`에서 폰트의 css variable을 document에 넣어줍니다.

    \`\`\`ts
    import localFont from "next/font/local";

    const pretendard = localFont({
      src: "../static/fonts/PretendardVariable.woff2",
      display: "swap",
      weight: "45 920",
      variable: "--font-pretendard",
    });

    export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
        <html lang="kr" className={\`\${pretendard.variable}\`}>
          <body className={pretendard.className}>
            <Header/>
            {children}
          </body>
        </html>
      );
    }
    \`\`\`

2. \`tailwind.cssconfig.js\`에서 css variable을 추가합니다.

    \`\`\`ts
    import type { Config } from "tailwindcss";

    const config: Config = {
      content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./stories/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
        extend: {
          fontFamily: {
            pretendard: ["var(--font-pretendard)"],
          },
        },
      },
      plugins: [],
    };
    export default config;
    \`\`\`

### 사용
\`className\`에 \`font-pretendard\`를 추가하여 폰트를 적용시킬 수 있습니다.

\`\`\`ts
<div className="font-pretendard shrink-0 font-black">프리텐다드</div>
\`\`\`

## Font Optimization
이 쯤에서 의문이 들었습니다.

> .css file에서 \`font-face\` attribute로 cdn 통해 폰트를 다운로드 받지 않고 굳이 이렇게 구현해야 하는 이유가 무엇일까?

Next.js 튜토리얼 비디오에 따르면 이에 대해 다음과 같이 답변해줍니다.

- cdn으로부터 다운로드 받게 되는 경우에는 클라이언트에서 custom 폰트를 다운로드 받기 전까지는 운영체제에서 사용 가능한 fallback font(Arial 등)를 사용하게 게 됩니다. custom 폰트 로드 전/로드 후에 폰트 사이즈 크기 차이로 인해 cumulative layout shift가 발생하여 사용자 경험을 크게 떨어뜨리게 됩니다.

- \`Next.js\`의 \`next/font\`를 사용하는 경우에는 font를 빌드 타임 때 한번만 다운로드 받고, fallback font가 사용되는 동안 css \`size-adjust\` 프로퍼티를 적용시켜서 글자 크기를 동일하게하여 layout shift가 발생하는 것을 막아줍니다.

직접 개발자 도구를 켜고 확인해봤습니다.
네트워크에 throttling을 걸어서 일단 custom font가 로드되기 전의 UI와 로드된 후의 UI를 확인했습니다.

- 로드 전: 시스템 폰트가 적용되었습니다.
![Text with fallback font](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mvd49dl98j1xg1sgfcou.png)

- 로드 후: Pretendard 폰트가 적용되었습니다.
![Text with Loaded font](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/476h8hte4ta4p93fozr1.png)

- 페이지에 접속했을 때 처음 받아오는 global css file을 확인해보니, 커스텀 폰트가 로드되는 동안 fallback font에 \`size-adjust\`를 설정하여 layout shift를 막고 있었습니다.

![font in devtools](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yfwgtaj4fvqblzsrk8hg.png)

![font in devtools2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u1ltxi1c0tasc3w8d3xf.png)

## References
- [Next.js Official Docs - optimizing fonts](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts)
- [Next.js에서 localFont 적용하기 by 나주엽님](https://velog.io/@pmthk__/Next.js-LocalFont-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-feat.-Pretendard)
- [Chrome for developers - Improved font fallbacks](https://developer.chrome.com/blog/font-fallbacks)
- [Using Fonts in Next.js (Google Fonts, Local Fonts, Tailwind CSS)
](https://www.youtube.com/watch?v=L8_98i_bMMA&ab_channel=LeeRobinson)
`,
  },
  {
    title: "🕵️Deep Dive into Server Components in Next.js 14",
    publishedAt: "Apr 19 2024",
    content: `
rendering server가 fetch를 하는 기존 방식의 문제점
1. top-level component of the tree에서만 가능하여 props drilling이 발생한다 => 코드 퀄리티가 떨어진다.
2. 표준화된 방식이 없었다.
3. 모든 HTML이 hydrated 되어야만했다(쓸데없는 컴포넌트들도 bundle에 포함되어 bundle size가 올라갔다.)

요구사항
1. rendering server에서 직접 fetch를 할 수 있어야 한다. (WEB CORE VITALS: LCP ISSUE)
2. top level 컴포넌트가 아닌 하위 컴포넌트에서도 fetch를 할 수 있어야 한다. (DX ISSUE)
3. 번들에 hydration이 필요 없는 부분을 보내지 않는다. (TTI Issue)

해결책
서버에서 fetch를 할 수 있는 Server Component를 만들자!

질문
어떻게 Server Component 결과를 클라이언트에 전달할 수 있는가?
그냥 줘버리면, transpiling, bundling, minifing을 해버린다 
=> RSC Payload와 Server Component가 나왔다
=> 그런데

NO Hydration => No states, NO event handlers just rednered result 
Cannget get the client rendered results anyway => client components shouldn't be the parent of Server Components, but render client components by using childrun is fine

Streamlining data => RSC Payload 

서버 > 클라이언트 => OK
클라이언트 > 서버 => NOT OK
서버 > 서버 => OK

따라서 render 되는 

1. rendering route에서 동일한 get method fetch에 대하여 memoization
2. fetch response를 cache
3. build time/revalidation시에 RSC Payload와 HTML을 cache

개삽질을 통해 얻은 결과

expect()를 해서 페이지가 로드된 뒤에 iframe element가 렌더링될 때까지 기다려줄 수 있다.(30s)
iframe을 통해서 생성되는 새로운 frame의 document를 expect를 통하여 한번 더 기다려줘야 한다.
`,
  },
  {
    title: "🧩Feature-Sliced Design",
    publishedAt: "Apr 18 2024",
    content: `1. 페이지 찾기
2. 인터렉션 찾기

1. 로그인 버튼/(내정보 버튼)
2. 태그 선택
3. 좋아요 버튼/피드 선택 버튼/아티클 링크

아티클
1. 탭리스트
2. 아티클
3. pagination

1. 리팩토링을 할 때, 변경되는 코드의 양을 최소한으로 줄이자.
2. 같은 프로젝트를 할 때 일관적인 디렉토리 형태를 사용하여 통일성이 부여된다 =>새로운 개발자가 들어왔을 때 확인 가능하다.
3. 코드가 어디 있을지 위치를 특정하는게 더 쉽다.(depth가 작음)

Layouts
1. app: top level component
2. pages: pages, 보통 UI만으로 동작
3. widgets: UI block(layout), entities 와 features를 조합하여 구성하는 layout
4. entities: feature elements를 렌더링할 수 있는 slot이 존재하는 UI 껍데기
5. features: 인터렉션에 사용되는 코드(UI, storage accesses)
6. shared: 개발하려는 feature와 상관 없는 코드. 디자인 시스템 컴포넌트, api client setting, 

Slices
디렉토리명은 개발하고자하는 feature에 따라 분류한다.

Segments
slices
ui: compoennts
model: global state(data storage)
lib: hooks, helpers
api

`,
  },
  {
    title: "✍️Testing in Storybook",
    publishedAt: "Apr 18 2024",
    content: `## Introduction

Storybook provides an environment where you can build components in isolation, and checking edge case UI states became easier with Storybook. What's more, you can write tests in Storybook. Also, testing environment comes with zero configuration. Aren't you excited? In this post, I will talk about what made me start testing in Storybook, how you can set up testing in Storybook, some issues I had with Storybook Addons.

## Motivation to do testing in Storybook

### \`jsdom\` in Jest cannot mock real DOM fully

[React Testing Library](https://testing-library.com/docs/) has become a go-to option for testing React applications since you can write tests from a user perspective. Here is its core principle in their official docs.

> The more your tests resemble the way your software is used, the more confidence they can give you.

So I tried Jest/React-Testing-Libary and was quite satisfied with these technologies. However, I got stuck when I tried to test \`Dialog\` element. It turns out there are [some known limitations with jsdom](https://github.com/jsdom/jsdom/issues/3294). Since \`jsdom\` is not real DOM, I came across a situation in which I can't test the element in the way it is used by users.

### Finding Alternatives

#### Another javascript-implemented DOM
- [happydom](https://github.com/capricorn86/happy-dom): It's another javascript implementation of DOM. However, its community is way smaller than \`jsdom\`. The repository has 2.9k+ stars, so I can't make sure that I would get a huge community support.

#### Using real DOM
- real DOM: \`jsdom\` lets us see the result of component testing immediately in the local development environment whenever our codebase changes. That's one of the important part of automated testing. Once we start using real DOM, it's clear that the execution time of testing will be too slow.

### Innovative Solution
- When you develop in local development, you typically run \`yarn storybook\` and see the result. Since Storybook already renders stories(components) in real DOM, it can reuse the rendered components to run component testing. [According to Storybook's Benchmark, Storybook interaction testing is 30% slower than jest/react-testing-library and sometimes it is even faster](https://github.com/storybookjs/storybook/discussions/16861#discussioncomment-2513340). Internally, Storybook uses jest/playwright to run the tests.

- In addition, it becomes easier to track down bugs since you can see the interaction flow visually in Storybook, rather than seeing the dumped HTML when the test fails. Debugging is made easier.

- Storybook's testing methods are similar to those of Jest/React-Testing-Library, so it was clear that I would get used to it easily.


## How to set up

### Test Runner

1. Install test runner

    \`\`\`
yarn add --dev @storybook/test-runner
    \`\`\`


2. Run the test-runner

    \`\`\`
    yarn test-storybook
    \`\`\`

### Interaction Testing

1. Add this to config of your ./storybook/main.ts

    \`\`\`ts
    const config: StorybookConfig = {
      addons: [
        '@storybook/addon-interactions',
        ...,
      ],
    }
    \`\`\`

2. Write an interaction test.

    \`\`\`ts
    // More on interaction testing: 
    // https://storybook.js.org/docs/writing-tests/interaction-testing
    export const LoggedIn: Story = {
      play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const loginButton = canvas.getByRole("button", { name: /Log in/i });
        await expect(loginButton).toBeInTheDocument();
        await userEvent.click(loginButton);
        await expect(loginButton).not.toBeInTheDocument();

        const logoutButton = canvas.getByRole("button", { name: /Log out/i });
        await expect(logoutButton).toBeInTheDocument();
      },
    };
    \`\`\`

  - \`play\`: this function runs after the story finishes rendering.
  - \`click\`: Storybook lets you use \`user-events\` in the same way as Reac Testing Library.
  - \`expect\`: assertion function


### Test Coverage
Test coverage shows any code lines that tests haven't gone through.

1. Install the addon.

    \`\`\`
    yarn add --dev @storybook/addon-coverage
    \`\`\`

2. Include the addon in main.ts

    \`\`\`ts
    const config: StorybookConfig = {
      addons: [
        '@storybook/addon-coverage', 
        ...,
      ],
    };
    \`\`\`

3. Run the test runner with \`--coverage option\`.

    \`\`\`
    yarn test-storybook --coverage
    \`\`\`

### End-to-end Testing
You can navigate to the URL of storybook and do end-to-end testing straight up.

\`\`\`ts
import { Frame } from "@playwright/test";
import { test, expect } from "./test";

let frame: Frame;

test.beforeEach(async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/example-page--logged-out"
  );
  await expect(page.getByTitle("storybook-preview-iframe")).toBeVisible();
  frame = page.frame({ url: /http:\/\/localhost:6006\/iframe.html/ })!;
  await expect(frame).not.toBeNull();
});

test("has logout button", async ({ page }) => {
  const loginButton = frame.getByRole("button", { name: /John/i }).first();
  await expect(loginButton).toBeVisible();
  await loginButton.click();

  await expect(
    frame.getByRole("button", {
      name: /John/i,
    })
  ).toBeVisible();
});
\`\`\`

### API Mocking

  1. Install the addon.

    \`\`\`
yarn add msw msw-storybook-addon --dev
    \`\`\`

  2. Generate service worker to your \`public\` directory.

    \`\`\`
yarn msw init public/
    \`\`\`

  3. Include the addon in .storybook/preview.ts

    \`\`\`ts
import { initialize, mswLoader } from 'msw-storybook-addon'
// Initialize MSW
initialize()
const preview = {
  parameters: {
    // your other code...
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
}
export default preview
    \`\`\`

  4. Open your \`storybook\` URL(http:localhost:6006) and check browser devtools > console tab. If MSW is enabled in your browser, you'll be able to see this log.

    ![msw enabled on console](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ma5bel5uwcmof4u4vim8.png)


    ![msw enabled on console2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zgdwyvohdn51mlfkh1uw.png)

  5. You can also see the following log in the console tab if the request was intercepted by MSW.

    ![mocking intercepted by MSW](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zwzor2h1tbmz54eb5m0x.png)








## Issues

### \`yarn test-storybook --coverage\`is not printing the coverage result on console

#### Description

![Test result on console, coverage not shown](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5exyaevwmrk97dsrszsi.png)

You can see that all the tests passed, but the coverage result is not displayed. [This is a known issue.](https://github.com/storybookjs/addon-coverage/issues/13)

#### Workaround

  1. Install \`nyc\` as a dev dependency.
    \`\`\`
    yarn add nyc --dev
    \`\`\`
  2. Run this command instead.
    \`\`\`
    test-storybook --coverage --coverageDirectory coverage && nyc report --reporter=text -t coverage
    \`\`\`
    
    \`nyc\` prints the result on console. This time we tell \`nyc\` where to pick up the coverage report file(\`./coverage\`).

## Troubleshooting

### Testing Storybook-rendered iframe in Playwright

Let's say you wrote a end-to-end test to see if the following application flow works.

  1. A page renders log-in button.
  2. User clicks log-in button.
  3. log-out button is renders.

![Log-in button](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gkmfv90zf79rqwgw7to1.png)


![Log-out button](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jvjr81tawlka10row9fw.png)


This is the first version of the test using the rendered component in storybook.

\`\`\`ts
test("it has logout button", async ({ page }) => {
  // navigate to the Stroybook component url
  await page.goto(
    "http://localhost:6006/?path=/story/example-page--logged-out",
  );

  // query log-in button element
  const loginButton = page.getByRole("button", { name: /log in/i });
  // fire click event
  await loginButton.click();
  // query log-out button element
  const logoutButton = page.getByRole("button", { name: /log out/i });
  // assert log-out button is rendered
  await expect(logoutButton).toBeVisible();
});
\`\`\`

Here's the result of the test.

![test failure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1qydp5voc9udlosc78l6.png)

- Problem: \`await page.goto()\` only waits for the navigation of the document of the main frame, so it doesn't wait for subframe generated by \`<iframe/>\` to render. Let's fix this issue.

\`\`\`ts
test("it has logout button", async ({ page }) => {
  // navigate to the Stroybook component url
  await page.goto(
    "http://localhost:6006/?path=/story/example-page--logged-out",
  );

  // wait for subframe to load
  await expect(page.getByTitle("storybook-preview-iframe")).toBeVisible();
  const frame = page.frame({ url: /http:\/\/localhost:6006\/iframe.html/ })!;

  // query log-in button element
  const loginButton = page.getByRole("button", { name: /log in/i });
  // fire click event
  await loginButton.click();
  // query log-out button element
  const logoutButton = page.getByRole("button", { name: /log out/i });
  // assert log-out button is rendered
  await expect(logoutButton).toBeVisible();
});
\`\`\`

![timeout error](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ikzj7na7kvu6a5fr2jgr.png)

- Problem: it's still impossible to query elements since \`loginButton\` and \`logoutButton\` is in the subframe. We need to query on the document of the subframe.

\`\`\`ts
test("it has logout button", async ({ page }) => {
  // navigate to the Stroybook component url
  await page.goto(
    "http://localhost:6006/?path=/story/example-page--logged-out",
  );

  // wait for subframe to load
  await expect(page.getByTitle("storybook-preview-iframe")).toBeVisible();
  const frame = page.frame({ url: /http:\/\/localhost:6006\/iframe.html/ })!;

  // query log-in button element
  const loginButton = frame.getByRole("button", { name: /log in/i });
  // fire click event
  await loginButton.click();
  // query log-out button element
  const logoutButton = frame.getByRole("button", { name: /log out/i });
  // assert log-out button is rendered
  await expect(logoutButton).toBeVisible();
});
\`\`\`

![test success](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5frqvmh3x94j0v6x9xm4.png)

Now the test succeeds!

## References
- [How to know what to test](https://kentcdodds.com/blog/how-to-know-what-to-test)
- [Setting test runner in Storybook](https://storybook.js.org/docs/writing-tests/test-runner)
- [Unit testing in Storybook](https://storybook.js.org/docs/writing-tests/stories-in-unit-tests)
- [Visual testing in Storybook](https://storybook.js.org/docs/writing-tests/visual-testing)
- [Interaction testing in Storybook](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Test coverage in Storybook](https://storybook.js.org/docs/writing-tests/test-coverage)
- [End-to-end testing in Storybook](https://storybook.js.org/docs/writing-tests/stories-in-end-to-end-tests)
- [Integrate MSW and Storybook](https://storybook.js.org/addons/msw-storybook-addon)

`,
  },
  {
    title: "📚Storybook not picking up tailwindcss",
    publishedAt: "Apr 17 2024",
    content: `
## Description
1. You have a Next.js setup pre-configured by default.
2. You integrated Storybook with tailwindcss and next.js.
3. When you run \`yarn dev\` or \`npm run dev\`, you can see \`tailwindcss\` is applied to your app.
4. However, when you \`yarn storybook\` or \`npm run storybook\`, you see \`tailwindcss\` is not applied to the stories.

If you went through all the things, maybe this post might give you some workaround.

## Workaround

1. Run the following command:

    \`\`\`
    yarn add autoprefixer --dev
    \`\`\`

2. Create \`postcss.config.js\` in your project root directory and type this in the file:

    \`\`\`js
    // esmodule config is not supported by Storybook

    module.exports = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };
    \`\`\`

3. Helpful Information
  - Storybook picks up \`tailwindcss\` in these cases.
      1. There is only \`postcss.config.js\` in your project
      2. There are both \`postcss.config.mjs\` and \`postcss.config.js\` in your project
  - Storybook doesn't pick up \`tailwindcss\` in this cases.
      1. There is only \`postcss.config.mjs\` in your project

## Related GitHub Issues and Articles
[[Bug]: Configuration with TailwindCss](https://github.com/storybookjs/storybook/issues/25177)
[Next.js using Tailwind with Storybook](https://dev.to/lico/nextjs-using-tailwind-with-storybook-5aie)

## I reported the issue!

If you are interested, check this out: [https://github.com/storybookjs/storybook/issues/26869](https://github.com/storybookjs/storybook/issues/26869)
`,
  },
  {
    title: "🍞Building Toast with React-Toastify and Troubleshooting",
    publishedAt: "Apr 14 2024",
    content: `
## Requirements

Here are the requirements of the \`<Toast/>\` UI that I defined

- It should render regardless of routing. Some of them should render on button clicks while the others should render right after fetching.
- It should pop up for 3 seconds and disappear.
- It should be placed on top of everything. Nothing should override it.
- It should be placed inside the Box on the desktop devices.
- There should be different texts based on contexts, such as:
  - The upload has been canceled.
  - Contact has been saved successfully.
  - Your account has been deleted successfully.
  - You've signed out of Majorfolio successfully.
  - We'll send you a verification email.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2o8ygh5e6cmckzdbzhav.png)

## Restrictions
- It should be in the top-level component since it should render regardless of routing.
- It seems hard to place Toast in the right position. It gets worse since there can be multiple Toast Messages.

Therefore, I decided to look into some libraries, and React-Toastify caught my attention.

## What React-Toastify offers
React-Toasitify
- stacks notifications
- supports swipe to close
- pause toast when the window loses focus
- support nice and tidy default animations
- can display a react component inside the toast
- sets Toast with \`role="alert"\` for accessibility

## Positioning Problem

\`<ToastContainer/>\` was set with \`position="bottom-center"\` prop and it was positioned in the wrong position.

- to be continued
`,
  },
  {
    title: "📖Sometimes my mind plays tricks on me - Reading is getting harder",
    publishedAt: "Apr 14 2024",
    content: `## What happened
A few days ago, I struggled to finish reading [Understanding React Server Components](https://vercel.com/blog/understanding-react-server-components) written by the Next.js team to get why Server Components came out, and what kind of problems they can solve. However, it was so long that I couldn't absorb the whole information. It's not the first time that I felt like this. A week ago, I got caught up in image optimization, and even [Image Optimization Chapter 
](https://nextjs.org/docs/pages/building-your-application/optimizing/images) in Next.js docs. It turns out that it's not only me who has difficulty reading long texts. The other day I complained to my friend and he was having the same problem

## We all know the problem
We all know to be good at something, you should get used to it. If you want to read faster, you should read well-written paragraphs. Unfortunately, we trained our brains to get information from short-form Instagram reels, YouTube shorts, and Reddit. How can you be good at reading when you don't read any book every month? That's me!

## Fewer Videos, More Books
I know that I'm bad at reading fast. I'm such a slow reader, and usually, it's not a big deal since nobody is demanding fast responses. For example, all the assignments are given several days due, and projects don't require me to read something fast, but this time it took me a whole day to read an article, and it sounds different now. I should work on it.

## Plans
Here are the plans that I made to come to the rescue of myself

1. Read books when you're on trains, buses and subways
2. Quit reading community posts and look into Wikipedia instead of other websites

Don't you feel any problem as I do? How much do you feel uncomfortable with reading? I want to hear your stories. Leave a comment below!



`,
  },
  {
    title: "RAID",
    publishedAt: "Sep 17 2023",
    content: `

RAID a.k.a. Redundant Array of Inexpensive Disks is a storage system. People came up with this idea because I/O operations can be bottlenecks sometimes. By using multiple disks for one logical disk, it can work in a better way.

<aside>
💡 *Work it harder, make it better, do it faster, makes us stronger - Daft Punk*

</aside>

Yes, we want our disk to be ‘*Working harder, make it better, do it faster, makes us stronger’.* We need to think about three things here:

- Capacity - as large as possible!
- Reliability - tolerant to system failures!
- Performance - as fast as possible!

Note that RAIDs are made to be ‘transparent’. It means that from the outside it works the same as what a regular disk does, so we won’t need to update our software for RAIDs.

<aside>
💡 You can think of transparency as an abstraction. It means that some detailed information about the system is hidden from the outside.

</aside>

## Fault Model

Some locations of your hard disk might be out of order. Let’s assume we use the fail-stop fault model. fail-stop fault model is a system following these conditions:

- The system can be in either two states: working or failing.
- If it has failed, the system can detect the failure and can stop.

Basically, we are assuming that all systematic failures can be detected. Note that the fault model affects **reliability**.

## RAID Level 0: Striping


It’s actually not a RAID because it doesn’t have any redundancy.

<aside>
💡 **Redundancy** is an engineering term referring to the inclusion of extra components in case of system failures.

</aside>


![RAID-0](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gnxpypmyimsejdqjzizk.png)




We call it ‘striping’ because we can read/write multiple blocks of the same row from the different disks at the same time.

### Chunk Sizes



![RAID-0 big](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cp1lu1hjbc2fp0mshrcm.png)




If the chunk sizes are bigger, a file would be split into a few chunks, leading to less positioning time and less parallelism. If

 the chunk sizes are smaller, a file would be split into a lot of chunks, and the parallelism and the positioning time would increase.

### Evaluating RAID-0

- **Performance**

> - Time to process workload = Seek time + Rotational delay + Transfer to transfer data
- S = sequential workload processing rate 
- R = random workload processing rate
- N = (the number of accesses)
> 

> Sequential read: N*S
Sequential write: N*S
Random read: N*R
Random write: N*R
> 

- **Capability**

We can use the entire disk space for storing the actual data so its capability is great.

> B: the number of blocks
Capability: N * B
>

- **Reliability**

It cannot deal with any disk failures, since striping doesn’t have any backup methods. Therefore, it has poor reliability.

## RAID Level 1: Mirroring





Mirroring has original disks and copy disks. The copy disks copy the contents of the original disks. For example, the contents of **Disk 0** are the same as **Disk 1**.



![RAID-1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/223s054fl6qf9rd44714.png)




### Evaluating RAID-1

- **Performance**

> - Sequential read: S/2 * N (Depending on the workload, you might need to skip every other block. So it takes twice the positioning times)
- Sequential write: S/2 * N (Same as sequential read)
- Random read: R * N (The positioning time doesn't get affected since the workload is given randomly)
- Random write: R/2 * N (One logical write takes two physical writes)
> 

- **Capability**

We can use half of the entire disk space so it’s not a good choice if you think about capability. 

> Capability: N/2 * B
>

- **Reliability**

It can handle single disk failure for each block So it is more reliable than **RAID-0**

## RAID Level 4: With Parity



![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k92tu34nzge7pwaa372d.png)


RAID Level 4 uses one of the disks for parity bits.  The XOR operation makes this possible. See below.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0j6keo54rv1dgapx6p05.png)



C0, C1, C2, and C3 represent the bits at the same position on each disk.

Let’s say there’s no disk failure at this position. Since \`C0 == C1\` and \`C2 == C3\`, the result of XOR is always 0. If there is one system failure, either \`C0 != C1\` or \`C2 != C3\`, the result of XOR becomes 1. RAID can detect a disk failure by looking at the parity disk.

Here’s an interesting fact: XOR keeps the number of 1s even. For example, look at this table.

| C0 | C1 | C2 | C3 | P |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 1 | XOR(0,0,1,1) = 0 |
| 0 | 0 | 0 | 1 | XOR(0,0,0,1) = 1 |

Imagine one bit(C2) in a row is lost. How can we reconstruct the answer?

By XOR all of the rest. C2 would be 0 if the number of 1s are even, otherwise 1. XOR(C0,C1,C3,P) = XOR(0,0,1,0) == 1. There we go

| C0 | C1 | C2 | C3 | P |
| --- | --- | --- | --- | --- |
| 0 | 0 | LOST | 1 | XOR(0,0,1,1) = 0 |

### Evaluating RAID-4

- **Performance**

> Sequential read: (N - 1) * S (one for parity disk)
Sequential write: (N - 1) * S (optimistic-writing in parallel and updating the parity bit)
Random read: (N - 1) * R 
Random write: R/2 (two writes and reads in parallel)


When it comes to **random write** we get the value of the new parity using this formula: P(new) = (C(old) ^ C(new)) ^ P(old). C(old) and C(new) are same, P(new) should be P(old). However, if C(old) and C(new) are different, P(new) should be different from P(old). Since this logical operation takes two reads(old ones) and two writes(write) in parallel, the rate of random write is **R/2,** which is **extremely slow**. This problem is referred to as **‘slow write problem’**
>

- **Capability**

It uses one disk for parity back, which is for pure protection. You can see it’s **better than mirroring**

> Capability: (N - 1) * B
>
 
- **Reliability**

It can handle single disk failure for each block So it is as reliable as **RAID-2**

## RAID-5


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a9ptbglmcfqgldl9m7gd.png)



You could see that random write of **RAID-4** is very slow. To overcome this, people came out with the upgraded version: **RAID-5**.

### Evaluating RAID-5

- **Performance**

> Sequential read: (N - 1) * S (one for parity disk)
Sequential write: (N - 1) * S (optimistic-writing in parallel and updating the parity bit)
Random read: N * R 
Random write: R/4 * N (two writes and reads in parallel. But if there are enough workload you can say each disk deals with 4 accesses for one logical access.)
> 

## Conclusion


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tjcctwoqc649xzokntof.png)



- If your workload is sequential only, think about using **RAID-1**
- If your workload is random or mixed, think about using **RAID-5**

**This post is a remake of [three easy pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/file-raid.pdf). If there’s any copyright issues, please let me know!**
`,
  },
  {
    title: "🤔 Review: No Silver Bullet-Software Engineering Reloaded",
    publishedAt: "Sep 8 2023",
    content: `This post summarizes [No Silver Bullet-Software Engineering Reloaded](https://ieeexplore.ieee.org/document/4420077). If there's any copyright issues, please let me know.

![Let me know](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/althqp88mkbjomscrqxn.gif)

## 🤷‍♂️ Why are they doing this conference after 20 years the paper has published?

![What's the point](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/59eqtg2ankp7ks1f0hba.gif)



- Designing software is hard and will always be hard.
- Every idea has its own problem and people say that their ideas are the one and only solution to sell it when it's actually not true.

## 🧬 Essential Complexity vs. Accidental Complexity
1. Essential Complexities come from the problem itself.
2. Acciental Compelxiy coms from using tools to solve the problem.
3. As long as we cannot resolve accidental complexity there is not going to be any dramatic improvement.
4. OOP played a key role in solving modern software complexity problems so it's close to silver bullet.

## 👀 See what's important
- OOP is important but you should look at the bigger picture. Focus on the fundamentals.
- Product engineering and domain specific languages are important as well. Function programming work well with some specific fields.

## ✌️Software designing(Product engineering) matters
- Waterfalls can get your projects go in the wrong way because they encourage you to build unrealistic plans.
- Don't miss out product managing.

## ❌There's no magical solution

![Deal with it](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lt84sd4vsqpiedbblb94.gif)

- People get to believe in the idea of sillver bullet because they fear their software is going to fail. This failure means being unable to manage collaborating with a lot of people to create a software.

## 👇Instead of finding the silver bullet
- Focus on Good people, understanding requirements, refactoring, good design and teamwork.
- Even if it's the bad code for you or engineers, it's a good one as long as it satisfies user needs.

## My Opionion
There has been a lot of software development models. I think the most important thing is to understand user needs because every project is different. Instead of just choosing one model, we could pick some best practicies from one model and from another model instead of getting too much into the rules of process.
`,
  },
  {
    title:
      "📓A Glossary for Concurrency: Doing several things at the same time",
    publishedAt: "Sep 5 2023",
    content: `##🐾Introduction

When I dove into the world of concurrency, I found out there are a whole bunch of different terminologies describing different concepts. The thing is that they have some common things and there is still clear differencies which gave me a lot of headache. If it's the pain in the ass for you now, this might be the right remedy! Leave a comment if you don't understand things clearly. Plus if you think I should add other terminologies for this post, please let me know!


![It's more simple than you think](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bfrbcadss4eu75cicsog.gif)

## 🚣‍♂️Process

**A running program** on any computer. Each process has its own code, data, stack, and heap segment.

## ➗Thread

Imagine a process has a lot of I/O tasks and some tasks demand a large computing power, while there are still some tasks that can run within a short time. These I/O an heavy tasks would prevent other tasks from running. Here's the idea: **you divide this process into multiple threads** and each thread is responsible for running different kinds of tasks. If the OS runs a thread on the CPU for a certain amount of time and then switches to another one when the time is over, we can imagine that each task can run quite fairly instead of some some task grabbing the computing resource too much time.

## Multiprogramming
Suppose there's a processor which has been using the CPU and then dealing with I/O. While the processor is dealing with the I/O task, CPU doesn't get assigned any task so you can basically say the CPU is being wasted. Instead of letting the CPU do nothing and waiting for the process to finishe the I/O task, **the operating system could run other process on the CPU, getting the most of the computing resources**. We call it multiprogramming.

## Time-sharing
Time sharing means the systematic behavior in which **an operating system runs a process for a fixed time period(slice)**, stores the contextual running information of the process, switch to other process, and run this switched process.

## Multiprocessing
Most of modern computers come with several processors(cores) to make it compute faster. These multiple processors make up the single CPU. If multiple processes need to run, **the operating system maps each processor to each processor**, executing multiple processors at the same time literally. We call this system a multiprocessing system.

## Multithreading
Remember what we talked about threads. You can **run threads on processor(s) intead of processes**. We call it multithreading.

## Parallel Computing
Parallel Computing means using multiprocessing(or multithreading) to **solve a problem that requires a lot of computation**. This field is directly related to GPU programming, and GPU plays an imporant role these days because machines need to compute faster to get the AI to run.

## Concurrent Computing
Concurrent Computing means multiple tasks are **in progress**. 'In progress' here refers to the situation in which multiple processes(or threads) can even run on the cpu for a fixed amount of time, whether the computation is done simultanious or in the time-sharing manner.

## Non-Blocking
Non-Blocking means **a task doesn't take over the CPU when it deals with the (I/O) operations**. Instead another task runs. Different from multiprogramming, this is done at the **application level**.

## Asynchronous
An asynchronous system is the system in which the execution of the next code line **doesn't get delayed** because of the running time of the current code line.

## Conclusion
We looked into the meaning of all the terms-process, thread, multiprogramming, time-sharing, multiprocessing, multithreading, prallel computing, concurrent computing, non-blocking, and asynchornous. Now that we don't get confused with the terms!:)

`,
  },
  {
    title: "RESTful API Summary",
    publishedAt: "Sep 4 2023",
    content: `## 📘REST의 뜻
- 웹 상에서 두 컴퓨터가 통신하기 위한 일련의 규칙들의 집합
- **Representational State Transfer의 줄임말**
- server가 리소스를 나타내는 정보(representation of resource),그리고 리소스의 state를 변화시킬 수 있는 링크를 보낸다는 점에서 REST로 불렀다. 다만 대다수의 웹서비스에 적용된 RESTful API들은 링크를 보내지는 않는다.
- REST의 규칙을 준수하는 WEB API를 **RESTful API**라 부른다.
- 주로 HTTP를 기반으로 하는 Web App에 사용된다.

---
## RESTful API가 되기 위한 조건


### Uniform Interface

- URI(URL)을 통하여 리소스를 표현한다.
- 리소스 수정/삭제 요청시 충분한 메타데이터가 포함되어야 한다.
- HATEOAS: 서버로부터 제공되는 링크를 통해 클라이언트는 필요한 리소스를 모두 접근할 수 있어야 한다.
- 메시지는 해당 메시지를 어떻게 처리할지에 대한 충분한 설명을 제공해야 한다.

### Client-Server Architecture

클라이언트가 UI/UX를 담당하고, 서버가 데이터를 담당한다.

### Statelessness

서버는 클라이언트를 위해 요청 사이에 추가적인 정보(상태)를 유지하고 있으면 안 된다.

### Cacheability

클라이언트가 보내는 요청에 safe method가 사용이 된다면 서버는reverse proxy를 배치하여 캐싱이 가능하다.

### Layered System

클라이언트와 종단 서버 사이의 통신에 프록시, 로드밸런서, 암호화를 위한 중간자 서버가 개입하면 안 된다.

### Code on demand(optional)

서버는 상황에 따라 클라이언트에게 executable codes를 보낼 수 있다.

---
## Idempotence


- idempotent method는 아무리 여러번 호출되더라도 동일한 결과를 가진다.
- 동일한 결과는 resource representation이 동일하다는 뜻이다.
- GET, PUT, DELETE는 모두 idempotent methods이다.

---

## 🆕 Versioning RESTful API


가장 대표적인 방법은 version number를 url에 포함시키는 것이다.

---

## ❌ Accept-Language/Accept Header


HTTP request의 accept-language에 명시된 대로 resource를 보낼 수 없다면, status code 406를 반환해야한다. 

---

참고문헌:

[https://restcookbook.com](https://restcookbook.com/HTTP%20Headers/acceptlanguage/)

https://en.wikipedia.org/wiki/Representational_state_transfer`,
  },
  {
    title: "프론트엔드, 왜 하니?",
    publishedAt: "Aug 29 2023",
    content: `## 🤔글을 쓰는 계기

IT 관련된 대외활동 질문 문항 중 단골 문항 중 하나로 **지원 동기**가 있다. 보자마자 머리가 아프고 어떻게 답변을 해야하는지 감도 잘 오지가 않는다. 키보드로 두들겨 보는 답변은 다음과 같다.

> 어쩌다보니 하게 됐어요.

웹개발 공부를 하다 보니 프론트엔드 쪽으로 어느새 관심이 가있었다. 어찌보면 솔직한 답변이다. 하지만 이런 답변을 적는다면 떨어질 것은 누구나 알고 있다. 충분한 고뇌와 통찰은 커녕 성의가 없는 답변을 하는 사람이 대외활동을 잘 할 거라고 믿을 수 있겠는가. 무의식적으로 프론트엔드를 선택했더라도 그 속에서 어떠한 이유가 있을 것이다. 그래서 이번 글에서는 **내가 프론트엔드를 공부하는 이유**를 정리했다. 

## 🚉높은 접근성: 쉽게 인터넷에서 찾을 수 있는 학습 자료

고등학생부터 대학교 1학년 정도까지는 학습 자료가 많아서 웹개발 공부를 했다. 우리 고등학교에는 정보 수업이 없어서 구글이 내 코딩 선생님이 되어주었고 제일 자료가 풍부한 분야가 웹이라 이 쪽을 공부하였다. 대표적으로 웹개발을 공부한 사이트는 [FreeCodeCamp](https://www.freecodecamp.org)이다. HTML, CSS, Javascript를 문제를 단계별로 해결할 수 있고 설명도 쉬워서 진도를 쭉 나갔다. 프로젝트 과제도 있어 random quote machine, weather app을 만들었다. 과제를 해결할 때 웬만한 웹 기술 정보는 [MDN](https://developer.mozilla.org)에서 찾을 수 있다. 내가 가질 수 있는 대부분의 질문은 [스택오버플로우](https://stackoverflow.com)에 등록되어 있다. MDN의 설명이 너무 복잡하다면 [w3schools](https://www.w3schools.com)를 읽고 나중에 심도있게 공부하면 되었다.

## 👀눈에 바로 보이는 결과

우선 프론트엔드가 무엇인지 위키피디아에서 찾아보면 다음과 같이 설명한다.

> Front-end web development is the development of the graphical user interface of a website, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that website.

- 사용자가 볼 수 있는 UI를 HTML, CSS, Javascript를 이용하여 개발한다.
- 사용자는 UI를 통해 웹사이트와 상호작용할 수 있다.

서버를 개발하는 백엔드 개발과 비교했을 때 UI를 개발하다보니 내가 HTML, CSS, Javascript로 작성하는 코드의 결과를 볼 수 있다. 춤 영상 보기를 좋아하고 여행 다니면서 여러 아름다운 풍경 보기를 좋아하기 때문에 그래피컬하게 아름다운 결과가 나오면 굉장히 뿌듯했던 것 같다.

## 🤝 사용자 경험을 고려하는 과정에서 오는 흥미로움

기존에는 첫번째와 두번째 이유가 프론트엔드를 공부하는 주요한 동기였지만 최근에 들어서 사용자 경험을 고려하는 코드를 작성할 수 있다는 점이 핵심적인 공부 동기로 작용하고 있는 것 같다.

### 웹 접근성
[프론트와 UX의 연관성을 다루는 글](https://jbee.io/essay/about_frontend/#%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B8%B0%EC%88%A0%EA%B3%BC-ux)을 읽으면서 '프론트엔드 개발과 UX를 연관지을 수도 있구나'라고 생각했다. 그러다가 이번 여름 방학에[코멘토](https://comento.kr/?index)에서 웹 접근성 직무부트캠프를 들으면서 더욱 확실하게 UX와의 연관성을 경험했다. 해당 캠프에서 맹인, 저시력자, 색각이상자(색맹/색약), 손가락이 없는 사람 등 다양한 종류의 사람뿐만 아니라 검색엔진 봇(SEO)까지도 접근이 용이한 웹 애플리케이션을 만드는 방법에 대해서 배웠으며 유명한 웹사이트의 웹 접근성  관련 문제점들을 찾고 개선사항을 작성하는 보고서를 작성했었다. 웹 접근성도 사용자의 제한 사항을 고려하는 과정이기 때문에 UX의 범주에 들어간다. 사람을 고려하면서 코드를 작성한다는 점 덕분에 해외 여행을 하는 동안에도 열정적으로 캠프에 참여할 수 있었다.

### 프론트엔드 성능 측정
 또한 [우아한 테코톡: 프론트엔드 성능 측정](https://www.youtube.com/watch?v=IRj9vKBy9CA&ab_channel=%EC%9A%B0%EC%95%84%ED%95%9C%ED%85%8C%ED%81%AC)에 나온 성능 지표인 LCP(Largest Contentful Paint, 가장 큰 이미지/텍스트 블록의 렌더링 시간), INP(Interaction to Next Paint, 상호작용에 따른 응답 시간), CLS(Cumulative Layout Shift, 비동기적 DOM 렌더링으로 인해 의도치 않은 컨텐츠와 인터렉션) 등도 결국 UX로 귀결되지 않다 싶다. 

### 백엔드와 비교
백엔드든 프론트엔드는 시스템(운영체제, 브라우저) 위에서 돌아갈 수 있는 코드를 작성할 수 있다는 점에서는 같지만 UX에 기여할 수 있는 부분이 많다는 점이 백엔드와 다른 것 같고 이 부분이 매력적이라 계속 공부하고 있는 것 같다.

##🕦 결론

접근성이 좋아 공부하기 편하고, UI를 작성하기 때문에 결과를 눈으로 확인할 수 있고, 사람을 고려하는 설계가 재미있어 나는 프론트엔드를 공부한다. 반대로 백엔드 공부하는 사람들은 어떤 점이 좋아서 빠져들었을까? 





`,
  },
  {
    title: "Typescript cheat sheet",
    publishedAt: "Aug 27 2023",
    content: `
## Introduction

### What is typescript?

A programming language with type systems on top of javascript

### Why do you need typescript?

- **Easy to catch mistakes by specifying types**
- Appropriate for enterprise applications
- **Applying OOP(Object-Oriented Programming) concepts such as interfaces and classes in your codebase**
- Makes it easier to understand your codebase
- Awesome tooling System

### Why don’t you need javascript?

- Learning overhead
- Compile to execute javascript code-it adds another step in the development process

## Best practices

### Use \`unknown\` type if you need \`any\`

- \`unknown\` forces you to narrow down types, so you can deal with the variable case by case, while \`any\` doesn’t give you any information about its type.

### Don’t use optional parameters in callbacks

- You can pass in functions with fewer arguments even if you don’t use optional parameters in callbacks
- Use it when you mean to explicitly write parameters.
`,
  },
];

const dirPaths = posts.map((post) => createSlugDirectoryAndWriteFile(post));
