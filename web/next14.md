### Next 14 시작하기
레저 피디피에서 nest때문에도 cpu 용량이 튀는게 아닐까? 하는 생각이 들어 우선 next14로 리펙토링을 해보고싶다는 생각이 들어 상품 상세 페이지 이전에 index페이지 까지만 옮겨보자는 생각이 들어 시작하였다.

먼저 next자체는 처음부터 셋팅하는거 해본적이 없어서 create-next-app 도움을 받았다.

```powershell
$ npm install -g crate-next-app
$ create-next-app --version // 14.0.2

$ npx create-next-app projectName
설정들을 해 나가는데 
app-router라는 녀석의 설정을 셋팅하는거에서 앵 해서 해당 문서 적게되었다.
```

먼저 app router는 13.4.0 부터 안정화 되었고, pageRouter와 비교대상이다.

next의 docs가 app/pages router 에 따라 두가지 버전으로 나뉠만큼 next의 모든 기술은 router기반으로 동작한다.

## Routing

next.js 는 파일 시스템 기반으로 라우팅을 구현한다.

### built-on

- App Router
    - app 디렉토리를 사용함.
    - app 하위에 모든 파일을 구성할 수 있다.
        - 디렉토리로 경로를 지정한다.
        - 페이지를 위한 파일은 page.js
        - server-side api 를 위한 파일은 route.js

        ```
        src/app
        ├─layout.js // root layout. 필수
        ├─page.js // root page
        ├─a-page
           └─page.js
        └─b-page
          └─page.js
          └─component.js // 라우팅과 관련없는 코드. 라우팅의 대상이 되지 않습니다
            └─b-subpage
            └─page.js
        ```

    - pages router 보다 우선순위가 높다.
    - Layout(App)
        - app 디렉토리 내에 **root layout 을 필수**로 포함해야한다.
        - root layout 뿐만아니라 각 layout을 **[compose](https://nextjs.org/blog/next-13-4#server-actions-alpha)** 할 수 있다 ???? 이해 못 함...
        - 데이터 패칭 또한 동시에 가능하다.
    - [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes): 동일한 레이아웃에서 하나 이상의 페이지를 동시/조건부로 렌더링 가능.
    - [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes): 현재 페이지의 컨텍스트를 유지하며 현재 레이아웃 내에서 경로를 로드할 수 있다.
        - 예를 들자면 /list 페이지에서 모달을 띄울 때, list 페이지를 유지하며 모달의 경로로 url을 변경(post/13) 할 수 있다. 이때 list 페이지는 모달 뒤에 유지 된다. (모달 자체를 페이지로 변경가능하다는 뜻인가..?)
- Pages Router
    - pages 디렉토리를 사용한다.
    - pages 하위에 있는 모든 js 파일이 페이지/api 경로가 된다.(기존 넥스트의 pages 에 넣는 파일들)
    - 컴포넌트 파일들은 pages 외부에 존재한다.

    ```
    src/pages
    ├─_app.js // root layout
    ├─index.js // root page
    ├─a-page.js
    └─b-page
      └─index.js
       └─component.js // 라우팅과 관련없는 코드지만 b-page/component라는 경로가 생깁니다.
       └─b-subpage.js
    ```

    - Layout
        - 전역 공유 Layout을 지정하기 위해 _app 을 사용한다.
            - 단 여러 layout을 compose 할 수 없다.
            - data fetching 과 component를 함께 배치할 수 없다.


## Rendering

> 렌더링은 작성한 코드를 사용자 인터페이스로 변환하는것이다.
next는 기본적으로 모든 페이지에 대한 HTML파일을 사전 렌더링 한다.
브라우저에서 해당 페이지 경로에 접근하면, 사전 렌더링된 HTML 과 연결된 최소한의 JS 파일이 전달되고,
브라우저에서 JS가 실행되며 페이지와 완전히 상호 작용한다. - 이를 **[Hydration](https://www.notion.so/React-hydrate-9fbbfe1067294e1a86eb8e6a8d33d532?pvs=21)**이라 함.
>

### SSG - Static Site Generation

- App Router:
    - server/client component에 따라 다르게 동작한다.
    - server component 는 렌더링되어 HTML을 생성하낟.
        - 관련 JS코드가 클라로 전송 되지 않는다.
    - client component는 HTML 및 JSON을 미리 렌더하고, 서버에 캐싱된다.
        - 캐싱 결과는 클라로 전송되어 hydration된다.
- Pages Router:
    - app router 의 client component와 동일하게 동작한다.

### ISR(Incremental Static Regeneration)

- App Router
    - 공식 문서에 언급이 사라짐…
- Pages Router
    - SSG는 최초 빌드시에 생성한 정적 페이지를 캐싱하고 계속 사용하지만, ISR 은 주기적으로 정적 페이지를 재생성 한다.
        - getStaticProps의 반환값에 revalidate 필드를 추가하면 된다.

### SSR (Server Side Rendering)

- App Router
    - 공식문서에서 Dynamic Rendering이란 명칭으로 언급된다.
    - 정적 렌더링 중에 동적 기능 / 동적 fetch(), searchParams prop 등이 감지되면 해당 경로를 Dynamic Rendering 대상으로 판단한다.
        - 동적기능: cookies(), headers() in server component
        - 동적 fetch(): no-store, revalidate: 0 옵션이 있는 fetch
- Pages Router
    - 페이지에 접근할 때마다 필요한 데이터를 가져오고 서버에서 렌더링 한다.
    - getServerSideProps를 사용한다.

## Data Fetching

### Method

- App Router
    - 더이상 getServerSideProps, getStaticProps, getInitialProps 와 같은 메서드는 사용 안함.
    - react server component 기반이기에 [일반적인 방법](https://nextjs.org/blog/next-13-4#server-actions-alpha)으로 서버 데이터를 가져온다.
        - 서버 데이터베이스 리소스에 직접 접근 가능
        - 민간함 정보 클라이언트에 노출 안됨
        - 성능 향상
        - 빌드(next build)시에 데이터 패치이 이루어지고, 캐싱된다.
        - useEffect를 사용해 데이터를 패칭하고, 상태를 변경하는 방식에서 벗어납니다.
    - 클라측에서 데이터를 가져오는것도 여전히 가능하다.
    - 요청을 캐싱하고, 중복을 제거한다.(post 제외)
- Pages Routes
    - getInitialProps: 이미 서버에 있는 데이터를 이용해 서버사이드렌더링시 사용
    - getServerSideProps: 페이지 접근할 때마다 서버사이드렌더링에 필요한 데이터를 가져와 사용(최신 데이터가 필요할 때)
    - getStaticProps: next build시 정적페이지를 생성할때 필요한 데이터를 가져올 때 사용.

## Static Export

next는 기본적으로 모든 경로의 페이지에 대한 HTML을 사전 렌더링 한다 SSG

[공식문서는 app router를 사용하는것을 권장](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)한다.(static export와 관해 기능이 추가됨)

### Data Fetching

- App Router
    - react server component를 사용하기에 getStaticProps 가 필요하지 않다. async/await 문법으로 바로 데이터를 가져올 수 있다.
- Pages Router
    - getStaticProps: 정적페이지 생성시 필요한 데이터를 패칭해서 컴포넌트에 전달

### Dynamic Path

- App Router
    - getStaticPaths 대신 [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)를 사용
- Pages Router
    - getStaticPaths: 동적 경로의 정적 페이지를 생성할 때 사용.

### Supported Feature

- App Router
    - image optimization
        - 구현체가 변경됨
        - 기존 next@12 next/image → next/legacy/image 로 변경
        - 기존 next/future/image → next/image 로 변경됨.
        - next/image를 사용하려면 이미지들에 대한 alt를 모두 넣어주지 않으면 빌드가 안되고, px값을 명시적으로 적어줘야한다.
    - sever/client component
        - use server, use client 지시문 사용
    - route handlers
        - next build 시 정적 응답 객체 생성 가능
    - browser APIs
        - client Component 의 경우 window 객ㅊ에에 접근 한다던가 가능
        -