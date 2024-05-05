import { useAtom } from "jotai";
import { countAtom } from "store/base1/atom";

export const UseNotAtomComponent = (): JSX.Element => {
  const [count, _] = useAtom(countAtom);

  return (
    <div>
      <h3>count!</h3>
      <div>
        <p>{count}</p>
      </div>
    </div>
  );
};
