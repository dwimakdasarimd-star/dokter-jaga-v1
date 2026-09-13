export type LibraryResource = {
  slug: string;
  title: string;
  type: 'Clinical Pearls' | 'Guideline Digest' | 'Primary Care Notes' | 'Emergency' | 'Drug & Prescription' | 'E-book';
  category: string;
  level: 'Core' | 'Intermediate' | 'Advanced';
  read: string;
  desc: string;
  tags: string[];
  summary: string;
  keyPoints: string[];
  assessment: string[];
  investigation: string[];
  management: string[];
  redFlags: string[];
  tools: [string, string][];
  cases: [string, string][];
};

export const resources: LibraryResource[] = [
  {
    slug: 'acute-chest-pain', title: 'Acute Chest Pain: Practical Approach', type: 'Clinical Pearls', category: 'Cardiovascular', level: 'Intermediate', read: '8 min',
    desc: 'Kerangka praktis untuk assessment awal, red flags, ECG, differential diagnosis, dan disposition.', tags: ['Chest Pain', 'ECG', 'Emergency'],
    summary: 'Kerangka berpikir untuk menghadapi pasien dengan nyeri dada akut sejak kontak pertama sampai keputusan disposition.',
    keyPoints: ['Prioritaskan kondisi time-critical sebelum diagnosis yang lebih lengkap.', 'Gunakan history, vital signs, pemeriksaan fisik, dan ECG secara paralel.', 'Reassess setelah intervensi awal dan jangan mengandalkan satu hasil pemeriksaan saja.'],
    assessment: ['Onset, location, character, radiation, duration, provoking/relieving factors.', 'Dyspnea, diaphoresis, syncope, palpitations, dan neurologic symptoms.', 'Risk factors for coronary disease, thromboembolism, dan aortic disease.', 'Vital signs, perfusion, cardiac and respiratory examination, pulse symmetry.'],
    investigation: ['12-lead ECG sedini mungkin bila acute coronary syndrome dicurigai.', 'Laboratory testing sesuai differential diagnosis dan protokol lokal.', 'Chest imaging atau advanced imaging bila dicurigai penyakit struktural atau vaskular.', 'Serial assessment bila proses evolving dicurigai.'],
    management: ['Stabilize airway, breathing, dan circulation bila diperlukan.', 'Treat suspected life-threatening diagnosis sesuai emergency pathway.', 'Avoid anchoring bila nyeri menetap atau temuan klinis berubah.', 'Dokumentasikan working diagnosis, risk assessment, response, dan disposition.'],
    redFlags: ['Hemodynamic instability or shock', 'New ischemic ECG changes', 'Syncope or malignant arrhythmia', 'Focal neurologic deficit or pulse asymmetry', 'Severe hypoxemia or respiratory distress', 'Sudden maximal-at-onset pain'],
    tools: [['HEART Score', '/tools'], ['NEWS2', '/tools'], ['A–a Gradient', '/tools']], cases: [['Suspected Acute Coronary Syndrome', '/cases'], ['Suspected Aortic Dissection', '/cases']],
  },
  {
    slug: 'hypertension', title: 'Hypertension: Primary Care Notes', type: 'Primary Care Notes', category: 'Primary Care', level: 'Core', read: '7 min',
    desc: 'Assessment, target tekanan darah, pilihan terapi, monitoring, dan follow-up pasien hipertensi.', tags: ['Hypertension', 'Follow-up'],
    summary: 'Practical framework untuk memastikan diagnosis, menilai risiko, memilih terapi, dan membangun follow-up.',
    keyPoints: ['Konfirmasi tekanan darah dengan pengukuran yang benar.', 'Cari target-organ damage, faktor risiko, komorbiditas, dan kemungkinan secondary hypertension.', 'Lifestyle intervention dan pharmacotherapy berjalan bersama.'],
    assessment: ['Repeat blood pressure dengan cuff dan teknik yang sesuai.', 'Review cardiovascular risk factors, medication history, adherence, dan substances.', 'Cari tanda target-organ injury atau secondary causes bila klinis mengarah.', 'Assess kidney function dan baseline parameters sesuai konteks.'],
    investigation: ['Cardiovascular risk assessment.', 'Renal function dan urine assessment bila indicated.', 'ECG dan pemeriksaan tambahan berdasarkan komorbiditas.', 'Home atau ambulatory monitoring bila diperlukan.'],
    management: ['Tentukan target terapi secara individual.', 'Lifestyle: sodium reduction, healthy diet, physical activity, weight management, tobacco avoidance.', 'Pilih antihypertensive sesuai komorbiditas, contraindications, dan akses.', 'Follow-up untuk response, adverse effects, adherence, dan intensifikasi.'],
    redFlags: ['Severe hypertension with acute neurologic symptoms', 'Chest pain or acute dyspnea', 'Acute kidney injury', 'Visual disturbance with suspected end-organ injury', 'Pregnancy with severe hypertension symptoms'],
    tools: [['NEWS2', '/tools'], ['RCRI / Lee Index', '/tools']], cases: [['Hypertensive Emergency', '/cases']],
  },
  {
    slug: 'type-2-diabetes', title: 'Type 2 Diabetes: Guideline Digest', type: 'Guideline Digest', category: 'Endocrinology', level: 'Core', read: '9 min',
    desc: 'Decision points dari diagnosis hingga pemilihan terapi dan evaluasi kontrol glikemik.', tags: ['Diabetes', 'Guideline'],
    summary: 'Decision-oriented overview untuk diagnosis, risk assessment, lifestyle, pharmacologic strategy, dan monitoring diabetes tipe 2.',
    keyPoints: ['Individualize glycemic goals.', 'Assess cardiovascular, kidney, weight, hypoglycemia, dan treatment-burden considerations.', 'Therapy selection harus mencerminkan komorbiditas, safety, preference, dan access.'],
    assessment: ['Confirm diagnosis menggunakan pathway diagnostik yang sesuai.', 'Review symptoms, duration, weight, medications, lifestyle, dan adherence.', 'Assess cardiovascular risk, kidney status, eye health, neuropathy, dan foot risk.', 'Identify hypoglycemia risk dan barriers to self-management.'],
    investigation: ['Appropriate glycemic marker.', 'Kidney function dan urine albumin assessment bila indicated.', 'Lipid dan cardiovascular risk assessment.', 'Complication screening sesuai patient profile.'],
    management: ['Structured lifestyle dan self-management support.', 'Choose pharmacotherapy according to glycemic needs, comorbidities, safety, weight goals, dan preference.', 'Escalate atau simplify therapy berdasarkan response dan burden.', 'Review adherence, adverse effects, dan monitoring secara berkala.'],
    redFlags: ['Marked hyperglycemia with dehydration', 'Altered mental status', 'Vomiting or inability to maintain oral intake', 'Suspected diabetic ketoacidosis or hyperosmolar state', 'Severe hypoglycemia'],
    tools: [['Corrected Calcium', '/tools'], ['Free Water Deficit', '/tools']], cases: [['DKA / Hyperglycemic Emergency', '/cases']],
  },
  {
    slug: 'sepsis-and-shock', title: 'Sepsis & Shock: First-Hour Framework', type: 'Emergency', category: 'Emergency Medicine', level: 'Advanced', read: '10 min',
    desc: 'Recognition, initial resuscitation, reassessment, vasopressor strategy, dan antimicrobial principles.', tags: ['Sepsis', 'Shock'],
    summary: 'Kerangka praktis untuk recognition, initial resuscitation, reassessment, antimicrobial principles, dan escalation.',
    keyPoints: ['Recognize infection plus organ dysfunction atau shock early.', 'Resuscitation bersifat iterative: treatment, reassessment, lalu stop bila tidak beneficial.', 'Source control dan timely antimicrobial therapy adalah komponen penting.'],
    assessment: ['Airway, breathing, circulation, mental status, temperature, perfusion, dan urine output.', 'Cari infectious source dan severity of organ dysfunction.', 'Assess fluid responsiveness dan signs of fluid intolerance bila memungkinkan.', 'Obtain relevant cultures tanpa membuat treatment tertunda secara tidak perlu.'],
    investigation: ['Lactate dan perfusion markers sesuai local protocol.', 'Blood cultures dan source-specific microbiology bila indicated.', 'CBC, renal function, electrolytes, glucose, dan pemeriksaan terarah.', 'Imaging untuk source identification bila clinically appropriate.'],
    management: ['Crystalloid resuscitation bila hypoperfusion, dengan frequent reassessment.', 'Empiric antimicrobial therapy sesuai source dan local resistance pattern.', 'Escalate to vasopressor support bila shock persisten.', 'Pursue source control dan narrow therapy ketika data tersedia.'],
    redFlags: ['Persistent hypotension', 'Altered mental status', 'Oliguria', 'Worsening perfusion', 'Increasing oxygen requirement', 'Fluid intolerance or pulmonary edema'],
    tools: [['NEWS2', '/tools'], ['qSOFA', '/tools'], ['A–a Gradient', '/tools']], cases: [['Septic Shock', '/cases']],
  },
  {
    slug: 'acute-dyspnea', title: 'Acute Dyspnea: Clinical Reasoning', type: 'Clinical Pearls', category: 'Respiratory', level: 'Intermediate', read: '8 min',
    desc: 'Pendekatan terstruktur terhadap sesak akut dengan fokus pada red flags dan diagnosis time-critical.', tags: ['Dyspnea', 'Respiratory'],
    summary: 'Pendekatan terstruktur untuk airway, pulmonary, cardiac, vascular, dan systemic causes of acute dyspnea.',
    keyPoints: ['Severity assessment comes before etiologic certainty.', 'Gunakan oxygenation, ventilation, work of breathing, dan hemodynamics untuk menentukan urgency.', 'Focused differential lebih berguna daripada daftar diagnosis yang tidak terarah.'],
    assessment: ['Onset dan time course.', 'Work of breathing, respiratory rate, oxygen saturation, mental status, dan hemodynamics.', 'Chest/cardiac examination, edema, dan signs of DVT or infection.', 'Asthma/COPD, cardiac history, medications, exposures, dan thromboembolic risk.'],
    investigation: ['ECG dan chest imaging sesuai differential.', 'Blood gas bila ventilatory failure dicurigai.', 'Targeted laboratory testing.', 'POCUS bila tersedia dan sesuai kompetensi.'],
    management: ['Support oxygenation dan ventilation sesuai severity.', 'Treat likely life-threatening cause promptly.', 'Reassess setelah setiap intervensi besar.', 'Escalate bila work of breathing, gas exchange, atau hemodynamics memburuk.'],
    redFlags: ['Severe respiratory distress', 'Silent chest or impending fatigue', 'Severe hypoxemia', 'Altered consciousness', 'Shock', 'Suspected PE, pneumothorax, or pulmonary edema'],
    tools: [['PESI', '/tools'], ['PERC Rule', '/tools'], ['Wells PE', '/tools'], ['A–a Gradient', '/tools']], cases: [['Acute Severe Asthma', '/cases'], ['Pulmonary Embolism', '/cases']],
  },
  {
    slug: 'prescription-safety', title: 'Drug & Prescription Safety', type: 'Drug & Prescription', category: 'Pharmacology', level: 'Core', read: '6 min',
    desc: 'Prinsip penulisan resep, dosing, contraindication, monitoring, dan safety checks untuk praktik sehari-hari.', tags: ['Prescription', 'Safety'],
    summary: 'Checklist praktis untuk membuat resep yang jelas, aman, dan dapat dieksekusi dengan benar.',
    keyPoints: ['Verify patient, indication, allergy status, dan relevant organ function.', 'Write drug, strength, dose, route, frequency, duration, dan quantity dengan jelas.', 'Communicate counseling points dan monitoring requirements.'],
    assessment: ['Confirm diagnosis atau therapeutic indication.', 'Review allergies, pregnancy when relevant, kidney/liver function, age, dan weight.', 'Check current medications untuk duplication, interactions, dan contraindications.', 'Clarify treatment goal dan expected duration.'],
    investigation: ['Baseline laboratory data bila required.', 'Confirm dose adjustments for renal/hepatic impairment when applicable.', 'Review monitoring parameters for high-risk medicines.'],
    management: ['Write complete prescription using standardized terminology.', 'Specify route dan duration; avoid ambiguous abbreviations.', 'Give patient-friendly instructions dan important adverse effects.', 'Document follow-up atau monitoring bila diperlukan.'],
    redFlags: ['Serious drug allergy', 'High-risk medication without monitoring', 'Potential major interaction', 'Dose not adjusted for organ dysfunction', 'Unclear medication reconciliation'],
    tools: [['Child-Pugh', '/tools'], ['MELD-Na', '/tools']], cases: [['Medication Adverse Reaction', '/cases']],
  },
  {
    slug: 'acute-asthma', title: 'Acute Asthma: Severity to Disposition', type: 'Guideline Digest', category: 'Respiratory', level: 'Core', read: '7 min',
    desc: 'Severity assessment, bronchodilator, steroid, reassessment, dan discharge planning.', tags: ['Asthma', 'Emergency'],
    summary: 'Quick reference untuk severity assessment, bronchodilator therapy, corticosteroid use, reassessment, dan discharge planning.',
    keyPoints: ['Severity ditentukan secara klinis dan objective measures bila feasible.', 'Bronchodilator therapy perlu diikuti early reassessment.', 'Discharge merupakan keputusan klinis yang mencakup response, risk, dan follow-up.'],
    assessment: ['Symptoms, respiratory rate, pulse, oxygen saturation, speech, accessory muscle use, mental status.', 'Previous severe exacerbations, ICU admission, intubation, dan recent healthcare utilization.', 'Current controller/reliever use dan adherence.', 'Triggers dan relevant comorbidities.'],
    investigation: ['Peak expiratory flow atau spirometry bila feasible.', 'Blood gas bila severe disease atau ventilatory failure dicurigai.', 'Additional investigations bila alternative diagnosis plausible.'],
    management: ['Rapid-acting inhaled bronchodilator sesuai severity dan local protocol.', 'Systemic corticosteroid bila indicated.', 'Oxygen therapy ke target yang sesuai bila hypoxemic.', 'Repeat assessment sebelum disposition.'],
    redFlags: ['Silent chest', 'Exhaustion or altered mental status', 'Severe hypoxemia', 'Poor response to initial treatment', 'Suspected ventilatory failure'],
    tools: [['NEWS2', '/tools'], ['A–a Gradient', '/tools']], cases: [['Acute Severe Asthma', '/cases']],
  },
  {
    slug: 'headache-red-flags', title: 'Headache: Primary vs Secondary', type: 'Primary Care Notes', category: 'Neurology', level: 'Intermediate', read: '7 min',
    desc: 'Membedakan primary headache dari secondary headache melalui pola gejala dan red flags.', tags: ['Headache', 'Red Flags'],
    summary: 'Framework untuk mengenali primary headache sekaligus tidak melewatkan secondary headache yang membutuhkan evaluasi segera.',
    keyPoints: ['History sering memberikan diagnostic signal terkuat.', 'Red flags mengubah threshold untuk investigation atau referral.', 'Normal neurological examination tidak otomatis menyingkirkan semua secondary causes.'],
    assessment: ['Onset: thunderclap, acute, subacute, atau chronic.', 'Pattern, frequency, duration, triggers, associated symptoms, prior headache history.', 'Medication/substance use dan relevant pregnancy/postpartum context.', 'Complete neurological examination dan fundoscopic assessment bila appropriate.'],
    investigation: ['Urgent investigation bila red flags atau abnormal examination mengarah ke secondary headache.', 'Pilih imaging/testing berdasarkan suspected pathology dan local pathway.', 'Hindari indiscriminate testing bila pola primary headache jelas tanpa red flags.'],
    management: ['Treat likely primary headache sesuai diagnosis dan patient factors.', 'Address medication overuse dan modifiable triggers bila relevant.', 'Provide explicit safety-netting dan return precautions.', 'Arrange follow-up bila diagnosis uncertain atau symptoms persist.'],
    redFlags: ['Thunderclap onset', 'New neurological deficit', 'Altered consciousness', 'Fever with meningism', 'New headache with cancer/immunosuppression', 'New or changing headache in pregnancy/postpartum', 'Visual symptoms or papilledema'],
    tools: [['NEWS2', '/tools']], cases: [['Subarachnoid Hemorrhage', '/cases'], ['Meningitis', '/cases']],
  },
  {
    slug: 'acute-kidney-injury', title: 'Acute Kidney Injury: First Assessment', type: 'Primary Care Notes', category: 'Nephrology', level: 'Intermediate', read: '8 min',
    desc: 'Bedakan prerenal, intrinsic, dan postrenal AKI serta tentukan kapan perlu eskalasi.', tags: ['AKI', 'Kidney', 'Electrolytes'],
    summary: 'Kerangka awal untuk mengenali AKI, mencari penyebab yang reversible, menilai komplikasi, dan menentukan kebutuhan referral.',
    keyPoints: ['Bandingkan creatinine dengan baseline dan nilai tren.', 'Cari reversible causes: volume depletion, obstruction, medication-related injury, dan sepsis.', 'Komplikasi seperti hyperkalemia, acidosis, pulmonary edema, dan uremia menentukan urgensi.'],
    assessment: ['Volume status, blood pressure, urine output, fluid losses, dan recent illness.', 'Medication review termasuk nephrotoxic agents dan recent contrast exposure.', 'Urinary symptoms, stones, prostate symptoms, systemic features, dan sepsis clues.', 'Assess for edema, pulmonary congestion, and uremic symptoms.'],
    investigation: ['Serial renal function dan electrolytes.', 'Urinalysis dan urine microscopy bila tersedia.', 'Renal ultrasound bila obstruction dicurigai.', 'Investigasi penyebab sesuai clinical context.'],
    management: ['Correct hypovolemia secara terukur bila present dan reassess.', 'Stop atau adjust obat yang berkontribusi sesuai clinical context.', 'Treat infection, obstruction, or other identified cause promptly.', 'Escalate urgently for refractory electrolyte disturbance, pulmonary edema, severe acidosis, or uremic complications.'],
    redFlags: ['Severe or refractory hyperkalemia', 'Pulmonary edema', 'Severe metabolic acidosis', 'Oliguria/anuria with deterioration', 'Uremic complications', 'Suspected bilateral obstruction'],
    tools: [['Free Water Deficit', '/tools'], ['Sodium Deficit', '/tools']], cases: [['Acute Kidney Injury', '/cases']],
  },
  {
    slug: 'copd-exacerbation', title: 'COPD Exacerbation: Practical Management', type: 'Guideline Digest', category: 'Respiratory', level: 'Core', read: '8 min',
    desc: 'Assessment severity, bronchodilator strategy, oxygen target, steroid, antibiotic considerations, dan disposition.', tags: ['COPD', 'Dyspnea', 'Oxygen'],
    summary: 'Pendekatan praktis pada acute COPD exacerbation dengan fokus pada severity, gas exchange, dan escalation.',
    keyPoints: ['Tentukan severity berdasarkan work of breathing, oxygenation, ventilation, dan mental status.', 'Oxygen diberikan terkontrol sesuai kebutuhan klinis.', 'Cari diagnosis alternatif dan komplikasi yang dapat mengubah management.'],
    assessment: ['Change from baseline dyspnea, cough, sputum volume, and sputum purulence.', 'Respiratory rate, oxygen saturation, mental status, and signs of fatigue.', 'History of previous exacerbations, NIV/intubation, and baseline oxygen use.', 'Look for pneumonia, heart failure, PE, pneumothorax, or arrhythmia when appropriate.'],
    investigation: ['Blood gas bila hypercapnia or ventilatory failure dicurigai.', 'Chest imaging bila alternative diagnosis or complication suspected.', 'ECG and targeted laboratory testing when clinically indicated.', 'Serial reassessment after treatment.'],
    management: ['Short-acting bronchodilator therapy sesuai severity dan local protocol.', 'Systemic corticosteroid bila indicated.', 'Controlled oxygen therapy and ventilatory support when required.', 'Antibiotics only when clinical indication supports bacterial involvement or local protocol.'],
    redFlags: ['Increasing somnolence', 'Severe work of breathing', 'Worsening hypercapnia/acidosis', 'Hemodynamic instability', 'Poor response to initial therapy'],
    tools: [['A–a Gradient', '/tools'], ['NEWS2', '/tools']], cases: [['Acute COPD Exacerbation', '/cases']],
  },
  {
    slug: 'acute-gastrointestinal-bleeding', title: 'Acute GI Bleeding: Stabilize First', type: 'Emergency', category: 'Gastroenterology', level: 'Advanced', read: '9 min',
    desc: 'Recognition, resuscitation, focused history, transfusion strategy, dan early escalation pada perdarahan GI.', tags: ['GI Bleeding', 'Shock', 'Transfusion'],
    summary: 'Framework untuk menghadapi suspected GI bleeding dengan prioritas stabilisasi, source assessment, dan early escalation.',
    keyPoints: ['Stabilization dan assessment of severity berjalan paralel.', 'Bedakan overt bleeding dari occult blood loss dan cari ongoing hemorrhage.', 'Medication review dan comorbidity dapat mengubah risiko dan management.'],
    assessment: ['Hemodynamic status, mental status, perfusion, and estimated ongoing blood loss.', 'Hematemesis, coffee-ground emesis, melena, hematochezia, abdominal pain.', 'Anticoagulants, antiplatelets, NSAIDs, liver disease, and previous GI bleeding.', 'Assess airway risk in massive hematemesis or altered consciousness.'],
    investigation: ['CBC, renal function, electrolytes, coagulation studies, and blood typing/crossmatch as appropriate.', 'Serial hemoglobin when ongoing bleeding is suspected.', 'ECG and additional testing according to age/comorbidity.', 'Endoscopic or radiologic source evaluation based on stability and local pathway.'],
    management: ['Resuscitate with appropriate IV access and blood products when indicated.', 'Address anticoagulant/antiplatelet issues according to indication and local protocol.', 'Use cause-directed therapy and arrange urgent endoscopic/interventional management when needed.', 'Reassess perfusion and ongoing bleeding frequently.'],
    redFlags: ['Shock or persistent hypotension', 'Massive ongoing hematemesis/hematochezia', 'Altered consciousness with airway risk', 'Significant comorbidity with active bleeding', 'Rapidly falling hemoglobin or worsening perfusion'],
    tools: [['NEWS2', '/tools']], cases: [['Upper GI Bleeding', '/cases']],
  },
  {
    slug: 'stroke-first-approach', title: 'Acute Stroke: First Minutes Matter', type: 'Emergency', category: 'Neurology', level: 'Advanced', read: '9 min',
    desc: 'Recognition, last-known-well, glucose, imaging pathway, dan prevention of avoidable treatment delay.', tags: ['Stroke', 'Neurology', 'Time-critical'],
    summary: 'Pendekatan awal pasien dengan defisit neurologis akut dengan fokus pada time of onset, stabilization, dan rapid imaging.',
    keyPoints: ['Tentukan last-known-well sedini mungkin.', 'Exclude mimics such as hypoglycemia while maintaining stroke pathway urgency.', 'Imaging strategy dan reperfusion eligibility harus mengikuti pathway stroke setempat.'],
    assessment: ['Exact onset or last-known-well, symptom progression, and baseline function.', 'Airway, breathing, circulation, glucose, temperature, and neurologic severity.', 'Anticoagulant/antiplatelet use and bleeding risk.', 'Rapid focused neurological examination and disability assessment.'],
    investigation: ['Immediate glucose measurement.', 'Urgent brain imaging according to stroke pathway.', 'Vascular imaging or perfusion imaging when indicated and available.', 'Relevant blood tests without unnecessary delay to definitive assessment.'],
    management: ['Activate stroke pathway promptly when suspected.', 'Correct immediately reversible threats such as hypoglycemia or severe hypoxemia.', 'Reperfusion and blood pressure decisions should follow current stroke protocol and eligibility criteria.', 'Swallow assessment and secondary prevention planning after acute stabilization.'],
    redFlags: ['New focal neurologic deficit', 'Reduced consciousness', 'Sudden severe headache with deficit', 'Rapid neurologic deterioration', 'Suspected large-vessel occlusion'],
    tools: [['NEWS2', '/tools']], cases: [['Acute Ischemic Stroke', '/cases'], ['Intracerebral Hemorrhage', '/cases']],
  },
  {
    slug: 'anaphylaxis', title: 'Anaphylaxis: Recognition to First-Line Treatment', type: 'Emergency', category: 'Emergency Medicine', level: 'Advanced', read: '7 min',
    desc: 'Kenali anafilaksis, prioritaskan first-line treatment, dan lakukan reassessment serta observation.', tags: ['Anaphylaxis', 'Epinephrine', 'Emergency'],
    summary: 'Quick emergency framework untuk mengenali anafilaksis dan memberikan first-line treatment tanpa delay yang tidak perlu.',
    keyPoints: ['Diagnosis is clinical; treatment should not wait for confirmatory testing.', 'Intramuscular epinephrine is the key first-line treatment in suspected anaphylaxis.', 'Airway and circulatory deterioration can be rapid, requiring repeated reassessment.'],
    assessment: ['Sudden onset after likely trigger with airway, breathing, or circulation compromise.', 'Skin/mucosal findings may be present but are not required in every presentation.', 'Exposure history, previous anaphylaxis, asthma, and medications.', 'Continuous assessment of airway, respiratory effort, oxygenation, and circulation.'],
    investigation: ['Do not delay first-line treatment for investigations.', 'Additional testing only when it supports differential diagnosis or follow-up.', 'Consider tryptase testing only according to local protocol and timing.'],
    management: ['Give IM epinephrine promptly when anaphylaxis is suspected.', 'Position appropriately, provide oxygen and IV access as indicated.', 'Repeat assessment and treatment according to response and protocol.', 'Observation and discharge planning should account for severity and recurrence risk.'],
    redFlags: ['Airway edema/stridor', 'Severe wheeze or respiratory failure', 'Hypotension/shock', 'Persistent symptoms after initial treatment', 'Rapid progression'],
    tools: [['NEWS2', '/tools']], cases: [['Anaphylaxis', '/cases']],
  },
  {
    slug: 'hyponatremia', title: 'Hyponatremia: Classify Before You Correct', type: 'Guideline Digest', category: 'Electrolytes', level: 'Intermediate', read: '8 min',
    desc: 'Framework diagnosis berdasarkan tonisitas, volume status, severity gejala, dan penyebab.', tags: ['Sodium', 'Electrolyte', 'Neurology'],
    summary: 'Kerangka evaluasi hyponatremia untuk mengidentifikasi kondisi neurologis gawat dan menghindari koreksi yang terlalu cepat.',
    keyPoints: ['Assess symptoms and tonicity before selecting treatment.', 'Classify by volume status and underlying mechanism when possible.', 'Correction strategy must account for chronicity and risk of osmotic demyelination.'],
    assessment: ['Neurologic symptoms, seizure, confusion, headache, nausea, and severity.', 'Fluid intake/losses, diuretics, endocrine symptoms, renal/cardiac/liver disease.', 'Medication review and recent IV fluid exposure.', 'Determine likely chronicity from prior sodium values and history.'],
    investigation: ['Serum osmolality and appropriate urine studies.', 'Glucose and renal function.', 'Thyroid/adrenal evaluation when clinically indicated.', 'Serial sodium measurements during active correction.'],
    management: ['Severe symptomatic cases require urgent protocol-driven treatment.', 'Treat the underlying cause and stop contributing factors when appropriate.', 'Avoid uncontrolled rapid correction and monitor sodium closely.', 'Use fluid restriction or other cause-directed therapy when appropriate to the mechanism.'],
    redFlags: ['Seizure', 'Severe confusion or reduced consciousness', 'Rapidly falling sodium', 'Severe neurologic symptoms', 'High risk for osmotic demyelination'],
    tools: [['Sodium Deficit', '/tools']], cases: [['Severe Hyponatremia', '/cases']],
  },
  {
    slug: 'hypernatremia', title: 'Hypernatremia: Water Balance in Practice', type: 'Primary Care Notes', category: 'Electrolytes', level: 'Intermediate', read: '8 min',
    desc: 'Cari sumber free-water loss, tentukan kebutuhan koreksi, dan monitor risiko selama terapi.', tags: ['Sodium', 'Water', 'Electrolytes'],
    summary: 'Practical approach untuk hypernatremia dengan fokus pada volume status, free-water deficit, penyebab kehilangan air, dan monitoring.',
    keyPoints: ['Assess hemodynamic stability before focusing on sodium correction.', 'Identify ongoing free-water losses and access to water.', 'Correction rate depends on chronicity and clinical context; monitor serially.'],
    assessment: ['Volume status, thirst, mental status, urine output, and ongoing losses.', 'Diarrhea, fever, sweating, polyuria, impaired access to water, and diabetes insipidus clues.', 'Medication review and renal concentrating ability.', 'Determine acute versus chronic/unknown duration.'],
    investigation: ['Serial serum sodium and renal function.', 'Serum/urine osmolality when diabetes insipidus or renal water loss is suspected.', 'Glucose and other electrolytes.', 'Track fluid input/output carefully.'],
    management: ['Restore circulation first when hypovolemic shock is present.', 'Replace free-water deficit with an appropriate route and fluid while accounting for ongoing losses.', 'Monitor sodium frequently during active correction.', 'Treat the underlying cause of water loss.'],
    redFlags: ['Severe neurologic symptoms', 'Shock or severe dehydration', 'Rapid sodium rise', 'Very high urine output with dilute urine', 'Altered mental status'],
    tools: [['Free Water Deficit', '/tools'], ['Sodium Deficit', '/tools']], cases: [['Severe Hypernatremia', '/cases']],
  },
  {
    slug: 'adult-fever-primary-care', title: 'Fever in Adults: Focused Clinical Reasoning', type: 'Primary Care Notes', category: 'Primary Care', level: 'Core', read: '7 min',
    desc: 'Anamnesis, examination, red flags, rational testing, dan safety-netting untuk pasien demam.', tags: ['Fever', 'Infection', 'Primary Care'],
    summary: 'Pendekatan terstruktur pada pasien demam dewasa tanpa terjebak pada pemeriksaan yang tidak terarah.',
    keyPoints: ['Start with severity and host risk before searching for a specific pathogen.', 'Use exposure, travel, local epidemiology, and focal symptoms to narrow the differential.', 'Safety-netting is essential when the diagnosis is uncertain.'],
    assessment: ['Duration and pattern of fever, associated symptoms, and response to medication.', 'Travel, sick contacts, occupational exposure, food/water exposure, and animal contact.', 'Immunosuppression, pregnancy, age, comorbidities, and recent healthcare exposure.', 'Full vital signs and focused examination for source.'],
    investigation: ['Testing should be guided by syndrome and pretest probability.', 'CBC, renal function, urinalysis, imaging, or microbiology when clinically indicated.', 'Consider local endemic infections when epidemiology supports them.', 'Repeat assessment if symptoms evolve or initial tests are nondiagnostic.'],
    management: ['Supportive care and hydration when appropriate.', 'Treat identified bacterial or other infections according to diagnosis and local guidance.', 'Avoid empiric broad-spectrum therapy without a clinical indication.', 'Give clear return precautions for deterioration.'],
    redFlags: ['Hemodynamic instability', 'Altered consciousness', 'Respiratory distress', 'Meningism or focal neurologic deficit', 'Immunocompromised host with systemic deterioration'],
    tools: [['NEWS2', '/tools']], cases: [['Sepsis', '/cases'], ['Meningitis', '/cases']],
  },
  {
    slug: 'antibiotic-stewardship', title: 'Antibiotic Stewardship at the Point of Care', type: 'Guideline Digest', category: 'Infectious Disease', level: 'Intermediate', read: '8 min',
    desc: 'Memilih antibiotik berdasarkan syndrome, severity, source, resistance risk, dan de-escalation.', tags: ['AMR', 'Antibiotics', 'Stewardship'],
    summary: 'Decision framework untuk penggunaan antibiotik yang efektif sekaligus membantu menekan unnecessary exposure dan resistance.',
    keyPoints: ['Confirm that an antibacterial indication is actually present.', 'Choose agent, dose, route, and duration based on syndrome and patient factors.', 'Reassess once microbiology and clinical response become available.'],
    assessment: ['Likely infection source and severity.', 'Previous cultures, recent antibiotic exposure, healthcare exposure, and local resistance pattern.', 'Allergy history and renal/hepatic function.', 'Potential source control problem or need for specialist input.'],
    investigation: ['Obtain appropriate cultures when they will change management, without unnecessary treatment delay in unstable patients.', 'Use targeted microbiology rather than indiscriminate testing.', 'Review susceptibility results for de-escalation or escalation.', 'Monitor clinical response and toxicity.'],
    management: ['Select the narrowest effective regimen consistent with severity and resistance risk.', 'Optimize dosing and route based on pharmacology and organ function.', 'Set a review/stop date rather than allowing indefinite therapy.', 'De-escalate, switch IV to oral, or stop when clinically appropriate.'],
    redFlags: ['Septic shock', 'Rapid clinical deterioration', 'Suspected resistant pathogen with limited options', 'Deep infection requiring source control', 'Serious beta-lactam allergy affecting choices'],
    tools: [['NEWS2', '/tools']], cases: [['Sepsis', '/cases']],
  },
  {
    slug: 'iv-fluid-guide', title: 'IV Fluid Therapy: Choose, Give, Reassess', type: 'E-book', category: 'Emergency Medicine', level: 'Advanced', read: '12 min',
    desc: 'Panduan memilih cairan untuk resusitasi, maintenance, replacement, dan kondisi khusus dewasa maupun anak.', tags: ['IV Fluid', 'Resuscitation', 'Pediatrics'],
    summary: 'Framework 5R: resuscitation, routine maintenance, replacement, redistribution, dan reassessment untuk penggunaan cairan IV yang lebih aman.',
    keyPoints: ['Cairan adalah obat: tentukan indikasi, target, dose, dan monitoring.', 'Balanced crystalloid umumnya menjadi pilihan awal untuk resusitasi pada banyak kondisi, dengan pengecualian klinis tertentu.', 'Jangan melanjutkan bolus otomatis tanpa bukti manfaat perfusi dan tanpa reassessment.'],
    assessment: ['Tentukan apakah pasien membutuhkan resuscitation, maintenance, replacement, atau pendekatan lain.', 'Assess perfusion, blood pressure, capillary refill, urine output, lactate, and mental status.', 'Cari fluid responsiveness dan tanda fluid intolerance bila memungkinkan.', 'Perhitungkan usia, heart failure, kidney disease, liver disease, dan ongoing losses.'],
    investigation: ['Electrolytes, glucose, renal function, dan acid-base assessment sesuai konteks.', 'Serial lactate or perfusion markers when relevant.', 'Fluid balance dan urine output.', 'POCUS/echocardiography bila tersedia dan sesuai kompetensi.'],
    management: ['Gunakan crystalloid untuk kebanyakan kebutuhan awal resusitasi; pilih jenis berdasarkan konteks pasien.', 'Maintenance perlu disesuaikan dengan usia, frailty, renal/cardiac function, dan intake lain.', 'Replacement mengikuti ongoing losses dan komposisinya.', 'Reassess after each intervention dan stop/escalate sesuai response atau fluid intolerance.'],
    redFlags: ['Pulmonary edema', 'Persistent shock despite fluid', 'Severe electrolyte disturbance', 'Fluid overload in heart/kidney failure', 'Sepsis with traumatic brain injury requiring special fluid consideration'],
    tools: [['NEWS2', '/tools'], ['Sodium Deficit', '/tools'], ['Free Water Deficit', '/tools']], cases: [['Septic Shock', '/cases'], ['Dehydration with Hypernatremia', '/cases']],
  },
  {
    slug: 'rational-referral', title: 'Referral & Safety-Netting: Primary Care to Hospital', type: 'Primary Care Notes', category: 'Primary Care', level: 'Core', read: '6 min',
    desc: 'Kapan rawat jalan, kapan konsultasi, kapan rujuk segera, dan bagaimana membuat handover yang aman.', tags: ['Referral', 'Safety Netting', 'Primary Care'],
    summary: 'Framework praktis untuk menentukan urgency referral dan memastikan informasi klinis penting tidak hilang saat transisi perawatan.',
    keyPoints: ['Urgency is driven by instability, time-critical diagnoses, and expected deterioration.', 'A referral should communicate the working diagnosis, severity, treatment, and specific question.', 'Every outpatient plan needs explicit safety-netting.'],
    assessment: ['Current vital signs and stability.', 'Working diagnosis, differential diagnosis, and time-critical possibilities.', 'Treatment already given and response.', 'Comorbidities, medications, allergies, and relevant investigation results.'],
    investigation: ['Complete only tests that are useful for immediate management or safe handover.', 'Avoid delaying transfer for nonessential investigations in unstable patients.', 'Attach or communicate relevant serial results when available.'],
    management: ['Choose emergency transfer, urgent referral, expedited review, or routine follow-up based on risk.', 'Stabilize within scope while arranging escalation.', 'Provide structured handover and clear reason for referral.', 'Give patient/family explicit return precautions and expected follow-up.'],
    redFlags: ['Any ABC instability', 'Altered consciousness', 'Rapid deterioration', 'Suspected time-critical disease', 'Unsafe home environment or inability to follow the plan'],
    tools: [['NEWS2', '/tools']], cases: [['Clinical Deterioration', '/cases']],
  },
];

export const categories = ['All', 'Primary Care', 'Emergency Medicine', 'Cardiovascular', 'Respiratory', 'Neurology', 'Endocrinology', 'Pharmacology', 'Nephrology', 'Gastroenterology', 'Electrolytes', 'Infectious Disease'];
export const resourceTypes = ['All', 'Clinical Pearls', 'Guideline Digest', 'Primary Care Notes', 'Emergency', 'Drug & Prescription', 'E-book'];

export function getResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}
