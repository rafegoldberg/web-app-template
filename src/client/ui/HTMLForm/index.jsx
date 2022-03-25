import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const { SERVER_URI } = process.env;

const HTMLForm = ({ children, action, method = "GET" }) => {
  const $form = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { current: el } = $form;
    const data = Object.fromEntries(new FormData(el));

    const path = `${SERVER_URI}/${action}`;
    const res = await fetch(path, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.redirected) return navigate(new URL(`${res.url}`).pathname);

    if (!res.ok) {
      const text = await res.text();
      console.error(text);
      return;
    }

    const { error, ...json } = await res.json();
    if (error) console.error(error);
    else console.log(json);
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
