import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)

    factory.startReactNative(
      withModuleName: "BrailleEbookFront",
      in: window,
      launchOptions: launchOptions
    )

    return true
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    let provider = RCTBundleURLProvider.sharedSettings()
    let metroHost = configuredMetroHost()

    if !metroHost.isEmpty {
      provider.jsLocation = metroHost
    }

    if let bundleURL = provider.jsBundleURL(forBundleRoot: "index") {
      return bundleURL
    }

    return URL(string: "http://\(metroHost)/index.bundle?platform=ios&dev=true&minify=false")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }

  private func configuredMetroHost() -> String {
    if let metroHost = Bundle.main.object(forInfoDictionaryKey: "MetroHost") as? String,
       !metroHost.isEmpty {
      return metroHost
    }

    return "localhost:8081"
  }
}
