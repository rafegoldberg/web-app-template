import React, { useRef } from "react";

const { SERVER_URI } = process.env;

const HTMLForm = ({
  action,
  children,
  headers = {},
  method = "GET",
  onError,
  onSubmit,
}) => {
  const $form = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { current: el } = $form;
    const data = Object.fromEntries((window.formdata = new FormData(el)));
    console.log({
      _csrf: document.head.querySelector("meta[name=csrf]").content,
    });
    const path = `${SERVER_URI}/${action}`;
    const res = await fetch(path, {
      method,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      if (typeof onSubmit === "function") onSubmit(res);
    } else {
      if (typeof onError === "function") onError(res);
    }
  };

  return (
    <form
      ref={$form}
      onSubmit={handleSubmit}
      action={action}
      method={method}
      children={children}
    />
  );
};

export default HTMLForm;
