import { atom } from "jotai";

export enum FlightType {
  oneWay = "oneWay",
  roundTrip = "roundTrip",
  multiCity = "multiCity",
}
export const flightTypeAtom = atom<FlightType>(FlightType.oneWay);

export const multiCityAtom = atom<string[]>(["ICN"]);

export type DepartureInfo = {
  name: string;
  code: string;
  countryCode: string;
};
export const departureAtom = atom<DepartureInfo>({
  name: "인천",
  code: "ICN",
  countryCode: "KR",
});

export const tripAtom = atom((get) => {
  const departure = get(departureAtom);
  const flightType = get(flightTypeAtom);
  const multiCity = get(multiCityAtom);
  return {
    departure,
    flightType,
    multiCity,
  };
});
