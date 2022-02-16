// https://www.techonthenet.com/js/language_tags.php
const language_code_enum = {
  /** @function language_code - mainly used for Location API
   **  This enumerated method sets the BCP47 language code for the language_code property.
   *  This function closely mimics the structure of the BCP-47 table at the TOTN link.
   *  The pattern to follow when a language has only one listed tag is:
   *  `language_codes().lanugage()`
   *
   *  The pattern to follow when a language has more than one listed tag is:
   *  `language_codes().lanugage().region()`
   *
   *  The listed methods are aliases.
   *
   * @param {object} self - an object that has the property or setter'language_code'
   * @param {object} calling_this - pass in the calling function's 'this'
   * @author Russ Bain <russ.a.bain@gmail.com> https://github.com/TwoFistedJustice/
   * {@link https://www.techonthenet.com/js/language_tags.php | Tech On The Net}
   * @method aussie - alias of ``
   * @method - eh - alias of `canada` (english)
   * @method - quebec - alias of `canada` (french)
   * @method - eire - alias of `ireland`
   * @method - us - alias of `united_states`  (all)
   * @method - uk - alias of `united_kingdom`
   * @method - kiwi - alias of `new_zealand`
   * @method - mex - alias of `mexico`
   * @method - swiss - alias of `switzerland` (all)
   * @method - hk - alias of `hong_kong`
   * */

  language_code: function (self, calling_this) {
    return {
      english: function () {
        return {
          australia: function () {
            self.language_code = "en-AU";
            return calling_this;
          },
          canada: function () {
            self.language_code = "en-CA";
            return calling_this;
          },
          united_kingdom: function () {
            self.language_code = "en-GB";
            return calling_this;
          },
          ireland: function () {
            self.language_code = "en-IE";
            return calling_this;
          },
          india: function () {
            self.language_code = "en-IN";
            return calling_this;
          },
          new_zealand: function () {
            self.language_code = "en-NZ";
            return calling_this;
          },
          united_states: function () {
            self.language_code = "en-US";
            return calling_this;
          },
          south_africa: function () {
            self.language_code = "en-ZA";
            return calling_this;
          },
          aussie: function () {
            return this.australia();
          },
          eh: function () {
            return this.canada();
          },
          eire: function () {
            return this.ireland();
          },
          us: function () {
            return this.united_states();
          },
          uk: function () {
            return this.united_kingdom();
          },
          kiwi: function () {
            return this.new_zealand();
          },
        };
      },
      arabic: function () {
        self.language_code = "ar-SA";
        return calling_this;
      },

      bangla: function () {
        return {
          bangladesh: function () {
            self.language_code = "bn-BD";
            return calling_this;
          },
          india: function () {
            self.language_code = "bn-IN";
            return calling_this;
          },
        };
      },
      czech: function () {
        self.language_code = "cs-CZ";
        return calling_this;
      },
      danish: function () {
        self.language_code = "da-DK";
        return calling_this;
      },

      german: function () {
        return {
          austria: function () {
            self.language_code = "de-AT";
            return calling_this;
          },
          germany: function () {
            self.language_code = "de-DE";
            return calling_this;
          },
          switzerland: function () {
            self.language_code = "de-CH";
            return calling_this;
          },
          swiss: function () {
            return this.switzerland();
          },
        };
      },

      greek: function () {
        self.language_code = "el-GR";
        return calling_this;
      },

      spanish: function () {
        return {
          argentina: function () {
            self.language_code = "es-AR";
            return calling_this;
          },
          chile: function () {
            self.language_code = "es-CL";
            return calling_this;
          },
          columbia: function () {
            self.language_code = "es-CO";
            return calling_this;
          },
          spain: function () {
            self.language_code = "es-ES";
            return calling_this;
          },
          mexico: function () {
            self.language_code = "es-MX";
            return calling_this;
          },
          united_states: function () {
            self.language_code = "es-US";
            return calling_this;
          },
          us: function () {
            return this.united_states();
          },
          mex: function () {
            return this.mexico();
          },
        };
      },
      finnish: function () {
        self.language_code = "fi-FI";
        return calling_this;
      },

      french: function () {
        return {
          belgium: function () {
            self.language_code = "fr-BE";
            return calling_this;
          },
          canada: function () {
            self.language_code = "fr-CA";
            return calling_this;
          },
          france: function () {
            self.language_code = "fr-FR";
            return calling_this;
          },
          switzerland: function () {
            self.language_code = "fr-CH";
            return calling_this;
          },
          quebec: function () {
            return this.canada();
          },
          swiss: function () {
            return this.switzerland();
          },
        };
      },
      hebrew: function () {
        self.language_code = "he-IL";
        return calling_this;
      },
      hindi: function () {
        self.language_code = "hi-IN";
        return calling_this;
      },
      hungarian: function () {
        self.language_code = "hu-HU";
        return calling_this;
      },
      indonesian: function () {
        self.language_code = "id_ID";
        return calling_this;
      },

      italian: function () {
        return {
          italy: function () {
            self.language_code = "it-IT";
            return calling_this;
          },
          switzerland: function () {
            self.language_code = "it-CH";
            return calling_this;
          },
          swiss: function () {
            return this.switzerland();
          },
        };
      },
      japanese: function () {
        self.language_code = "jp-JP";
        return calling_this;
      },
      korean: function () {
        self.language_code = "ko-KR";
        return calling_this;
      },

      dutch: function () {
        return {
          belgium: function () {
            self.language_code = "nl-BE";
            return calling_this;
          },
          netherlands: function () {
            self.language_code = "nl-NL";
            return calling_this;
          },
        };
      },
      norwegian: function () {
        self.language_code = "no-NO";
        return calling_this;
      },
      polish: function () {
        self.language_code = "pl-PL";
        return calling_this;
      },

      portugese: function () {
        return {
          portuagal: function () {
            self.language_code = "pt-PT";
            return calling_this;
          },
          brazil: function () {
            self.language_code = "pt-BR";
            return calling_this;
          },
        };
      },
      romanian: function () {
        self.language_code = "ro-RO";
        return calling_this;
      },
      russian: function () {
        self.language_code = "ru-RU";
        return calling_this;
      },
      slovak: function () {
        self.language_code = "sk-SK";
        return calling_this;
      },
      swedish: function () {
        self.language_code = "sv-SE";
        return calling_this;
      },

      tamil: function () {
        return {
          india: function () {
            self.language_code = "ta-IN";
            return calling_this;
          },
          sri_lanka: function () {
            self.language_code = "ta-LK";
            return calling_this;
          },
        };
      },
      thai: function () {
        self.language_code = "th-TH";
        return calling_this;
      },
      turkish: function () {
        self.language_code = "tr-TR";
        return calling_this;
      },
      chinese: function () {
        return {
          china: function () {
            self.language_code = "zh-CN";
            return calling_this;
          },
          hong_kong: function () {
            self.language_code = "zh-HK";
            return calling_this;
          },
          taiwan: function () {
            self.language_code = "zh-TW";
            return calling_this;
          },
          hk: function () {
            return this.hong_kong();
          },
        };
      },
    };
  },

  allowable_values: {
    language_codes: [
      "ar-SA",
      "bn-BD",
      "bn-IN",
      "cs-CZ",
      "da-DK",
      "de-AT",
      "de-CH",
      "de-DE",
      "el-GR",
      "en-AU",
      "en-CA",
      "en-GB",
      "en-IE",
      "en-IN",
      "en-NZ",
      "en-US",
      "en-ZA",
      "es-AR",
      "es-CL",
      "es-CO",
      "es-ES",
      "es-MX",
      "es-US",
      "fi-FI",
      "fr-BE",
      "fr-CA",
      "fr-CH",
      "fr-FR",
      "he-IL",
      "hi-IN",
      "hu-HU",
      "id-ID",
      "it-CH",
      "it-IT",
      "jp-JP",
      "ko-KR",
      "nl-BE",
      "nl-NL",
      "no-NO",
      "pl-PL",
      "pt-BR",
      "pt-PT",
      "ro-RO",
      "ru-RU",
      "sk-SK",
      "sv-SE",
      "ta-IN",
      "ta-LK",
      "th-TH",
      "tr-TR",
      "zh-CN",
      "zh-HK",
      "zh-TW",
    ],
  },
};
module.exports = language_code_enum;
