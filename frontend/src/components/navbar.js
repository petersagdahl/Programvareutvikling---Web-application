import React from "react";
import { useNavigate } from "react-router";

/*
buttons = [
{
    text: "Min knapp",
    callback: callback()
}
]
*/

const Navbar = (props) => {
  let elements = [];

  const nav = useNavigate();

  for (let i = 0; i < props.buttons.length; i++) {
    if (props.buttons[i]) {
      elements.push(
        <li className="nav-item" key={i}>
          {/* TODO: Fjerne inline styling*/}
          <a
            href="#"
            style={{ color: "white", fontWeight: "bold" }}
            className="nav-link"
            aria-current="page"
            onClick={
              props.buttons[i].callback
                ? props.buttons[i].callback
                : () => {
                    try {
                      nav(props.buttons[i].page, { replace: true });
                    } catch (error) {
                      console.log(error);
                    }
                  }
            }
          >
            {props.buttons[i].text}
          </a>
        </li>
      );
    }
  }

  const goToUser = () => {
    nav("/user", { replace: true });
  };

  return (
    <div>
      <div className="container">
        <header
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundBlendMode: "lighten",
          }}
        >
          <div style={{ width: 50 }}></div>
          <div className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">{elements}</ul>
          </div>
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/500px-Felis_catus-cat_on_snow.jpg"
              style={{
                width: 60,
                height: 60,
                border: "5px solid white",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              id="profilePic"
              onClick={goToUser}
            />
          </div>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
