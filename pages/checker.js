import {
  BrowserView,
  MobileView,
  SmartTVView,
  isBrowser,
  isDesktop,
  isMobile,
  isTablet,
  isSmartTV,
  isConsole,
  isWearable,
  isEmbedded,
  isMobileSafari,
  isChromium,
  isMobileOnly,
  isAndroid,
  isWinPhone,
  isIOS,
  isChrome,
  isFirefox,
  isSafari,
  isOpera,
  isIE,
  isEdge,
  isYandex,
  osVersion,
  osName,
  fullBrowserVersion,
  browserVersion,
  browserName,
  mobileVendor,
  mobileModel,
  engineName,
  engineVersion,
  getUA,
  deviceType,
  isWindows,
  isMacOs,
  isMIUI,
} from "react-device-detect";
const checker = () => {
  return (
    <div className="mt-32 grid grid-cols-2 text-center text-white">
      <h1 className=" text-2xl ">Checker</h1>
      <div> isSmartTV - {isSmartTV.toString()}</div>
      <div> isBrowser - {isBrowser.toString()}</div>
      <div> isDesktop - {isDesktop.toString()}</div>
      <div> isMobile - {isMobile.toString()}</div>
      <div> isTablet - {isTablet.toString()}</div>
      <div> isSmartTV - {isSmartTV.toString()}</div>
      <div> isConsole - {isConsole.toString()}</div>
      <div> isWearable - {isWearable.toString()}</div>
      <div> isEmbedded - {isEmbedded.toString()}</div>
      <div> isMobileSafari - {isMobileSafari.toString()}</div>
      <div> isChromium - {isChromium.toString()}</div>
      <div> isMobileOnly - {isMobileOnly.toString()}</div>
      <div> isAndroid - {isAndroid.toString()}</div>
      <div> isWinPhone - {isWinPhone.toString()}</div>
      <div> isIOS - {isIOS.toString()}</div>
      <div> isChrome - {isChrome.toString()}</div>
      <div> isFirefox - {isFirefox.toString()}</div>
      <div> isSafari - {isSafari.toString()}</div>
      <div> isOpera - {isOpera.toString()}</div>
      <div> isIE - {isIE.toString()}</div>
      <div> isEdge - {isEdge.toString()}</div>
      <div> isYandex - {isYandex.toString()}</div>
      <div> osVersion - {osVersion.toString()}</div>
      <div> osName - {osName.toString()}</div>
      <div> fullBrowserVersion - {fullBrowserVersion.toString()}</div>
      <div> browserVersion - {browserVersion.toString()}</div>
      <div> browserName - {browserName.toString()}</div>
      <div> mobileVendor - {mobileVendor.toString()}</div>
      <div> mobileModel - {mobileModel.toString()}</div>
      <div> engineName - {engineName.toString()}</div>
      <div> engineVersion - {engineVersion.toString()}</div>
      <div> getUA - {getUA.toString()}</div>
      <div> deviceType - {deviceType.toString()}</div>
      <div> isWindows - {isWindows.toString()}</div>
      <div> isMacOs - {isMacOs.toString()}</div>
      <div> isMIUI - {isMIUI.toString()}</div>
      <header className="App-header">
        <SmartTVView>
          <h1>This is rendered only on smart TV</h1>
        </SmartTVView>
        <BrowserView>
          <h1>This is rendered only in browser</h1>
        </BrowserView>
        <MobileView>
          <h1>This is rendered only on mobile</h1>
        </MobileView>
      </header>
    </div>
  );
};

export default checker;
