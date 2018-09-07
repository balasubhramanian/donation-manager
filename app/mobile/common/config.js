import { AsyncStorage } from "react-native";

class Config {
  getDefaultStreet() {
    return this.getJsonItem("defaultStreet");
  }

  setDefaultStreet(value) {
    return this.setJsonItem("defaultStreet", value);
  }

  getDefaultCampaign() {
    return this.getJsonItem("defaultCampaign");
  }

  setDefaultCampaign(value) {
    return this.setJsonItem("defaultCampaign", value);
  }

  getJsonItem(key) {
    return AsyncStorage.getItem(key).then(data => JSON.parse(data));
  }

  setJsonItem(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }
}

export default new Config();
