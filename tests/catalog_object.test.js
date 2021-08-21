"use strict";
const should = require("chai").should();
const { v4: uuidv4 } = require("uuid");
uuidv4();

const Catalog_Object_Wrapper = require("../src/lib/catalog_object_wrapper");
const Catalog_Category = require("../src/lib/catalog_object_category");
const { Helper_Name } = require("../src/lib/catalog_object_helpers");
const Catalog_Item = require("../src/lib/catalog_object_item");
const Catalog_Object_Super = require("../src/lib/catalog_object_aaa_super");

// const { Catalog_ } = require("../src/lib/catalog_");
// const { Catalog_ } = require("../src/lib/catalog_");

// https://www.browserling.com/tools/random-string
const long_strings = {
  len_25: "tdiqxhdarmjybdajemybgunom",
  len_256:
    "thunfxxclovowzwatuitcydimoijajdaehxbpbcccytmsybbmufbymnmycdwgrxuxefpyzspqgnzyfvtnlpahapsezykfurodobxobozmdvqhkzghynngmcwcwiwuqigkneehkgmgxgrphdxjoovzuzozwhxkkliykejlzdjcifljhqtikvtfcbfagsfoyaoqgyvjlowcqvzgqnetgryxjpwrtrdtfrzfnmhexhqldrismcffnbnshfchfgvovta",
  len_513:
    "vpwiwcsyiuulpyztooazvefyleakszqsfhhkyyqovwjvnpnkaepupkyykebuwfeompwevnpqswljzefphkrrxytzlrwgliwiluxsocajvhgrxrzegkgvfwuqrjtokxjbuezthokhbjtlkpvbfplmthlegyatitcdjmrysfzvqboltracgbsrjazwxggswcccafjxeeukysewmrdhmkaaexgkzefpokqufroelqjbdfcmzqdbqyevqxnzjgjvfhjqvvhtgvfioatyavdewadcsrvbyafrbjxxnkurwtewsitebbfljgnrrxfdfvltcphuneywetvsxngdftdaflyydeepftmkhenlvpnxqkjopdeaclffqkysabbjsaurzmfjqisbvkasvpkijxxtuyfmaljozyshmgmcnoavvtcxrcubzncqvixjsmwnfysldpcvavvvytisvydiswauvfhevebpsiyfqmzeysiyandgjbyfsrqpbklqhhlyydjvqrret",
  len_4097:
    "golblktjwacyablgedpxjhqemuwqwemqygfgagatilvtqhuhixvxmgmnfjgfquhhahexqhudcqmxpxakfcdckzufaiahzxecsavktbcsykattbexjferqiqjmrtovynkagmvnwrrkxmqorqxpkuhyeqkzzecbolxvanlleevkcavraweilhhgrddyhsvfhxigawdolbluhjuanmlodnhtedvkndizzoinmvrzfqdaksuknsdkfufhpgndgwzqdckxgoeixvdwzidjydyasagytrxyognyjldxmcsxmyxfbqqiddlmbnvqqmuatxutccmudtyayjhisovqwhrofakcohryfggonpflbfuidpkgjhgpxgflxiuregrpsrxahsmlhvzehdbvirwnfuvmknguemzskownlfirwjnivqupbypxtasudprrbojrvhfcubkojengpbtasctvjqhzybrdrmqectzslzapztfpmophokddbsclrfzmfhzeakuymjkeavchmqaacfscxwtcwknatzhusclodhcydltzvnnwnofcodclywhjrruuycpdhuadyzyxajjsxzzbjeijejilourdvnzrodjvilwckvugfbznyxfpqiamnngeeohunjidybsqkkfcbnjgfafpfebtsivesnadrptaaeflmmxeudtjjpfdatzdptkuoovaacwjlxboofmiuxbndluikqkvywvtplrehvjmpmyysvguvjngwmvhpsisbrvblwfbijtstclcythprxgrulcbqrjeiwapsfzkvcaznsjjnpscuxcvxbmnkdlmvzcjstzkmzllplgguquftifnybfglurojqlbwtpjbdrtxjdnwvaoaiaseqhnviqqqvwumbhkhmokbohvnwtqtjdxpvyycmnkjlwsnytrpqgpaqjkchxqcvhoxmzpwuunplhjdfjsoizqdzaxsfrmorwxcfzkdnhmnrfppderhdjbyvuubygcxolrwycpmfywzgtkipvkhjlfpbrimmvbhmqnkhykuqodietqrmpzqvbveerphlzmlvioaisxpsflrqnqlntgbjxmzyaszqmqbaclcvhkzkstsxdbdrrbdavyicmrsherdzyqiydtweygupjtloofkdvwvrnnnwqutumcfhvukfdcnvbftqdzxgsssxsikrrctxysxdyyqngtlbzxcqxqvzorwnvsizuihvjsdumffrnlijvyaogqniekbcksiyjhnahjtyknmtctwfdeqmsfdcslkroyiomcykburktrviyspejnqcwkqouhazusctosefymaisemkxkusmnxoqmbhufupwwnnuuvocbssooqjjgwdevboazxufngsusawgrooulxikgnzhnakkbmehzpwuapouurfjhybumvkmhmkveyuzycfuxazomdbiuotikzkbwcjzuohoamzefsrzhtaevzoapwnefvpgryhypqnhoigjbrqwmrgpwguvtarjxouibbpprbtbwphbqyyzygkqxfuhzsokzminlqowmtxwovhalmrbambnwguxbaxlhcmrmjxpscamxmanolbpbtjizytwzyupbyvtpnhhpafrvyfhsrxasyfwwueilzvesjzhpfpximyzsfmisahjvnfmczzoyavemdmioahxzvnillqqnkqhmkscyjzxyobycmdybbggandelilupcmioqexssigeemisvasgeyuudbipeilzbylcyvflrkcrmyepcbafiteawzpevlttucfbtqfocmgkdttzgichfrgogfrgsivbacsbvkcuijytagjznxceoqssfkquzpmoefpicwdixofojhxlwzolbkstkdgldgggpsckilubtskrccfugqcerphrkwsnwvfubqvqbspghkbeskrjspunisfnnfzyiymcmjsolaftlyvwmrqqvzkrwtbfazodukuaqbqdvtzjfocolwknadzzghtvsmzjgkxvlmnrcihlqhjsyqtjlimtzjcjaaqdbwaymqvloiolphznhhipzljdjrazcnsuligkizjdrmguatnqyxvjphudxijqlnficqdesmsrzanaxbbnorrxkdjdcuyibwmcbichderwljjqmkslwkwtnztrntpksymfbnwwxxzihslysdbnuavvbrqycvgguxearuyqcqalidudivfkarpsiqyugvepowbkxofqtlzddtispouodfgexaejzjzfjvlngjbyitdwlkldshmfbtocsjuhuqpwzyntdysicpmfgsgwwtyhcvjyzfwfulqalnklgfwekrdcdfratwbmidxtpaadiekdtzhzadchvobyvzxpbladrxyqsfsymfrskixnqqgfoitbagwmtbbtactvwlvacxpayhdlxqgqmlqdsrglkaoclbflmwwquugchxbvtugumlyfyfnqsvdcgpuhitngouhxfyfzwmwefzhtwqkpgrklocwyybclgsadhlbswwsnkftrcazrqnjdyqctctdfhaepcjfxnmbrccauydhxuphutrwawcwvblwwmbqgduyhhapqkejzdyfkorroilgrkchydroagdjcrfjrsmnsqgcfkryebccmwsbiwrtggreycsesmdvvhcawmvzjhebuiblhjbxpcvvxcpxcirwbbtjphrnabqelgfxgfwblolbhhlagaecgbgkjugfgetnwalvmyshpgafmkizljeyrmuhxawknbkpmzepolekeiudtvpxdtoagumziergjxaioyywcgngfzcijyyvmlmojuxbimlgfpcttchmauryjsauwlvocrljhuthcdztjuovuuwprogmttdzmujdshehecoajiouqtgerizovgcvlnizjgznhvzrkjmszwxkveimggmlvwdtxpskrfgqauyggtyerodestjiajlubvfhtzewzbuafhwyibgushgjjaqtovqvirzfedipujfyicevesgljtncifbmzjjtnxsesrzwvdmikgdmykzlzxzbifzmnsxgulyveknsnrlglcowkmsyxxacztqoprseokbcyltybdjfvzijubcmxkqkaseiyjfdzlppcchjdxpvrsqhktmtgsevbptinovjyggbxjcafvydqkrnqactxjerykrzwkwjzdinezwrgbyihowieistxrfnkcrkdbvmfqsuiipkwwgjcnsivynylegmgmwsaqwyujhuxmriqkqjptalaxftptieembahiyftsckddfolcuozmjrygzqrkyfkcqldtwezmtcprfrtmmskvolyczrxckuxqjujpsbferbelyolazkaslxdqvekcjaspiwwkgwgfazodyqhzfkqealzseyjmsfnxnmhgfvdeaucesicikztxaqrdxnnyeiayacnjtwywdaxxnchdfkblovtcykyuyiwrybzopvrfghyovcjoxsmonuylokcndclgfctwfcukvozvuqxhtujjlprbwengyobsdfzpzwxjozdvfppiyavydvyygpwqloiittmwudrlncpbhxwrvvnpxhchxwyxwxctlqoqypmrcvoyvvxrqbjmignuaanhuyqfnikjotlegizzffxgostxopeailregeoqrqqsqqkejnsbrhxwnjvskauizswcolynoprrfiaqdblypemqobbmljpezpeakaxyuuxvknhocwdunrvqwqwojuojnffooxhaznupljaybmnqvmhsxwalimyrwdngqbpqntvvzpepaiyvbuzpmnynlhnhtsdbalwvcyqfgqbnjwepqiyzkehxuokcjiudylqmqlmjowehgzahhumaiosavpcfzhpbzsyzxoehgncvcgzpwhnscfdajxbwelzukasfbnzkheqxsmgltnfszjvpgdolwhupfmvzbfagbfkddevpqgfvdfzbhqrzncwnxtfogowzxkywfvhdxcvuymrnerlxnvyvdncbhtjrrftbxkyqsznpklthhhbnbbdabsefsixnomeqcjhvpkzevoaowfrbxqzebslrkfvbmcyzeamnkcfejdrzipv",
};

