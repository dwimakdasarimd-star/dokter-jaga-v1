'use client'

import { useState } from 'react'

const cases = [
  {
    id: 1, title: 'STEMI Anterior', category: 'Cardiovascular',
    vignette: 'Laki-laki 58 tahun datang dengan nyeri dada sejak 90 menit sebelum masuk IGD. Nyeri seperti tertindih benda berat di tengah dada, intensitas 9/10, tidak membaik dengan istirahat, menjalar ke lengan kiri dan rahang, disertai keringat dingin, mual, dan lemas. Keluhan muncul saat menaiki tangga. Pasien memiliki hipertensi 10 tahun yang tidak terkontrol dan merokok 1 bungkus/hari selama 30 tahun. Obat rutin amlodipine tetapi sering lupa. Tidak ada riwayat alergi obat.',
    vitals: 'TD 158/94 mmHg · HR 104/menit · RR 24/menit · SpO₂ 95% RA · GCS 15',
    exam: 'Tampak sakit dan diaphoresis. JVP tidak meningkat. Jantung reguler tanpa murmur. Paru vesikuler tanpa crackles. Ekstremitas hangat tanpa edema.',
    tests: 'ECG: ST elevation V1–V4 dengan reciprocal ST depression inferior. hs-troponin meningkat.',
    diagnosis: 'Acute anterior STEMI',
    ddx: 'Aortic dissection · pulmonary embolism · acute pericarditis · pneumothorax · esophageal rupture',
    approach: 'ABCDE, cardiac monitor, IV access, ECG ≤10 menit, evaluasi kontraindikasi antiplatelet/antikoagulasi/fibrinolisis, dan aktifkan pathway reperfusi. Jangan menunggu troponin bila ECG sudah diagnostik.',
    treatment: 'Aspirin loading 162–325 mg kunyah; P2Y12 inhibitor dan antikoagulan sesuai strategi reperfusi. Primary PCI adalah pilihan utama bila dapat dilakukan tepat waktu. Fibrinolisis dipertimbangkan bila PCI tidak dapat dilakukan tepat waktu dan pasien memenuhi kriteria. Oksigen tidak rutin bila SpO₂ adekuat. Nitrat dapat digunakan bila sesuai dan tidak ada hipotensi, RV infarction, atau penggunaan PDE-5 inhibitor.',
    disposition: 'Cath lab → CCU/ICU', redflags: 'Syok kardiogenik · edema paru · VT/VF · murmur baru'
  },
  {
    id: 2, title: 'Acute Pulmonary Edema', category: 'Cardiovascular',
    vignette: 'Perempuan 72 tahun dengan hipertensi dan gagal jantung datang karena sesak berat mendadak sejak 2 jam. Pasien tidak dapat berbaring, terbangun malam karena sesak, dan batuk dengan sputum berbusa. Ia mengatakan belum minum obat antihipertensi selama 3 hari.',
    vitals: 'TD 210/120 mmHg · HR 126/menit · RR 34/menit · SpO₂ 76% RA · GCS 15',
    exam: 'Distress respirasi berat, diaphoresis, JVP meningkat, crackles bilateral sampai lapang paru tengah, edema tungkai minimal.',
    tests: 'ECG menunjukkan sinus tachycardia dan tanda hipertrofi ventrikel kiri. CXR: bilateral pulmonary edema.',
    diagnosis: 'Acute cardiogenic pulmonary edema with hypertensive emergency', ddx: 'Pneumonia · COPD/asthma exacerbation · pulmonary embolism · ACS',
    approach: 'ABCDE, posisi duduk, monitor ECG/BP/SpO₂, IV access, ECG, CXR, dan cari precipitant seperti ACS, aritmia, infeksi, atau medication non-adherence.',
    treatment: 'Oksigen bila hipoksemia. NIV/CPAP segera pada respiratory distress bila tidak ada kontraindikasi. Nitrat IV terutama pada hipertensi berat. Diuretik loop IV bila terdapat kongesti/volume overload. Terapi penyebab.',
    disposition: 'ICU/monitored bed bila respiratory failure atau instabilitas', redflags: 'Exhaustion · altered consciousness · persistent hypoxemia · hypotension'
  },
  {
    id: 3, title: 'Severe Asthma Exacerbation', category: 'Respiratory',
    vignette: 'Perempuan 24 tahun dengan asma sejak kecil datang karena sesak progresif setelah terpapar asap rokok. Ia sudah menggunakan salbutamol inhaler berulang kali selama 4 jam tetapi hanya membaik sementara. Saat masuk, pasien sulit menyelesaikan satu kalimat dan tampak sangat lelah.',
    vitals: 'TD 132/78 mmHg · HR 132/menit · RR 34/menit · SpO₂ 88% RA · GCS 15',
    exam: 'Wheezing difus, accessory muscle use, prolonged expiration, kemampuan bicara sangat terbatas. PEF sekitar 30% predicted bila dapat dilakukan.',
    tests: 'ABG menunjukkan hipoksemia. PaCO₂ yang normal/meningkat pada pasien dengan serangan berat merupakan tanda mengkhawatirkan.',
    diagnosis: 'Acute severe/life-threatening asthma exacerbation', ddx: 'Anaphylaxis · pneumothorax · pulmonary edema · foreign body',
    approach: 'Nilai kemampuan bicara, respiratory effort, SpO₂, PEF bila memungkinkan, mental status, dan tanda fatigue/silent chest. Monitor kontinu.',
    treatment: 'Oksigen titrasi, nebulized salbutamol berulang/continuous sesuai protokol, tambahkan ipratropium pada serangan berat, dan berikan kortikosteroid sistemik dini. MgSO₄ IV dapat dipertimbangkan pada serangan berat yang tidak responsif. Siapkan airway management bila fatigue, altered consciousness, atau impending respiratory arrest.',
    disposition: 'Observasi ketat/ICU sesuai respons', redflags: 'Silent chest · exhaustion · confusion · rising PaCO₂ · cyanosis'
  },
  {
    id: 4, title: 'COPD Exacerbation', category: 'Respiratory',
    vignette: 'Laki-laki 68 tahun, perokok 40 pack-years dengan COPD, datang karena sesak memburuk sejak 3 hari. Sputum menjadi lebih banyak dan berwarna kuning kehijauan. Ia menggunakan inhaler rutin tetapi sejak kemarin semakin sulit berjalan ke kamar mandi karena sesak.',
    vitals: 'TD 138/82 mmHg · HR 112/menit · RR 30/menit · SpO₂ 82% RA · GCS 15',
    exam: 'Penggunaan accessory muscles, wheezing bilateral, ekspirasi memanjang, suara napas menurun difus. Tidak ada tanda unilateral pneumothorax.',
    tests: 'ABG: hypercapnia dengan respiratory acidosis. CXR tanpa pneumotoraks; dapat menunjukkan hiperinflasi.',
    diagnosis: 'Acute exacerbation of COPD with acute hypercapnic respiratory failure', ddx: 'Pneumonia · pulmonary edema · pulmonary embolism · pneumothorax · ACS',
    approach: 'ABCDE, monitor, oxygen terkontrol, ABG, ECG, CXR, CBC/electrolytes, dan cari precipitant.',
    treatment: 'Oksigen dengan target umumnya 88–92% pada pasien berisiko hiperkapnia. Short-acting bronchodilator ± ipratropium, kortikosteroid sistemik, antibiotik bila ada indikasi klinis. NIV merupakan terapi utama pada acute hypercapnic respiratory failure dengan respiratory acidosis bila tidak kontraindikasi.',
    disposition: 'Admit; ICU bila NIV gagal atau deteriorasi', redflags: 'Worsening acidosis · inability to protect airway · reduced consciousness · NIV failure'
  },
  {
    id: 5, title: 'Anaphylaxis', category: 'Toxicology',
    vignette: 'Perempuan 27 tahun datang 10 menit setelah makan udang. Muncul gatal seluruh tubuh, urtikaria, bibir dan lidah membengkak, suara serak, tenggorokan terasa menyempit, serta sesak. Ia pernah mengalami gatal setelah seafood tetapi belum pernah sesak.',
    vitals: 'TD 78/46 mmHg · HR 128/menit · RR 30/menit · SpO₂ 89% RA · GCS 15',
    exam: 'Edema bibir/lidah, hoarseness, generalized urticaria, wheezing bilateral, CRT memanjang, ekstremitas dingin.',
    tests: 'Diagnosis klinis; jangan menunggu pemeriksaan laboratorium untuk terapi.',
    diagnosis: 'Anaphylaxis with airway, respiratory and circulatory compromise', ddx: 'Acute severe asthma · angioedema · vasovagal reaction · panic attack',
    approach: 'ABCDE, panggil bantuan, posisi sesuai kondisi hemodinamik, monitor ECG/BP/SpO₂, siapkan airway dini karena edema dapat progresif.',
    treatment: 'Epinephrine IM 0,01 mg/kg menggunakan konsentrasi 1 mg/mL, maksimum dewasa umumnya 0,5 mg/dosis, di anterolateral thigh; ulang setiap 5–15 menit bila perlu. Oksigen, IV crystalloid bila hipotensi, bronchodilator untuk bronchospasm. Antihistamin dan kortikosteroid hanya adjunctive, bukan pengganti epinephrine.',
    disposition: 'Observasi/admission sesuai keparahan dan respons', redflags: 'Progressive airway edema · refractory hypotension · recurrent/biphasic symptoms'
  },
  {
    id: 6, title: 'Septic Shock', category: 'Infectious',
    vignette: 'Laki-laki 64 tahun dengan diabetes datang demam, menggigil, batuk produktif, dan penurunan kesadaran sejak pagi. Sejak 2 hari sebelumnya mengalami demam dan sputum purulen. Keluarga mengatakan pasien tampak sangat lemah sejak beberapa jam terakhir.',
    vitals: 'TD 78/45 mmHg · HR 125/menit · RR 30/menit · SpO₂ 91% RA · T 39,2°C · GCS 13',
    exam: 'Tampak toksik, confused, crackles basal kanan, CRT memanjang, ekstremitas dingin.',
    tests: 'Lactate meningkat. Leukositosis. CXR menunjukkan infiltrat lobus bawah kanan. Blood cultures diambil.',
    diagnosis: 'Septic shock secondary to severe pneumonia', ddx: 'Cardiogenic shock · obstructive shock · hypovolemic shock',
    approach: 'ABCDE, lactate, cultures, CBC/renal/liver/electrolytes, imaging source, dan evaluasi perfusi serial.',
    treatment: 'Antibiotik IV segera sesuai sumber dan local antibiogram. IV crystalloid dengan reassessment respons. Bila hipotensi menetap, norepinephrine sebagai vasopressor pilihan utama dengan target MAP awal sekitar 65 mmHg. Source control sedini mungkin.',
    disposition: 'ICU', redflags: 'Persistent shock · rising lactate · oliguria · altered consciousness · respiratory failure'
  },
  {
    id: 7, title: 'Status Epilepticus', category: 'Neurology',
    vignette: 'Laki-laki 35 tahun dibawa karena kejang tonik-klonik general selama sekitar 8 menit. Menurut keluarga, pasien tidak pernah kembali sadar sejak kejang dimulai. Riwayat epilepsi ada tetapi pasien berhenti minum obat antikejang 2 minggu lalu.',
    vitals: 'TD 150/90 mmHg · HR 128/menit · RR 28/menit · SpO₂ 86% RA · GCS E1V1M2',
    exam: 'Kejang masih berlangsung, sekret oral banyak, tidak ada trauma kepala yang jelas.',
    tests: 'Bedside glucose segera; elektrolit, Ca, Mg, renal function, toxicology, dan level obat bila relevan.',
    diagnosis: 'Convulsive status epilepticus', ddx: 'Hypoglycemia · intracranial hemorrhage · meningitis/encephalitis · toxin',
    approach: 'ABCDE, suction, oxygenation, glucose, IV/IO access, cardiac monitoring. Jangan menunggu CT sebelum menghentikan kejang.',
    treatment: 'Benzodiazepine first-line: lorazepam IV bila tersedia, atau diazepam IV, atau midazolam IM/intranasal bila akses IV sulit. Bila berlanjut, berikan levetiracetam, fosphenytoin/phenytoin, atau valproate sesuai konteks. Refractory status → ICU, anesthetic therapy, dan airway management.',
    disposition: 'ICU', redflags: 'Persistent seizure · hypoxia · hyperthermia · acidosis · failure of second-line therapy'
  },
  {
    id: 8, title: 'Acute Ischemic Stroke', category: 'Neurology',
    vignette: 'Laki-laki 65 tahun tiba 90 menit setelah tiba-tiba mengalami kelemahan lengan dan tungkai kanan serta sulit berbicara saat sedang sarapan. Keluarga menyatakan pasien terakhir terlihat normal 90 menit sebelumnya. Riwayat hipertensi dan fibrilasi atrium; pasien tidak rutin mengonsumsi antikoagulan.',
    vitals: 'TD 178/96 mmHg · HR 96/menit irregular · RR 18/menit · SpO₂ 97% RA · GCS 14',
    exam: 'Aphasia, facial droop kanan, hemiparesis kanan, pupil isokor.',
    tests: 'Bedside glucose normal. CT brain non-contrast tidak menunjukkan perdarahan. CTA menunjukkan occlusion pembuluh besar bila dilakukan.',
    diagnosis: 'Acute ischemic stroke', ddx: 'Intracranial hemorrhage · hypoglycemia · seizure with Todd paralysis · brain tumor',
    approach: 'Tentukan last-known-well, ABCDE, glucose, NIHSS, CT brain segera, CTA/CTP sesuai indikasi dan evaluasi eligibility reperfusion.',
    treatment: 'Jika memenuhi kriteria, IV thrombolysis dalam therapeutic window yang sesuai. Large-vessel occlusion yang memenuhi kriteria → mechanical thrombectomy. Aspirin setelah hemorrhage disingkirkan dan sesuai timing/protokol. Hindari penurunan tekanan darah agresif tanpa indikasi.',
    disposition: 'Stroke unit/ICU sesuai kondisi', redflags: 'Reduced consciousness · malignant edema · recurrent neurologic deterioration'
  },
  {
    id: 9, title: 'Intracranial Hemorrhage', category: 'Neurology',
    vignette: 'Perempuan 61 tahun dengan hipertensi tidak terkontrol mengalami sakit kepala sangat hebat yang muncul tiba-tiba disertai muntah dan penurunan kesadaran. Keluarga mengatakan pasien mengeluh sakit kepala hebat sekitar 30 menit sebelum ditemukan mengantuk.',
    vitals: 'TD 220/120 mmHg · HR 58/menit · RR 12/menit · SpO₂ 95% RA · GCS 9',
    exam: 'Somnolen, pupil kanan 4 mm dan kiri 3 mm, respons melambat. Tidak ada trauma.',
    tests: 'CT brain non-contrast menunjukkan intracerebral hemorrhage.',
    diagnosis: 'Acute intracranial hemorrhage', ddx: 'Ischemic stroke · subarachnoid hemorrhage · brain tumor with hemorrhage · traumatic hemorrhage',
    approach: 'ABCDE, GCS/pupil serial, glucose, CT non-contrast segera, CBC/coagulation/renal function, review anticoagulants.',
    treatment: 'Airway protection bila diperlukan, kontrol tekanan darah secara terukur, reversal anticoagulation bila relevan, management raised ICP sesuai indikasi, dan konsultasi neurosurgery/neurocritical care.',
    disposition: 'Neuro-ICU/ICU', redflags: 'Herniation signs · falling GCS · anisocoria · refractory hypertension'
  },
  {
    id: 10, title: 'Tension Pneumothorax', category: 'Trauma',
    vignette: 'Laki-laki 29 tahun mengalami kecelakaan sepeda motor 20 menit lalu dengan benturan dada kanan. Saat tiba ia sangat sesak dan hanya mampu berbicara beberapa kata. Kondisi memburuk cepat selama perjalanan.',
    vitals: 'TD 78/48 mmHg · HR 138/menit · RR 36/menit · SpO₂ 82% RA · GCS 15',
    exam: 'Ekspansi hemithorax kanan sangat berkurang, breath sound kanan menghilang, perkusi hipersonor, trakea terdorong ke kiri, JVP meningkat.',
    tests: 'Diagnosis klinis pada pasien tidak stabil; jangan menunda dekompresi untuk CXR.',
    diagnosis: 'Right-sided tension pneumothorax causing obstructive shock', ddx: 'Massive hemothorax · cardiac tamponade · simple pneumothorax · pulmonary contusion',
    approach: 'ABCDE trauma dan immediate decompression bila gambaran klinis konsisten.',
    treatment: 'Oksigen dan immediate thoracic decompression dengan teknik sesuai protokol/kompetensi, kemudian tube thoracostomy. Reassess BP, HR, SpO₂ dan respiratory effort.',
    disposition: 'Trauma surgery/ICU sesuai kondisi', redflags: 'Persistent shock after decompression → cari massive hemothorax/tamponade/ongoing bleeding'
  },
  {
    id: 11, title: 'Massive Pulmonary Embolism', category: 'Cardiovascular',
    vignette: 'Perempuan 56 tahun hari ke-5 setelah operasi panggul tiba-tiba mengalami sesak berat, nyeri dada, dan sinkop. Saat tiba ia sangat pucat dan berkeringat. Tidak ada riwayat asma atau COPD.',
    vitals: 'TD 72/44 mmHg · HR 132/menit · RR 34/menit · SpO₂ 84% RA · GCS 14',
    exam: 'JVP meningkat, paru relatif bersih, takikardia, tungkai kiri sedikit bengkak dan nyeri.',
    tests: 'ECG sinus tachycardia. Bedside echo menunjukkan RV dilation/strain. Pada pasien stabil, CTPA menjadi imaging utama.',
    diagnosis: 'High-risk/massive pulmonary embolism with obstructive shock', ddx: 'ACS · tension pneumothorax · cardiac tamponade · aortic dissection',
    approach: 'ABCDE, oxygenation, ECG, bedside echo, assess hemodynamic stability. D-dimer tidak membantu pada pasien high probability dengan shock.',
    treatment: 'Anticoagulation bila tidak kontraindikasi. Pada high-risk PE dengan shock dan memenuhi kriteria → systemic thrombolysis. Catheter-directed therapy atau surgical embolectomy dapat dipertimbangkan bila sesuai/tersedia. Vasopressor untuk shock bila diperlukan.',
    disposition: 'ICU', redflags: 'Refractory shock · cardiac arrest · severe RV failure'
  },
  {
    id: 12, title: 'Upper GI Bleeding', category: 'Gastrointestinal',
    vignette: 'Laki-laki 60 tahun datang setelah dua kali muntah darah berwarna merah gelap dan BAB hitam sejak pagi. Ia memiliki riwayat penggunaan NSAID hampir setiap hari untuk nyeri lutut. Sejak satu jam terakhir pasien pusing saat berdiri dan sangat lemas.',
    vitals: 'TD 85/55 mmHg · HR 124/menit · RR 24/menit · SpO₂ 96% RA · GCS 15',
    exam: 'Pucat, kulit dingin, CRT memanjang, abdomen relatif lunak tanpa peritoneal signs.',
    tests: 'Hb rendah, BUN meningkat. Type and crossmatch dilakukan. Evaluasi koagulasi.',
    diagnosis: 'Acute upper GI bleeding with hemorrhagic shock', ddx: 'Variceal bleeding · Mallory-Weiss tear · lower GI bleeding · aortoenteric fistula',
    approach: 'ABCDE, dua large-bore IV, resuscitation, CBC/coagulation/renal function, type and crossmatch, risk stratification, dan urgent endoscopy setelah stabilisasi.',
    treatment: 'Resusitasi terukur dengan crystalloid, transfusi sesuai clinical status dan threshold yang berlaku, IV PPI bila non-variceal bleeding dicurigai, urgent endoscopy. Bila variceal bleeding dicurigai → vasoactive agent + antibiotic prophylaxis + urgent endoscopic therapy.',
    disposition: 'Admit/ICU bila unstable', redflags: 'Ongoing hematemesis · shock · altered mental status · massive transfusion requirement'
  },
  {
    id: 13, title: 'GI Perforation', category: 'Surgical',
    vignette: 'Laki-laki 47 tahun datang dengan nyeri perut sangat hebat yang muncul tiba-tiba 6 jam lalu. Nyeri awalnya epigastrium kemudian menjadi seluruh abdomen. Pasien memiliki riwayat dispepsia dan sering menggunakan NSAID tanpa resep. Sejak 2 jam terakhir mengalami demam dan lemas.',
    vitals: 'TD 92/58 mmHg · HR 120/menit · RR 28/menit · SpO₂ 95% RA · T 38,7°C',
    exam: 'Abdomen rigid, diffuse guarding dan rebound tenderness. Bising usus menurun.',
    tests: 'Lactate meningkat. CT abdomen bila cukup stabil menunjukkan free intraperitoneal air dan cairan.',
    diagnosis: 'Perforated viscus with peritonitis and sepsis', ddx: 'Acute pancreatitis · mesenteric ischemia · bowel obstruction · ruptured AAA',
    approach: 'ABCDE, NPO, IV access, labs/lactate, imaging bila stabil, early surgical consultation dan jangan menunda source control.',
    treatment: 'IV crystalloid dengan reassessment, broad-spectrum IV antibiotics, analgesia, gastric decompression bila diperlukan, dan emergency surgical source control sesuai penyebab.',
    disposition: 'Emergency surgery/ICU', redflags: 'Shock · worsening lactate · generalized peritonitis · organ dysfunction'
  },
  {
    id: 14, title: 'Acute Aortic Dissection', category: 'Cardiovascular',
    vignette: 'Laki-laki 55 tahun dengan hipertensi mengalami nyeri dada sangat hebat yang muncul mendadak saat mengangkat beban. Nyeri terasa seperti robek dan menjalar ke punggung. Pasien juga mengeluhkan tangan kiri terasa lebih dingin. Ia tidak memiliki riwayat trauma.',
    vitals: 'TD kanan 190/105 mmHg, TD kiri 150/90 mmHg · HR 112/menit · RR 22/menit · SpO₂ 97% RA · GCS 15',
    exam: 'Nadi radialis kiri lebih lemah, murmur baru diastolik, pasien gelisah dan diaphoresis.',
    tests: 'ECG non-specific. CXR dapat menunjukkan mediastinum melebar. CTA aorta diperlukan pada pasien stabil dengan kecurigaan tinggi.',
    diagnosis: 'Acute aortic dissection, suspected Stanford type A', ddx: 'ACS · pulmonary embolism · pneumothorax · esophageal rupture',
    approach: 'ABCDE, bilateral BP/pulses, ECG, urgent imaging, dan jangan melakukan thrombolysis bila dissection belum disingkirkan pada klinis yang sangat mencurigakan.',
    treatment: 'Anti-impulse therapy: IV beta-blocker seperti esmolol/labetalol, target HR sekitar 60/menit; vasodilator dapat ditambahkan setelah beta-blockade bila tekanan darah masih tinggi. Suspected/confirmed type A → emergency cardiothoracic surgery. Type B uncomplicated umumnya medical management.',
    disposition: 'Emergency cardiothoracic/vascular surgery pathway', redflags: 'Malperfusion · rupture · tamponade · acute aortic regurgitation · neurologic deficit'
  },
  {
    id: 15, title: 'Hyperkalemia with ECG Changes', category: 'Metabolic',
    vignette: 'Laki-laki 63 tahun dengan CKD stage 5 datang karena kelemahan otot dan palpitasi. Ia melewatkan dua sesi hemodialisis karena masalah transportasi. Tidak ada nyeri dada.',
    vitals: 'TD 102/64 mmHg · HR 58/menit · RR 20/menit · SpO₂ 98% RA · GCS 15',
    exam: 'Kelemahan generalisata, tidak ada focal neurologic deficit.',
    tests: 'K⁺ 7,2 mmol/L. ECG menunjukkan peaked T waves, PR memanjang dan QRS melebar.',
    diagnosis: 'Severe hyperkalemia with ECG changes', ddx: 'Hypocalcemia · sodium-channel blocker toxicity · acute coronary syndrome',
    approach: 'Continuous cardiac monitoring, repeat/confirm potassium bila memungkinkan tanpa menunda terapi pada ECG changes, assess renal function and acid-base status.',
    treatment: '1) Stabilize myocardium dengan IV calcium gluconate. 2) Shift K intracellular dengan insulin + dextrose dan nebulized salbutamol; bicarbonate pada konteks metabolic acidosis tertentu. 3) Remove K dengan definitive dialysis bila severe/refractory atau ada indikasi.',
    disposition: 'ICU/urgent dialysis', redflags: 'Bradyarrhythmia · QRS widening · sine-wave ECG · ventricular arrhythmia'
  },
  {
    id: 16, title: 'Diabetic Ketoacidosis', category: 'Endocrine',
    vignette: 'Perempuan 22 tahun dengan DM tipe 1 datang karena muntah berulang, nyeri perut, haus dan sering BAK sejak 2 hari. Ia mengaku tidak menggunakan insulin basal selama 3 hari karena sedang bepergian. Sejak pagi pasien semakin mengantuk.',
    vitals: 'TD 96/60 mmHg · HR 124/menit · RR 30/menit · SpO₂ 98% RA · T 37,8°C · GCS 14',
    exam: 'Dehidrasi, mukosa kering, napas Kussmaul, bau napas seperti buah, abdomen nyeri difus tanpa peritoneal signs.',
    tests: 'Glucose 450 mg/dL, keton positif, metabolic acidosis, anion gap meningkat. K⁺ perlu dinilai sebelum insulin.',
    diagnosis: 'Diabetic ketoacidosis with dehydration', ddx: 'Hyperosmolar hyperglycemic state · lactic acidosis · toxic alcohol ingestion · sepsis',
    approach: 'ABCDE, glucose, ketones, VBG/ABG, electrolytes terutama K⁺, renal function, osmolality bila relevan, dan cari precipitant seperti infection/non-adherence.',
    treatment: 'IV isotonic crystalloid dengan reassessment. Insulin IV sesuai protokol. Monitor dan koreksi potassium secara ketat. Bila glucose turun tetapi ketosis/acidosis belum resolved, tambahkan dextrose agar insulin dapat diteruskan. Treat precipitating cause.',
    disposition: 'Monitored bed/ICU sesuai severity', redflags: 'Altered consciousness · severe acidosis · refractory hypokalemia · shock'
  },
  {
    id: 17, title: 'Severe Hypoglycemia', category: 'Endocrine',
    vignette: 'Laki-laki 70 tahun dengan DM tipe 2 menggunakan insulin ditemukan keluarganya berkeringat, gemetar, bingung, dan sulit dibangunkan. Ia makan sangat sedikit hari ini karena mual. Keluarga tidak mengetahui dosis insulin terakhir.',
    vitals: 'TD 136/78 mmHg · HR 108/menit · RR 18/menit · SpO₂ 98% RA · GCS 11',
    exam: 'Diaphoresis, tremor, confused, tidak ada focal neurologic deficit.',
    tests: 'Bedside glucose 42 mg/dL.',
    diagnosis: 'Severe hypoglycemia', ddx: 'Acute stroke · seizure · sepsis · intoxication',
    approach: 'ABCDE dan bedside glucose segera pada altered mental status. Tentukan apakah pasien mampu menelan dengan aman.',
    treatment: 'Bila sadar dan aman menelan → rapid-acting carbohydrate dan recheck glucose. Bila tidak dapat menelan → IV dextrose; glucagon bila akses IV tidak tersedia. Recheck dan cari penyebab. Sulfonylurea-associated recurrent hypoglycemia memerlukan observasi lebih lama dan terapi spesifik sesuai indikasi.',
    disposition: 'Observasi/admission bila recurrent, long-acting agent, atau penyebab tidak jelas', redflags: 'Recurrent hypoglycemia · prolonged coma · sulfonylurea/long-acting insulin exposure'
  },
  {
    id: 18, title: 'Opioid Toxicity', category: 'Toxicology',
    vignette: 'Laki-laki 31 tahun ditemukan tidak sadar di kamar mandi. Temannya mengatakan pasien baru saja menggunakan obat nyeri yang tidak diketahui jenisnya. Saat tiba, pasien tidak responsif dan bernapas sangat lambat.',
    vitals: 'TD 104/68 mmHg · HR 54/menit · RR 5/menit · SpO₂ 75% RA · GCS 5',
    exam: 'Pupil pinpoint bilateral, respirasi dangkal, tidak ada trauma yang jelas.',
    tests: 'Bedside glucose normal. ECG tanpa kelainan signifikan.',
    diagnosis: 'Suspected opioid toxicity causing respiratory depression', ddx: 'Benzodiazepine intoxication · intracranial hemorrhage · hypoglycemia · hypoxic brain injury',
    approach: 'Airway and ventilation are the immediate priorities. Bag-mask ventilation and oxygenation should not be delayed while preparing antidote.',
    treatment: 'Support ventilation. Naloxone diberikan dan dititrasi untuk mencapai adequate spontaneous ventilation, bukan sekadar membuat pasien sepenuhnya sadar. Monitor karena durasi opioid dapat lebih panjang daripada naloxone; repeat doses/infusion dapat diperlukan.',
    disposition: 'Monitored observation/ICU sesuai response dan opioid yang dicurigai', redflags: 'Recurrent respiratory depression · long-acting opioid · pulmonary edema · aspiration'
  },
  {
    id: 19, title: 'Organophosphate Poisoning', category: 'Toxicology',
    vignette: 'Laki-laki 42 tahun, petani, datang 1 jam setelah menyemprot pestisida di lahan tanpa APD. Ia mengalami mual, muntah, keringat berlebihan, air liur banyak, pandangan kabur, sesak, dan kelemahan. Rekannya mengatakan pakaian pasien masih basah oleh cairan pestisida saat ditemukan.',
    vitals: 'TD 92/58 mmHg · HR 52/menit · RR 30/menit · SpO₂ 84% RA · GCS 13',
    exam: 'Miosis, salivasi, lacrimation, diaphoresis, bronchorrhea, wheezing, fasciculations.',
    tests: 'Diagnosis berdasarkan toxidrome; cholinesterase levels dapat mendukung tetapi tidak boleh menunda terapi.',
    diagnosis: 'Acute organophosphate poisoning with cholinergic crisis', ddx: 'Carbamate poisoning · opioid toxicity · asthma exacerbation · sepsis',
    approach: 'PPE untuk petugas, remove contaminated clothing, decontamination, ABC, suction secretions, oxygen/ventilation.',
    treatment: 'Atropine berulang dan dititrasi berdasarkan pengeringan sekret bronkial serta perbaikan ventilasi/hemodynamics, bukan berdasarkan pupil. Pralidoxime (2-PAM) dipertimbangkan pada organophosphate poisoning yang sesuai, terutama bila diberikan dini. Airway support bila diperlukan.',
    disposition: 'ICU', redflags: 'Severe bronchorrhea · respiratory failure · seizures · persistent bradycardia/hypotension'
  },
  {
    id: 20, title: 'Heat Stroke', category: 'Environmental',
    vignette: 'Laki-laki 26 tahun ditemukan bingung setelah mengikuti lomba lari pada siang hari yang sangat panas. Menurut teman, pasien mulai mengeluh pusing dan kram otot setelah berlari sekitar 2 jam, kemudian berjalan sempoyongan dan akhirnya mengalami penurunan kesadaran. Tidak ada riwayat diabetes atau epilepsi.',
    vitals: 'TD 98/60 mmHg · HR 142/menit · RR 32/menit · SpO₂ 96% RA · core temperature 41,2°C · GCS 10',
    exam: 'Confused, kulit sangat panas, diaphoresis dapat ada terutama pada exertional heat stroke, tidak ada focal neurologic deficit.',
    tests: 'Electrolytes, glucose, renal function, CK, urinalysis, coagulation profile, liver function, ECG. Monitor rhabdomyolysis and AKI.',
    diagnosis: 'Exertional heat stroke', ddx: 'Sepsis · CNS infection · serotonin syndrome · neuroleptic malignant syndrome · malignant hyperthermia',
    approach: 'ABCDE, core temperature, glucose, rapid identification, dan immediate active cooling. Jangan menunggu hasil laboratorium untuk memulai cooling.',
    treatment: 'Rapid active cooling dengan cold-water immersion bila tersedia/appropriate atau evaporative cooling. Target <39°C secepat mungkin, lalu hentikan/kurangi pendinginan untuk mencegah hypothermia. Treat seizures, hypoglycemia, electrolyte abnormalities, rhabdomyolysis, AKI, and DIC. Antipyretics tidak efektif untuk heat stroke.',
    disposition: 'ICU/monitored admission', redflags: 'Persistent hyperthermia · shock · seizures · AKI · DIC · hepatic injury'
  }
]

