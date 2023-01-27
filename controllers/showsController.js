const createShow = (req, res) => {
  res.send("create show");
};

const getAllShows = async (req, res) => {
  res.send("get all shows");
};
const updateShows = (req, res) => {
  res.send("update show");
};

const deleteShow = (req, res) => {
  res.send("delete show");
};

export {createShow, getAllShows, updateShows, deleteShow};
