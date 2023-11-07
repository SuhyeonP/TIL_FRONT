## Array vs Linked List

### 참고로 자바스크립트 배열(array)는 여기서 array보다는 linked list 에 가깝다.
```javascript
const arr = [1, 2, 3, 4, 5];

arr.length = 3;
console.log(arr);  // [1,2,3]

const arr = [1, 2, 3];

console.log(typeof arr);  // object
console.log(Array.isArray(arr));  // true
```

### Array
> array는 연관된 data를 메모리상에 연속적이며 순차적으로 미리 할당된 크기만큼 저장하는 자료구조이다.
* 특징
  * 고정된 저장공간
  * 순차적인 데이터 저장
  * 장점
    * 조회를 자주해야하는 작업에는 array자료구조를 많이 쓴다. (lookup, append 가 빠르기때문)
  * 단점
    * fixed-size 특성상 선언시에 array크기를 미리 정해야한다.
    * 이는 메모리 낭비나 추가적인 overhead가 발생 할 수 있다.
* 만약 예상한것보다 더 많은 수의 data를 저장하느라 array의 사이즈를 넘어서면 어캐할꺼냐?
  * 기존 size보다 더 큰 array를 선언해 데이터를 옮겨 할당한다. 
  * 모든 데이터를 옮겼다면 기존 array는 메모리에서 삭제한다. 
  * 이런식으로 동적으로 배열의 크기를 조절하는 자료구조를 dynamic array라고 한다.
  * 또 다른 방법으로는 size 예측이 어렵다면 array대신 linked list를 사용함으로써 데이터 추가될때마다 메모리 공간을 할당받을것이다.

> Dynamic array?
* array의 경우 size가 고정되어있어 선언시 설정한 size보다 많은 개수의 data가 추가되면 저장할 수 없다. 
* 이에 비해 dynamic array는 저장공간이 가득 차게되면 resize를 해 유동적으로 size를 조절하며 데이터를 저장하는 자료구조. 

* dynamic array vs linked list
  * dynamic의 장점은 데이터 접근과 할당이 o(1) 로 굉장히 빠르다.
  * 이는 index 접근방법이 산술적인 연산 - [배열 첫 data의 주소값] + [offset] 으로 이뤄져있기때문
  * dynamic의 맨 뒤 데이터를 추가 삭제하는것이 상대적으로 빠르다  - o(1)
* linked 와 비교시 단점은?
 * dynamic array의 맨 끝이 아닌곳에 data를 추가 삭제시 느린편이다 o(n)
 * 이유는 메모리상에서 연속적으로 데이터가 저장되어있어 데이터를 추가 및 삭제시 뒤에 있는 데이터들을 모두 한칸씩 shift 해야하기 때문
 * resize시 예쌍치 못한 현저히 낮은 퍼포먼스 발생
 * resize에 시간이 많이 걸려 필요 이상 memory를 할당함.
 * 따라서 사용하지 않고 낭비되는 메모리 발생

### Linked List
> Node라는 구조체로 이루어져 Node는 데이터 값과 다음 Node의 address를 저장함.
> Linked List의 물리적 메모리상에서는 비연속적으로 저장되지만 구성하는 node가 next node의 주소를 가르킴으로써 논리적인 연속성을 가진 자료구조이다.

* 링크드리스트는 tree, graph 등 자료구조 구현시 자주 쓰이는 기본 자료구조이다. 
* next node의 주로를 통해 불연속적인 데이터를 연결해 논리적 연속성을 보장하는 점이 중심.
* 데이터 추가되는 시점에서 메모리를 할당하기에 메모리를 좀 더 효율적 사용 가능하다는 장점.
* 메모리에서 연속성을 유지하지 않아도 되기에 메모리 사용이 좀 더 자유로운 대신 다음 노드의 주소를 추가저장해야해서 데이터 하나당 차지하는 메모리가 더 커진다.
* 시간복잡도는 물리적으로 옮길 필요 없이 다음 주소가 가르키는 주소값만 변경하면 되서 o(1)로 삽입 삭제가 가능

> 둘의 비교(array vs linked list)
* array는 메모리를 연속적으로 데이터를 저장하는 자료구조.
* linked-list는 메모리상 연속적이지 않지만 다음 원소의 메모리 주소값을 저장해 놓음으로써 논리적 연속성 유지
* 데이터 조회의 경우 array는 o(1), linked-list 는 o(n)
* 데이터 삽입/삭제는 array - o(n), linked-list - o(1)
* 따라서 얼마만큼의 데이터를 저장할지 미리 알고있고, 조회를 많이 한다면 array를 사용하는것이 좋다.
* 반면 몇개의 데이터를 저장할지 불확실하고 삽입, 삭제가 잦다면 linked list를 사용하는것이 유리