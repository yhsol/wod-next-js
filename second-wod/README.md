# SecondWod

## Note

---

### nx project create

```
npx create-nx-workpsace second-wod --packageManager=yarn
```

- intergrated monorepo 선택 → next 세팅 선택
- 생성 완료되면 next app, test 등 대부분의 설정이 된 상태로 프로젝트가 만들어진 것을 확인.
- nx.json 에서 프로젝트의 개략적인 metadata 정보를 확인할 수 있음.

---

### 실행

- nx.json, project.json 등 프로젝트의 기본 세팅 정보들을 담고 있는 파일들이 있음.
- 이 중에서 project.json 은 apps 밑의 폴더마다 있고 여기에 serve 프로퍼티가 있음.
- 이 app 의 실행은 `yarn nx run [app's name]:serve` 로 할 수 있음.
