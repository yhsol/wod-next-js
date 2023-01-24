# SecondWod

## How to run

```
yarn nx run site:serve
```

## Note

### Create a Next.js Web Application with Nx

#### nx project creat

```
npx create-nx-workpsace second-wod --packageManager=yarn
```

- intergrated monorepo 선택 → next 세팅 선택
- 생성 완료되면 next app, test 등 대부분의 설정이 된 상태로 프로젝트가 만들어진 것을 확인.
- nx.json 에서 프로젝트의 개략적인 metadata 정보를 확인할 수 있음.

#### 실행

- nx.json, project.json 등 프로젝트의 기본 세팅 정보들을 담고 있는 파일들이 있음.
- 이 중에서 project.json 은 apps 밑의 폴더마다 있고 여기에 serve 프로퍼티가 있음.
- 이 app 의 실행은 `yarn nx run [app's name]:serve` 로 할 수 있음.

---

### Create a new Next.js Page Component with Nx Generators

default 페이지들은 설정되어 있는 상태.
pages 를 추가할 것. `/about` 같은 페이지.
components 나 projects 를 만들 때 nx 가 쉽게 도와줌.
nx generate 을 사용하면 쉽게 만들 수 있음.
nx console generate 클릭. 그러면 거기서 만들고 싶은걸 골라서 세팅.
지금은 page 선택.

칸을 채우면 `yarn nx generate @nrwl/next:page about --project=site --no-interactive --dry-run` 같은 메시지가 터미널에 뜨는 걸 볼 수 있음.
dry-run 한걸 출력해주는 것.
설정 완료되면 run 하면 됨.
about page 가 생성되고 `/about` 으로 접근해보면 확인 할 수 있음.

---

### Understanding Next.js GetStaticProps

getStaticProps

- If you export an `async` function called `getStaticProps` from a page, Next.js will pre-render this page at **build time** using the props returned by `getStaticProps`.
- build time is point.
- `getStaticProps` 라는 비동기 함수를 정의. 리턴 타입은 `GetStaticProps<page's prop type>`
- `getStaticProps` 에서는 객체를 리턴하고, 그 객체의 `props` 프로퍼티는 page 의 props 로 사용됨.
- getStaticPaths

---

### Understanding Next.js getStaticPaths

getStaticPaths

- juri.dev/articles/nextjs-with-nx 와 같은 경우.

  - juri.dev/articles/[slug]

- pre-render build time

- getStaticPaths 는 객체를 리턴함.
- 객체는 paths, fallback 등으로 구성됨.
- fallback: pre-render 된 페이지를 못찾았을 때를 대비함.

### Setup Next.js with Tailwind in a Nx Workspace

- tailwind 사용
- `yarn add tailwindcss postcss autoprefixer`
- `npx tailwindcss init -p` 를 통해 설정파일 제너리이트.

  - 특정 프로젝트에 생성하기 위해서 `/apps/site` 안에서 생성.
  - postcss.config.js

    ```
    const {join} = require('path')

    module.exports = {
      plugins: {
        tailwindcss: {
          config: join(__dirname, 'tailwind.config.js'),
        },
        autoprefixer: {},
      },
    }
    ```

  - tailwind.config.js

    ```
    const {join} = require('path')

    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
      purge:[
        join(__dirname, 'pages/**/*.{js,jsx,ts,tsx}'),
      ]
    }
    ```

### Configure Tailwind purging in a Nx Workspace

- purge 는 최적화를 위해 사용.

### Configure Tailwind in a Nx Monorepo With Potentially Multiple Apps and Libs

- tailwind plugin 사용
- 모노레포에서 특정 프로젝트 ('site' 같이) 에서만 사용하고 싶은 테일윈드 설정이 있을 수 있고, 글로벌로 다른 프로젝트와도 공통으로 사용됐으면 하는 설정이 있을 수 있음. 이걸 위해 tailwind-workspace-preset.js 생성.
- tailwind-workspace-preset 에 필요한 설정을 하고, 각 프로젝트 내의 tailwind.config.js 에 preset 으로 설정

### Use getStaticPaths to Retrieve a List of Markdown Files to Render With Next.js

root 에 \_articles 폴더를 만들고 그 안에 markdown 파일을 넣음.
apps/site/pages/articles/[slug].tsx 에 있는 getStaticPaths 에서 \_articles 폴더를 읽어서 slug 를 만들어서 리턴함.
path 는 join 과 process.cwd 를 사용해서 찾음.

```
const POSTS_PATH = join(process.cwd(), '_articles)
```

getStaticPaths 에서 slug 를 만들어서 보내야함. 파일 읽고 거기로 접근하게 할 거니까.
그러면 파일 제목을 slug 로 사용할 수 있게 포매팅.

```ts
const paths = readdirSync(POSTS_PATH)
  .map((path) => path.replace(/\.mdx?$/, ''))
  .map((slug) => ({
    params: { slug },
  }));
```

저 path 를 getStaticPaths 에서 리턴하고, getStaticProps 에서는 slug 를 받아서 해당 파일을 읽어서 props 로 보냄.

