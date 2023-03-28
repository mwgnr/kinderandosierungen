const zweckTxt = `Diese App ist kein Medizinprodukt und darf nicht für die Therapie, sondern ausschließlich für die ärztliche Ausbildung verwendet werden. Der Autor übernimmt keine Verantwortung und keine daraus folgende oder sonstige Haftung, die auf irgendeine Art aus der Benutzung der enthaltenen Informationen entsteht.`;

// Event listeners
window.addEventListener("load", () => openZweckDlg());
window.addEventListener("click", (e) => (e.target.localName == "dialog" && document.getElementById(e.target.id).close()));
const impressumBtn = document.querySelector(".info");
impressumBtn.addEventListener("click", () => {
    openImpressumDlg();
});
const ageSlider = document.querySelector("#age-slider");
const ageNumber = document.querySelector("#age-number");
[ageSlider, ageNumber].forEach(i => i.addEventListener("input", (e) => {
    calcWeight(e.target.value);
}));
const weightSlider = document.querySelector("#weight-slider");
const weightNumber = document.querySelector("#weight-number");
[weightSlider, weightNumber].forEach(i => i.addEventListener("input", (e) => {
    setWeight(e.target.value);
}));

function openZweckDlg() {
    const zweckDlg = document.querySelector("#zweck-dialog");
    const zweckbestimmung = `<h2>Zweckbestimmung</h2>
        <p align="justify">${zweckTxt}</div>`;
    zweckDlg.innerHTML = zweckbestimmung;
    zweckDlg.showModal();
}

function openImpressumDlg() {
    const impressumDlg = document.querySelector("#impressum-dialog");
    const impressum = `<div align="justify">
      <h4>Zweckbestimmung</h4>
      <p>${zweckTxt}</p>
      <h4>Datenschutzerklärung</h4>
      <p>Diese App verarbeitet keine personenbezogenen Daten (z. B. keine Cookies, keine Logfiles).</p>
      <h4>Autor</h4>
      <p>Dr. Michael von der Heide<br>
        Schillerstr. 56<br>
        22880 Wedel<br>
        04103 9639878<br>
        michael+kinderan@vderheide.de</p>
    </div>`;
    impressumDlg.innerHTML = impressum;
    impressumDlg.showModal();
}

function calcWeight(a) {
    const cWeight = 2 * (Number(a) + 4);
    [ageSlider, ageNumber].forEach(i => i.value = a);
    setWeight(cWeight);
}

function setWeight(w) {
    [weightSlider, weightNumber].forEach(element => element.value = w);
    calcDose();
}

