# NEXT.JS

### 프로젝트 생성

```bash
npx create-next-app@latest --typescript [project-name]
```

### Pages

`pages` 디렉토리는 라우트를 담당함. 각 page 는 파일 이름을 기반으로 라우트와 연결됨.

**Dynamic Routes**

대괄호로 감싸서(`[param]`) 다이나믹 라우트를 만들 수 있음.
예를 들어 `pages/post/[pid].tsx` 라고 한다면

```bash
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Post: {pid}</p>
}

export default Post
```

`post/1`, `post/abc` 는 `pages/post/[pid].tsx` 와 매치됨.
매치된 path parameter 는 페이지에 query parameter 로 전달되고, 다른 query parameter 들과 합쳐짐.
예를 들어 `/post/abc` 는 다음과 같은 `query` 객체를 가짐.

```bash
{"pid": "abc"}
```

`post/abc?=foo=bar` 는 다음과 같은 `query` 객체를 가짐.

```bash
{ "foo": "bar", "pid": "abc" }
```

일단 파일 이름에 넣은 `pid` 를 키로 값이 들어오고, 다른 쿼리도 합쳐진 형태로 `query` 객체가 만들어짐.
file name 을 활용하는 이러한 방식은 next 내의 api 에도 적용됨.

### api

프로젝트를 만들면 api 폴더에 `hello.ts` 파일이 있음. [`http://localhost:3000/api/hello`](http://localhost:3000/api/hello) 를 브라우저 주소창에 넣어보면 응답이 오는 걸 볼 수 있음.
여기도 `[pid].ts` 와 같이 slug 를 쓸 수 있음.
위의 주소로 데이터를 요청하고 프론트에서 데이터를 가져와서 사용할 수 있음.

### getServerSideProps

- 페이지에서 getServerSideProps (Server-Side Rendering) 를 호출하면 Next.js 는 이 페이지를 getServerSideProps 에서 반환되는 데이터를 가지고 매 요청에 pre-render 함.
- getServerSideProps 는 server-side 에서만 실행됨. 브라우저에서는 절대 실행되지 않음.
- getServerSideProps 은 요청시 데이터를 가져와야하는 페이지를 렌더할 필요가 있을 때만 사용해야 함.
- 요청중에 데이터를 렌더링할 필요가 없으면 client side 에서 데이터를 fetch gㅏ거나 getStaticProps 를 사용할 것.
- getServerSideProps 내부의 캐싱 헤더( Cache-Control)를 사용해서 동적 응답을 캐시할 수 있음. 예를 들어 stale-while-revalidate 같은걸 쓸 수 있음. 시간을 지정해두고 그 주기마다 캐시된 데이터를 revalidation 할 수 있음.

### image

- image src 로 외부 링크를 쓰려면 next.config.js 수정 필요.
- Remote Patterns 을 사용할 걸 권장함. 근데 Domains 설정이 간단함.

```js
// Remote Patterns
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.example.com",
      },
    ],
  },
};

// Domains
module.exports = {
  images: {
    domains: ["assets.acme.com"],
  },
};
```
