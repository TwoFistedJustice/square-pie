// https://www.browserling.com/tools/random-string
// used for testing length respection (I made up a new word variant! Yay me!)
const long_strings = {
  len_10: "izkyrcrxzh",
  len_11: "vizkyrcrxzh",
  len_12: "avizkyrcrxzh",
  len_18: "eakamljbqgzdfurrrk",
  len_20: "dqhbknslbltllxzgzixa",
  len_21: "adqhbknslbltllxzgzixa",
  len_25: "tdiqxhdarmjybdajemybgunom",
  len_30: "eimgzpcjdzzokqwenrpfiqeahfseaa",
  len_31: "ceimgzpcjdzzokqwenrpfiqeahfseaa",
  len_51: "dhoknaetlrcwhahyngmkahhilprawobbamnywalhamblorendje",
  len_60: "futqgldulwfwjawifcnhwqgqevebdrcnlrovmqkrjfocxqdaadgoutkptcju",
  len_61: "cfutqgldulwfwjawifcnhwqgqevebdrcnlrovmqkrjfocxqdaadgoutkptcju",
  len_101:
    "qvowkrlxvrwqhvemozxbwjmfguptikbxizgsmvbjmsogddzuasjccsomajohuzlkllwniomerwheoyuyeteljgxcmrdmvrzgzlfok",
  len_191:
    "kmketblqqihmavkzckynsfsfcanmqyatlnlcbjbgrwriuvqzbrhyfvehtvimlpixerhmqbuebnlhztewpmirunauvxytijngfjbgjdjpitnxwtvxhtfgvqqxjqakadhiyevvbohgeitfyryvefkxseoejshyxjuzyhowawejywcrvumcpzfamlleqojsqpi",
  len_192:
    "akmketblqqihmavkzckynsfsfcanmqyatlnlcbjbgrwriuvqzbrhyfvehtvimlpixerhmqbuebnlhztewpmirunauvxytijngfjbgjdjpitnxwtvxhtfgvqqxjqakadhiyevvbohgeitfyryvefkxseoejshyxjuzyhowawejywcrvumcpzfamlleqojsqpi",
  len_193:
    "xakmketblqqihmavkzckynsfsfcanmqyatlnlcbjbgrwriuvqzbrhyfvehtvimlpixerhmqbuebnlhztewpmirunauvxytijngfjbgjdjpitnxwtvxhtfgvqqxjqakadhiyevvbohgeitfyryvefkxseoejshyxjuzyhowawejywcrvumcpzfamlleqojsqpi",
  len_251:
    "wjbpqdondbymouzijvbfdhdjoiexjmjbpwulnmqlkzfjdaxkunvhjbzhinbjvqsgohfyuskhtagkzojejdozejzieuxjqtmoryeibghutklanmzogrcntgnjdnkswqeexzqdmqdjhtsagwnbdewdzxlvicsuymeoeohkaxtsgimihnzedsmlcpplgouweaehzeqklhzunofwmuxzalgukbmbrvadqxjvsjbprhrrdagiugztoiwhwfoapia",
  len_255:
    "hunfxxclovowzwatuitcydimoijajdaehxbpbcccytmsybbmufbymnmycdwgrxuxefpyzspqgnzyfvtnlpahapsezykfurodobxobozmdvqhkzghynngmcwcwiwuqigkneehkgmgxgrphdxjoovzuzozwhxkkliykejlzdjcifljhqtikvtfcbfagsfoyaoqgyvjlowcqvzgqnetgryxjpwrtrdtfrzfnmhexhqldrismcffnbnshfchfgvovta",
  len_256:
    "thunfxxclovowzwatuitcydimoijajdaehxbpbcccytmsybbmufbymnmycdwgrxuxefpyzspqgnzyfvtnlpahapsezykfurodobxobozmdvqhkzghynngmcwcwiwuqigkneehkgmgxgrphdxjoovzuzozwhxkkliykejlzdjcifljhqtikvtfcbfagsfoyaoqgyvjlowcqvzgqnetgryxjpwrtrdtfrzfnmhexhqldrismcffnbnshfchfgvovta",
  len_501:
    "wrpplgkxjgbdoyyisgcsivzlmqpjooqeyucrcmchqrblpvnbfktjtopyenvxvjpegwsdepgemcjgetcysoanizbzbhjruxsppmozvozwxryguoitnwdxjdqdbrdtrlblrcbotupgbfiinghiijegbxwhaeqdzsaxndivuxzelnwxlkgpoewcwtxbmewmzplschwpowakbgndjzwdqziwricxjgmdnndbpyypfbnehxipxnjmwcfllyhjzggsbeltdajnhcyrqilvbtgaprtevxilwvwdixtsvarkypkteixhwkogwhydcuqshbwtdyvfikjlkahmuzvvbneeechuujeyombomxvlirudaqlnmnhbcapphpihhiuvzbmbdvuvdupfupuksjmfegqoqiwoxonrjtuxqjhhkjituivzhkamlcrntaqtzjsmdsmidyneletzcztwivqhkytehtubhukzsgdunsmencpqwgwvwapnpuizlgpqv",
  len_513:
    "vpwiwcsyiuulpyztooazvefyleakszqsfhhkyyqovwjvnpnkaepupkyykebuwfeompwevnpqswljzefphkrrxytzlrwgliwiluxsocajvhgrxrzegkgvfwuqrjtokxjbuezthokhbjtlkpvbfplmthlegyatitcdjmrysfzvqboltracgbsrjazwxggswcccafjxeeukysewmrdhmkaaexgkzefpokqufroelqjbdfcmzqdbqyevqxnzjgjvfhjqvvhtgvfioatyavdewadcsrvbyafrbjxxnkurwtewsitebbfljgnrrxfdfvltcphuneywetvsxngdftdaflyydeepftmkhenlvpnxqkjopdeaclffqkysabbjsaurzmfjqisbvkasvpkijxxtuyfmaljozyshmgmcnoavvtcxrcubzncqvixjsmwnfysldpcvavvvytisvydiswauvfhevebpsiyfqmzeysiyandgjbyfsrqpbklqhhlyydjvqrret",
  len_2001:
    "dhliynwqpzydyztxuquocwvustwtvuxfulsqcjepplpnvplqsesafgvctkqlwkksssssvbxldvgkvkvwsfgpoexxrsuiibfuktafokvhxqbwlqwxeqyhgcssihplksrzykypbylyajjzvamwirixqademwpucryujavzlqmsqevlixiatupbzdfkeriwtecrobxsqindbaxbyjngzlbkudifdbyeugjipkprzjpkxmtnplnhytspfvphazchexnydidqwjfomqvulosdhjztvhqriaeymejeljgtudsscphibmfwklgovrmhrykzehnztscliswujrqqzpotpikobtbukvkostnhhhokygiylshgqtkptycobsksnzwlxxgkdfhlgnyzrhzbjfejzjwdaomnctaohffaytysbslvbnpvapdtravpeadvzyqvckobmpotmataikvdkvxrrwbsjpdywuxtikzjsnsduanjdgstkuvcgnbvtetzddrmgaytpphtybhdmuwxbzugljumdphpoyyxaqkwhyxodtvraglpysvnenupnutlqaixhygtngfgkligoebavlhorcsjtjahzjkodqjvxqyvyvlfkykzsudozdrpuvzczeuxdauootqpphpnszoqyjkmsstfepkpczvzagwhtkfbnxvfwvjimphwxzgzumdnytbnivsurlfnjscubecqnhcijfdwtmehsjgygjnhqrfbttiaggkdszeczqubueryjldmhzdisurcsmmslhqwupvgpyrurmynuvsnnicehduyxcqvkdzyqddydivzzmtdqnfpzalxmymopgwdqtfrkzynppgrvmlkavtnimjwbthxfiqgnpstphjjmioeybiyeaghklgvqgohbzyathxnygfevvxewkookohfmmyljkedargclhgchkrkjdyekhiflzrljhswaieltyehbachszgsvovwhnqdqzekizrokribkwrfxykmaqyomuktfbekqzghggxdicviyytsmxxwpxuhvuevyxvnbxllsvbnzdudltnjnnroovpyxvdybbevqskveldqbjhacjsnmjbuamorrdgisplwhlvjlmpxqcxafcdwiftpywpqvsfdeddztrdmzzloznacveadpeazhqegeimflvacifjffljccemfdhdwrbsusanjcppuyzllpxxswnboaiwbipohashxyxvmsphslzkzzkbygkrhansibclybmyvdvjilvcgwfxfpqlwgvgqhnjpwnczxciliyuejyoytcbcqyekufknhvafgvjpxvpmeamfckoffkongnthnxewjeiliszuyvqllusqolveazajrhpnsfrcleppxlvxxswyzemtkmyjhhnvpttuuvflgxdtwclwjjzcthsehyntioozfdludbjbetnkyrtreiwfuvvnafrscfzsgulaaracngaprfylxvfaqkmdygyjiofsmocfqnbvrzeyyzlfccwqwwsnfbfxuhrlvugpwginhchjqcwasrydpbaqzzxkupecrnpgxxfdkqgpxhktnqwzfzbxqtonjcqzaovqzcidertrqhgbzjxltmwzzanpiulhbphthoautqhwhyadqgzqmlioqftbqnuuaahsxfwuregipwhocsiqwajvytplspsuvlrojfvamppqaaadbrbqohhnctsyimqmtxjtetlgiexvplwsmssrxjkhmavawsxlobqfgmppcignqzavfeynzjaripmaelssfaqipacnvtrupkoppmyygfzqryrjzlhntfwkjjbqflilgixvdamntcugfjcbcrtlskqkdrgbvtrzcykgbdrzwnxgvshpvbvgznyjtjvtwikvbdbbuprdkumsiuayxrqibtxzohwdvmconyqudhmqbnycwoylwesbatdyqzrmkgwjapjyagubzqnpjjxyxdktdugryhpbbncammxpfuzcrlrpu",
  len_4097:
    "golblktjwacyablgedpxjhqemuwqwemqygfgagatilvtqhuhixvxmgmnfjgfquhhahexqhudcqmxpxakfcdckzufaiahzxecsavktbcsykattbexjferqiqjmrtovynkagmvnwrrkxmqorqxpkuhyeqkzzecbolxvanlleevkcavraweilhhgrddyhsvfhxigawdolbluhjuanmlodnhtedvkndizzoinmvrzfqdaksuknsdkfufhpgndgwzqdckxgoeixvdwzidjydyasagytrxyognyjldxmcsxmyxfbqqiddlmbnvqqmuatxutccmudtyayjhisovqwhrofakcohryfggonpflbfuidpkgjhgpxgflxiuregrpsrxahsmlhvzehdbvirwnfuvmknguemzskownlfirwjnivqupbypxtasudprrbojrvhfcubkojengpbtasctvjqhzybrdrmqectzslzapztfpmophokddbsclrfzmfhzeakuymjkeavchmqaacfscxwtcwknatzhusclodhcydltzvnnwnofcodclywhjrruuycpdhuadyzyxajjsxzzbjeijejilourdvnzrodjvilwckvugfbznyxfpqiamnngeeohunjidybsqkkfcbnjgfafpfebtsivesnadrptaaeflmmxeudtjjpfdatzdptkuoovaacwjlxboofmiuxbndluikqkvywvtplrehvjmpmyysvguvjngwmvhpsisbrvblwfbijtstclcythprxgrulcbqrjeiwapsfzkvcaznsjjnpscuxcvxbmnkdlmvzcjstzkmzllplgguquftifnybfglurojqlbwtpjbdrtxjdnwvaoaiaseqhnviqqqvwumbhkhmokbohvnwtqtjdxpvyycmnkjlwsnytrpqgpaqjkchxqcvhoxmzpwuunplhjdfjsoizqdzaxsfrmorwxcfzkdnhmnrfppderhdjbyvuubygcxolrwycpmfywzgtkipvkhjlfpbrimmvbhmqnkhykuqodietqrmpzqvbveerphlzmlvioaisxpsflrqnqlntgbjxmzyaszqmqbaclcvhkzkstsxdbdrrbdavyicmrsherdzyqiydtweygupjtloofkdvwvrnnnwqutumcfhvukfdcnvbftqdzxgsssxsikrrctxysxdyyqngtlbzxcqxqvzorwnvsizuihvjsdumffrnlijvyaogqniekbcksiyjhnahjtyknmtctwfdeqmsfdcslkroyiomcykburktrviyspejnqcwkqouhazusctosefymaisemkxkusmnxoqmbhufupwwnnuuvocbssooqjjgwdevboazxufngsusawgrooulxikgnzhnakkbmehzpwuapouurfjhybumvkmhmkveyuzycfuxazomdbiuotikzkbwcjzuohoamzefsrzhtaevzoapwnefvpgryhypqnhoigjbrqwmrgpwguvtarjxouibbpprbtbwphbqyyzygkqxfuhzsokzminlqowmtxwovhalmrbambnwguxbaxlhcmrmjxpscamxmanolbpbtjizytwzyupbyvtpnhhpafrvyfhsrxasyfwwueilzvesjzhpfpximyzsfmisahjvnfmczzoyavemdmioahxzvnillqqnkqhmkscyjzxyobycmdybbggandelilupcmioqexssigeemisvasgeyuudbipeilzbylcyvflrkcrmyepcbafiteawzpevlttucfbtqfocmgkdttzgichfrgogfrgsivbacsbvkcuijytagjznxceoqssfkquzpmoefpicwdixofojhxlwzolbkstkdgldgggpsckilubtskrccfugqcerphrkwsnwvfubqvqbspghkbeskrjspunisfnnfzyiymcmjsolaftlyvwmrqqvzkrwtbfazodukuaqbqdvtzjfocolwknadzzghtvsmzjgkxvlmnrcihlqhjsyqtjlimtzjcjaaqdbwaymqvloiolphznhhipzljdjrazcnsuligkizjdrmguatnqyxvjphudxijqlnficqdesmsrzanaxbbnorrxkdjdcuyibwmcbichderwljjqmkslwkwtnztrntpksymfbnwwxxzihslysdbnuavvbrqycvgguxearuyqcqalidudivfkarpsiqyugvepowbkxofqtlzddtispouodfgexaejzjzfjvlngjbyitdwlkldshmfbtocsjuhuqpwzyntdysicpmfgsgwwtyhcvjyzfwfulqalnklgfwekrdcdfratwbmidxtpaadiekdtzhzadchvobyvzxpbladrxyqsfsymfrskixnqqgfoitbagwmtbbtactvwlvacxpayhdlxqgqmlqdsrglkaoclbflmwwquugchxbvtugumlyfyfnqsvdcgpuhitngouhxfyfzwmwefzhtwqkpgrklocwyybclgsadhlbswwsnkftrcazrqnjdyqctctdfhaepcjfxnmbrccauydhxuphutrwawcwvblwwmbqgduyhhapqkejzdyfkorroilgrkchydroagdjcrfjrsmnsqgcfkryebccmwsbiwrtggreycsesmdvvhcawmvzjhebuiblhjbxpcvvxcpxcirwbbtjphrnabqelgfxgfwblolbhhlagaecgbgkjugfgetnwalvmyshpgafmkizljeyrmuhxawknbkpmzepolekeiudtvpxdtoagumziergjxaioyywcgngfzcijyyvmlmojuxbimlgfpcttchmauryjsauwlvocrljhuthcdztjuovuuwprogmttdzmujdshehecoajiouqtgerizovgcvlnizjgznhvzrkjmszwxkveimggmlvwdtxpskrfgqauyggtyerodestjiajlubvfhtzewzbuafhwyibgushgjjaqtovqvirzfedipujfyicevesgljtncifbmzjjtnxsesrzwvdmikgdmykzlzxzbifzmnsxgulyveknsnrlglcowkmsyxxacztqoprseokbcyltybdjfvzijubcmxkqkaseiyjfdzlppcchjdxpvrsqhktmtgsevbptinovjyggbxjcafvydqkrnqactxjerykrzwkwjzdinezwrgbyihowieistxrfnkcrkdbvmfqsuiipkwwgjcnsivynylegmgmwsaqwyujhuxmriqkqjptalaxftptieembahiyftsckddfolcuozmjrygzqrkyfkcqldtwezmtcprfrtmmskvolyczrxckuxqjujpsbferbelyolazkaslxdqvekcjaspiwwkgwgfazodyqhzfkqealzseyjmsfnxnmhgfvdeaucesicikztxaqrdxnnyeiayacnjtwywdaxxnchdfkblovtcykyuyiwrybzopvrfghyovcjoxsmonuylokcndclgfctwfcukvozvuqxhtujjlprbwengyobsdfzpzwxjozdvfppiyavydvyygpwqloiittmwudrlncpbhxwrvvnpxhchxwyxwxctlqoqypmrcvoyvvxrqbjmignuaanhuyqfnikjotlegizzffxgostxopeailregeoqrqqsqqkejnsbrhxwnjvskauizswcolynoprrfiaqdblypemqobbmljpezpeakaxyuuxvknhocwdunrvqwqwojuojnffooxhaznupljaybmnqvmhsxwalimyrwdngqbpqntvvzpepaiyvbuzpmnynlhnhtsdbalwvcyqfgqbnjwepqiyzkehxuokcjiudylqmqlmjowehgzahhumaiosavpcfzhpbzsyzxoehgncvcgzpwhnscfdajxbwelzukasfbnzkheqxsmgltnfszjvpgdolwhupfmvzbfagbfkddevpqgfvdfzbhqrzncwnxtfogowzxkywfvhdxcvuymrnerlxnvyvdncbhtjrrftbxkyqsznpklthhhbnbbdabsefsixnomeqcjhvpkzevoaowfrbxqzebslrkfvbmcyzeamnkcfejdrzipv",
};

