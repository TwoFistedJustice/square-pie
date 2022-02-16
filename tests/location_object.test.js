"use strict";
const Location_Object = require("../src/lib/location_object");
const { long_strings } = require("./helper_objects");

let location, make;
const id = "123";
const class_name = "Location_Object";

/* --------------------------------------------------------*
 *                                                         *
 *                        common structures
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} basic object class structures`, () => {
  beforeEach(() => {
    location = new Location_Object();
    make = location.make();
  });
  test("should have display name", () => {
    expect(location.display_name).toBeDefined();
  });
  test("display name should be same as class name", () => {
    expect(location.display_name).toEqual(class_name);
  });
  test("should have help", () => {
    expect(location.help).toBeDefined();
  });
  test("should have defined square version", () => {
    expect(location.square_version).toBeDefined();
  });
  test("should have defined _fardel", () => {
    expect(location.fardel).toBeDefined();
  });
});
/* --------------------------------------------------------*
 *                                                         *
 *                        Error Checks
 *                                                         *
 * ------------------------------------------------------- */
describe(`${class_name} error checks`, () => {
  beforeEach(() => {
    location = new Location_Object();
    make = location.make();
  });
  test("name should throw on length 255 violation", () => {
    expect(() => {
      location.name = long_strings.len_256;
    }).toThrowError(/surpasses maximum character limit/);
  });
  test("name should NOT throw on length 255 compliance", () => {
    expect(() => {
      location.name = long_strings.len_255;
    }).not.toThrowError(/surpasses maximum character limit/);
  });
  test("timezone should throw on length 30 violation", () => {
    expect(() => {
      location.timezone = long_strings.len_31;
    }).toThrowError(/surpasses maximum character limit/);
  });
  test("timezone should NOT throw on length 30 compliance", () => {
    expect(() => {
      location.timezone = long_strings.len_30;
    }).not.toThrowError(/surpasses maximum character limit/);
  });
  test("phone_number should throw on length 17 violation", () => {
    expect(() => {
      location.phone_number = long_strings.len_18;
    }).toThrowError(/surpasses maximum character limit/);
  });
  test("phone_number should NOT throw on length 17 compliance", () => {
    expect(() => {
      location.phone_number = long_strings.len_17;
    }).not.toThrowError(/surpasses maximum character limit/);
  });
  test("business_name should throw on length 255 violation", () => {
    expect(() => {
      location.business_name = long_strings.len_256;
    }).toThrowError(/surpasses maximum character limit/);
  });
  test("business_name should NOT throw on length 255 compliance", () => {
    expect(() => {
      location.business_name = long_strings.len_255;
    }).not.toThrowError(/surpasses maximum character limit/);
  });
  test("business_email should throw on length 255 violation", () => {
    expect(() => {
      location.business_email = long_strings.email_256;
    }).toThrowError(/surpasses maximum character limit /);
  });
  test("business_email should NOT throw on length 255 compliance", () => {
    expect(() => {
      location.business_email = long_strings.email_255;
    }).not.toThrowError(/surpasses maximum character limit /);
  });
  test("description should throw on length 1024 violation", () => {
    expect(() => {
      location.description = long_strings.len_1025;
    }).toThrowError(/surpasses maximum character limit/);
  });
  test("description should NOT throw on length 1024 compliance", () => {
    expect(() => {
      location.description = long_strings.len_1024;
    }).not.toThrowError(/surpasses maximum character limit/);
  });
  test("language_code should throw on exact length 5 violation", () => {
    expect(() => {
      location.language_code = "123456";
    }).toThrowError(/Location_Object.language_code/);
  });
  test("language_code should throw on exact length 5 violation", () => {
    expect(() => {
      location.language_code = "1234";
    }).toThrowError(/Location_Object.language_code/);
  });
  test("twitter_username should throw on length 15 violation", () => {
    expect(() => {
      location.twitter_username = long_strings.len_16;
    }).toThrowError(/surpasses maximum character limit/);
  });
  test("twitter_username should NOT throw on length 15 compliance", () => {
    expect(() => {
      location.twitter_username = long_strings.len_15;
    }).not.toThrowError(/surpasses maximum character limit/);
  });
  test("instagram_username should throw on length 30 violation", () => {
    expect(() => {
      location.instagram_username = long_strings.len_31;
    }).toThrowError(/surpasses maximum character limit/);
  });
  test("instagram_username should throw on length 30 violation", () => {
    expect(() => {
      location.instagram_username = long_strings.len_30;
    }).not.toThrowError(/surpasses maximum character limit/);
  });
  test("facebook_url should throw on length 255 violation", () => {
    expect(() => {
      location.facebook_url = long_strings.url_256;
    }).toThrowError(/surpasses maximum character limit/);
  });
  test("facebook_url should NOT throw on length 255 compliance", () => {
    expect(() => {
      location.facebook_url = long_strings.url_255;
    }).not.toThrowError(/surpasses maximum character limit/);
  });
  test("facebook_url should throw on invalid url", () => {
    expect(() => {
      location.facebook_url = "htps://www.facebook.com/CrimsonCustomGuitars";
    }).toThrowError(/expects a valid URL/);
  });
  test("facebook_url should throw if not a facebook url", () => {
    expect(() => {
      location.facebook_url = "https://www.facebok.com/CrimsonCustomGuitars";
    }).toThrowError(/Location_Object.facebook_url/);
  });
  test("website_url should throw on length 255 violation", () => {
    expect(() => {
      location.website_url = long_strings.url_256;
    }).toThrowError(/surpasses maximum character limit/);
  });
  test("website_url should NOT throw on length 255 compliance", () => {
    expect(() => {
      location.website_url = long_strings.url_255;
    }).not.toThrowError(/surpasses maximum character limit/);
  });
  test("website_url should throw on invalid url", () => {
    expect(() => {
      location.website_url = "htts://www.pievilleusa.com/";
    }).toThrowError(/expects a valid URL/);
  });
  test("website_url should NOT throw on invalid url", () => {
    expect(() => {
      location.website_url = "https://www.pievilleusa.com/";
    }).not.toThrowError(/expects a valid URL/);
  });
  test("coordinates should throw on invalid latitude", () => {
    expect(() => {
      location.coordinates = { latitude: 3.25, longtitude: -120.67154 };
    }).toThrowError(/coordinates are invalid/);
  });
  test("coordinates should NOT throw on valid latitude and longitude", () => {
    expect(() => {
      location.coordinates = { latitude: 35.4898, longitude: -120.67154 };
    }).not.toThrowError(/coordinates are invalid/);
  });
  test("coordinates should throw on invalid longitude", () => {
    expect(() => {
      location.coordinates = { latitude: 35.4898, longtitude: 3.14 };
    }).toThrowError(/coordinates are invalid/);
  });

  test("mcc should throw on exact length 4 violation", () => {
    expect(() => {
      location.mcc = "123";
    }).toThrowError(/Location_Object.mcc/);
  });
  test("mcc should NOT throw on exact length 4 compliance", () => {
    expect(() => {
      location.mcc = "1234";
    }).not.toThrowError(/Location_Object.mcc/);
  });
  test("mcc should throw on exact length 4 violation", () => {
    expect(() => {
      location.mcc = "12345";
    }).toThrowError(/Location_Object.mcc/);
  });
});

