## Queue Vs Stack

* enqueue = 값을 넣는거
* dequeue = 값을 빼는거


## Queue
> FIFO(First in First out) 자료구조로,
> 시간복잡도는 enqueue = O(1), dequeue = O(1)이다.
> 활용예시는 cache구현, 프로세스 관리, 너비우선탐색(BFS) 등이 있다.

* enqueue의 경우 맨 뒤에 데이터를 추가하면 완료하기에 o(1)
* dequeue의 경우 맨 앞의 데이터를 삭제하면 완료하기에 o(1)

* array-base queue: enqueue, dequeue 하는 과정서 남는 메모리 발생
* 따라서 메모리 낭비를 줄이기 위해 주로 circular queue([원형큐](https://www.notion.so/CS-a30abc690be74269ad6780ad5d8937cf?pvs=4#de6ab009f2ca43bf8efbf9196fa0f686))를 사용
* list-base: 재할당이나 메모리 낭비의 걱정을 할 필요가 없다.

### array-base vs list-base (queue)
* array-base
  * circular queue로 구현하는것이 일반적인데
    * 이는 메모리를 효율적으로 사용하기 위함이다 
    * enqueue가 계속 발생하면 fixed-size를 넘어서게 되어
    * dynamic array 같은 방법으로 size를 확장시켜야한다.
    * 그럼에도 enqueue의 시간복잡도는 o(1)유지가능.
* list-base 는 
  * singly-linked list로 구현한다.
  * enqueue는 단순히 singly-linked list 에서 append를 하는것으로 구현되고, 시간복잡도는 o(1)임.
  * dequeue는 맨 앞 원소를 삭제하고 first head를 변경하면 되기에 o(1)임.
* 두종류 모두 enqueue, dequeue 시간복잡도 o(1)임.
* 하지만 array-base 가 전반적으로 퍼포먼스가 더 좋지만
  * 최악의 케이스는 더 느릴수 있다. resize 때문
* list-base의 경우 enqueue할때 memory allocation을 해야해서 전반적인 runtime은 느릴 수 있다.

## stack
> LIFO(Last in First out) 자료구조로,
> 시간복잡도는 push = O(1), pop = O(1)이다.
> 활용 예시에는 후위표기법 연산, 유효성 검사, 웹 브라우저 방문기록(뒤로가기), 깊이우선탐색(DFS) 등 있다.


### stack 두개로 queue 구현
* stack 한개는 inStack로 
* stack 한개는 oustStack로
1. inStack에 데이터를 하나씩 넣고
2. 빼야할때는 outstack이 비었다면 인스택에서 하나씩 빼서(마지막데이터를)
3. 아웃스택에 넣어준다.
4. 그럼 첨에 들어간 원소가 아웃스택의 마지막 원소로 되어있을 것이고 순서대로 빼면 됨

### queue 두개로 stack 구현
* queue 한개는 q1
* queue 한개는 q2
1. q1에 데이터를 저장함.
2. 빼야할때는 q1에 데이터가 하나 남을때까지 q2로 데이터를 옮김
3. q1에 하나남은 데이터를 빼고
4. q1과 q2를 바꿈 그렇게 2,3,4를 반복

### queue vs priority queue
> 큐는 선입선출인 구조라 먼저 넣은거 먼저 빼는건데
> 우선순위큐(priority queue)는 우선순위가 높은 데이터를 먼저 꺼내는 자료구조이다.
> (들어간 순서 상관없이 우선순위 높은거)
* queue의 시간복잡도는 enqueue - o(1) , dequeue - o(1)
* priority queue의 시간복잡도는 enqueue - o(logn) , dequeue - o(logn)
* [참고](https://www.notion.so/CS-a30abc690be74269ad6780ad5d8937cf?pvs=4#c575c10d476040368dbc3e6e1ecba11f)