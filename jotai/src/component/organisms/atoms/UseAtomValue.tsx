import { useAtomValue } from "jotai";
import { countAtom } from "store/base1/atom";

export const UseAtomValueComponent = (): JSX.Element => {
  const count = useAtomValue(countAtom);

  return (
    <div>
      <h3>count!</h3>
      <div>
        <p>{count}</p>
      </div>
    </div>
  );
};
