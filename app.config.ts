import type { ExpoConfig } from "@expo/config";

export default (): ExpoConfig => {
  return {
    name: "articles-app",
    slug: "articles-app",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    android: {
      package: "dev.nitishxyz.articlesapp",
      googleServicesFile: "./credentials/google-services.json",
    },
    ios: {
      bundleIdentifier: "dev.nitishxyz.articlesapp",
      googleServicesFile: "./credentials/GoogleService-Info.plist",
    },
    extra: {
      eas: {
        projectId: `${process.env.EAS_PROJECT_ID}`,
      },
    },
    owner: "nitishxyz",
    scheme: "articlesapp",
    plugins: [
      "@react-native-firebase/app",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share your feedback.",
        },
      ],
    ],
  };
};
