function convertSolrFacetToObject(solr_facet){
    var obj = { },ret = {}
    const isEven = function (n) {
        return n % 2 == 0;
    }

    solr_facet.forEach(function(value,index) {
        if(!obj[index]){
            obj[index] = {}
        }
        if(isEven(index)){   
            obj[index]["key"] = value
        }else{
            obj[(index-1)]["value"] = value
        }
    })
    Object.keys(obj).forEach(function(i) {
        ret[obj[i].key] = obj[i].value
    })
    return ret;
    
}


function languageCodeToLanguage(lang){
    const languages = {
        "de":"Deutsch / German","en":"English","es":"Español / Spanish","fr":"Français / French","hr":"Hrvatski / Croatian","it":"Italiano / Italian","nl":"Nederlands / Dutch","pl":"Polski / Polish","pt":"Português / Portuguese","vi":"Tiếng Việt / Vietnamese","tr":"Türkçe / Turkish","ru":"русский / Russian","ar":"العربية / Arabic","th":"ไทย / Thai","ko":"한국어 / Korean","zh-CN":"中文 (简体) / Chinese","zh":"中文 (繁體) / Chinese","ja":"日本語 / Japanese","ach":"Acoli","af":"Afrikaans","ak":"Akan","az":"Azərbaycan","ban":"Balinese","bs":"Bosanski","br":"Brezhoneg","ca":"Català / Catalan","ceb":"Cebuano / Cebuan","cs":"čeština / Czech","sn":"chiShona","co":"Corsican","cy":"Cymraeg / Welsh","da":"Dansk / Danish","yo":"Èdè Yorùbá","et":"Eesti / Estonian","eo":"Esperanto","eu":"Euskara","ee":"Eʋegbe","tl":"Filipino","fo":"Føroyskt","fy":"Frysk / Frisian","gaa":"Ga","ga":"Gaeilge / Irish Gaelic","gd":"Gàidhlig / Scottish Gaelic","gl":"Galego","gn":"Guarani","ht":"Haitian Creole","ha":"Hausa","haw":"ʻŌlelo Hawaiʻi","bem":"Ichibemba","ig":"Igbo","rn":"Ikirundi","id":"Indonesian","ia":"Interlingua","zu":"isiZulu","is":"íslenska","jw":"Javanese","rw":"Kinyarwanda","sw":"Kiswahili","tlh":"Klingon","kg":"Kongo","mfe":"kreol morisien","kri":"Krio (Sierra Leone)","la":"Latin","lv":"Latviešu / Latvian","to":"lea fakatonga","lt":"Lietuvių / Lithuanian","ln":"lingála","loz":"Lozi","lua":"Luba-Lulua","lg":"Luganda","hu":"magyar","mg":"Malagasy","mt":"Malti","mi":"Maori","ms":"Melayu","pcm":"Nigerian Pidgin","no":"Norsk / Norwegian","nso":"Northern Sotho","ny":"Nyanja","nn":"nynorsk","uz":"o‘zbek","oc":"Occitan","om":"Oromoo","xx-pirate":"Pirate","pt":"português / Portuguese","ro":"Română / Romanian","mo":"română (Republica Moldova)","rm":"rumantsch","qu":"Runasimi","nyn":"Runyankore","crs":"Seychellois Creole","sq":"shqip","sd":"Sindhi","sk":"slovenčina","sl":"Slovenščina / Slovenian","so":"Soomaali","st":"Southern Sotho","sr-ME":"srpski (Crna Gora)","sr-Latn":"srpski (latinica)","su":"Sundanese","fi":"Suomi / Finnish","sv":"Svenska / Swedish","tn":"Tswana","tum":"Tumbuka","tk":"Turkmen","tw":"Twi","wo":"Wolof","xh":"Xhosa","el":"Ελληνικά / Greek","be":"беларуская / Belarusian","bg":"български / Bulgarian","ky":"кыргызча / Kyrgyz","kk":"қазақ тілі","mk":"македонски / Macedonian","mn":"монгол / Mongolian","sr":"српски / Serbian","tt":"татар / Tatar","tg":"тоҷикӣ / Tajik","uk":"українська / Ukranian ","ka":"ქართული / Georgian","hy":"հայերեն / Armenian","yi":"ייִדיש / Yiddish","iw":"עברית / Hebrew","ug":"ئۇيغۇرچە / Uyghur","ur":"اردو / Urdu","ps":"پښتو / Pashto","fa":"فارسی / Persian","ckb":"کوردیی ناوەندی / Kurdish","ti":"ትግርኛ / Tigrinya","am":"አማርኛ / Amharic","ne":"नेपाली / Nepali","mr":"मराठी / Marathi","hi":"हिन्दी / Hindi","bn":"বাংলা / Bengali","pa":"ਪੰਜਾਬੀ","gu":"ગુજરાતી / Gujarati","or":"ଓଡ଼ିଆ / Odia","ta":"தமிழ் / Tamil","te":"తెలుగు / Telugu","kn":"ಕನ್ನಡ / Kannada","ml":"മലയാളം / Malayalam","si":"සිංහල / Sinhalese","lo":"ລາວ / Lao","my":"မြန်မာ / Burmese","km":"ខ្មែរ / Khmer","chr":"ᏣᎳᎩ / Cherokee"
    }
    return languages[lang]
}

