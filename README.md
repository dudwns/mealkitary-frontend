# 개발 규칙

### 개발 순서

Issue > branch 생성 > kanban 보드 > 개발 > 커밋 > PR > Merge > Issue 닫기 & kanban 보드

### Branch 전략

```markdown
main > develop > feature (기능 단위)
```

### 브랜치 명명

```markdown
feat/#이슈번호/기능명

ex) feat/#7/page-search
```

기능명 작성 시, 단어가 여러 개면 `-` 로 구분하기

### Commit 규칙

모든 커밋은 [추가, 삭제, 이동, 수정, 구현] 으로 끝낼 것

커밋 메세지 형식: feat: #7 - shop 수정 기능 추가

커밋 메세지는 Issue와 연결하기

| prefix   | 해당 내용                                                    |
| -------- | ------------------------------------------------------------ |
| init     | 프로젝트 첫 세팅                                             |
| feat     | 기능 구현, 사용자 입장에서 변화가 있을 경우                  |
| refactor | 사용자 입장에서 변화가 없는 코드, 파일명 폴더명 변경 및 이동 |
| chore    | 주석, 추가적인 의존성 설치, 리드미 수정, 기타                |
| style    | CSS만 수정                                                   |
| fix      | 버그 수정                                                    |

### Code 규칙

```tsx
import React from 'react'

const CONSTANT = 70 // 상수명 - import 문 바로 밑에
const API_ENDPOINT = "mealkitary"

interface 컴포넌트props { } // props 타입 별칭 (컴포넌트명+props)

const 컴포넌트 = ({}: 컴포넌트props) => {
	// ...

	return ();
}

export default 컴포넌트;
```

### ISSUE 템플릿

> [Prefix] - 구현 내용 (간단히 한 줄로 작성)

- prefix: Page, Component, 검색, 포스트 작성, 유저 페이지 등

```tsx
## 📑 구현 사항

- [ ] 구현할 사항 작성

</br>

## 🚧 특이 사항

이슈를 읽을 때 참고할 사항 작성
```

### PR 템플릿

> [Prefix] - 구현 내용 (간단히 한 줄로 작성)

```tsx
## 📑 구현 사항

- [ ] 구현한 사항 작성

<br/>

## 🚧 특이 사항

- [ ]

</br>

## 🚨관련 이슈

#이슈번호
```
