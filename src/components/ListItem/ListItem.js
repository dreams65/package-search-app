import React from "react";
import Modal from "../Modal/Modal";
import { useState } from "react";

const ListItem = (props) => {
  const [modalActive, setModalActive] = useState(false);
  const [itemsSelf, setItemsSelf] = useState([]);

  function setHandler() {
    setModalActive(true);
    fetch(`https://data.jsdelivr.com/v1/package/${props.type}/${props.name}/stats/`)
      .then(res => res.json())
      .then((result) => { setItemsSelf((result)) })
  }

  let versionsArr = [];

  for (const key in itemsSelf) {
    for (const key in itemsSelf.versions) {
      versionsArr.push(key)
    }
  }

  return (
    <>
      <li className="results-item" onClick={setHandler}>
        <span className="results-item__info results-item__info_type">Type: {props.type}</span>
        <span className="results-item__nfo results-item__info_name">Name:  {props.name}</span>
        <span className="results-item__info results-item__info_hits">Hits: {props.hits}</span>
      </li>
      <Modal active={modalActive} setActive={setModalActive}>
        <h2 className="modal__content-title">{props.name}</h2>
        <p>Type: <span className="modal__content-type">{props.type}</span></p>
        <p>Rank: {itemsSelf.rank}</p>
        <p>Total: {itemsSelf.total}</p>
        <p>Last Version: {versionsArr[versionsArr.length - 1] ? versionsArr[versionsArr.length - 1] : 'No version information available'}</p>
      </Modal>
    </>
  )
}

export default ListItem;