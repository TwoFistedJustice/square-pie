"use strict";
const should = require("chai").should();
const { v4: uuidv4 } = require("uuid");
uuidv4();

const { long_strings } = require("./helper_objects");
const Catalog_Object_Wrapper = require("../src/lib/catalog_object_wrapper");
const Catalog_Category = require("../src/lib/catalog_object_category");
const Catalog_Object_Super = require("../src/lib/catalog_object_super");
const Catalog_Item = require("../src/lib/catalog_object_item");
const Catalog_Item_Variation = require("../src/lib/catalog_object_item_variation");

// https://www.browserling.com/tools/random-string
// const old_long_strings = {
//   len_25: "tdiqxhdarmjybdajemybgunom",
//   len_256:
//     "thunfxxclovowzwatuitcydimoijajdaehxbpbcccytmsybbmufbymnmycdwgrxuxefpyzspqgnzyfvtnlpahapsezykfurodobxobozmdvqhkzghynngmcwcwiwuqigkneehkgmgxgrphdxjoovzuzozwhxkkliykejlzdjcifljhqtikvtfcbfagsfoyaoqgyvjlowcqvzgqnetgryxjpwrtrdtfrzfnmhexhqldrismcffnbnshfchfgvovta",
//   len_513:
//     "vpwiwcsyiuulpyztooazvefyleakszqsfhhkyyqovwjvnpnkaepupkyykebuwfeompwevnpqswljzefphkrrxytzlrwgliwiluxsocajvhgrxrzegkgvfwuqrjtokxjbuezthokhbjtlkpvbfplmthlegyatitcdjmrysfzvqboltracgbsrjazwxggswcccafjxeeukysewmrdhmkaaexgkzefpokqufroelqjbdfcmzqdbqyevqxnzjgjvfhjqvvhtgvfioatyavdewadcsrvbyafrbjxxnkurwtewsitebbfljgnrrxfdfvltcphuneywetvsxngdftdaflyydeepftmkhenlvpnxqkjopdeaclffqkysabbjsaurzmfjqisbvkasvpkijxxtuyfmaljozyshmgmcnoavvtcxrcubzncqvixjsmwnfysldpcvavvvytisvydiswauvfhevebpsiyfqmzeysiyandgjbyfsrqpbklqhhlyydjvqrret",
//   len_4097:
//     "golblktjwacyablgedpxjhqemuwqwemqygfgagatilvtqhuhixvxmgmnfjgfquhhahexqhudcqmxpxakfcdckzufaiahzxecsavktbcsykattbexjferqiqjmrtovynkagmvnwrrkxmqorqxpkuhyeqkzzecbolxvanlleevkcavraweilhhgrddyhsvfhxigawdolbluhjuanmlodnhtedvkndizzoinmvrzfqdaksuknsdkfufhpgndgwzqdckxgoeixvdwzidjydyasagytrxyognyjldxmcsxmyxfbqqiddlmbnvqqmuatxutccmudtyayjhisovqwhrofakcohryfggonpflbfuidpkgjhgpxgflxiuregrpsrxahsmlhvzehdbvirwnfuvmknguemzskownlfirwjnivqupbypxtasudprrbojrvhfcubkojengpbtasctvjqhzybrdrmqectzslzapztfpmophokddbsclrfzmfhzeakuymjkeavchmqaacfscxwtcwknatzhusclodhcydltzvnnwnofcodclywhjrruuycpdhuadyzyxajjsxzzbjeijejilourdvnzrodjvilwckvugfbznyxfpqiamnngeeohunjidybsqkkfcbnjgfafpfebtsivesnadrptaaeflmmxeudtjjpfdatzdptkuoovaacwjlxboofmiuxbndluikqkvywvtplrehvjmpmyysvguvjngwmvhpsisbrvblwfbijtstclcythprxgrulcbqrjeiwapsfzkvcaznsjjnpscuxcvxbmnkdlmvzcjstzkmzllplgguquftifnybfglurojqlbwtpjbdrtxjdnwvaoaiaseqhnviqqqvwumbhkhmokbohvnwtqtjdxpvyycmnkjlwsnytrpqgpaqjkchxqcvhoxmzpwuunplhjdfjsoizqdzaxsfrmorwxcfzkdnhmnrfppderhdjbyvuubygcxolrwycpmfywzgtkipvkhjlfpbrimmvbhmqnkhykuqodietqrmpzqvbveerphlzmlvioaisxpsflrqnqlntgbjxmzyaszqmqbaclcvhkzkstsxdbdrrbdavyicmrsherdzyqiydtweygupjtloofkdvwvrnnnwqutumcfhvukfdcnvbftqdzxgsssxsikrrctxysxdyyqngtlbzxcqxqvzorwnvsizuihvjsdumffrnlijvyaogqniekbcksiyjhnahjtyknmtctwfdeqmsfdcslkroyiomcykburktrviyspejnqcwkqouhazusctosefymaisemkxkusmnxoqmbhufupwwnnuuvocbssooqjjgwdevboazxufngsusawgrooulxikgnzhnakkbmehzpwuapouurfjhybumvkmhmkveyuzycfuxazomdbiuotikzkbwcjzuohoamzefsrzhtaevzoapwnefvpgryhypqnhoigjbrqwmrgpwguvtarjxouibbpprbtbwphbqyyzygkqxfuhzsokzminlqowmtxwovhalmrbambnwguxbaxlhcmrmjxpscamxmanolbpbtjizytwzyupbyvtpnhhpafrvyfhsrxasyfwwueilzvesjzhpfpximyzsfmisahjvnfmczzoyavemdmioahxzvnillqqnkqhmkscyjzxyobycmdybbggandelilupcmioqexssigeemisvasgeyuudbipeilzbylcyvflrkcrmyepcbafiteawzpevlttucfbtqfocmgkdttzgichfrgogfrgsivbacsbvkcuijytagjznxceoqssfkquzpmoefpicwdixofojhxlwzolbkstkdgldgggpsckilubtskrccfugqcerphrkwsnwvfubqvqbspghkbeskrjspunisfnnfzyiymcmjsolaftlyvwmrqqvzkrwtbfazodukuaqbqdvtzjfocolwknadzzghtvsmzjgkxvlmnrcihlqhjsyqtjlimtzjcjaaqdbwaymqvloiolphznhhipzljdjrazcnsuligkizjdrmguatnqyxvjphudxijqlnficqdesmsrzanaxbbnorrxkdjdcuyibwmcbichderwljjqmkslwkwtnztrntpksymfbnwwxxzihslysdbnuavvbrqycvgguxearuyqcqalidudivfkarpsiqyugvepowbkxofqtlzddtispouodfgexaejzjzfjvlngjbyitdwlkldshmfbtocsjuhuqpwzyntdysicpmfgsgwwtyhcvjyzfwfulqalnklgfwekrdcdfratwbmidxtpaadiekdtzhzadchvobyvzxpbladrxyqsfsymfrskixnqqgfoitbagwmtbbtactvwlvacxpayhdlxqgqmlqdsrglkaoclbflmwwquugchxbvtugumlyfyfnqsvdcgpuhitngouhxfyfzwmwefzhtwqkpgrklocwyybclgsadhlbswwsnkftrcazrqnjdyqctctdfhaepcjfxnmbrccauydhxuphutrwawcwvblwwmbqgduyhhapqkejzdyfkorroilgrkchydroagdjcrfjrsmnsqgcfkryebccmwsbiwrtggreycsesmdvvhcawmvzjhebuiblhjbxpcvvxcpxcirwbbtjphrnabqelgfxgfwblolbhhlagaecgbgkjugfgetnwalvmyshpgafmkizljeyrmuhxawknbkpmzepolekeiudtvpxdtoagumziergjxaioyywcgngfzcijyyvmlmojuxbimlgfpcttchmauryjsauwlvocrljhuthcdztjuovuuwprogmttdzmujdshehecoajiouqtgerizovgcvlnizjgznhvzrkjmszwxkveimggmlvwdtxpskrfgqauyggtyerodestjiajlubvfhtzewzbuafhwyibgushgjjaqtovqvirzfedipujfyicevesgljtncifbmzjjtnxsesrzwvdmikgdmykzlzxzbifzmnsxgulyveknsnrlglcowkmsyxxacztqoprseokbcyltybdjfvzijubcmxkqkaseiyjfdzlppcchjdxpvrsqhktmtgsevbptinovjyggbxjcafvydqkrnqactxjerykrzwkwjzdinezwrgbyihowieistxrfnkcrkdbvmfqsuiipkwwgjcnsivynylegmgmwsaqwyujhuxmriqkqjptalaxftptieembahiyftsckddfolcuozmjrygzqrkyfkcqldtwezmtcprfrtmmskvolyczrxckuxqjujpsbferbelyolazkaslxdqvekcjaspiwwkgwgfazodyqhzfkqealzseyjmsfnxnmhgfvdeaucesicikztxaqrdxnnyeiayacnjtwywdaxxnchdfkblovtcykyuyiwrybzopvrfghyovcjoxsmonuylokcndclgfctwfcukvozvuqxhtujjlprbwengyobsdfzpzwxjozdvfppiyavydvyygpwqloiittmwudrlncpbhxwrvvnpxhchxwyxwxctlqoqypmrcvoyvvxrqbjmignuaanhuyqfnikjotlegizzffxgostxopeailregeoqrqqsqqkejnsbrhxwnjvskauizswcolynoprrfiaqdblypemqobbmljpezpeakaxyuuxvknhocwdunrvqwqwojuojnffooxhaznupljaybmnqvmhsxwalimyrwdngqbpqntvvzpepaiyvbuzpmnynlhnhtsdbalwvcyqfgqbnjwepqiyzkehxuokcjiudylqmqlmjowehgzahhumaiosavpcfzhpbzsyzxoehgncvcgzpwhnscfdajxbwelzukasfbnzkheqxsmgltnfszjvpgdolwhupfmvzbfagbfkddevpqgfvdfzbhqrzncwnxtfogowzxkywfvhdxcvuymrnerlxnvyvdncbhtjrrftbxkyqsznpklthhhbnbbdabsefsixnomeqcjhvpkzevoaowfrbxqzebslrkfvbmcyzeamnkcfejdrzipv",
// };

