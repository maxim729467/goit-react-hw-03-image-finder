import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { getImages } from "./Components/api-service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Container from "./Components/Container";
import Placeholder from "./Components/Placeholder";
import SearchBar from "./Components/SearchBar";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";
import Modal from "./Components/Modal";

class App extends Component {
  state = {
    status: "idle",
    topic: "",
    loader: false,
    page: 1,
    images: [],
    showModal: false,
    modalContent: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, topic } = this.state;
    if (topic !== prevState.topic || page !== prevState.page) {
      if (page === 1) {
        this.resetImages();
      }

      this.setState({ loader: true });

      getImages(page, topic)
        .then((data) => {
          if (data.hits.length < 12) {
            toast.warn("No more images to load", {
              toastId: "anotherCustomId",
            });
          }

          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            status: "resolved",
          }));
        })
        .catch(() => this.setState({ status: "rejected" }))
        .finally(() => this.setState({ loader: false }));
    }
  }

  setTopic = (val) => {
    this.setState((prevState) => {
      if (prevState.topic === val.toLowerCase()) {
        toast.dark("The same request! Try something another :)", {
          toastId: "customId",
        });
        return;
      }

      return { topic: val.toLowerCase(), page: 1 };
    });
  };

  showModal = () => {
    this.setState((prevState) => {
      return { showModal: !prevState.showModal };
    });
  };

  resetImages = () => {
    this.setState({ images: [] });
  };

  setPage = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  onImgClick = (id) => {
    const modalImg = this.state.images.find((img) => img.id === id);
    this.setState({ modalContent: modalImg });
    this.showModal();
  };

  render() {
    const { status, showModal, images, loader, modalContent } = this.state;

    return (
      <Container>
        <SearchBar setTopic={this.setTopic} />

        {status === "idle" ? (
          <Placeholder text="Use the search bar above if you are looking to get an awesome wallpaper" />
        ) : null}
        {status === "resolved" ? (
          <>
            <ImageGallery images={images} onImgClick={this.onImgClick} />
            <Button onClick={this.setPage} />
          </>
        ) : null}
        {loader && (
          <Loader
            className="Loader"
            type="Grid"
            color="#9900cc"
            height={180}
            width={180}
          />
        )}
        {status === "rejected" ? (
          <Placeholder text="Some error occured while fetching requested images" />
        ) : null}
        {showModal && (
          <Modal showModal={this.showModal}>
            <img src={modalContent.largeImageURL} alt={modalContent.tags} />
          </Modal>
        )}
        <ToastContainer />
      </Container>
    );
  }
}

export default App;