### Generate an Nx Library to Implement our Markdown Rendering for our Next.js App

- markdown 을 파싱해서 컨텐츠로 뿌려야함.
- 이렇게 하려면 파싱 로직을 어디에 둘까.
- 컴포넌트에 둘 수도 있지만 좋은 생각은 아님.
- 모노레포 시나리오에서 apps 안에 여러 앱이 있을 수 있음.
- 그래서 이런 로직의 경우 libs 폴더에 두는게 좋음.
- libs 에 최대한 로직을 두고, 앱은 컨테이너로서 libs 의 로직을 link 하는 역할.
- nx console 에서 library 생성.
- nx generate @nrwl/workspace:library
- 로직 작성
- 파싱 로직에서 필요한 것.
  1. parse the content of our markdown and separate it into frontmatter and content
  2. convert markdown content to html
- library 생성하면 tsconfig.base.json 에 paths 에 path 가 추가되어 있는 걸 볼 수 있음.
- 이 path 를 사용해서 import 할 수 있음.

```
    "paths": {
      "@second-wod/markdown": ["libs/markdown/src/index.ts"]
    }
```

이런 path 가 생겼다면,

```
import {
  getParsedFileContentBySlug,
  renderMarkdown,
} from '@second-wod/markdown';
```

이렇게 쓸 수 있음.

### Parse a Markdown Document With gray-matter

파싱 로직먼저 구현
파싱을 위해 라이브러리 사용.
gray-matter

### Render Markdown With next-mdx-remote in our Next.js Page Component

---

chatGPT

---

```
interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}
```

in this part, why extends ParsedUrlQuery? it should be? and Article, getStaticProps is used Props, and getStaticPaths is used ArticleProps. is that ok that difference? and how concise that?

---

interface ArticleProps extends ParsedUrlQuery means that the ArticleProps interface is based on the ParsedUrlQuery interface and includes an additional property slug.
ParsedUrlQuery is a built-in Next.js type that represents the query string of a URL parsed into an object. It's used here because the slug property is expected to come from the query string of the URL.

Regarding the difference in types used by getStaticProps and getStaticPaths, it is valid to have different types for different functions. getStaticProps is used to fetch data for a specific page based on the params passed to it, so it needs the Props type to know what data to return. On the other hand, getStaticPaths is used to generate the possible paths for the application and it needs the ArticleProps type to know what the shape of the params object should be.

As for conciseness, the refactored code is more concise because it uses modern JavaScript features such as destructuring, arrow functions, and concise object property notation. It also removes unnecessary comments and imports, and inlines the functional component. This makes the code more readable and easier to understand.

---

thanks. can you recommend better name of ArticleProps and Props?

---

The names ArticleProps and Props are not bad, but they can be made more clear and descriptive.
ArticleProps represents the props for the Article component and it is used to fetch the data for the page, so a more descriptive name could be ArticlePageProps
Props represents the props for the Article component, so a more descriptive name could be ArticleProps

So the final refactor could look like this :

```ts
interface ArticlePageProps extends ParsedUrlQuery {
  slug: string;
}
interface ArticleProps {
  frontMatter: any;
  html: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}
```

And it's better to use meaningful variable names that reflect their intended use and context, that make it easier to understand the purpose of the code and make it more maintainable.

### Embed React Components in our Markdown with MDX in a Next.js App

컨텐츠를 좀 더 rich 하게 만들어보자.
컨텐츠 중간에 ${$ youtube something... $} 같은거.
이걸 위해서 mdx 를 사용할 것.
mdx 는 markdown 을 확장한 것. markdown 에 code 를 추가할 수 있도록 함.

기존의 md 파일을 mdx 로 변경

markdown.spec.ts 테스트 깨지던거는 renderMarkdown 내부에서 쓰이는 next-mdx-remote/serialize 때문.
이걸 mock 해줘야 함.
테스트는 제너레이트 사용해서 변경함. https://www.refraction.dev/app 미쳤다.

mdx 도 놀라움. 그냥 코드가 임베딩 됨.
MDXRemote 에 컴포넌트를 지정할 수 있어서 lib 에 Youtube 컴포넌트를 만들고 이걸 넣어주면 됨.

### Use React Components for Native HTML Tags with MDX and Next.js

유튜브 임베드 말고도 또 인터레스팅한 기능이 있음.

링크가 있다고 가정해보자.

mdx 에 [geeknews](https://news.hada.io/) 이렇게 추가하면

페이지에 <p><a href="https://news.hada.io/">geeknews</a></p> 이런식으로 들어가있음.

nx generate component react -> custom-link 컴포넌트 생성.

CustomLink 컴포넌트에 a, href 등의 props 를 받아서 next/link 로 처리.

slug 컴포넌트에서 사용할 때, MDXRemote 로 주는 컴포넌트에 a 프로퍼티에 CustomLink 를 넣어주면 됨.
그러면 a 를 CustomLink 가 override 하게 됨.
Native HTML Tags 를 커스텀 컴포넌트로 override 할 수 있는것.