export default function EmergencyPage() {
  const [selected, setSelected] = useState(cases[0])
  return (
    <div className="section page">
      <div className="section-kicker">Emergency Cases</div>
      <h1>20 Comprehensive Emergency Cases</h1>
      <p className="section-intro">Vignette komprehensif dengan pendekatan ABCDE, diagnosis banding, pemeriksaan penunjang, tatalaksana spesifik, red flags, dan disposition.</p>
      <div className="emergency-layout">
        <aside className="case-list">
          {cases.map((item) => <button key={item.id} className={`case-nav ${selected.id === item.id ? 'active' : ''}`} onClick={() => setSelected(item)}><span>{String(item.id).padStart(2, '0')}</span><div><strong>{item.title}</strong><small>{item.category}</small></div></button>)}
        </aside>
        <main className="case-detail">
          <div className="meta">CASE {String(selected.id).padStart(2, '0')} · {selected.category}</div>
          <h2>{selected.title}</h2>
          <section><h3>Vignette</h3><p>{selected.vignette}</p></section>
          <div className="info-grid"><div><h3>Primary Survey & Vitals</h3><p>{selected.vitals}</p></div><div><h3>Pemeriksaan Fisik</h3><p>{selected.exam}</p></div></div>
          <section><h3>Pemeriksaan Penunjang</h3><p>{selected.tests}</p></section>
          <section><h3>Diagnosis Kerja</h3><p><strong>{selected.diagnosis}</strong></p></section>
          <section><h3>Diagnosis Banding</h3><p>{selected.ddx}</p></section>
          <section><h3>Pendekatan Klinis</h3><p>{selected.approach}</p></section>
          <section className="treatment"><h3>Tatalaksana Spesifik</h3><p>{selected.treatment}</p></section>
          <div className="info-grid"><div><h3>Disposition</h3><p>{selected.disposition}</p></div><div><h3>Red Flags</h3><p>{selected.redflags}</p></div></div>
        </main>
      </div>
      <p className="trust" style={{marginTop:24}}>Materi edukasi. Verifikasi dosis, kontraindikasi, timing reperfusi, dan protokol terapi terhadap guideline terbaru serta protokol lokal sebelum digunakan untuk pasien nyata.</p>
    </div>
  )
}