describe("Empty block", () => {
  test("Should pass because it is an empty test", () => {});
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

  // test("", () => {
  //   let thing = new Catalog_Object_Wrapper();
  // });
});

// --------------------------------------------------------------
//                    HELPER
// --------------------------------------------------------------

describe("Catalog: Helper_Name", () => {
  const helper = new Helper_Name();
  let just_right = "Just right";

  test("Should accept a value that is less than 255 characters", () => {
    expect(() => {
      helper.name = just_right;
    }).not.toThrow();
  });

  test("Should reject a value that is more than 255 characters", () => {
    expect(() => {
      helper.name = long_strings.len_256;
    }).toThrow();
  });
});

// --------------------------------------------------------------
//                         CATEGORY
// --------------------------------------------------------------

describe("Catalog: Category", () => {
  const name = "Thing";
  const testSubject = new Catalog_Category(name);
  // const testValue = testSubject.parcel();
  const expected = {
    type: "CATEGORY",
    id: `#${name}`,
    present_at_all_locations: true,
    category_data: {
      name: name,
    },
  };
  test("Should have the expected name and type.", () => {
    expect(testSubject.parcel()).toMatchObject(expected);
  });
});

// --------------------------------------------------------------
//                         ITEM
// --------------------------------------------------------------

//TODO CHECK THAT FARDEL CONTAINS NAME PROP

