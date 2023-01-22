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
