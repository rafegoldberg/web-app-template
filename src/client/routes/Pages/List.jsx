import React, { Fragment } from "react";
import { NavLink as Link, useOutletContext } from "react-router-dom";
import { useClassy } from "use-classy";
import usePagesAPI from "./usePagesAPI";

const { HOMEPAGE } = process.env;

const PagesList = ({ tag: Tag = "li", wrap: Wrap = "ul" }) => {
  const { pages } = usePagesAPI("?type=Page");
  const bem = useClassy("PageList");
  return (
    <ul className={bem()}>
      {pages?.map?.(({ slug, title }) => {
        if (title === HOMEPAGE) return null;
        return (
          <Link
            key={`${bem("-item")}@${slug}`}
            className={bem("-item")}
            to={`./${slug}`}
            exact
          >
            {title}
          </Link>
        );
      })}
    </ul>
  );
};

export default PagesList;
