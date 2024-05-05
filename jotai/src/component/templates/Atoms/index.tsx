import Layout from "component/organisms/layout";
import { useAtom } from "jotai";
import { atomComponentType, atomType } from "store/base1/atom";

const Atoms = (): JSX.Element => {
  const [component, setComponent] = useAtom(atomType);

  return (
    <Layout title={"Atoms"}>
      <div>
        {Object.keys(atomComponentType).map((key) => (
          <button key={key} onClick={() => setComponent(key as any)}>
            {key}
          </button>
        ))}
      </div>
      <div>{atomComponentType[component]}</div>
    </Layout>
  );
};

export default Atoms;