describe("Empty block", () => {
  test.only("Should pass because it is an empty test", () => {});
});

// --------------------------------------------------------------
//                         CATALOG OBJECT SUPER
// --------------------------------------------------------------

describe("Catalog Object Super", () => {
  const id = "prettyflowers";
  const idhash = "#prettyflowers";
  test("Should prepend a hash sign to the pre-upsert ID if one is not provided", () => {
    const superduper = new Catalog_Object_Super();
    superduper.id = id;
    superduper.id.should.equal(idhash);
  });
  test("Should NOT prepend a hash sign to the pre-upsert ID if one IS provided", () => {
    const superduper = new Catalog_Object_Super();
    superduper.id = id;
    superduper.id.should.equal(idhash);
  });
  test("Should ", () => {
    const superduper = new Catalog_Object_Super();
    superduper.present_at_all_locations = true;
    superduper.present_at_location_ids = id;
    expect(superduper.present_at_all_locations).toBe(true);
    expect(superduper.present_at_location_ids).toEqual(
      expect.arrayContaining([id])
    );
  });
});

// --------------------------------------------------------------
//                         CATALOG OBJECT WRAPPER
// --------------------------------------------------------------

describe("Catalog Object Wrapper", () => {
  const arr = [{ a: 0 }, { b: 1 }, { c: 2 }, { d: 3 }, { e: 4 }];

  test("Payload should be an object when given a single object", () => {
    let thing = new Catalog_Object_Wrapper();
    thing.attach(arr[0]);
    expect(thing.payload).toMatchObject(arr[0]);
  });

  test("Payload should be an array of objects when given a more than one object", () => {
    let thing = new Catalog_Object_Wrapper();
    thing
      .attach(arr[0])
      .attach(arr[1])
      .attach(arr[2])
      .attach(arr[3])
      .attach(arr[4]);
    expect(thing.payload).toMatchObject(arr);
  });

  test("Add alias should function exactly as attach method", () => {
    let thing = new Catalog_Object_Wrapper();
    thing.add(arr[0]).add(arr[1]).add(arr[2]).add(arr[3]).add(arr[4]);
    expect(thing.payload).toMatchObject(arr);
  });

  test("Attach method and add alias should work together", () => {
    let thing = new Catalog_Object_Wrapper();
    thing.add(arr[0]).attach(arr[1]).add(arr[2]).attach(arr[3]).add(arr[4]);
    expect(thing.payload).toMatchObject(arr);
  });

  test("Idempotency key should be a proper UUID", () => {
    const { validate } = require("uuid");
    let thing = new Catalog_Object_Wrapper();
    thing.add(arr[0]);
    thing.finalize();
    validate(thing.fardel.idempotency_key).should.be.true;
  });

  test("Fardel should be in correct form with one object", () => {
    let thing = new Catalog_Object_Wrapper();
    thing.add(arr[0]);
    thing.finalize();
    // test vs object
    Object.prototype.hasOwnProperty.call(thing.fardel, "object").should.be.true;
    thing.fardel.object.should.be.an("object");
  });

  test("Fardel should be in correct form with multiple object", () => {
    let thing = new Catalog_Object_Wrapper();
    thing.add(arr[0]);
    thing.attach(arr[1]);
    thing.finalize();
    //test vs array
    Object.prototype.hasOwnProperty.call(thing.fardel, "objects").should.be
      .true;
    thing.fardel.objects.should.be.an("array");
  });
});

