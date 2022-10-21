# supabase

# 작업 과정

- 계정 생성
- organization 생성 => new Project
- table editor => create a new table => 원하는 컬럼 추가 후 save
- insert raw => 사용할 데이터 넣기
- display supabase data on next.js application
  - install supabase js library
    - `npm install @supabase/supabase-js`
  - createClient
    - supabase url, key 등록
    - 이건 supabase > settings> API 에 있음. project url, anon key
  - 사용할 파일에서 supabase import
  - getStaticProps 를 통해서 pre-render 를 해보자.
    - getStaticProps 에서 supabase 에 query.
  - createClient 로 만든 supabase 를 import 해서 supabase 에 가져올 데이터를 query 하면 됨.
  - query 한 리턴값을 컴포넌트로 전달해서 출력.
  - 디테일 페이지는 각 페이지를 빌드 타임에 pre-render 를 하기 원함.
    - getStaticPaths 사용.
    - getStaticProps 를 사용해서 note 를 만들어서 props 로 전달.
