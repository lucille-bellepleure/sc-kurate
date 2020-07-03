import { mountPoint } from "./";
import { createSelector } from "reselect";

export const getHomefeed = createSelector(
    state => state[mountPoint],
    homefeed => homefeed
);

export const getHomefeedAsArray = createSelector(
    getHomefeed,
    homefeed => Object.values(homefeed)
);