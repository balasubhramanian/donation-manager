package com.bala.donation;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.tkporter.sendsms.SendSMSPackage;
import cl.json.RNSharePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import dog.craftz.sqlite_2.RNSqlite2Package;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import cl.json.ShareApplication;

public class MainApplication extends Application implements ReactApplication, ShareApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
            SendSMSPackage.getInstance(), new RNSharePackage(),
          new RNFetchBlobPackage(), new RNFSPackage(), new ReactNativeDocumentPicker(), new RNSqlite2Package());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override
  public String getFileProviderAuthority() {
    return "com.bala.donation.provider";
  }
}