function calcDose() {
    const drugs = [
        {
            "name": "Tubusgröße",
            "phase": "Beatmung",
            "unit": "ID"
        },
        {
            "name": "Tubustiefe [oral]",
            "phase": "Beatmung",
            "unit": "cm"
        },
        {
            "name": "Atemfrequenz",
            "phase": "Beatmung",
            "unit": "/min"
        },
        {
            "hDose": "10",
            "lDose": "6",
            "name": "Atemzugvolumen",
            "phase": "Beatmung",
            "unit": "ml"
        },
        {
            "lDose": 0.4,
            "name": "Midazolam",
            "phase": "Prämedikation",
            "stopDose": 8,
            "unit": "mg"
        },
        {
            "hDose": 4,
            "lDose": 2,
            "name": "Propofol",
            "phase": "Einleitung",
            "unit": "mg"
        },
        {
            "lDose": 30,
            "name": "Remifentanil",
            "phase": "Einleitung",
            "unit": "µg/h"
        },
        {
            "hDose": 1,
            "lDose": 0.5,
            "name": "Sufentanil",
            "phase": "Einleitung",
            "unit": "µg"
        },
        {
            "hDose": 1.2,
            "lDose": 0.6,
            "name": "Rocuronium",
            "phase": "Einleitung",
            "unit": "mg"
        },
        {
            "hDose": 2,
            "lDose": 1.5,
            "name": "Succinylcholin",
            "phase": "Einleitung",
            "unit": "mg"
        },
        {
            "hDose": 10,
            "lDose": 5,
            "name": "Propofol-P",
            "phase": "Aufrechterhaltung",
            "unit": "mg/h"
        },
        {
            "hDose": 18,
            "lDose": 12,
            "name": "Remifentanil-P",
            "phase": "Aufrechterhaltung",
            "unit": "µg/h"
        },
        {
            "lDose": 0.01,
            "name": "Flumazenil",
            "phase": "Antagonisierung",
            "unit": "mg"
        },
        {
            "lDose": 0.01,
            "name": "Naloxon",
            "phase": "Antagonisierung",
            "unit": "mg"
        },
        {
            "lDose": 0.05,
            "name": "Neostigmin",
            "phase": "Antagonisierung",
            "unit": "mg"
        },
        {
            "lDose": 10,
            "name": "Ibuprofen",
            "phase": "Schmerztherapie",
            "unit": "mg"
        },
        {
            "hDose": 20,
            "lDose": 10,
            "name": "Metamizol",
            "phase": "Schmerztherapie",
            "unit": "mg"
        },
        {
            "lDose": 15,
            "name": "Paracetamol",
            "phase": "Schmerztherapie",
            "unit": "mg"
        },
        {
            "hDose": 0.1,
            "lDose": 0.05,
            "name": "Piritramid",
            "phase": "Schmerztherapie",
            "unit": "mg"
        },
        {
            "lDose": 0.15,
            "name": "Dexamethason",
            "phase": "PONV",
            "stopDose": 4,
            "unit": "mg"
        },
        {
            "lDose": 0.1,
            "name": "Ondansetron",
            "phase": "PONV",
            "stopDose": 4,
            "unit": "mg"
        },
        {
            "lDose": 0.5,
            "name": "Dimenhydrinat",
            "phase": "PONV",
            "stopDose": 62,
            "unit": "mg"
        },
        {
            "hDose": 2,
            "lDose": 1,
            "name": "Clonidin",
            "phase": "Aufwachraum-Delir",
            "unit": "µg"
        },
        {
            "hDose": 1,
            "lDose": 0.5,
            "name": "Esketamin",
            "phase": "Aufwachraum-Delir",
            "unit": "mg"
        },
        {
            "hDose": 1,
            "lDose": 0.5,
            "name": "Propofol",
            "phase": "Aufwachraum-Delir",
            "unit": "mg"
        },
        {
            "lDose": 0.01,
            "name": "Adrenalin [CPR]",
            "phase": "Notfall",
            "unit": "mg"
        },
        {
            "lDose": 0.01,
            "name": "Adrenalin i.m. [Anaphylaxie]",
            "phase": "Notfall",
            "stopDose": 0.5,
            "unit": "mg"
        },
        {
            "lDose": 0.5,
            "name": "Adrenalin p.i.",
            "phase": "Notfall",
            "stopDose": 5,
            "unit": "mg"
        },
        {
            "lDose": 5,
            "name": "Amiodaron",
            "phase": "Notfall",
            "unit": "mg"
        },
        {
            "hDose": 0.02,
            "lDose": 0.01,
            "name": "Atropin",
            "phase": "Notfall",
            "unit": "mg"
        },
        {
            "hDose": 60,
            "lDose": 40,
            "name": "Levetiracetam [langsame Gabe]",
            "phase": "Notfall",
            "unit": "mg"
        },
        {
            "lDose": 0.1,
            "name": "Noradrenalin",
            "phase": "Notfall",
            "unit": "µg"
        },
        {
            "hDose": 4,
            "lDose": 2,
            "name": "Prednisolon",
            "phase": "Notfall",
            "unit": "mg"
        },
        {
            "name": "Salbutamol p.i.",
            "phase": "Notfall",
            "unit": "mg"
        },
        {
            "lDose": 2,
            "name": "Esketamin nasal",
            "phase": "Intranasale Applikation",
            "unit": "mg"
        },
        {
            "hDose": 2,
            "lDose": 1,
            "stopDose": 100,
            "name": "Fentanyl nasal",
            "phase": "Intranasale Applikation",
            "unit": "µg"
        },
        {
            "hDose": 0.5,
            "lDose": 0.2,
            "stopDose": 10,
            "name": "Midazolam nasal [brennt]",
            "phase": "Intranasale Applikation",
            "unit": "mg"
        }

    ];
    const rows = drugs.map((drug, index) => {
        const age = Number(ageSlider.value);
        let drugHeader;
        let drugDose;
        let weightLowDose;
        let weightHighDose;
        // Header
        if (index == 0 || drugs[index].phase != drugs[index - 1].phase) {
            drugHeader = `<div class="group-header">${drug.phase}</div>`;
        }
        else {
            drugHeader = ``;
        }
        // Dose
        if (drug.name == "Tubusgr\xF6\xDFe") {
            const tubusGr = (16 + age) / 4;
            drugDose = `<div class="secondary">${(Math.floor(2 * tubusGr) / 2).toFixed(1)}</div>`;
        }
        else if (drug.name == "Tubustiefe [oral]") {
            const tubusT = age / 2 + 12;
            drugDose = `<div class="secondary">${tubusT}</div>`;
        }
        else if (drug.name == "Salbutamol p.i.") {
            if (age > 5) {
                drugDose = `<div class="secondary">5</div>`;
            }
            else {
                drugDose = `<div class="secondary">2.5</div>`;
            }
        }
        else if (drug.name == "Atemfrequenz") {
            if (age >= 5) {
                drugDose = `<div class="secondary">15 - 20</div>`;
            }
            else {
                drugDose = `<div class="secondary">20 - 30</div>`;
            }
        }
        else {
            weightLowDose = parseFloat((weightSlider.value * drug.lDose).toFixed(1));
            if (weightLowDose > drug.stopDose) {
                weightLowDose = drug.stopDose;
            }
            if (drug.hDose) {
                weightHighDose = parseFloat((weightSlider.value * drug.hDose).toFixed(1));
                if (weightHighDose > drug.stopDose) {
                    weightHighDose = drug.stopDose;
                }
            }
            if (typeof weightHighDose === "undefined") {
                drugDose = `<div class="secondary">${weightLowDose}</div>`;
            }
            else {
                drugDose = `<div class="secondary">${weightLowDose} - ${weightHighDose}</div>`;
            }
        }
        return drugHeader + `<div class="group-item"><div>${drug.name} (${drug.unit})</div>` + drugDose + `</div>`;
    });
    const drugsList = document.querySelector('#drugs');
    drugsList.innerHTML = rows.join('');
}
calcDose();
