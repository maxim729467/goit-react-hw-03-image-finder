import React, { Component } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { MdClose } from "react-icons/md";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.closeModalbyEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModalbyEsc);
  }

  closeModalbyEsc = (e) => {
    if (e.code === "Escape") {
      this.props.showModal();
    }
  };

  closeModalbyClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.showModal();
    }
  };

  render() {
    const { showModal } = this.props;

    return createPortal(
      <div className={styles.backdrop} onClick={this.closeModalbyClick}>
        <button
          type="button"
          onClick={() => showModal()}
          className={styles.button}
        >
          <MdClose className={styles.icon} />
        </button>
        <div className={styles.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