// --------------------------------------------------------------
//                         CATEGORY
// --------------------------------------------------------------

describe("Catalog: Category", () => {
  const name = "Thing";
  const loc = "Pieville USA";
  const expected = {
    type: "CATEGORY",
    id: `#${name}`,
    present_at_all_locations: false,
    present_at_location_ids: [loc],
    category_data: {
      name: name,
    },
  };
  test("Should have the expected name and type.", () => {
    const category = new Catalog_Category();
    const config = category.make();
    config
      .name(name)
      .present_at_all_locations(false)
      .present_at_location_ids(loc);

    expect(category.fardel).toMatchObject(expected);
  });

  //todo test that it throws without a name
});

// --------------------------------------------------------------
//                         ITEM
// ToDO Item varition ID matches item id
// TODO CHECK THAT FARDEL CONTAINS NAME PROP
// --------------------------------------------------------------

describe("Catalog Item setters", () => {
  const item = new Catalog_Item();
  let name = "SCEANCE";
  let config = item.make();
  config.product_type().APPOINTMENTS_SERVICE();
  config
    .name(name)
    .available_for_pickup(false)
    .tax_ids("someId")
    .tax_ids("someOtherId");
  test("Should set the property product_type using the dynamic chain", () => {
    expect(item.product_type).toEqual("APPOINTMENTS_SERVICE");
  });
  test("Should have properties set to correct values by hardcoded make methods.", () => {
    item.name.should.equal(name);
    item.available_for_pickup.should.equal(false);
    item.tax_ids.should.be.an("array").lengthOf(2);
  });

  test("Should have properly set delivery.name property", () => {
    item.name.should.equal(name);
  });
});

