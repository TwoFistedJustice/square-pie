// https://www.browserling.com/tools/random-string
// used for testing length respection (I made up a new word variant! Yay me!)
const long_strings = {
  len_25: "tdiqxhdarmjybdajemybgunom",
  len_256:
    "thunfxxclovowzwatuitcydimoijajdaehxbpbcccytmsybbmufbymnmycdwgrxuxefpyzspqgnzyfvtnlpahapsezykfurodobxobozmdvqhkzghynngmcwcwiwuqigkneehkgmgxgrphdxjoovzuzozwhxkkliykejlzdjcifljhqtikvtfcbfagsfoyaoqgyvjlowcqvzgqnetgryxjpwrtrdtfrzfnmhexhqldrismcffnbnshfchfgvovta",
  len_513:
    "vpwiwcsyiuulpyztooazvefyleakszqsfhhkyyqovwjvnpnkaepupkyykebuwfeompwevnpqswljzefphkrrxytzlrwgliwiluxsocajvhgrxrzegkgvfwuqrjtokxjbuezthokhbjtlkpvbfplmthlegyatitcdjmrysfzvqboltracgbsrjazwxggswcccafjxeeukysewmrdhmkaaexgkzefpokqufroelqjbdfcmzqdbqyevqxnzjgjvfhjqvvhtgvfioatyavdewadcsrvbyafrbjxxnkurwtewsitebbfljgnrrxfdfvltcphuneywetvsxngdftdaflyydeepftmkhenlvpnxqkjopdeaclffqkysabbjsaurzmfjqisbvkasvpkijxxtuyfmaljozyshmgmcnoavvtcxrcubzncqvixjsmwnfysldpcvavvvytisvydiswauvfhevebpsiyfqmzeysiyandgjbyfsrqpbklqhhlyydjvqrret",
  len_4097:
    "golblktjwacyablgedpxjhqemuwqwemqygfgagatilvtqhuhixvxmgmnfjgfquhhahexqhudcqmxpxakfcdckzufaiahzxecsavktbcsykattbexjferqiqjmrtovynkagmvnwrrkxmqorqxpkuhyeqkzzecbolxvanlleevkcavraweilhhgrddyhsvfhxigawdolbluhjuanmlodnhtedvkndizzoinmvrzfqdaksuknsdkfufhpgndgwzqdckxgoeixvdwzidjydyasagytrxyognyjldxmcsxmyxfbqqiddlmbnvqqmuatxutccmudtyayjhisovqwhrofakcohryfggonpflbfuidpkgjhgpxgflxiuregrpsrxahsmlhvzehdbvirwnfuvmknguemzskownlfirwjnivqupbypxtasudprrbojrvhfcubkojengpbtasctvjqhzybrdrmqectzslzapztfpmophokddbsclrfzmfhzeakuymjkeavchmqaacfscxwtcwknatzhusclodhcydltzvnnwnofcodclywhjrruuycpdhuadyzyxajjsxzzbjeijejilourdvnzrodjvilwckvugfbznyxfpqiamnngeeohunjidybsqkkfcbnjgfafpfebtsivesnadrptaaeflmmxeudtjjpfdatzdptkuoovaacwjlxboofmiuxbndluikqkvywvtplrehvjmpmyysvguvjngwmvhpsisbrvblwfbijtstclcythprxgrulcbqrjeiwapsfzkvcaznsjjnpscuxcvxbmnkdlmvzcjstzkmzllplgguquftifnybfglurojqlbwtpjbdrtxjdnwvaoaiaseqhnviqqqvwumbhkhmokbohvnwtqtjdxpvyycmnkjlwsnytrpqgpaqjkchxqcvhoxmzpwuunplhjdfjsoizqdzaxsfrmorwxcfzkdnhmnrfppderhdjbyvuubygcxolrwycpmfywzgtkipvkhjlfpbrimmvbhmqnkhykuqodietqrmpzqvbveerphlzmlvioaisxpsflrqnqlntgbjxmzyaszqmqbaclcvhkzkstsxdbdrrbdavyicmrsherdzyqiydtweygupjtloofkdvwvrnnnwqutumcfhvukfdcnvbftqdzxgsssxsikrrctxysxdyyqngtlbzxcqxqvzorwnvsizuihvjsdumffrnlijvyaogqniekbcksiyjhnahjtyknmtctwfdeqmsfdcslkroyiomcykburktrviyspejnqcwkqouhazusctosefymaisemkxkusmnxoqmbhufupwwnnuuvocbssooqjjgwdevboazxufngsusawgrooulxikgnzhnakkbmehzpwuapouurfjhybumvkmhmkveyuzycfuxazomdbiuotikzkbwcjzuohoamzefsrzhtaevzoapwnefvpgryhypqnhoigjbrqwmrgpwguvtarjxouibbpprbtbwphbqyyzygkqxfuhzsokzminlqowmtxwovhalmrbambnwguxbaxlhcmrmjxpscamxmanolbpbtjizytwzyupbyvtpnhhpafrvyfhsrxasyfwwueilzvesjzhpfpximyzsfmisahjvnfmczzoyavemdmioahxzvnillqqnkqhmkscyjzxyobycmdybbggandelilupcmioqexssigeemisvasgeyuudbipeilzbylcyvflrkcrmyepcbafiteawzpevlttucfbtqfocmgkdttzgichfrgogfrgsivbacsbvkcuijytagjznxceoqssfkquzpmoefpicwdixofojhxlwzolbkstkdgldgggpsckilubtskrccfugqcerphrkwsnwvfubqvqbspghkbeskrjspunisfnnfzyiymcmjsolaftlyvwmrqqvzkrwtbfazodukuaqbqdvtzjfocolwknadzzghtvsmzjgkxvlmnrcihlqhjsyqtjlimtzjcjaaqdbwaymqvloiolphznhhipzljdjrazcnsuligkizjdrmguatnqyxvjphudxijqlnficqdesmsrzanaxbbnorrxkdjdcuyibwmcbichderwljjqmkslwkwtnztrntpksymfbnwwxxzihslysdbnuavvbrqycvgguxearuyqcqalidudivfkarpsiqyugvepowbkxofqtlzddtispouodfgexaejzjzfjvlngjbyitdwlkldshmfbtocsjuhuqpwzyntdysicpmfgsgwwtyhcvjyzfwfulqalnklgfwekrdcdfratwbmidxtpaadiekdtzhzadchvobyvzxpbladrxyqsfsymfrskixnqqgfoitbagwmtbbtactvwlvacxpayhdlxqgqmlqdsrglkaoclbflmwwquugchxbvtugumlyfyfnqsvdcgpuhitngouhxfyfzwmwefzhtwqkpgrklocwyybclgsadhlbswwsnkftrcazrqnjdyqctctdfhaepcjfxnmbrccauydhxuphutrwawcwvblwwmbqgduyhhapqkejzdyfkorroilgrkchydroagdjcrfjrsmnsqgcfkryebccmwsbiwrtggreycsesmdvvhcawmvzjhebuiblhjbxpcvvxcpxcirwbbtjphrnabqelgfxgfwblolbhhlagaecgbgkjugfgetnwalvmyshpgafmkizljeyrmuhxawknbkpmzepolekeiudtvpxdtoagumziergjxaioyywcgngfzcijyyvmlmojuxbimlgfpcttchmauryjsauwlvocrljhuthcdztjuovuuwprogmttdzmujdshehecoajiouqtgerizovgcvlnizjgznhvzrkjmszwxkveimggmlvwdtxpskrfgqauyggtyerodestjiajlubvfhtzewzbuafhwyibgushgjjaqtovqvirzfedipujfyicevesgljtncifbmzjjtnxsesrzwvdmikgdmykzlzxzbifzmnsxgulyveknsnrlglcowkmsyxxacztqoprseokbcyltybdjfvzijubcmxkqkaseiyjfdzlppcchjdxpvrsqhktmtgsevbptinovjyggbxjcafvydqkrnqactxjerykrzwkwjzdinezwrgbyihowieistxrfnkcrkdbvmfqsuiipkwwgjcnsivynylegmgmwsaqwyujhuxmriqkqjptalaxftptieembahiyftsckddfolcuozmjrygzqrkyfkcqldtwezmtcprfrtmmskvolyczrxckuxqjujpsbferbelyolazkaslxdqvekcjaspiwwkgwgfazodyqhzfkqealzseyjmsfnxnmhgfvdeaucesicikztxaqrdxnnyeiayacnjtwywdaxxnchdfkblovtcykyuyiwrybzopvrfghyovcjoxsmonuylokcndclgfctwfcukvozvuqxhtujjlprbwengyobsdfzpzwxjozdvfppiyavydvyygpwqloiittmwudrlncpbhxwrvvnpxhchxwyxwxctlqoqypmrcvoyvvxrqbjmignuaanhuyqfnikjotlegizzffxgostxopeailregeoqrqqsqqkejnsbrhxwnjvskauizswcolynoprrfiaqdblypemqobbmljpezpeakaxyuuxvknhocwdunrvqwqwojuojnffooxhaznupljaybmnqvmhsxwalimyrwdngqbpqntvvzpepaiyvbuzpmnynlhnhtsdbalwvcyqfgqbnjwepqiyzkehxuokcjiudylqmqlmjowehgzahhumaiosavpcfzhpbzsyzxoehgncvcgzpwhnscfdajxbwelzukasfbnzkheqxsmgltnfszjvpgdolwhupfmvzbfagbfkddevpqgfvdfzbhqrzncwnxtfogowzxkywfvhdxcvuymrnerlxnvyvdncbhtjrrftbxkyqsznpklthhhbnbbdabsefsixnomeqcjhvpkzevoaowfrbxqzebslrkfvbmcyzeamnkcfejdrzipv",
};

module.exports = {
  long_strings,
};