/* --------------------------------------------------------*
 *                                                         *
 *                        getters/setters
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} getters/setters`, () => {
  beforeEach(() => {
    location = new Location_Object();
    make = location.make();
  });
  test("make().name () should set ", () => {
    let expected = id;
    make.name(expected);
    expect(location.name).toEqual(expected);
  });
  test("make().address () should set ", () => {
    let expected = { a: 1 };
    make.address(expected);
    expect(location.address).toEqual(expected);
  });
  test("make().timezone () should set ", () => {
    let expected = id;
    make.timezone(expected);
    expect(location.timezone).toEqual(expected);
  });
  test("make().phone_number () should set ", () => {
    let expected = "555-867-5309";
    make.phone_number(expected);
    expect(location.phone_number).toEqual(expected);
  });
  test("make().business_name () should set ", () => {
    let expected = id;
    make.business_name(expected);
    expect(location.business_name).toEqual(expected);
  });
  test("make().business_email () should set ", () => {
    let expected = "russabain@gmail.com";
    make.business_email("russ.a.bain@gmail.com");
    expect(location.business_email).toEqual(expected);
  });
  test("make().business_hours () should set ", () => {
    let expected = [
      {
        day_of_week: "Sunday",
        start_local_time: "8:30:00",
        end_local_time: "21:30:00",
      },
    ];
    make.business_hours("Sunday", "8:30:00", "21:30:00");
    expect(location.business_hours).toMatchObject(expected);
  });
  test("make().description () should set ", () => {
    let expected = id;
    make.description(expected);
    expect(location.description).toEqual(expected);
  });
  test("make().type () should set PHYSICAL", () => {
    let expected = "PHYSICAL";
    make.type().physical();
    expect(location.type).toEqual(expected);
  });
  test("make().type () should set MOBILE", () => {
    let expected = "MOBILE";
    make.type().mobile();
    expect(location.type).toEqual(expected);
  });
  test("make().status () should set ACTIVE", () => {
    let expected = "ACTIVE";
    make.status().active();
    expect(location.status).toEqual(expected);
  });
  test("make().status () should set INACTIVE", () => {
    let expected = "INACTIVE";
    make.status().inactive();
    expect(location.status).toEqual(expected);
  });
  test("make().twitter_username () should set ", () => {
    let expected = id;
    make.twitter_username(expected);
    expect(location.twitter_username).toEqual(expected);
  });
  test("make().instagram_username () should set ", () => {
    let expected = id;
    make.instagram_username(expected);
    expect(location.instagram_username).toEqual(expected);
  });
  test("make().facebook_url () should set ", () => {
    let expected = "https://www.facebook.com/CrimsonCustomGuitars";
    make.facebook_url(expected);
    expect(location.facebook_url).toEqual(expected);
  });
  test("make().website_url () should set ", () => {
    let expected = "https://www.pievilleusa.com/";
    make.website_url(expected);
    expect(location.website_url).toEqual(expected);
  });
  test("make().coordinates () should set ", () => {
    let expected = { latitude: 35.4898, longitude: -120.67154 };
    make.coordinates(35.4898, -120.67154);
    expect(location.coordinates).toMatchObject(expected);
  });
  test("make().mcc () should set ", () => {
    let expected = "1234";
    make.mcc(expected);
    expect(location.mcc).toEqual(expected);
  });
  test("make().mcc () should coerce a number to a string and set", () => {
    let expected = "1234";
    make.mcc(1234);
    expect(location.mcc).toEqual(expected);
  });

  test("make().tax_ids () should set ", () => {
    let expected = id;
    make.tax_ids(expected);
    expect(location.tax_ids).toEqual(expected);
  });
  // test ("make(). () should set ", () => {let expected = "";make. (expected);expect (location.).toEqual (expected);});
});

/* --------------------------------------------------------*
 *                                                         *
 *                        language codes
 *                                                         *
 * ------------------------------------------------------- */

