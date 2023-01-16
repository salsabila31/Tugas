zodiak(1, 10);

function zodiak(bln, tgl) {
    let hasil = "salah";
    if (bln >0 && bln <13 && tgl >0 && tgl <32) {
        hasil = "zodiak belum dibuat";
        if (bln == 1) {
            hasil = "capricorn";
            if (tgl >19 ) {
                hasil = "aquarius";
            }
        }
        
        if (bln == 2) {
            hasil = "aquarius";
            if (tgl >18 && tgl <20) {
                hasil = "pisces";
            }
        }
        if (bln == 3) {
            hasil = "pisces";
            if (tgl >20 && tgl <19) {
                hasil = "aries";
            }
        }
        if (bln == 4) {
            hasil = "aries";
            if (tgl >19 && tgl <20) {
                hasil = "taurus";
            }
        }
        if (bln == 5) {
            hasil = "taurus";
            if (tgl >20 && tgl <20) {
                hasil = "gemini";
            }
        }
        if (bln == 6) {
            hasil = "gemini";
            if (tgl >20 && tgl <22) {
                hasil = "cancer";
            }
        }
        if (bln == 7) {
            hasil = "cancer";
            if (tgl >22 && tgl <22) {
                hasil = "leo";
            }
        }if (bln == 8) {
            hasil = "leo";
            if (tgl >22 && tgl <22) {
                hasil = "virgo";
            }
        }
        if (bln == 9) {
            hasil = "virgo";
            if (tgl >22 && tgl <22) {
                hasil = "libra";
            }
        }
        if (bln == 10) {
            hasil = "libra";
            if (tgl >22 && tgl <21) {
                hasil = "scorpio";
            }
        }
        if (bln == 11) {
            hasil = "scorpio";
            if (tgl >21 && tgl <21) {
                hasil = "sagittarius";
            }
        }
        if (bln == 12) {
            hasil = "sagittarius";
            if (tgl >21 && tgl <19) {
                hasil = "capricorn";
            }
        }
    }
    console.log(hasil);
}

lulus(75);
function lulus(angka) {
    let hasil = "Nilai tidak valid";
    if (angka >0 && angka <=100) {
        
    }
    if (angka >=75 ) {
        hasil = "Anda lulus";
    }
    else {
        hasil = "Anda tidak lulus"
    }
    console.log(hasil);
}

console.log(terbilang(587600));
function terbilang(angka) {
    var huruf = [" ", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];

    if (angka < 12) {
        return huruf[angka];
    } 
    else if (angka <20) {
        return terbilang(angka-10)+" belas ";
    }
    else if (angka <100) {
        return terbilang(Math.floor((angka)/10))+" puluh "+terbilang((angka)%10);
    }
    else if (angka <200) {
        return "seratus"+terbilang((angka)-100);
    }
    else if (angka <1000) {
        return terbilang(Math.floor((angka)/100))+" ratus "+terbilang((angka)%100);
    }
    else if (angka <2000) {
        return "seribu"+terbilang((angka)-1000);
    }
    else if (angka <10000) {
        return terbilang(Math.floor((angka)/1000))+" ribu "+terbilang((angka)%1000);
    }
    else if (angka <1000000) {
        return terbilang(Math.floor((angka)/10000))+" juta "+terbilang((angka)%10000);
    }
    else if (angka <1000000000) {
        return terbilang(Math.floor((angka)/100000))+" milyar "+terbilang((angka)%1000000);
    }
    else if (angka <1000000000000) {
        return terbilang(Math.floor((angka)/1000000))+" triliun "+terbilang((angka)%1000000000);
    }
}

console.log(prima(9));
function prima(bilangan) {
    let pembagi = 0;
    for (let i = 1; i <= bilangan; i++) {
        if (bilangan%i == 0) {
            pembagi++
        }
    }
    if (pembagi == 2) {
        return "prima";
    }
    else{
        return "bukan prima";
    }
}