describe("Catalog Item string length validators", () => {
  test("Should throw errors when strings are too long.", () => {
    const item = new Catalog_Item();
    let config = item.make();
    expect(() => {
      item.name = long_strings.len_513;
    }).toThrow();
    expect(() => {
      item.abbreviation = long_strings.len_25;
    }).toThrow();
    expect(() => {
      config.description(long_strings.len_4097);
    }).toThrow();
  });
});

describe("Catalog Item delivery arrays should be undefined", () => {
  const item = new Catalog_Item();
  test("Array storage properties should begin as undefined", () => {
    // expect(item._delivery.tax_ids).toBeUndefined();
    expect(item.tax_ids).toBeUndefined();
    expect(item._fardel.modifier_list_info).toBeUndefined();
    expect(item._fardel.variations).toBeUndefined();
    expect(item._fardel.item_options).toBeUndefined();
  });
});
describe("Catalog Item delivery arrays should be arrays containing the appropriate type.", () => {
  //   check that each one is an array after something is added
  const obj = {
    item_variation_data: {
      item_id: "",
    },
  };
  const str = "somestring";
  const item = new Catalog_Item();
  test("Should be arrays containing appropriate type", () => {
    let config = item.make();
    config
      .tax_ids(str)
      .modifier_list_info(obj)
      .variations(obj)
      .item_options(str);
    item.tax_ids.should.be.an("array").that.includes(str);
    item.modifier_list_info.should.be.an("array").that.includes(obj);
    item.variations.should.be.an("array").that.includes(obj);
    item.item_options.should.be.an("array").that.includes(str);
  });
});

// --------------------------------------------------------------
//                         ITEM VARIATION
// --------------------------------------------------------------