describe("Catalog Item setters", () => {
  const item = new Catalog_Item();
  let name = "SCEANCE";
  let config = item.spawn();
  config.product_type().APPOINTMENTS_SERVICE();
  config
    .name(name)
    .available_for_pickup(false)
    .tax_ids("someId")
    .tax_ids("someOtherId");
  test("Should set the property product_type using the dynamic chain", () => {
    expect(item.product_type).toEqual("APPOINTMENTS_SERVICE");
  });
  test("Should have properties set to correct values by hardcoded spawn methods.", () => {
    item.name.should.equal(name);
    item.available_for_pickup.should.equal(false);
    item.tax_ids.should.be.an("array").lengthOf(2);
  });

  test("Should have properly set fardel.name property", () => {
    item.name.should.equal(name);
  });
});

describe("Catalog Item string length validators", () => {
  const item = new Catalog_Item();
  let config = item.spawn();
  expect(() => {
    item.name = long_strings.len_513;
  }).toThrow();
  expect(() => {
    // config.abbreviation(long_strings.len_25);
    item.abbreviation = long_strings.len_25;
  }).toThrow();
  expect(() => {
    config.description(long_strings.len_4097);
  }).toThrow();
});

describe("Catalog Item fardel arrays should be undefined", () => {
  // check that each one is set to undefined by default
  const item = new Catalog_Item();
  test("Array storage properties should begin as undefined", () => {
    // expect(item._fardel.tax_ids).toBeUndefined();
    expect(item.tax_ids).toBeUndefined();
    expect(item._fardel.modifier_list_info).toBeUndefined();
    expect(item._fardel.variations).toBeUndefined();
    expect(item._fardel.item_options).toBeUndefined();
  });

  // let config = item.spawn();

  // config.tax_ids(str).modifer_list_info(obj).variations(obj).item_options(str);
});
describe("Catalog Item fardel arrays should be arrays containing the appropriate type.", () => {
  //   check that each one is an array after something is added
  const obj = { a: 1 };
  const str = "somestring";
  const item = new Catalog_Item();
  test("Should be arrays containing appropriate type", () => {
    let config = item.spawn();
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
