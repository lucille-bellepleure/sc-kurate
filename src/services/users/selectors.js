import { mountPoint } from ".";
import { createSelector } from "reselect";

export const getUsers = createSelector(
    state => state[mountPoint],
    users => users
);