describe("Item Variation pricing featues", () => {
  test("Should auto configure pricing data to correctly", () => {
    const expected = {
      amount: 1500,
      currency: "USD",
    };
    const variation = new Catalog_Item_Variation();
    const spawn = variation.make();
    spawn.price_money(expected.amount);

    expect(variation.pricing_type).toEqual("FIXED_PRICING");
    expect(variation.price_money).toMatchObject(expected);

    spawn.pricing_type().VARIABLE_PRICING();
    expect(variation.pricing_type).toEqual("VARIABLE_PRICING");
    expect(variation.price_money).toBeUndefined();
  });

  test("Service duration should throw unexpected argument types", () => {
    const variation = new Catalog_Item_Variation();
    const spawn = variation.make();

    expect(() => {
      spawn.service_duration();
    }).toThrow();
    expect(() => {
      spawn.service_duration("5o");
    }).toThrow();
    expect(() => {
      spawn.service_duration("words");
    }).toThrow();
    expect(() => {
      spawn.service_duration(true);
    }).toThrow();
    expect(() => {
      spawn.service_duration({ time: 3600 });
    }).toThrow();
    expect(() => {
      spawn.service_duration(3600);
    }).not.toThrow();
  });

  test("Available for booking should throw on unexpected argument types", () => {
    const variation = new Catalog_Item_Variation();
    const spawn = variation.make();

    expect(() => {
      spawn.available_for_booking();
    }).toThrow();
    expect(() => {
      spawn.available_for_booking("words");
    }).toThrow();
    expect(() => {
      spawn.available_for_booking({ a: true });
    }).toThrow();
    expect(() => {
      spawn.available_for_booking(1);
    }).toThrow();
    expect(() => {
      spawn.available_for_booking(true);
    }).not.toThrow();
  });

  test("Available for booking have correct boolean value", () => {
    const variation = new Catalog_Item_Variation();
    const spawn = variation.make();
    spawn.available_for_booking(true);
    expect(variation.available_for_booking).toEqual(true);
  });

  test("Service duration have correct time in milliseconds", () => {
    const timeInMinutes = 60;
    const timeInMilliseconds = timeInMinutes * 60 * 1000;
    const variation = new Catalog_Item_Variation();
    const spawn = variation.make();
    spawn.service_duration(timeInMinutes);
    expect(variation.service_duration).toEqual(timeInMilliseconds);
  });

  test("Available for booking should reset pricing type to variable", () => {
    const variation = new Catalog_Item_Variation();
    const spawn = variation.make();
    spawn.pricing_type().FIXED_PRICING();
    spawn.available_for_booking(true);
    expect(variation.pricing_type).toEqual("VARIABLE_PRICING");
  });

  test("Service duration should reset pricing type to variable", () => {
    const timeInMinutes = 60;
    const variation = new Catalog_Item_Variation();
    const spawn = variation.make();
    spawn.pricing_type().FIXED_PRICING();
    spawn.service_duration(timeInMinutes);
    expect(variation.pricing_type).toEqual("VARIABLE_PRICING");
  });

  // todo test that Item automatically sets variation name when one is not provided
  // todo test that Item does not automatically set variation name when one IS provided
});

// --------------------------------------------------------------
//                        INTERACTION BETWEEN ITEM && ITEM VARIATION && WRAPPER
// --------------------------------------------------------------

describe("Item and Item Variation should interact correctly", () => {
  const expected_variation = {
    type: "ITEM_VARIATION",
    present_at_all_locations: true,
    present_at_location_ids: ["Pieville USA"],
    item_variation_data: {
      name: "Classic",
      item_id: "#some_item",
      pricing_type: "FIXED_PRICING",
      price_money: {
        amount: 1500,
        currency: "USD",
      },
      sku: "12345",
    },
  };

  test("Item should contain one correctly formed item variation", () => {
    const variation = new Catalog_Item_Variation();
    const item = new Catalog_Item();
    const vari_spawn = variation.make();
    const item_spawn = item.make();
    item_spawn.id("some_item");
    vari_spawn
      .name("Classic")
      .present_at_all_locations(true)
      .price_money(1500)
      .sku("12345")
      .present_at_location_ids("Pieville USA");
    item.variations = variation.fardel;
    const fardel = item.fardel;
    expect(fardel.item_data.variations[0]).toEqual(
      expect.objectContaining(expected_variation)
    );
  });

  test("Wrapper should contain an 'object' property when given one object", () => {
    const variation = new Catalog_Item_Variation();
    const item = new Catalog_Item();
    const wrapper = new Catalog_Object_Wrapper();

    const vari_config = variation.make();
    const item_config = item.make();
    item_config.id("some_item");
    vari_config
      .name("Classic")
      .present_at_all_locations(true)
      .price_money(1500)
      .sku("12345")
      .present_at_location_ids("Pieville USA");
    item.variations = variation.fardel;
    wrapper.attach(item.fardel);
    wrapper.finalize();
    expect(
      Object.prototype.hasOwnProperty.call(wrapper.fardel, "object")
    ).toEqual(true);
  });

  test("Wrapper should contain an 'objects' property when given more than one object", () => {
    const variation = new Catalog_Item_Variation();
    const item = new Catalog_Item();
    const wrapper = new Catalog_Object_Wrapper();

    const vari_config = variation.make();
    const item_config = item.make();
    item_config.id("some_item");
    vari_config
      .name("Classic")
      .present_at_all_locations(true)
      .price_money(1500)
      .sku("12345")
      .present_at_location_ids("Pieville USA");
    item.variations = variation.fardel;
    wrapper.attach(item.fardel);
    wrapper.attach(item.fardel); // duplicate is for test
    wrapper.finalize();
    expect(
      Object.prototype.hasOwnProperty.call(wrapper.fardel, "objects")
    ).toEqual(true);
  });
});
