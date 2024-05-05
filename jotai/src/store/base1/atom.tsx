import { UseAtomValueComponent } from "component/organisms/atoms/UseAtomValue";
import { UseNotAtomComponent } from "component/organisms/atoms/UseNotAtomValue";
import { atom } from "jotai";

export const countAtom = atom(0);

export const atomComponentType = {
  useNotAtomValue: <UseNotAtomComponent />,
  useAtomValue: <UseAtomValueComponent />,
  default: <></>,
};

export type AtomComponentType = keyof typeof atomComponentType;

export const atomType = atom<AtomComponentType>("default");

export const animeAtom = atom([
  {
    title: "Ghost in the Shell",
    year: 1995,
    watched: true,
  },
  {
    title: "Serial Experiments Lain",
    year: 1998,
    watched: false,
  },
]);

export const progressAtom = atom((get) => {
  const anime = get(animeAtom);
  return anime.filter((item) => item.watched).length / anime.length;
});
