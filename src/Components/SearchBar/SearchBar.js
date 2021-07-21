import React, { Component } from "react";
import styles from "./SearchBar.module.css";

export default class SearchBar extends Component {
  state = {
    value: "",
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.value.trim() !== "") {
      this.props.setTopic(this.state.value);
      this.setState({ value: "" });
    }
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value } = this.state;

    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.onChange}
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
          />
        </form>
      </header>
    );
  }
}