const dateCodes = {
  RFC3339: "2019-10-12T07:20:50.52Z",
  notRFC3339: Date.now(),
};

const sampleCustomers = {
  amelia: {
    given_name: "Amelia",
    email_address: "aMe.lia698214271522544412252474@gmail.com",
  },
  freddie: {
    given_name: "Freddie",
    family_name: "Krueger",
    email_address: "freddie@iscream.org",
    address: {
      address_line_1: "187 Elm Street",
      address_line_2: "Suite 86",
      locality: "Springwood",
      administrative_district_level_1: "OH",
      postal_code: "43086",
      country: "US",
    },
    phone_number: "19375551054",
    reference_id: "10-Claws",
    note: "goooo toooo sleeeeeeep",
    preferences: {
      email_unsubscribed: false,
    },
  },
  fred: {
    given_name: "Fred",
    family_name: "Flintsone",
    email_address: "fred@slaterock.com",
    address: {
      address_line_1: "301 Cobblestone Way",
      locality: "Bedrock",
      administrative_district_level_1: "BR",
      postal_code: "70777",
      country: "BR",
    },
    phone_number: "19375557777",
    reference_id: "Flintsone-7777",
    note: "yubba dubba doooo",
    preferences: {
      email_unsubscribed: false,
    },
  },
  jason: {
    given_name: "Jason",
    family_name: "Voorhees",
    email_address: "machete@iscream.org",
    address: {
      address_line_1: "1054 Camp Crystal Lake Street",
      address_line_2: "Cabin 86",
      locality: "Crystal Lake",
      administrative_district_level_1: "OH",
      postal_code: "43086",
      country: "US",
    },
    phone_number: "19375550013",
    reference_id: "Friday-The-13th",
    note: "naughty children go to sleep",
    preferences: {
      email_unsubscribed: false,
    },
  },
  mikey: {
    given_name: "Michael",
    family_name: "Myers",
    email_address: "candy.time@gmail.com",
    address: {
      address_line_1: "86 Nowhere Is Safe Court",
      locality: "Haddonfield",
      administrative_district_level_1: "IL",
      postal_code: "60686",
      country: "US",
    },
    phone_number: "19375551031",
    reference_id: "Halloween-31",
    note: "want some candy?",
    preferences: {
      email_unsubscribed: false,
    },
  },
  buffy: {
    given_name: "Buffy",
    family_name: "Summers",
    email_address: "buffy@magicbox.com",
    address: {
      address_line_1: "1630 Revello Drive",
      locality: "Sunnydale",
      administrative_district_level_1: "CA",
      postal_code: "95037",
      country: "US",
    },
    phone_number: "18055550833",
    reference_id: "1997-2003",
    note: "When did I get a sister?",
    preferences: {
      email_unsubscribed: false,
    },
  },
};

module.exports = {
  long_strings,
  dateCodes,
  sampleCustomers,
};