describe(`${class_name} language codes enum`, () => {
  beforeEach(() => {
    location = new Location_Object();
    make = location.make();
  });
  test("make().language_code().english().canada() should set ", () => {
    let expected = "en-CA";
    make.language_code().english().canada();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().australia() should set ", () => {
    let expected = "en-AU";
    make.language_code().english().australia();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().canada() should set ", () => {
    let expected = "en-CA";
    make.language_code().english().canada();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().united_kingdom() should set ", () => {
    let expected = "en-GB";
    make.language_code().english().united_kingdom();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().ireland() should set ", () => {
    let expected = "en-IE";
    make.language_code().english().ireland();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().india() should set ", () => {
    let expected = "en-IN";
    make.language_code().english().india();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().new_zealand() should set ", () => {
    let expected = "en-NZ";
    make.language_code().english().new_zealand();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().united_states() should set ", () => {
    let expected = "en-US";
    make.language_code().english().united_states();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().south_africa() should set ", () => {
    let expected = "en-ZA";
    make.language_code().english().south_africa();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().aussie() should set ", () => {
    let expected = "en-AU";
    make.language_code().english().aussie();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().eh() should set ", () => {
    let expected = "en-CA";
    make.language_code().english().eh();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().eire() should set ", () => {
    let expected = "en-IE";
    make.language_code().english().eire();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().us() should set ", () => {
    let expected = "en-US";
    make.language_code().english().us();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().english().uk() should set ", () => {
    let expected = "en-GB";
    make.language_code().english().uk();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().arabic() should set ", () => {
    let expected = "ar-SA";
    make.language_code().arabic();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().bangla().bangladesh() should set ", () => {
    let expected = "bn-BD";
    make.language_code().bangla().bangladesh();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().bangla().india() should set ", () => {
    let expected = "bn-IN";
    make.language_code().bangla().india();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().czech() should set ", () => {
    let expected = "cs-CZ";
    make.language_code().czech();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().danish() should set ", () => {
    let expected = "da-DK";
    make.language_code().danish();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().german().austria() should set ", () => {
    let expected = "de-AT";
    make.language_code().german().austria();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().german().switzerland() should set ", () => {
    let expected = "de-CH";
    make.language_code().german().switzerland();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().german().swiss() should set ", () => {
    let expected = "de-CH";
    make.language_code().german().swiss();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().german().germany() should set ", () => {
    let expected = "de-DE";
    make.language_code().german().germany();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().spanish().argentina() should set ", () => {
    let expected = "es-AR";
    make.language_code().spanish().argentina();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().spanish().chile() should set ", () => {
    let expected = "es-CL";
    make.language_code().spanish().chile();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().spanish().columbia() should set ", () => {
    let expected = "es-CO";
    make.language_code().spanish().columbia();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().spanish().spain() should set ", () => {
    let expected = "es-ES";
    make.language_code().spanish().spain();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().spanish().mexico() should set ", () => {
    let expected = "es-MX";
    make.language_code().spanish().mexico();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().spanish().mex() should set ", () => {
    let expected = "es-MX";
    make.language_code().spanish().mex();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().spanish().united_states() should set ", () => {
    let expected = "es-US";
    make.language_code().spanish().united_states();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().spanish().us() should set ", () => {
    let expected = "es-US";
    make.language_code().spanish().us();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().finnish() should set ", () => {
    let expected = "fi-FI";
    make.language_code().finnish();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().french().belgium() should set ", () => {
    let expected = "fr-BE";
    make.language_code().french().belgium();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().french().canada() should set ", () => {
    let expected = "fr-CA";
    make.language_code().french().canada();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().french().quebec() should set ", () => {
    let expected = "fr-CA";
    make.language_code().french().quebec();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().french().switzerland() should set ", () => {
    let expected = "fr-CH";
    make.language_code().french().switzerland();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().french().swiss() should set ", () => {
    let expected = "fr-CH";
    make.language_code().french().swiss();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().french().france() should set ", () => {
    let expected = "fr-FR";
    make.language_code().french().france();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().hebrew() should set ", () => {
    let expected = "he-IL";
    make.language_code().hebrew();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().hindi() should set ", () => {
    let expected = "hi-IN";
    make.language_code().hindi();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().hungarian() should set ", () => {
    let expected = "hu-HU";
    make.language_code().hungarian();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().italian().italy() should set ", () => {
    let expected = "it-IT";
    make.language_code().italian().italy();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().italian().switzerland() should set ", () => {
    let expected = "it-CH";
    make.language_code().italian().switzerland();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().italian().swiss() should set ", () => {
    let expected = "it-CH";
    make.language_code().italian().swiss();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().japanese() should set ", () => {
    let expected = "jp-JP";
    make.language_code().japanese();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().korean() should set ", () => {
    let expected = "ko-KR";
    make.language_code().korean();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().dutch().belgium() should set ", () => {
    let expected = "nl-BE";
    make.language_code().dutch().belgium();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().dutch().netherlands() should set ", () => {
    let expected = "nl-NL";
    make.language_code().dutch().netherlands();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().norwegian() should set ", () => {
    let expected = "no-NO";
    make.language_code().norwegian();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().polish() should set ", () => {
    let expected = "pl-PL";
    make.language_code().polish();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().portugese().portuagal() should set ", () => {
    let expected = "pt-PT";
    make.language_code().portugese().portuagal();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().portugese().brazil() should set ", () => {
    let expected = "pt-BR";
    make.language_code().portugese().brazil();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().romanian() should set ", () => {
    let expected = "ro-RO";
    make.language_code().romanian();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().russian() should set ", () => {
    let expected = "ru-RU";
    make.language_code().russian();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().slovak() should set ", () => {
    let expected = "sk-SK";
    make.language_code().slovak();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().swedish() should set ", () => {
    let expected = "sv-SE";
    make.language_code().swedish();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().tamil().india() should set ", () => {
    let expected = "ta-IN";
    make.language_code().tamil().india();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().tamil().sri_lanka() should set ", () => {
    let expected = "ta-LK";
    make.language_code().tamil().sri_lanka();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().thai() should set ", () => {
    let expected = "th-TH";
    make.language_code().thai();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().turkish() should set ", () => {
    let expected = "tr-TR";
    make.language_code().turkish();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().chinese().china() should set ", () => {
    let expected = "zh-CN";
    make.language_code().chinese().china();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().chinese().hong_kong() should set ", () => {
    let expected = "zh-HK";
    make.language_code().chinese().hong_kong();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().chinese().hk() should set ", () => {
    let expected = "zh-HK";
    make.language_code().chinese().hk();
    expect(location.language_code).toEqual(expected);
  });
  test("make.language_code().chinese().taiwan() should set ", () => {
    let expected = "zh-TW";
    make.language_code().chinese().taiwan();
    expect(location.language_code).toEqual(expected);
  });

  // test(" should set ", () => {let expected = ""; make.language_code().(); expect(location.language_code).toEqual(expected);  });
});
