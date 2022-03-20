import React from "react";
import { useOutletContext } from "react-router-dom";
import { useClassy } from "use-classy";

import MDX from "@mdx-js/runtime";
import { components } from "../../MDX.context";

import "./style.scss";

const { HOMEPAGE } = process.env;

const Page = ({ children, ...props }) => {
  const { pages, isError: err } = useOutletContext();
  const page = pages?.[0] || props;
  const bem = useClassy("Page");
  const isHome = page?.title === HOMEPAGE;
  return (
    <article className={bem("&", props.className)}>
      {!children && err && (
        <header>
          <h2>{err.title}</h2>
          <p>{err.message}</p>
        </header>
      )}
      {!children && !err && (
        <React.Fragment>
          {!isHome && <h2>{page?.displayTitle || page?.title}</h2>}
          <MDX components={components}>{page?.body}</MDX>
        </React.Fragment>
      )}
      {children}
    </article>
  );
};

export default Page;
