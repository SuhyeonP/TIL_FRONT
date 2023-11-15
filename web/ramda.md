# ramda 메소드들

람다 기본 사용법

- Range: `R.range(최솟값, 최대값)`

    ```powershell
    import * as R from 'ramda';
    
    const array: number[] = R.range(1, 10); // [1,2,3,4,5,6,7,8,9]
    ```

    - [최솟값, 최솟값 + 1, … 최대값 -1] 형태의 배열을 제공

- Tap: `R.tap(콜백함수)(배열)`

    ```powershell
    import * as R from 'ramda';
    
    const array: number[] = R.range(1, 10); 
    R.tap(n => console.log(n))(array) // [1,2,3,4,5,6,7,8,9]
    ```

    - 복잡한 함수를 간단하게 구현하려면 함수 조합을 이용해야함. 이때 단계별로 값이 어떻게 변하는지 파악하며 코드를 작성함. 주로 계획한 설계대로 조합한 함수가 동작하지 않거나 어디서 논리 오류를 발생했는지 디버깅할때 그러하다. 이때 람다가 제공하는 tap 함수가 2차 고차함수 형태로 현잭밧을 파악할 수 있게 해준다.
- PIPE:

    ```powershell
    import * as R from 'ramda';
    
    const array: number[] = R.range(1, 10); 
    R.pipe(R.tap(n => console.log(n)))(array) // [1,2,3,4,5,6,7,8,9]
    ```

    - compose와 pipe 함수를 R.compose, R.pipe 형태로 제공하는데 pipe 는 왼쪽에서 오른쪽 순으로 합성을 한다면 compose는 오른쪽에서 왼쪽으로 합성한다.