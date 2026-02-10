const {getDefaultConfig} = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

// browser 우선으로 잡게 해서 axios가 dist/node로 가지 않게 함
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;
