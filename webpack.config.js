const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "lego_module",

  exposes: {
    ButtonComponent: "./src/app/components/button/button.component.ts",
    InputComponent: "./src/app/components/input/input.component.ts",
    ModalClientDataComponent:
      "./src/app/components/modal-client-data/modal-client-data.component.ts",
    CardClientComponent:
      "./src/app/components/card-client/card-client.component.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
