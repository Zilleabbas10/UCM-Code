import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import { initAPIConfig } from "../Services";

export default function mockAxios() {
  initAPIConfig({isLoggedIn: false, authToken: null});
  return new MockAdapter(axios)
}