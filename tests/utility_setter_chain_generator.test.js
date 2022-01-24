"use strict";
const {
  setter_chain_generator_config,
  setter_chain_generator_separate_arrays,
} = require("../src/lib/utilities");

/* --------------------------------------------------------*
 *                                                         *
 *                        setter_chain_generator_config
 *                                                         *
 * ------------------------------------------------------- */
describe("setter_chain_generator_config", () => {
  test("setter_chain_generator_config should", () => {
    let klass = {
      configuration: {
        keys: ["doe", "re", "mi"],
        doe: ["deer", "female_deer"],
        re: ["golden_sun"],
        mi: ["myself"],
      },
      methods: {},
    };

    setter_chain_generator_config(klass.configuration, klass.methods, klass);
    klass.methods.doe().deer();
    klass.methods.re().golden_sun();
    klass.methods.mi().myself();
    expect(klass.doe).toEqual("deer");
    expect(klass.re).toEqual("golden_sun");
    expect(klass.mi).toEqual("myself");
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        setter_chain_generator_separate_arrays
 *                                                         *
 * ------------------------------------------------------- */

describe("setter_chain_generator_separate_arrays", () => {
  test("setter_chain_generator_config should", () => {
    let keys = ["doe", "re", "mi"];
    let values = {
      doe: ["deer", "female_deer"],
      re: ["golden_sun"],
      mi: ["myself"],
    };
    let klass = {
      methods: {},
    };

    setter_chain_generator_separate_arrays(keys, values, klass.methods, klass);
    klass.methods.doe().deer();
    klass.methods.re().golden_sun();
    klass.methods.mi().myself();
    expect(klass.doe).toEqual("deer");
    expect(klass.re).toEqual("golden_sun");
    expect(klass.mi).toEqual("myself");
  });
});
