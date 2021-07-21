const API_KEY = "21273112-45be21eebf5785c737b42a518";

export const getImages = function (page, val) {
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${val}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        new Error("Some server issue seems to have occured. Please try again")
      );
    }
  });
};
