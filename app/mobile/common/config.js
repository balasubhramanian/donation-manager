import { AsyncStorage } from "react-native";

class Config {
  setDefaultSMS(value) {
    return this.setStringItem("defaultSMS", value);
  }

  getDefaultSMS() {
    return this.getStringItem("defaultSMS");
  }

  getSendSms() {
    return this.getStringItem("sendSms");
  }

  setSendSms(value) {
    return this.setStringItem("sendSms", value);
  }

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

  getStringItem(key) {
    return AsyncStorage.getItem(key);
  }

  setStringItem(key, value) {
    return AsyncStorage.setItem(key, value);
  }
}

export default new Config();
