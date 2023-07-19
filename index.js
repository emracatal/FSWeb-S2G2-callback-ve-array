const { fifaData } = require("./fifa.js");

/*{
	"Year": 1930,
	"Datetime": "13 Jul 1930 - 15:00",
	"Stage": "Group 1",
	"Stadium": "Pocitos",
	"City": "Montevideo",
	"Home Team Name": "France",
	"Home Team Goals": 4,
	"Away Team Goals": 1,
	"Away Team Name": "Mexico",
	"Win conditions": "",
	"Attendance": 4444,
	"Half-time Home Goals": 3,
	"Half-time Away Goals": 0,
	"Referee": "LOMBARDI Domingo (URU)",
	"Assistant 1": "CRISTOPHE Henry (BEL)",
	"Assistant 2": "REGO Gilberto (BRA)",
	"RoundID": 201,
	"MatchID": 1096,
	"Home Team Initials": "FRA",
	"Away Team Initials": "MEX"
  },
  */

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

const fifa2014 = fifaData.filter((mac) => {
  return mac.Year === 2014 && mac.Stage === "Final";
});
//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

console.log(fifa2014[0]["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

console.log(fifa2014[0]["Away Team Name"]);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

console.log(fifa2014[0]["Home Team Goals"]);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

console.log(fifa2014[0]["Away Team Goals"]);

//(e) 2014 Dünya kupası finali kazananı*/

if (fifa2014[0]["Home Team Goals"] > fifa2014[0]["Away Team Goals"]) {
  console.log(fifa2014[0]["Home Team Name"]);
} else {
  console.log(fifa2014[0]["Away Team Name"]);
}

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(fifaDizisi) {
  return fifaDizisi.filter((mac) => mac["Stage"] === "Final");
}
console.log("görev2", Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaDataDizisi, finCB) {
  const finalMaclar = finCB(fifaDataDizisi);
  console.log(finalMaclar.length);
  const yillarDizisi = finalMaclar.map((mac) => {
    console.log(mac["Year"]);
    return mac.Year;
  });
  return yillarDizisi;
}
console.log("görev3", Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

/* function Kazananlar(fifaDataDizisi, callbackFn) {
	const finalMaclar = callbackFn(fifaDataDizisi);

	const kazananlar = finalMaclar.map((mac) => {
		console.log(mac["Home Team Goals"], mac["Away Team Goals"]);
		if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
			return mac["Home Team Name"];
		} else {
			return mac["Away Team Name"];
		}
	})

	return kazananlar;

}
console.log("görev4:", Kazananlar(fifaData, Finaller)); */

function Kazananlar(dizi, finallerCB) {
  const finalMaclar = finallerCB(dizi);
  const kazananlar = finalMaclar.map((x) => {
    console.log(x["Home Team Goals"]), console.log(x["Away Team Goals"]);
    if (x["Home Team Goals"] > x["Away Team Goals"]) {
      return x["Home Team Name"];
    } else {
      return x["Away Team Name"];
    }
  });
  return kazananlar;
}
console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(dizi, finallerCB, yillarCB, kazananlarCB) {
  const finalMaclar = finallerCB(dizi);
  const yillar = yillarCB(finalMaclar, finallerCB);
  const kazananlar = kazananlarCB(finalMaclar, finallerCB);
  const sonucMetin = finalMaclar.map((mac, index) => {
    console.log(mac, index);
    return `${yillar[index]} yılında, ${kazananlar[index]} dünya kupasını kazandı!`;
  });
  return sonucMetin;
}
console.log(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
		Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
		1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
		
		💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
		
		2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
		
		3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
		
		💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
		
	*/

function OrtalamaGolSayisi(finallerCB) {
  const macBasiGol = finallerCB.map((mac) => {
    return mac["Home Team Goals"] + mac["Away Team Goals"];
  });

  const toplamGol = macBasiGol.reduce((toplam, macGol) => {
    return toplam + macGol;
  }, 0);
  return (toplamGol / macBasiGol.length).toFixed(2);
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)));
/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
		`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
		
		İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
	İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(dizi, initial) {
  const finaller = dizi.filter((f) => f.Stage === "Final");
  console.log(finaller);
  const kazananlar = finaller.map((x) => {
    if (x["Home Team Goals"] > x["Away Team Goals"]) {
      return x["Home Team Initials"];
    } else {
      return x["Away Team Initials"];
    }
  });
  console.log("kazananlardizi", kazananlar);
  /* const kazanmaSayisi = kazananlar.reduce((toplam, mac) => {
    if (mac === initial) {
      return toplam + 1;
    } else {
      return toplam;
    }
  }, 0);

  return kazanmaSayisi;
} */

  const kazanmaSayisi = kazananlar.filter((x) => x === initial).length;
  return kazanmaSayisi;
}
console.log(
  "UlkelerinKazanmaSayilari İTALYA",
  UlkelerinKazanmaSayilari(fifaData, "ITA")
);
/*  BONUS 2:  
	EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(dizi) {
  const finalMacGolleri = dizi
    .filter((x) => x.Stage === "Final")
    .map((x) => {
      return {
        [x["Home Team Initials"]]: x["Home Team Goals"],
        [x["Away Team Initials"]]: x["Away Team Goals"],
      };
    });
  console.log("finalMacGolleri", finalMacGolleri, "finalMacGolleri bitti");
}
console.log("BİTİREMEDİM ÇÜNKÜ ETÜTTE DE ANLAMADIM", EnCokGolAtan(fifaData));

/*  BONUS 3: 
	EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans() {}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
