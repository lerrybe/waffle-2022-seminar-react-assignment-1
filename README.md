# waffle-2022-seminar-react-assignment-1

## Repository Structure

📁 src
  
  * 📁 api - api 관련 함수 정의
  * 📁 assets - icon, img 등 에셋들
  * 📁 components - 컨테이너, 컴포넌트 모음
  * 📁 constant - 상수 모음
  * 📁 context - context API 관련 provider 모음
  * 📁 data - context의 initial states 정의
  * 📁 hooks - 커스텀 훅 모음
  * 📁 pages - 컨테이너 + 컴포넌트 묶음, 페이지
  * 📁 routes - 라우팅 정리
  * 📁 services - storage, 혹은 저장공간 함수 작성, 후에 redux 관련 로직
  * 📁 styles - global css 초기화
  * 📁 types - 타입 정보 저장
  * 📁 utils - util 함수 모음


### 💡 NOTES
- [O] Pages 리팩토링 (with TS, Css in Js)
- [O] Components 리팩토링 (with TS, Css in Js)
- [O] functions 리팩토링 (with TS, Css in Js)
- [O] APIs 리팩토링 (with TS, Css in Js)
  * 전체 파일 TS + emotion 이용해 리팩토링

  * 적당한 타입 (추론 가능한 부분은 두고, 혼란을 줄 수 있는 부분에 집중해 타입 작성)의 범위 알기

* Modify
  
- [O] 메뉴 페이지 이동할 때마다 `search`에 빈 문자열이 들어간 쓸데없는 요청이 날아간다.
  * 중복된 코드가 있어 제거해줬습니다. 
- [O] 가게 검색, 쓰로틀링
  * 쓰로틀링은 커스텀 훅을 참고했습니다.
- [O] 무한 스크롤 
  * Intersection observer 이용해 구현했고, 리뷰 배열의 가장 하단에 있는 리뷰가 (div) inView 상태, 눈에 보이는 상태가 되면 api 호출 함수를 부르는 간단한 로직입니다. 컴포넌트 `components/menu-reviews`에 구현되어 있습니다. 
- [O] 설명이나 이미지가 안 들어갈 때 400 오류, 모달 띄우기
  * toastify 실패 모달을 빼버려서 유저입장에서는 어떤 에러인지 알기 어려웠을 것 같습니다..! 모달 달고 상태 코드로 일부분 분류해 조금 개선하고자 했습니다.
- [O] 메뉴를 추가할 때 이미지나 설명이 없는 경우 `undefined`를 넣거나 아무것도 안 넣고 보내주셔야 합니다.
  * 값이 null인지, undefined 상태인지, 혹은 실제 값 (string or number or ...)을 가지고 있는지 타입스크립트 리팩토링 전까지는 날 서게 보지 않아서인지 예상과 다르게 들어가는 값들이 꽤나 많았던 것 같습니다. 독스나 함수 시그니처를 잘 봐야겠다고 생각했습니다.  
- [O] 요청은 언제나 실패할 가능성이 있습니다. 반드시 적절한 처리를 해주시기 바랍니다.
  * 특히 권한과 관련된 요청, 그에 따른 응답과 실패가 좀 어려웠던 것 같은데 방어적으로, 적절하게 안전하게 처리해야겠다고 더욱 느꼈던 것 같습니다.. AuthWrapper 등을 통해 로그인 된 유저만 접근 가능하도록 감싸줘도 좋을 것 같고 새로고침에도 안전하게 페이지단이나 혹은 컨테이너에서 요청을 보내려 합니다. 
- [O] 메뉴가 생성/수정된 직후에 TypeError가 뜨면서 리다이렉트가 안 됩니다.

* New
- [O] **refresh_token을 이용한 자동 로그인을 구현합니다.**
- [O] **access_token 및 패스워드를 리액트 외의 장소(쿠키, localStorage 등)에 따로 저장하지 않음
React가 초기화될 때 POST /auth/refresh를 통해 access_token 갱신을 시도, 실패하는 경우 로그인 되지 않은 상태로
로그인 외의 다른 API 요청들의 경우, 액세스 토큰 만료로 인해 401 오류가 발생->액세스 토큰을 갱신, 해당 요청을 다시 시도
토큰 갱신 실패 경우에만 오류 메시지 사용자에게 보여주기, 토큰 갱신이 잘 되면 사용자는 401로 실패한 사실을 몰라도 됨.**


## notes
* React 세미나-4 과제
* Typescript와 CSS-in-JS를 이용해 구현한 와플 메뉴 관리 프로그램입니다.
* 배포 URL: https://d2dqgv84eka501.cloudfront.net/ 
