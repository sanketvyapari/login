import { AUTH_TOKEN } from "../constants/common";
import { getLocalStorageData } from "./LocalStorageAccess";

export const  isAuth = getLocalStorageData(AUTH_TOKEN) == null || getLocalStorageData(AUTH_TOKEN) === "undefined" ? false : true;
