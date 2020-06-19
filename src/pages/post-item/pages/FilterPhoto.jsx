import React, { useState, useRef, useCallback } from "react";
import main from "../../../styles.module.css";
import { Route, NavLink } from "react-router-dom";
import { ArrowBackIos } from "@material-ui/icons";

export function FilterPhoto({ backStage, nextStage, image }) {
  const [filterclass, setFilterclass] = useState("");
  const filters = [
    "1977",
    "aden",
    "brannan",
    "brooklyn",
    "clarendon",
    "earlybird",
    "gingham",
    "hudson",
    "inkwell",
    "kelvin",
    "lark",
    "lofi",
    "maven",
    "mayfair",
    "moon",
    "nashville",
    "perpetua",
    "reyes",
    "rise",
    "slumber",
    "stinson",
    "toaster",
    "valencia",
    "walden",
    "willow",
    "xpro2",
  ];

  return (
    <div className={main.container}>
      <div className={main.header}>
        <div onClick={backStage} className={main.headeritem}>
          <ArrowBackIos color="primary"></ArrowBackIos>
        </div>
        <div
          onClick={() => {}}
          className={[
            main.blue,
            main.bodyBold,
            main.textbutton,
            main.headeritem,
          ].join(" ")}
        >
          Next
        </div>
      </div>
      <div className={main.photoplace}>
        <img class={filterclass} src={image} width="100%"></img>
      </div>
      <div className={main.filterplace}>
        {filters.map((filter) => (
          <div
            className={main.filteritem}
            onClick={() => setFilterclass(filter)}
          >
            <div className={main.filtername}>{filter}</div>
            <img class={filter} src={image} width={120} height={120}></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterPhoto;
