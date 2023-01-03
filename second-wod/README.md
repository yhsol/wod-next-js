# SecondWod

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

- pre-render build time
- fallback: pre-render 된 페이지를 못찾았을 때를 대비함.
