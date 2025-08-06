import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const accessTokenAtom = atomWithStorage("accessToken", null);
export const adminTokenAtom = atomWithStorage("adminToken", null);
export const userAtom = atomWithStorage("user", null);
export const adminAtom = atomWithStorage("admin", null);

export const isUserAuthenticatedAtom = atom(
  (get) => get(accessTokenAtom) !== null && get(userAtom) !== null,
);
export const isAdminAuthenticatdAtom = atom(
  (get) => get(adminTokenAtom) !== null && get(adminAtom) !== null,
);
