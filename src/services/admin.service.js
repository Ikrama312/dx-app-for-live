import axios from "./axios";

const login = (email, password) => {
  return axios.post("/admin/auth/login", {
    email,
    password,
  });
};

const getProfile = () => {
  return axios.get("/admin");
};
const getAllStats = () => {
  return axios.get("/admin/stats");
};
const getDealer = () => {
  return axios.get("admin/top-dealers?page=1&limit=10");
};
const getDealerStats = (id) => {
  return axios.get(`/dealer/${id}/stats`);
};
const deleteDealer = (id) => {
  return axios.delete(`admin/dealer/${id}`);
};
const blockDealer = (id) => {
  return axios.get(`/admin/dealer/${id}/block`);
};
const unblockDealer = (id) => {
  return axios.get(`/admin/dealer/${id}/unblock`);
};
const getDealerDetails = (id) => {
  return axios.get(`admin/dealer/${id}`);
};
const getDriver = () => {
  return axios.get("admin/top-drivers?page=1&limit=10");
};
const getDriverStats = (id) => {
  return axios.get(`/driver/${id}/stats`);
};
const blockDriver = (id) => {
  return axios.get(`/admin/driver/${id}/block`);
};
const unblockDriver = (id) => {
  return axios.get(`/admin/driver/${id}/unblock`);
};
const deleteDriver = (id) => {
  return axios.delete(`admin/driver/${id}`);
};
const getDriverDetails = (id) => {
  return axios.get(`admin/driver/${id}`);
};
const getorder = () => {
  return axios.get("admin/orders?limit=10&page=1");
};
const getOrderbyId = (id) => {
  return axios.get(`/admin/orders/${id}`);
};
const getOngoingOrders = () => {
  return axios.get("admin/ongoing-orders?page=1&limit=10");
};
const getRooms = () => {
  return axios.get("/admin/chat/rooms?limit=10&page=1");
};
const getRoom = (id) => {
  return axios.get(`/admin/chat/rooms/${id}`);
};
const getRoomMessages = (room, page) => {
  return room.driver ? axios.get(
    `/admin/chat/messages?driverId=${room.driver_id}&limit=10&page=${page || 1}`
  ) : axios.get(
    `/admin/chat/messages?dealerId=${room.dealer_id}&limit=10&page=${page || 1}`
  );
};
const sendMessage = (body) => {
  return axios.post(`/admin/chat/send-message`, body);
};
const getFaqs = (id) => {
  return axios.get(`/faq/all`);
};
const createFaq = (body) => {
  return axios.post(`/faq`, body);
};
const updateFaq = (body) => {
  return axios.put(`/faq/${body.id}`, {
    question: body.question,
    answer: body.answer,
  });
};
const deleteFaq = (id) => {
  return axios.delete(`/faq/${id}`);
};
const getTC = (id) => {
  return axios.get(`/terms`);
};
const updateTC = (body) => {
  return axios.post(`/terms`, body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
const getAboutUs = () => {
  return axios.get(`/aboutus`);
};
const updateAboutUs = (body) => {
  return axios.post(`/aboutus`, body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
const sendNotification = (body) => {
  return axios.post(`/admin/schedule-notification`, body);
};
export default {
  login,
  getAllStats,
  getProfile,
  getDealer,
  getorder,
  getOrderbyId,
  getOngoingOrders,
  getDealerDetails,
  getDealerStats,
  deleteDealer,
  blockDealer,
  unblockDealer,
  getDriver,
  getDriverStats,
  getDriverDetails,
  blockDriver,
  unblockDriver,
  deleteDriver,
  getRooms,
  getRoom,
  getRoomMessages,
  sendMessage,
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  getTC,
  updateTC,
  getAboutUs,
  updateAboutUs,
  sendNotification,
};
