# Playwright

- Playwright는 단일 API로 Chromium, Firefox 및 WebKit을 자동화할 수 있는 테스트 프레임워크. 이를 사용하여 모든 플랫폼에서 E2E(End-to-End) 및 통합 테스트 를 작성할 수 있음.

- Since Playwright is testing a real Next.js application, it requires the Next.js server to be running prior to starting Playwright. It is recommended to run your tests against your production code to more closely resemble how your application will behave.
  Run npm run build and npm run start, then run npm run test:e2e in another terminal window to run the Playwright tests.

- webServer
  - 짱좋다.
  - playwright 가 개발 서버를 시작하고 완전히 사용할 수 있을 때까지 기다림.
  - 테스트 를 실행하기 전에 2xx, 3xx, 400, 401, 402 또는 403 응답을 반환할 때까지 기다린다.
  - 개발 서버를 켜놓고, 테스트를 실행하는 방식으로 하지 않아도 되는 것. playwright 가 알아서 실행함!
