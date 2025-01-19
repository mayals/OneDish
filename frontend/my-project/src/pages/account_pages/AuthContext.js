// AuthContext.js
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { baseURL } from "../../api/Api.js";
import { useNavigate } from "react-router-dom";
import notify from "../../common/UseNotification.js"


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


}
