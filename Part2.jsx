import { useState, useEffect } from "react";
import { LayoutDashboard, CalendarDays, FileWarning, Lock, Car, Truck, FileText, Users, Search, Bell, MessageSquare, LogOut, Siren, ShieldCheck, Clock, Fingerprint, ShieldAlert, Building2, Package, ClipboardCheck, Shuffle, CalendarCheck, GraduationCap, BookOpen, Video, VideoOff, Mic, MicOff, PhoneOff, MonitorPlay, Radio } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line, Treemap } from "recharts";
import { useState, useEffect } from "react";
import { LayoutDashboard, CalendarDays, FileWarning, Lock, Car, Truck, FileText, Users, Search, Bell, MessageSquare, LogOut, Siren, ShieldCheck, Clock, Fingerprint, ShieldAlert, Building2, Package, ClipboardCheck, Shuffle, CalendarCheck, GraduationCap, BookOpen, Video, VideoOff, Mic, MicOff, PhoneOff, MonitorPlay, Radio } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line, Treemap } from "recharts";
function DataScientistRouter(props) {
  var compte = props.compte;
  if (compte.role === "dl") { return <DataScientistDL compte={compte} />; }
  if (compte.role === "personnel") { return <DataScientistPersonnel compte={compte} />; }
  if (compte.role === "daf") { return <DataScientistDAF compte={compte} />; }
  if (compte.role === "judiciaire") { return <DataScientistDPJ compte={compte} />; }
  if (compte.role === "accidents") { return <DataScientistAccidents compte={compte} />; }
  if (compte.role === "commissariat") { return <DataScientistCommissariat compte={compte} />; }
  if (compte.role === "renseignement") { return <DataScientistDRG compte={compte} />; }
  if (compte.role === "controle") { return <DataScientistFrontieres compte={compte} />; }
  return <DataScientist compte={compte} />;
}

var ENGAGEMENTS_DATA = [
  { id: "ENG-001", objet: "Carburant vehicules — Juin 2026", montant: 18500000, service: "Direction de la Logistique", statut: "valide", date: "2026-06-01", priorite: "normale" },
  { id: "ENG-002", objet: "Uniformes et equipements — 50 agents", montant: 12750000, service: "DGRH", statut: "en_attente", date: "2026-06-10", priorite: "haute" },
  { id: "ENG-003", objet: "Maintenance vehicules BZV-8812-PL", montant: 4200000, service: "Direction de la Logistique", statut: "valide", date: "2026-06-05", priorite: "normale" },
  { id: "ENG-004", objet: "Formation premiers secours — 20 agents", montant: 3800000, service: "DGRH", statut: "en_attente", date: "2026-06-12", priorite: "normale" },
  { id: "ENG-005", objet: "Renouvellement contrat radio-telecom", montant: 8600000, service: "DAF", statut: "rejete", date: "2026-06-08", priorite: "haute" },
  { id: "ENG-006", objet: "Mission escorte convoi logistique", montant: 2400000, service: "Direction des Operations", statut: "valide", date: "2026-06-15", priorite: "normale" },
  { id: "ENG-007", objet: "Bon de commande carburant n°452", montant: 6300000, service: "Direction de la Logistique", statut: "en_attente", date: "2026-06-18", priorite: "urgente" },
  { id: "ENG-008", objet: "Demande materiel technique DCPJ", montant: 9750000, service: "DCPJ Brazzaville", statut: "en_attente", date: "2026-06-17", priorite: "urgente" }
];

var STC_ENG = { valide: "#22C55E", en_attente: "#F59E0B", attente_commandant: "#8B5CF6", rejete: "#DC2626" };
var STL_ENG = { valide: "Valide", en_attente: "A verifier (DAF)", attente_commandant: "Attente Commandant", rejete: "Rejete" };
var SEUIL_VALIDATION_COMMANDANT = 5000000;

function GestionBudget(props) {
  var compte = props.compte;
  var tabState = useState("overview");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var engState = useState(ENGAGEMENTS_DATA.map(function (e) { var c = {}; for (var k in e) { c[k] = e[k]; } return c; }));
  var engs = engState[0]; var setEngs = engState[1];
  var SYS = "Tu es conseiller financier SIPGN pour les forces de l ordre congolaises. Reponds en francais, structure et chiffre en FCFA.";

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); });
  }

  function valider(id) {
    setEngs(function (prev) {
      return prev.map(function (e) {
        if (e.id !== id) { return e; }
        var c = {};
        for (var k in e) { c[k] = e[k]; }
        if (e.statut === "en_attente") { c.statut = e.montant >= SEUIL_VALIDATION_COMMANDANT ? "attente_commandant" : "valide"; }
        else if (e.statut === "attente_commandant") { c.statut = "valide"; }
        return c;
      });
    });
  }
  function rejeter(id) { setEngs(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.statut = "rejete"; return c; }); }); }

  var totalB = BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0);
  var totalR = BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0);
  var totalE = engs.filter(function (e) { return e.statut === "valide"; }).reduce(function (s, e) { return s + e.montant; }, 0);
  var enAttente = engs.filter(function (e) { return e.statut === "en_attente" || e.statut === "attente_commandant"; }).length;
  var STC = STC_ENG;
  var STL = STL_ENG;
  var TABS = [["overview", "Vue Generale", "💰"], ["engagements", "Engagements", "📋"], ["previsions", "Previsions IA", "📈"]];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-900 to-emerald-900 border border-green-700 flex items-center justify-center text-2xl shrink-0">💰</div>
        <div><h2 className="text-2xl font-black text-white">Gestion Budgetaire & Finances</h2><p className="text-slate-500 text-xs">Suivi budgetaire, engagements et previsions — {compte.service}</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-green-700 text-white border-green-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>
      {tab === "overview" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon="📊" label="Budget alloue" value={totalB + "M"} color="#3B82F6" sub="FCFA" />
            <StatCard icon="💸" label="Depenses reelles" value={totalR + "M"} color={totalR > totalB ? "#DC2626" : "#22C55E"} sub="FCFA" />
            <StatCard icon="✅" label="Engage valide" value={Math.round(totalE / 1000000) + "M"} color="#8B5CF6" sub="FCFA" />
            <StatCard icon="⏳" label="En attente" value={enAttente} color="#F59E0B" sub="engagements" />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-3">Budget vs Depenses (millions FCFA)</p>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BUDGET_POSTES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="poste" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "M FCFA"]; }} />
                  <Bar dataKey="budget" name="Budget" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={16} />
                  <Bar dataKey="reel" name="Reel" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-1"><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm bg-blue-500"></span>Budget previsionnel</span><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm bg-amber-400"></span>Depenses reelles</span></div>
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Ecarts rapides</p>
            <div className="space-y-1.5">
              {BUDGET_POSTES.map(function (p) { var ec = p.reel - p.budget; var col = ec > 0 ? "#DC2626" : "#22C55E"; return (<div key={p.poste} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{p.poste}</span><div className="flex items-center gap-3"><span className="text-slate-500">{p.budget}M budget</span><span style={{ color: col }} className="font-bold">{ec > 0 ? "+" : ""}{ec}M ({((ec / p.budget) * 100).toFixed(0)}%)</span></div></div>); })}
            </div>
          </div>
        </div>
      ) : null}
      {tab === "engagements" ? (
        <div className="space-y-3">
          {engs.map(function (e) {
            return (
              <div key={e.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-bold text-sm">{e.objet}</p><p className="text-slate-400 text-xs">{e.service} — {e.date}</p><p className="text-green-400 font-black text-base mt-0.5">{e.montant.toLocaleString("fr-FR")} FCFA</p></div>
                  <Chip color={STC[e.statut]}>{STL[e.statut]}</Chip>
                </div>
                {compte.role === "daf" && e.statut === "en_attente" ? (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700">
                    <button onClick={function () { valider(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">{e.montant >= SEUIL_VALIDATION_COMMANDANT ? "Verifier et transmettre" : "Valider"}</button>
                    <button onClick={function () { rejeter(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-900 text-red-300">Rejeter</button>
                  </div>
                ) : null}
                {compte.role === "direction" && e.statut === "attente_commandant" ? (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700">
                    <button onClick={function () { valider(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">Valider (Commandant)</button>
                    <button onClick={function () { rejeter(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-900 text-red-300">Rejeter</button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
      {tab === "previsions" ? (
        <div className="space-y-4">
          <button onClick={function () {
            var ctx = "Budget: " + JSON.stringify(BUDGET_POSTES) + " | Engagements valides: " + totalE.toLocaleString("fr-FR") + " FCFA | Operations futures: " + EVENTS_DATA.filter(function (e) { return e.statut === "planifie"; }).length;
            callIA(ai1[1], "Genere une prevision budgetaire sur les 3 prochains mois pour la Police et Gendarmerie du Congo. Structure: 1) Tendance previsionnelle par poste (hausse/baisse + %) 2) Risques de depassement 3) Economies realisables (mesures + FCFA) 4) Budget supplementaire a solliciter 5) Alerte si insuffisant pour les operations planifiees. Donnees: " + ctx);
          }} className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📈 Generer la prevision budgetaire 3 mois</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}
    </div>
  );
}

function EtatMajor(props) {
  var compte = props.compte;
  var tabState = useState("gpec");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var SYS = "Tu es conseiller strategique du Commandement des Forces de Police et de la Gendarmerie Nationale du Congo. Tes analyses sont institutionnelles et de long terme. Reponds en francais avec le registre formel du commandement.";

  function callIA(setter, prompt) { setter({ loading: true, result: null }); fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); }); }

  var pyramideData = [
    { tranche: "0-5 ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete <= 5; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete <= 5; }).length },
    { tranche: "6-15 ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete >= 6 && a.anciennete <= 15; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete >= 6 && a.anciennete <= 15; }).length },
    { tranche: "16-25 ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete >= 16 && a.anciennete <= 25; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete >= 16 && a.anciennete <= 25; }).length },
    { tranche: "26+ ans", police: AGENTS_DATA.filter(function (a) { return a.corps === "Police" && a.anciennete >= 26; }).length, gend: AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && a.anciennete >= 26; }).length }
  ];

  var TABS = [["gpec", "GPEC & Succession", "👥"], ["planification", "Planification Strategique", "🗓️"], ["synthese", "Synthese Commandement", "📋"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-900 border border-purple-700 flex items-center justify-center text-2xl shrink-0">⭐</div>
        <div><h2 className="text-2xl font-black text-white">Etat-Major — Commandement</h2><p className="text-slate-500 text-xs">GPEC, planification strategique et synthese du commandement</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-purple-700 text-white border-purple-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "gpec" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon={<Users size={18} />} label="Total agents" value={AGENTS_DATA.length} color="#3B82F6" />
            <StatCard icon="🎖️" label="Eligible retraite" value={AGENTS_DATA.filter(function (a) { return a.anciennete >= 28; }).length} color="#DC2626" />
            <StatCard icon="⭐" label="Promotions" value={AGENTS_DATA.filter(function (a) { return a.statut === "proposition_promotion"; }).length} color="#F59E0B" />
            <StatCard icon="👑" label="Hauts grades" value={AGENTS_DATA.filter(function (a) { return a.gradeIndex >= 7; }).length} color="#8B5CF6" />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-3">Pyramide des ages — Police & Gendarmerie</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pyramideData} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                  <XAxis type="number" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <YAxis dataKey="tranche" type="category" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
                  <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
                  <Bar dataKey="police" name="Police" fill="#003F87" radius={[0, 4, 4, 0]} barSize={14} />
                  <Bar dataKey="gend" name="Gendarmerie" fill="#1B6B3A" radius={[0, 4, 4, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Vivier de succession — officiers superieurs</p>
            <div className="space-y-1.5">
              {AGENTS_DATA.filter(function (a) { return a.gradeIndex >= 6 && a.statut === "actif"; }).map(function (a) {
                return (<div key={a.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><div className="flex items-center gap-2"><span className="text-yellow-400">⭐</span><span className="text-slate-300 font-semibold">{a.nom}</span></div><div className="flex items-center gap-2"><span className="text-slate-500">{gradeLabel(a)}</span><CorpsBadge corps={a.corps} /></div></div>);
              })}
            </div>
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(AGENTS_DATA.map(function (a) { return { nom: a.nom, corps: a.corps, grade: gradeLabel(a), anciennete: a.anciennete, statut: a.statut }; }));
            callIA(ai1[1], "Genere un plan GPEC 5 ans pour le Commandement des Forces de Police et de la Gendarmerie du Congo. Structure: 1) Diagnostic RH actuel 2) Simulation departs retraite (1 an / 3 ans / 5 ans par corps et grade) 3) Plan de succession postes cles 4) Besoins recrutement annuel par corps et profil 5) Plan de formation 6) KPIs GPEC du Commandement. Donnees: " + ctx);
          }} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">👥 Generer le plan GPEC 5 ans</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}

      {tab === "planification" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4"><p className="text-slate-500 text-xs">Operations planifiees</p><p className="text-white font-black text-3xl mt-1">{EVENTS_DATA.filter(function (e) { return e.statut === "planifie"; }).length}</p></div>
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4"><p className="text-slate-500 text-xs">Taux resolution incidents</p><p className="text-white font-black text-3xl mt-1">{Math.round(INCIDENTS_DATA.filter(function (i) { return i.statut === "cloture"; }).length / INCIDENTS_DATA.length * 100)}%</p></div>
          </div>
          <button onClick={function () {
            var ctx = "Effectifs: " + AGENTS_DATA.length + " | Incidents: " + INCIDENTS_DATA.length + " | Budget: " + BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0) + "M vs " + BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0) + "M reel | Vehicules: " + VEHICULES_DATA.length;
            callIA(ai2[1], "Redige un plan de planification strategique a 3 ANS pour le Commandement CFP/CGN du Congo. Structure formelle: 1) VISION STRATEGIQUE 2027-2029 2) AXES PRIORITAIRES (securisation, modernisation, RH) 3) OBJECTIFS MESURABLES par axe avec indicateurs 4) PLAN D ACTION annuel (2027/2028/2029) 5) RESSOURCES NECESSAIRES 6) RISQUES ET CONTINGENCES 7) MESSAGE AU COMMANDANT: priorite numero 1. Donnees: " + ctx);
          }} className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🗓️ Generer le plan strategique 3 ans</button>
          <AIBloc state={ai2[0]} />
        </div>
      ) : null}

      {tab === "synthese" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <StatCard icon="🚨" label="Incidents actifs" value={INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).length} color="#DC2626" />
            <StatCard icon="🔒" label="GAV en cours" value={GARDES_VUE_DATA.filter(function (g) { return g.statut === "actif"; }).length} color="#F59E0B" />
            <StatCard icon="🚓" label="Patrouilles terrain" value={PATROUILLES_DATA.filter(function (p) { return p.statut !== "base"; }).length} color="#3B82F6" />
            <StatCard icon="👮" label="Agents actifs" value={AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).length} color="#22C55E" />
            <StatCard icon="💰" label="Ecart budget" value={(BUDGET_POSTES.reduce(function (s, p) { return s + (p.reel - p.budget); }, 0) > 0 ? "+" : "") + BUDGET_POSTES.reduce(function (s, p) { return s + (p.reel - p.budget); }, 0) + "M"} color={BUDGET_POSTES.reduce(function (s, p) { return s + (p.reel - p.budget); }, 0) > 0 ? "#DC2626" : "#22C55E"} sub="FCFA" />
            <StatCard icon="📅" label="Ops planifiees" value={EVENTS_DATA.filter(function (e) { return e.statut === "planifie"; }).length} color="#8B5CF6" />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Incidents critiques en cours</p>
            <div className="space-y-1.5">
              {INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique" && i.statut === "en_cours"; }).map(function (inc) {
                return (<div key={inc.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-red-300 font-semibold">{inc.type}</span><div className="flex items-center gap-2"><span className="text-slate-500 truncate max-w-xs">{inc.lieu}</span><CorpsBadge corps={inc.corps} /></div></div>);
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RapportsInstitutionnels(props) {
  var compte = props.compte;
  var tabState = useState("mensuel");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var copiedState = useState(false);
  var copied = copiedState[0]; var setCopied = copiedState[1];
  var SYS = "Tu es redacteur institutionnel de haut niveau pour le Commandement des Forces de Police et de la Gendarmerie Nationale de la Republique du Congo. Tes rapports sont formels, structures, chiffres et destines aux institutions legislatives.";

  function callIA(setter, prompt) { setter({ loading: true, result: null }); fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1500, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); }); }

  function copier(texte) { if (navigator.clipboard) { navigator.clipboard.writeText(texte).then(function () { setCopied(true); setTimeout(function () { setCopied(false); }, 2500); }); } }

  var ctxG = "Incidents=" + INCIDENTS_DATA.length + " (actifs:" + INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).length + ") | GAV=" + GARDES_VUE_DATA.length + " | Patrouilles=" + PATROUILLES_DATA.length + " | Plaintes=" + PLAINTES_DATA.length + " | Agents=" + AGENTS_DATA.length + " | Budget alloue=" + BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0) + "M FCFA | Depenses=" + BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0) + "M FCFA";

  var TABS = [["mensuel", "Rapport Mensuel", "📄"], ["annuel", "Rapport Parlement", "📜"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-900 to-orange-900 border border-amber-700 flex items-center justify-center text-2xl shrink-0">📜</div>
        <div><h2 className="text-2xl font-black text-white">Rapports Institutionnels</h2><p className="text-slate-500 text-xs">Generateur automatique pour l Assemblee Nationale et le Senat — Republique du Congo</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-amber-700 text-white border-amber-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "mensuel" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard icon="🚨" label="Incidents traites" value={INCIDENTS_DATA.length} color="#DC2626" />
            <StatCard icon="📋" label="Plaintes deposees" value={PLAINTES_DATA.length} color="#3B82F6" />
            <StatCard icon="🔒" label="Gardes a vue" value={GARDES_VUE_DATA.length} color="#F59E0B" />
            <StatCard icon="💰" label="Depenses mois" value={BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0) + "M"} color="#22C55E" sub="FCFA" />
          </div>
          <button onClick={function () { callIA(ai1[1], "Redige le rapport mensuel officiel de juin 2026 de la Police Nationale et Gendarmerie Nationale du Congo. Format: OBJET: Rapport mensuel — Juin 2026 | 1) BILAN SECURITAIRE (incidents par type, taux resolution, zones) 2) ACTIVITES OPERATIONNELLES (GAV, plaintes, patrouilles) 3) SITUATION DES EFFECTIFS 4) SITUATION FINANCIERE (execution budgetaire) 5) EVENEMENTS MARQUANTS 6) BESOINS DU MOIS PROCHAIN 7) SIGNATURE du Commandant. Donnees: " + ctxG); }} className="bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📄 Generer le rapport mensuel officiel</button>
          {ai1[0].result ? (
            <div className="bg-slate-900 rounded-2xl border border-amber-800 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2"><span className="text-xl">📄</span><span className="text-amber-400 text-xs font-black uppercase">Rapport Mensuel — Juin 2026</span></div>
                <button onClick={function () { copier(ai1[0].result); }} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold">{copied ? "✓ Copie !" : "Copier"}</button>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{ai1[0].result}</p>
            </div>
          ) : <AIBloc state={ai1[0]} />}
        </div>
      ) : null}

      {tab === "annuel" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-amber-800 p-4">
            <p className="text-amber-400 text-xs font-black uppercase mb-1">Document officiel — Usage parlementaire</p>
            <p className="text-slate-400 text-xs">Ce rapport sera transmis a l Assemblee Nationale et au Senat pour justifier les demandes budgetaires et les plans de developpement des forces de securite 2027.</p>
          </div>
          <button onClick={function () { callIA(ai2[1], "Redige le rapport annuel officiel 2026 de la Police Nationale et Gendarmerie du Congo destine au Parlement. Structure parlementaire: TITRE: RAPPORT ANNUEL D ACTIVITES ET BESOINS — EXERCICE 2026 | EXPOSE DES MOTIFS | 1) BILAN ANNUEL SECURITE NATIONALE 2) MOYENS HUMAINS (effectifs, pyramide ages, departs prevus) 3) MOYENS MATERIELS (parc vehicules, equipements) 4) EXECUTION BUDGETAIRE 2026 5) DEMANDES BUDGETAIRES 2027 (montants detailles, justifications) 6) PLAN RECRUTEMENT 2027 7) PROJETS MODERNISATION 8) RESULTATS ATTENDUS 9) CONCLUSION ET ENGAGEMENTS. Donnees: " + ctxG); }} className="bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">📜 Generer le rapport parlementaire annuel</button>
          {ai2[0].result ? (
            <div className="bg-slate-900 rounded-2xl border border-amber-800 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2"><span className="text-xl">📜</span><span className="text-amber-400 text-xs font-black uppercase">Rapport Parlementaire — 2026</span></div>
                <button onClick={function () { copier(ai2[0].result); }} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold">{copied ? "✓ Copie !" : "Copier"}</button>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{ai2[0].result}</p>
            </div>
          ) : <AIBloc state={ai2[0]} />}
        </div>
      ) : null}
    </div>
  );
}

function PistesIA(props) {
  var compte = props.compte;
  var tabState = useState("conflits");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var ai3 = useState({ loading: false, result: null });
  var ai4 = useState({ loading: false, result: null });
  var SYS = "Tu es conseiller prescriptif de haut niveau du Commandant des Forces de Police et de la Gendarmerie Nationale du Congo. Tes recommandations sont concretes, chiffrees et actionnables dans les 48h. Chaque action doit avoir un responsable, un delai et un indicateur de reussite.";

  function callIA(setter, prompt) { setter({ loading: true, result: null }); fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); }); }

  var TABS = [["conflits", "Gestion des Conflits", "⚔️"], ["detenus", "Gestion des Detenus", "🔒"], ["budget", "Mesures Budgetaires", "💰"], ["strategie", "Vision Strategique", "🎯"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-900 to-orange-900 border border-red-700 flex items-center justify-center text-2xl shrink-0">⚡</div>
        <div><h2 className="text-2xl font-black text-white">Pistes de Solution — IA Prescriptive</h2><p className="text-slate-500 text-xs">Recommandations strategiques et operationnelles pour le Commandement</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-red-700 text-white border-red-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "conflits" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            {INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).map(function (inc) { return (<div key={inc.id} className="border-l-2 pl-3" style={{ borderColor: GRAVITE_COLOR[inc.gravite] }}><p className="text-white text-sm font-semibold">{inc.type}</p><p className="text-slate-500 text-xs">{inc.lieu} — {inc.description}</p></div>); })}
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).map(function (i) { return { type: i.type, lieu: i.lieu, gravite: i.gravite, description: i.description, corps: i.corps }; }));
            callIA(ai1[1], "Fournis des pistes de resolution prescriptives pour chaque conflit/incident actif. Pour chaque incident: 1) STRATEGIE DE RESOLUTION (approche, acteurs, negociation ou force) 2) RESSOURCES A MOBILISER (unites, effectif, equipements) 3) DELAI DE RESOLUTION realiste 4) RISQUES D ESCALADE et mesures preventives 5) PRECEDENTS applicables. CONCLUSION: top 3 incidents a traiter en priorite absolue ce jour avec justification. Incidents actifs: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">⚔️ Obtenir les pistes de resolution des conflits actifs</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}

      {tab === "detenus" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            {GARDES_VUE_DATA.map(function (g) {
              var urg = g.heuresRestantes <= 12 && g.statut === "actif";
              return (<div key={g.id} className={"border rounded-xl p-3 " + (urg ? "border-red-700 bg-red-950/20" : "border-slate-700")}><div className="flex items-start justify-between gap-2"><div><p className={"font-bold text-sm " + (urg ? "text-red-300" : "text-white")}>{g.nom}{urg ? " ⚠️" : ""}</p><p className="text-slate-400 text-xs">Motif: {g.motif} | {g.heuresRestantes}h restantes</p></div><GavTimer heures={g.heuresRestantes} /></div></div>);
            })}
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(GARDES_VUE_DATA.map(function (g) { return { nom: g.nom, motif: g.motif, heuresRestantes: g.heuresRestantes, statut: g.statut }; }));
            callIA(ai2[1], "Fournis une analyse prescriptive des gardes a vue pour le Commandant. Pour chaque cas: 1) DECISION RECOMMANDEE (Liberation / Parquet / Prolongation / Hopital / Mise en examen) avec justification juridique 2) RISQUE LEGAL pour l Etat 3) ACTION dans la prochaine heure pour les cas urgents. BILAN: nombre de dossiers en risque de vice de procedure, recommandation de convocation d urgence du Parquet si necessaire. Donnees: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔒 Obtenir les decisions prescriptives GAV</button>
          <AIBloc state={ai2[0]} />
        </div>
      ) : null}

      {tab === "budget" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            {BUDGET_POSTES.filter(function (p) { return p.reel > p.budget; }).map(function (p) { var ec = p.reel - p.budget; return (<div key={p.poste} className="border-l-2 border-red-600 pl-3"><p className="text-red-300 font-bold text-sm">{p.poste}: +{ec}M FCFA (+{((ec / p.budget) * 100).toFixed(0)}%)</p><p className="text-slate-500 text-xs">Budget: {p.budget}M | Reel: {p.reel}M FCFA</p></div>); })}
          </div>
          <button onClick={function () {
            callIA(ai3[1], "Fournis des mesures correctives budgetaires prescriptives pour le Commandant CFP. Pour chaque poste en derapage: 1) MESURE CORRECTIVE IMMEDIATE avec responsable et delai 2) ECONOMIES REALISABLES en FCFA 3) IMPACT sur les operations. Plan global: redressement budgetaire 30 jours, postes a geler, simulation de l equilibre si mesures appliquees. Donnees: " + JSON.stringify(BUDGET_POSTES));
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">💰 Obtenir les mesures correctives budgetaires</button>
          <AIBloc state={ai3[0]} />
        </div>
      ) : null}

      {tab === "strategie" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon="🎯" label="Taux resolution" value={Math.round(INCIDENTS_DATA.filter(function (i) { return i.statut === "cloture"; }).length / INCIDENTS_DATA.length * 100) + "%"} color="#22C55E" />
            <StatCard icon="⚡" label="GAV critiques" value={GARDES_VUE_DATA.filter(function (g) { return g.heuresRestantes <= 6; }).length} color="#DC2626" />
            <StatCard icon="📊" label="Budget exe." value={Math.round(BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0) / BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0) * 100) + "%"} color="#F59E0B" />
          </div>
          <button onClick={function () {
            var ctx = "Incidents actifs=" + INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).length + " | Taux resolution=" + Math.round(INCIDENTS_DATA.filter(function (i) { return i.statut === "cloture"; }).length / INCIDENTS_DATA.length * 100) + "% | Agents actifs=" + AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).length + "/" + AGENTS_DATA.length + " | Budget execution=" + Math.round(BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0) / BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0) * 100) + "% | Vehicules dispo=" + VEHICULES_DATA.filter(function (v) { return v.statut !== "maintenance"; }).length + "/" + VEHICULES_DATA.length;
            callIA(ai4[1], "Vision strategique prescriptive complete pour le Commandant CFP/CGN du Congo. Structure: 1) DIAGNOSTIC SWOT (Forces/Faiblesses/Opportunites/Menaces) 2) TOP 5 PRIORITES STRATEGIQUES 90 jours (avec indicateur reussite) 3) DECISIONS CLE a prendre cette semaine 4) RESSOURCES CRITIQUES a securiser 5) RISQUES MAJEURS pour la securite nationale 6) MESSAGE AU COMMANDANT: en une phrase, priorite numero 1 aujourd hui. KPIs: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🎯 Obtenir la vision strategique prescriptive</button>
          <AIBloc state={ai4[0]} />
        </div>
      ) : null}
    </div>
  );
}

var COMMANDEMENTS_TERRITORIAUX_DATA = [
  { nom: "Brazzaville", commandant: "Commissaire Divisionnaire OKEMBA Marcel", effectif: 1240, statut: "operationnel" },
  { nom: "Pointe-Noire", commandant: "Commissaire Divisionnaire BALOU Christine", effectif: 980, statut: "operationnel" },
  { nom: "Bouenza", commandant: "Commissaire Principal MABIALA Joseph", effectif: 210, statut: "operationnel" },
  { nom: "Niari", commandant: "Commissaire Principal NGOMA Felix", effectif: 195, statut: "operationnel" },
  { nom: "Pool", commandant: "Commissaire Principal BIKINDOU Andre", effectif: 240, statut: "vigilance_renforcee" },
  { nom: "Djoue-Lefini", commandant: "Commissaire MALONGA Patrick", effectif: 130, statut: "operationnel" },
  { nom: "Plateaux", commandant: "Commissaire Principal ELENGA Suzanne", effectif: 175, statut: "operationnel" },
  { nom: "Cuvette Centrale", commandant: "Commissaire Principal IBARA Daniel", effectif: 160, statut: "operationnel" },
  { nom: "Cuvette Est", commandant: "Commissaire MOUKALA Rose", effectif: 110, statut: "operationnel" },
  { nom: "Sangha", commandant: "Commissaire OBALA Etienne", effectif: 95, statut: "effectifs_reduits" },
  { nom: "Likouala", commandant: "Commissaire NGAKOSSO Albertine", effectif: 105, statut: "effectifs_reduits" }
];
var STATUT_COMMANDEMENT_COLOR = { operationnel: "#22C55E", vigilance_renforcee: "#F59E0B", effectifs_reduits: "#DC2626" };
var STATUT_COMMANDEMENT_LABEL = { operationnel: "Operationnel", vigilance_renforcee: "Vigilance renforcee", effectifs_reduits: "Effectifs reduits" };

var GROUPES_INTERVENTION_DATA = [
  { id: "GI-BAC", nom: "Brigade Anti-Criminelle", sigle: "BAC", effectif: 85, chef: "Commissaire Principal NGOYI Bertrand", zone: "Brazzaville et Pointe-Noire", statut: "deploye", mission: "Surveillance renforcee du Marche Total suite a la hausse des vols a main armee." },
  { id: "GI-BSIR", nom: "Brigade Speciale d Intervention et de Repression", sigle: "BSIR", effectif: 60, chef: "Commissaire Principal LIKIBI Aristide", zone: "Brazzaville", statut: "alerte", mission: "En alerte pour appui aux commandements territoriaux en cas de trouble grave a l ordre public." },
  { id: "GI-UI", nom: "Unite d Intervention", sigle: "UI", effectif: 70, chef: "Commissaire Principal MAVOUNGOU Cherubin", zone: "Pointe-Noire et zone portuaire", statut: "deploye", mission: "Renforcement du dispositif de securite de la zone portuaire." }
];
var STATUT_GI_COLOR = { deploye: "#F59E0B", alerte: "#DC2626", garnison: "#22C55E" };
var STATUT_GI_LABEL = { deploye: "Deploye sur le terrain", alerte: "En alerte — pret a intervenir", garnison: "En garnison" };

var DIRECTIONS_CENTRALES_CFP = [
  { role: "judiciaire", nom: "Direction de la Police Judiciaire (DPJ)", sousServices: ["INTERPOL Brazzaville"] },
  { role: "renseignement", nom: "Direction des Renseignements Generaux (DRG)", sousServices: [] }
];
var SERVICES_SOUS_CFP = [
  { role: "commissariat", nom: "Commissariats de Police" },
  { role: "accidents", nom: "Bureau Controle Accidents" },
  { role: "navale", nom: "Police Navale" },
  { role: "operations", nom: "Operations & Maintien de l Ordre" },
  { role: "controle", nom: "Controle Voyageurs & Frontieres" }
];

function DashboardCFP(props) {
  var compte = props.compte;
  var detailState = useState(null);
  var detail = detailState[0]; var setDetail = detailState[1];

  var corpsCible = compte.corps === "Gendarmerie" ? "Gendarmerie" : "Police";
  function estDuCorpsCommande(g) { var estGend = g.auteur.toLowerCase().indexOf("gendarmerie") >= 0; return corpsCible === "Police" ? !estGend : estGend; }

  var incidentsActifs = INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours" && i.corps === corpsCible; }).length;
  var gavActives = GARDES_VUE_DATA.filter(function (g) { return (g.statut === "actif" || g.statut === "prolonge") && estDuCorpsCommande(g); }).length;
  var gavCritiques = GARDES_VUE_DATA.filter(function (g) { return g.heuresRestantes <= 6 && g.statut === "actif" && estDuCorpsCommande(g); }).length;
  var patrouillesTerrain = PATROUILLES_DATA.filter(function (p) { return p.statut !== "base" && p.corps === corpsCible; }).length;
  var totalPatrouillesPolice = PATROUILLES_DATA.filter(function (p) { return p.corps === corpsCible; }).length;
  var effectifsActifs = AGENTS_DATA.filter(function (a) { return a.statut === "actif" && a.corps === corpsCible; }).length;
  var totalAgents = AGENTS_DATA.filter(function (a) { return a.corps === corpsCible; }).length;
  var policeCount = totalAgents;

  var graviteData = [
    { name: "Critique", value: INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique" && i.corps === corpsCible; }).length, color: GRAVITE_COLOR.critique },
    { name: "Grave", value: INCIDENTS_DATA.filter(function (i) { return i.gravite === "grave" && i.corps === corpsCible; }).length, color: GRAVITE_COLOR.grave },
    { name: "Moyen", value: INCIDENTS_DATA.filter(function (i) { return i.gravite === "moyen" && i.corps === corpsCible; }).length, color: GRAVITE_COLOR.moyen }
  ];
  var giData = GROUPES_INTERVENTION_DATA.map(function (g) { return { name: g.sigle, value: g.effectif, color: STATUT_GI_COLOR[g.statut] }; });
  var statutAgentsData = [
    { name: "Actifs", value: AGENTS_DATA.filter(function (a) { return a.corps === corpsCible && a.statut === "actif"; }).length, color: "#22C55E" },
    { name: "Conge", value: AGENTS_DATA.filter(function (a) { return a.corps === corpsCible && a.statut === "conge"; }).length, color: "#3B82F6" },
    { name: "Autre", value: AGENTS_DATA.filter(function (a) { return a.corps === corpsCible && a.statut !== "actif" && a.statut !== "conge"; }).length, color: "#F59E0B" }
  ];

  var incidentsCritiques = INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique" && i.statut === "en_cours" && i.corps === corpsCible; }).slice(0, 4);
  var today = new Date(); today.setHours(0, 0, 0, 0);
  var echeancesDuJour = EVENTS_DATA.filter(function (e) { var dt = new Date(e.date + "T00:00:00"); return Math.round((dt - today) / 86400000) === 0 && e.statut === "planifie"; }).slice(0, 4);

  function toggleDetail(id) { setDetail(detail === id ? null : id); }

  var engorgementAI = useState({ loading: false, result: null });
  var SYS_CFP = "Tu es l assistant d aide a la decision du Commandant des Forces de " + corpsCible + " de la Republique du Congo. Tu reponds en francais, de maniere structuree, concise et directement actionnable.";
  function callIA_CFP(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS_CFP, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur de reponse." }); }).catch(function () { setter({ loading: false, result: "Erreur de connexion a l API IA." }); });
  }

  var groupesState = useState([
    { id: "GT-001", titre: "Operation Port de Brazzaville", services: ["DAF", "DPJ", "Logistique"], dateCreation: "2026-06-18", messages: [{ auteur: "DPJ", texte: "Premiers elements de l enquete transmis au groupe.", date: "2026-06-18 10:05" }, { auteur: "Logistique", texte: "2 vehicules supplementaires mis a disposition pour la zone portuaire.", date: "2026-06-18 14:30" }] },
    { id: "GT-002", titre: "Securisation Sommet Regional", services: ["DAF", "Personnel", "Logistique"], dateCreation: "2026-06-15", messages: [{ auteur: "Personnel", texte: "Plan de roulement des effectifs valide pour la semaine du sommet.", date: "2026-06-15 09:00" }] }
  ]);
  var groupes = groupesState[0]; var setGroupes = groupesState[1];
  var groupeFormState = useState(false);
  var groupeFormOuvert = groupeFormState[0]; var setGroupeFormOuvert = groupeFormState[1];
  var nouveauGroupeTitreState = useState("");
  var nouveauGroupeTitre = nouveauGroupeTitreState[0]; var setNouveauGroupeTitre = nouveauGroupeTitreState[1];
  var nouveauGroupeServicesState = useState([]);
  var nouveauGroupeServices = nouveauGroupeServicesState[0]; var setNouveauGroupeServices = nouveauGroupeServicesState[1];
  var groupeActifState = useState(null);
  var groupeActif = groupeActifState[0]; var setGroupeActif = groupeActifState[1];
  var messageTexteState = useState("");
  var messageTexte = messageTexteState[0]; var setMessageTexte = messageTexteState[1];
  var SERVICES_DISPONIBLES = ["DAF", "DPJ", "Logistique", "Personnel", "Renseignements", "Academie"];

  function toggleServiceGroupe(s) {
    setNouveauGroupeServices(function (prev) { return prev.indexOf(s) >= 0 ? prev.filter(function (x) { return x !== s; }) : prev.concat([s]); });
  }
  function creerGroupe() {
    if (!nouveauGroupeTitre.trim() || nouveauGroupeServices.length === 0) { return; }
    var g = { id: "GT-" + Date.now(), titre: nouveauGroupeTitre, services: nouveauGroupeServices, dateCreation: new Date().toISOString().slice(0, 10), messages: [] };
    setGroupes(function (prev) { return [g].concat(prev); });
    setNouveauGroupeTitre(""); setNouveauGroupeServices([]); setGroupeFormOuvert(false);
  }
  function envoyerMessageGroupe(id) {
    if (!messageTexte.trim()) { return; }
    setGroupes(function (prev) { return prev.map(function (g) { if (g.id !== id) { return g; } var c = {}; for (var k in g) { c[k] = g[k]; } c.messages = g.messages.concat([{ auteur: compte.service, texte: messageTexte, date: new Date().toLocaleString("fr-FR") }]); return c; }); });
    setMessageTexte("");
  }

  var drgAlerteOuverteState = useState(null);
  var drgAlerteOuverte = drgAlerteOuverteState[0]; var setDrgAlerteOuverte = drgAlerteOuverteState[1];
  var TENDANCES_DRG = [
    { id: "TD1", titre: "Tensions en hausse au secteur portuaire", domaine: "economique", niveau: "eleve", lieu: "Zone portuaire, Pointe-Noire", synthese: "Accumulation des retards de paiement chez les dockers et rupture d approvisionnement signalee sur le marche local. Risque de mouvement social a surveiller dans les 7 jours." },
    { id: "TD2", titre: "Mouvements suspects en zone frontaliere", domaine: "securitaire", niveau: "critique", lieu: "Zone portuaire, Pointe-Noire", synthese: "Vehicules non identifies observes a plusieurs reprises pres du poste frontalier sans manifeste declare. Surveillance renforcee en cours, dossier transmis pour validation de transfert." },
    { id: "TD3", titre: "Mobilisation citoyenne en preparation", domaine: "social", niveau: "eleve", lieu: "Bacongo, Brazzaville", synthese: "Appel a manifester relaye massivement sur les reseaux sociaux suite a la hausse du prix du carburant. Forte capacite de mobilisation rapide observee." }
  ];

  var REACTIVITE_24H = [
    { heure: "00h", minutes: 14 }, { heure: "02h", minutes: 12 }, { heure: "04h", minutes: 11 }, { heure: "06h", minutes: 15 },
    { heure: "08h", minutes: 19 }, { heure: "10h", minutes: 22 }, { heure: "12h", minutes: 26 }, { heure: "14h", minutes: 24 },
    { heure: "16h", minutes: 28 }, { heure: "18h", minutes: 32 }, { heure: "20h", minutes: 29 }, { heure: "22h", minutes: 20 }
  ];
  var dernierePoint = REACTIVITE_24H[REACTIVITE_24H.length - 1].minutes;
  var pointPrecedent = REACTIVITE_24H[REACTIVITE_24H.length - 2].minutes;
  var tendanceHausse = dernierePoint >= pointPrecedent;

  var KPIS = [
    { id: "incidents", icon: <Siren size={18} />, label: "Incidents actifs", value: incidentsActifs, sub: "Toutes unites", color: "#DC2626" },
    { id: "gardesvue", icon: <Lock size={18} />, label: "Gardes a vue", value: gavActives, sub: gavCritiques + " en delai critique", color: "#F59E0B" },
    { id: "patrouilles", icon: <Car size={18} />, label: "Patrouilles deployees", value: patrouillesTerrain, sub: corpsCible, color: "#3B82F6" },
    { id: "effectifs", icon: <Users size={18} />, label: "Effectifs en service", value: effectifsActifs, sub: totalAgents + " agents geres", color: "#16A34A" }
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Centre de Commandement — {corpsCible === "Police" ? "CFP" : "CGN"}</h2><p className="text-slate-400 text-sm">{compte.service} — {corpsCible} Nationale uniquement</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">Systeme operationnel</span></div>
      </div>
      {corpsCible === "Police" ? (
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-3 flex items-center gap-2 flex-wrap">
          <span className="text-slate-500 text-xs font-bold shrink-0">Commandement territorial :</span>
          {COMMANDEMENTS_TERRITORIAUX_DATA.map(function (c) { return <Chip key={c.nom} color={STATUT_COMMANDEMENT_COLOR[c.statut]}>{c.nom}</Chip>; })}
          {props.onNavigate ? <button onClick={function () { props.onNavigate("territorial"); }} className="text-purple-400 text-xs font-bold underline ml-1">Voir le detail →</button> : null}
        </div>
      ) : null}
      {corpsCible === "Police" ? (
        <div className="bg-purple-950/40 rounded-2xl border border-purple-800 p-3 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-purple-300 font-bold shrink-0">Directions Centrales du CFP :</span>
          <Chip color="#8B5CF6">Police Judiciaire (DPJ) — dont INTERPOL Brazzaville</Chip>
          <Chip color="#581C87">Renseignements Generaux (DRG)</Chip>
          <span className="text-slate-500">— seul le CGN (Gendarmerie) est autonome</span>
        </div>
      ) : null}
      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="text-white font-bold text-sm">Reactivite des unites — 24 dernieres heures</p>
          <Chip color={tendanceHausse ? "#DC2626" : "#22C55E"}>{tendanceHausse ? "⚠ En hausse" : "✓ Stable"}</Chip>
        </div>
        <p className="text-slate-500 text-xs mb-3">Temps moyen d intervention (minutes) — si la courbe monte, les unites sont surchargees</p>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REACTIVITE_24H}>
              <defs><linearGradient id="reactGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F59E0B" stopOpacity={0.5} /><stop offset="95%" stopColor="#F59E0B" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="heure" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} unit="min" />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + " min"]; }} />
              <Area type="monotone" dataKey="minutes" stroke="#F59E0B" fill="url(#reactGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-indigo-800 p-5">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <p className="text-white font-bold text-sm flex items-center gap-2">🧭 Anticipation IA — Risque d engorgement (3h a venir)</p>
          {(function () {
            var chargeUnites = totalPatrouillesPolice > 0 ? Math.round((patrouillesTerrain / totalPatrouillesPolice) * 100) : 0;
            var score = Math.min(100, Math.round(chargeUnites * 0.5 + incidentsActifs * 8 + gavCritiques * 6 + (tendanceHausse ? 15 : 0)));
            var col = score < 40 ? "#22C55E" : score < 70 ? "#F59E0B" : "#DC2626";
            var lbl = score < 40 ? "Risque faible" : score < 70 ? "Risque modere" : "Risque eleve";
            return <Chip color={col}>{lbl} — {score}/100</Chip>;
          })()}
        </div>
        <p className="text-slate-500 text-xs mb-3">Score predictif calcule a partir de la charge des unites, des incidents en cours et de la tendance de reactivite — anticipe l engorgement avant qu il ne se traduise par une hausse du temps d intervention</p>
        <button onClick={function () {
          var chargeUnites = totalPatrouillesPolice > 0 ? Math.round((patrouillesTerrain / totalPatrouillesPolice) * 100) : 0;
          var score = Math.min(100, Math.round(chargeUnites * 0.5 + incidentsActifs * 8 + gavCritiques * 6 + (tendanceHausse ? 15 : 0)));
          var ctx = "Score de risque d engorgement: " + score + "/100 | Charge des patrouilles deployees: " + chargeUnites + "% | Incidents actifs: " + incidentsActifs + " | GAV en delai critique: " + gavCritiques + " | Tendance du temps d intervention: " + (tendanceHausse ? "en hausse" : "stable") + " | Patrouilles: " + JSON.stringify(PATROUILLES_DATA.map(function (p) { return { designation: p.designation, zone: p.zone, statut: p.statut }; }));
          callIA_CFP(engorgementAI[1], "Sur la base du score de risque d engorgement et des donnees operationnelles, propose un redeploiement preventif des patrouilles pour les 3 prochaines heures, AVANT que le temps d intervention ne se degrade. Format: 1) ZONES A RENFORCER EN PRIORITE (avec justification chiffree) 2) UNITES A REDEPLOYER (lesquelles, depuis ou) 3) DELAI D ACTION RECOMMANDE. Donnees: " + ctx);
        }} className="bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold">⚡ Generer la recommandation de redeploiement</button>
        <AIBloc state={engorgementAI[0]} />
      </div>
      <p className="text-slate-600 text-xs">Cliquez sur un indicateur pour afficher le detail</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map(function (kpi) {
          var isActive = detail === kpi.id;
          return (
            <button key={kpi.id} onClick={function () { toggleDetail(kpi.id); }} style={{ outline: isActive ? "2px solid " + kpi.color : "none", outlineOffset: "2px" }} className="text-left rounded-2xl w-full">
              <StatCard icon={kpi.icon} label={kpi.label} value={kpi.value} sub={kpi.sub} color={kpi.color} />
            </button>
          );
        })}
      </div>

      {detail === "incidents" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-red-800 p-5 animate-in">
          <div className="flex items-center justify-between mb-3"><p className="text-red-300 font-black text-sm">Incidents actifs — Detail complet</p><button onClick={function () { setDetail(null); }} className="text-slate-500 hover:text-white text-xs border border-slate-700 px-2 py-1 rounded-lg">Fermer ✕</button></div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {INCIDENTS_DATA.filter(function (i) { return i.statut === "en_cours"; }).map(function (inc) {
              return (<div key={inc.id} className="border border-slate-700 rounded-xl p-3"><div className="flex items-start justify-between gap-2"><div><div className="flex items-center gap-2 flex-wrap"><span className="text-white font-bold text-sm">{inc.type}</span><Chip color={GRAVITE_COLOR[inc.gravite]}>{inc.gravite}</Chip><CorpsBadge corps={inc.corps} /></div><p className="text-slate-400 text-xs">{inc.lieu}</p><p className="text-slate-600 text-xs">{inc.id} — {inc.description}</p></div></div></div>);
            })}
          </div>
        </div>
      ) : null}

      {detail === "gardesvue" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-amber-800 p-5">
          <div className="flex items-center justify-between mb-3"><p className="text-amber-300 font-black text-sm">Gardes a Vue — Suivi temps reel</p><button onClick={function () { setDetail(null); }} className="text-slate-500 hover:text-white text-xs border border-slate-700 px-2 py-1 rounded-lg">Fermer ✕</button></div>
          <div className="space-y-3 max-h-64 overflow-auto">
            {GARDES_VUE_DATA.filter(function (g) { return g.statut !== "libere"; }).map(function (g) {
              return (<div key={g.id} className={"border rounded-xl p-3 " + (g.heuresRestantes <= 6 ? "border-red-700" : "border-slate-700")}><div className="flex items-start justify-between mb-2"><div><span className="text-white font-bold text-sm">{g.nom}</span><p className="text-slate-400 text-xs">Motif: {g.motif} — {g.unite}</p></div><Chip color={g.statut === "prolonge" ? "#8B5CF6" : g.heuresRestantes <= 6 ? "#DC2626" : "#F59E0B"}>{g.statut}</Chip></div><GavTimer heures={g.heuresRestantes} /></div>);
            })}
          </div>
        </div>
      ) : null}

      {detail === "patrouilles" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-blue-800 p-5">
          <div className="flex items-center justify-between mb-3"><p className="text-blue-300 font-black text-sm">Patrouilles — Deploiement en cours</p><button onClick={function () { setDetail(null); }} className="text-slate-500 hover:text-white text-xs border border-slate-700 px-2 py-1 rounded-lg">Fermer ✕</button></div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {PATROUILLES_DATA.map(function (p) {
              var col = p.statut === "intervention" ? "#DC2626" : p.statut === "terrain" ? "#22C55E" : "#64748B";
              return (<div key={p.id} className="border border-slate-700 rounded-xl p-3 flex items-center justify-between"><div><div className="flex items-center gap-2"><span style={{ color: col }} className="font-black">{p.designation}</span><CorpsBadge corps={p.corps} /></div><p className="text-slate-400 text-xs">{p.zone} — Chef: {p.chef}</p><p className="text-slate-500 text-xs">{p.effectif} agents — {p.vehicule}</p></div><Chip color={col}>{STATUT_PATROUILLE_LABEL[p.statut]}</Chip></div>);
            })}
          </div>
        </div>
      ) : null}

      {detail === "effectifs" ? (
        <div className="bg-slate-800/90 rounded-2xl border border-green-800 p-5">
          <div className="flex items-center justify-between mb-3"><p className="text-green-300 font-black text-sm">Effectifs — Etat du personnel</p><button onClick={function () { setDetail(null); }} className="text-slate-500 hover:text-white text-xs border border-slate-700 px-2 py-1 rounded-lg">Fermer ✕</button></div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[["Actifs", "actif", "#22C55E"], ["En conge", "conge", "#3B82F6"], ["En promotion", "proposition_promotion", "#F59E0B"], ["Sanction", "sanction", "#DC2626"]].map(function (s) {
              return (<div key={s[0]} className="border border-slate-700 rounded-xl p-3"><p className="text-slate-500 text-xs">{s[0]}</p><p style={{ color: s[2] }} className="font-black text-xl">{AGENTS_DATA.filter(function (a) { return a.statut === s[1]; }).length}</p></div>);
            })}
          </div>
          <div className="space-y-1 max-h-40 overflow-auto">
            {AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).map(function (a) {
              return (<div key={a.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300 truncate">{a.nom}</span><div className="flex items-center gap-2 shrink-0"><span className="text-slate-500">{gradeLabel(a)}</span><CorpsBadge corps={a.corps} /></div></div>);
            })}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Incidents par gravite</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={graviteData} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} cursor={{ fill: "#1E293B" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>{graviteData.map(function (entry, index) { return <Cell key={index} fill={entry.color} />; })}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">{corpsCible === "Police" ? "Effectifs des Groupes d Intervention" : "Effectifs par statut"}</p>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={corpsCible === "Police" ? giData : statutAgentsData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={3} stroke="none">{(corpsCible === "Police" ? giData : statutAgentsData).map(function (entry, index) { return <Cell key={index} fill={entry.color} />; })}</Pie><Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} /></PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><span className="text-white text-2xl font-black">{corpsCible === "Police" ? GROUPES_INTERVENTION_DATA.reduce(function (s, g) { return s + g.effectif; }, 0) : totalAgents}</span><span className="text-slate-500 text-xs uppercase">Agents</span></div>
          </div>
          <div className="flex justify-center gap-3 mt-1 flex-wrap">
            {corpsCible === "Police" ? GROUPES_INTERVENTION_DATA.map(function (g) { return <span key={g.id} className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full" style={{ background: STATUT_GI_COLOR[g.statut] }}></span>{g.sigle} ({g.effectif})</span>; }) : statutAgentsData.map(function (s) { return <span key={s.name} className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full" style={{ background: s.color }}></span>{s.name} ({s.value})</span>; })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Incidents critiques en cours</p>
          {incidentsCritiques.length === 0 ? <p className="text-slate-500 text-sm">Aucun incident critique.</p> : <div className="space-y-2">{incidentsCritiques.map(function (inc) { return (<div key={inc.id} className="flex items-center justify-between gap-2 border-l-2 pl-2.5" style={{ borderColor: GRAVITE_COLOR[inc.gravite] }}><div><p className="text-white text-sm font-semibold">{inc.type}</p><p className="text-slate-500 text-xs">{inc.lieu}</p></div><CorpsBadge corps={inc.corps} /></div>); })}</div>}
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Echeances du jour</p>
          {echeancesDuJour.length === 0 ? <p className="text-slate-500 text-sm">Aucune echeance aujourd hui.</p> : <div className="space-y-2">{echeancesDuJour.map(function (e) { return (<div key={e.id} className="flex items-center justify-between gap-2 border-l-2 pl-2.5" style={{ borderColor: TYPE_COLOR[e.type] }}><div><p className="text-white text-sm font-semibold">{e.titre}</p><p className="text-slate-500 text-xs">{e.heure} — {e.lieu}</p></div><Chip color={TYPE_COLOR[e.type]}>{TYPE_LABEL[e.type]}</Chip></div>); })}</div>}
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <p className="text-white font-bold text-sm">🤝 Coordination Inter-Services</p>
          <button onClick={function () { setGroupeFormOuvert(!groupeFormOuvert); }} className="bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold">{groupeFormOuvert ? "Annuler" : "+ Creer un groupe de travail"}</button>
        </div>
        <p className="text-slate-500 text-xs mb-3">Groupes de travail temporaires reunissant plusieurs directions sans deplacement physique</p>
        {groupeFormOuvert ? (
          <div className="bg-slate-900 rounded-xl border border-slate-700 p-3 mb-3 space-y-2">
            <input value={nouveauGroupeTitre} onChange={function (e) { setNouveauGroupeTitre(e.target.value); }} placeholder="Ex: Operation Port de Brazzaville..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm" />
            <div className="flex gap-1.5 flex-wrap">
              {SERVICES_DISPONIBLES.map(function (s) {
                var sel = nouveauGroupeServices.indexOf(s) >= 0;
                return <button key={s} onClick={function () { toggleServiceGroupe(s); }} className={"px-2.5 py-1 rounded-full text-xs font-bold border " + (sel ? "bg-blue-700 border-blue-600 text-white" : "border-slate-700 text-slate-500")}>{s}</button>;
              })}
            </div>
            <button onClick={creerGroupe} className="bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold">Creer le groupe</button>
          </div>
        ) : null}
        <div className="space-y-2">
          {groupes.map(function (g) {
            var isOuvert = groupeActif === g.id;
            return (
              <div key={g.id} className="border border-slate-700 rounded-xl p-3">
                <div className="flex items-center justify-between gap-2 flex-wrap cursor-pointer" onClick={function () { setGroupeActif(isOuvert ? null : g.id); }}>
                  <div>
                    <p className="text-white font-bold text-sm">{g.titre}</p>
                    <div className="flex items-center gap-1.5 flex-wrap mt-1">{g.services.map(function (s) { return <Chip key={s} color="#3B82F6">{s}</Chip>; })}</div>
                  </div>
                  <span className="text-slate-500 text-xs shrink-0">{g.messages.length} message{g.messages.length > 1 ? "s" : ""} — {isOuvert ? "▲" : "▼"}</span>
                </div>
                {isOuvert ? (
                  <div className="mt-3 border-t border-slate-800 pt-2 space-y-2">
                    <div className="space-y-1.5 max-h-32 overflow-auto">
                      {g.messages.map(function (m, idx) {
                        return (<div key={idx} className="text-xs"><span className="text-blue-400 font-bold">{m.auteur}</span><span className="text-slate-600"> — {m.date}</span><p className="text-slate-300">{m.texte}</p></div>);
                      })}
                      {g.messages.length === 0 ? <p className="text-slate-600 text-xs">Aucune ressource partagee pour le moment.</p> : null}
                    </div>
                    <div className="flex gap-2">
                      <input value={messageTexte} onChange={function (e) { setMessageTexte(e.target.value); }} onKeyDown={function (e) { if (e.key === "Enter") { envoyerMessageGroupe(g.id); } }} placeholder="Partager une ressource ou un message au groupe..." className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-xs" />
                      <button onClick={function () { envoyerMessageGroupe(g.id); }} className="bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold">Envoyer</button>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-900/80 rounded-2xl border border-purple-800 p-5">
        <div className="flex items-center gap-2 mb-1"><Lock size={14} className="text-purple-400" /><p className="text-purple-300 font-bold text-sm">Indicateurs DRG — Veille et Signaux Faibles</p></div>
        <p className="text-slate-500 text-xs mb-3">Cloisonnement actif : seules les tendances et syntheses validees par la DRG sont visibles ici. Cliquez sur une tendance pour ouvrir la fiche de synthese securisee correspondante.</p>
        <div className="space-y-2 mb-4">
          {TENDANCES_DRG.map(function (t) {
            var isOuvert = drgAlerteOuverte === t.id;
            return (
              <div key={t.id}>
                <div onClick={function () { setDrgAlerteOuverte(isOuvert ? null : t.id); }} className="flex items-center justify-between gap-2 text-xs border-b border-slate-800 pb-1.5 cursor-pointer hover:bg-slate-800/50 rounded px-1">
                  <span className="text-slate-300">{t.titre}</span>
                  <Chip color={NIVEAU_RENS_COLOR[t.niveau]}>{NIVEAU_RENS_LABEL[t.niveau]}</Chip>
                </div>
                {isOuvert ? (
                  <div className="bg-slate-950 rounded-xl border border-purple-800 p-3 mt-1.5 mb-1.5">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5"><Chip color={DOMAINE_RENS_COLOR[t.domaine]}>{DOMAINE_RENS_LABEL[t.domaine]}</Chip><span className="text-slate-500 text-xs">{t.lieu}</span></div>
                    <p className="text-slate-300 text-xs leading-relaxed">{t.synthese}</p>
                    <p className="text-purple-500 text-[10px] mt-1.5">🔒 Fiche de synthese securisee — source et fiches brutes non communiquees</p>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <p className="text-purple-300 font-black text-[10px] uppercase mb-1">Notes de synthese transmises et accusees de reception</p>
        <div className="space-y-2">
          {NOTES_TRANSMISES_DATA.filter(function (n) { return n.statut === "accuse_reception"; }).slice(0, 3).map(function (n) {
            return (<div key={n.id} className="flex items-center justify-between gap-2 text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-300">{n.titre}</span><Chip color={NIVEAU_RENS_COLOR[n.niveau]}>{NIVEAU_RENS_LABEL[n.niveau]}</Chip></div>);
          })}
        </div>
      </div>
    </div>
  );
}

function CommandementTerritorialCFP(props) {
  var compte = props.compte;
  var tabState = useState("territoires");
  var tab = tabState[0]; var setTab = tabState[1];
  var TABS = [["territoires", "Commandements Territoriaux", "🗺️"], ["intervention", "Groupes d Intervention", "🚨"], ["services", "Services sous Commandement", "🏛️"]];
  var totalEffectifTerritorial = COMMANDEMENTS_TERRITORIAUX_DATA.reduce(function (s, c) { return s + c.effectif; }, 0);
  var totalEffectifGI = GROUPES_INTERVENTION_DATA.reduce(function (s, g) { return s + g.effectif; }, 0);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-black text-white">Commandement Territorial de la Police</h2>
        <p className="text-slate-500 text-xs">{compte.service} — autorite exercee exclusivement sur les forces de Police. La Gendarmerie Nationale releve d un commandement distinct (CGN).</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="🗺️" label="Commandements territoriaux" value={COMMANDEMENTS_TERRITORIAUX_DATA.length} color="#3B82F6" />
        <StatCard icon="👮" label="Effectifs territoriaux" value={totalEffectifTerritorial} color="#22C55E" />
        <StatCard icon="🚨" label="Effectifs Groupes d Intervention" value={totalEffectifGI} color="#F59E0B" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-blue-700 text-white border-blue-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "territoires" ? (
        <div className="space-y-2">
          {COMMANDEMENTS_TERRITORIAUX_DATA.map(function (c) {
            return (
              <div key={c.nom} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center justify-between gap-2 flex-wrap">
                <div><p className="text-white font-bold text-sm">{c.nom}</p><p className="text-slate-500 text-xs">{c.commandant}</p></div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-300 text-sm font-bold">{c.effectif} agents</span>
                  <Chip color={STATUT_COMMANDEMENT_COLOR[c.statut]}>{STATUT_COMMANDEMENT_LABEL[c.statut]}</Chip>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "intervention" ? (
        <div className="space-y-3">
          {GROUPES_INTERVENTION_DATA.map(function (g) {
            return (
              <div key={g.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <p className="text-white font-bold text-sm">{g.nom} ({g.sigle})</p>
                    <p className="text-slate-500 text-xs">Chef : {g.chef} — Zone : {g.zone}</p>
                  </div>
                  <Chip color={STATUT_GI_COLOR[g.statut]}>{STATUT_GI_LABEL[g.statut]}</Chip>
                </div>
                <p className="text-slate-300 text-xs mt-2"><span className="text-slate-500 font-bold">Mission actuelle : </span>{g.mission}</p>
                <p className="text-slate-600 text-xs mt-1">Effectif : {g.effectif} agents</p>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "services" ? (
        <div className="space-y-4">
          <div>
            <p className="text-purple-300 font-black text-xs uppercase mb-2">Directions Centrales du Commandement des Forces de Police</p>
            <div className="space-y-2">
              {DIRECTIONS_CENTRALES_CFP.map(function (d) {
                return (
                  <div key={d.role} className="bg-slate-800/90 rounded-2xl border border-purple-800 p-4">
                    <div className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0"></span><p className="text-white text-sm font-semibold">{d.nom}</p></div>
                    {d.sousServices.length > 0 ? (
                      <div className="mt-2 ml-5 space-y-1">
                        {d.sousServices.map(function (s) { return <p key={s} className="text-slate-400 text-xs">↳ {s} <span className="text-slate-600">(service rattache)</span></p>; })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-slate-500 text-xs font-black uppercase mb-2">Services Operationnels & Territoriaux</p>
            <div className="space-y-2">
              {SERVICES_SOUS_CFP.map(function (s) {
                return (
                  <div key={s.role} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                    <p className="text-white text-sm font-semibold">{s.nom}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-slate-600 text-xs pt-2">Note : la Direction de la Police Judiciaire (DPJ) et la Direction des Renseignements Generaux (DRG) sont des Directions Centrales placees sous le commandement des Forces de Police. INTERPOL Brazzaville est un service rattache a la DPJ. Seul le Commandement de la Gendarmerie Nationale (CGN), corps distinct, demeure une direction autonome — coordonnee avec le CFP via la Coordination Inter-Services.</p>
        </div>
      ) : null}
    </div>
  );
}

function DashboardDAF(props) {
  var compte = props.compte;
  var totalB = BUDGET_POSTES.reduce(function (s, p) { return s + p.budget; }, 0);
  var totalR = BUDGET_POSTES.reduce(function (s, p) { return s + p.reel; }, 0);
  var resteADepenser = totalB - totalR;
  var tauxGlobal = Math.round((totalR / totalB) * 100);
  var TRESORERIE_URGENCE = 32500000;
  var TRESORERIE_AVANCES = 8200000;

  var seuils = BUDGET_POSTES.map(function (p) {
    var taux = Math.round((p.reel / p.budget) * 100);
    var niveau = taux >= 100 ? "critique" : taux >= 90 ? "haute" : taux >= 75 ? "moyenne" : "ok";
    return { poste: p.poste, taux: taux, niveau: niveau, budget: p.budget, reel: p.reel };
  });
  var NIV_COL = { critique: "#DC2626", haute: "#F59E0B", moyenne: "#EAB308", ok: "#22C55E" };
  var NIV_LABEL = { critique: "Seuil depasse (100%+)", haute: "Seuil critique (90%+)", moyenne: "Seuil d alerte (75%+)", ok: "Sous controle" };

  var enAttenteDAF = ENGAGEMENTS_DATA.filter(function (e) { return e.statut === "en_attente"; }).length;
  var enAttenteCmd = ENGAGEMENTS_DATA.filter(function (e) { return e.statut === "attente_commandant"; }).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Cockpit du DAF</h2><p className="text-slate-400 text-sm">{compte.service} — Pilotage financier en temps reel</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">Comptes a jour</span></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="📊" label="Budget total alloue" value={totalB + "M"} sub="FCFA — exercice 2026" color="#3B82F6" />
        <StatCard icon="💸" label="Taux de consommation" value={tauxGlobal + "%"} sub={totalR + "M / " + totalB + "M FCFA"} color={tauxGlobal >= 100 ? "#DC2626" : tauxGlobal >= 90 ? "#F59E0B" : "#22C55E"} />
        <StatCard icon="✅" label="Reste a depenser" value={(resteADepenser >= 0 ? "" : "-") + Math.abs(resteADepenser) + "M"} sub="FCFA disponibles" color={resteADepenser >= 0 ? "#22C55E" : "#DC2626"} />
        <StatCard icon="⏳" label="Engagements en attente" value={enAttenteDAF + enAttenteCmd} sub={enAttenteDAF + " a verifier, " + enAttenteCmd + " au Commandant"} color="#8B5CF6" />
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Tresorerie operationnelle</p>
        <p className="text-slate-500 text-xs mb-3">Fonds disponibles pour missions urgentes et avances de caisse</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-950 rounded-xl p-4 border border-green-800"><p className="text-slate-500 text-xs uppercase">Missions urgentes</p><p className="text-green-400 font-black text-2xl mt-1">{TRESORERIE_URGENCE.toLocaleString("fr-FR")} FCFA</p></div>
          <div className="bg-slate-950 rounded-xl p-4 border border-blue-800"><p className="text-slate-500 text-xs uppercase">Avances de caisse</p><p className="text-blue-400 font-black text-2xl mt-1">{TRESORERIE_AVANCES.toLocaleString("fr-FR")} FCFA</p></div>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Execution budgetaire — Grandes categories</p>
        <p className="text-slate-500 text-xs mb-3">Consomme vs reste disponible — donnees probantes pour le Parlement</p>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={(function () {
              var MACRO = { Personnel: "Personnel", Carburant: "Logistique", Maintenance: "Logistique", Equipements: "Logistique", Missions: "Fonctionnement", Formation: "Fonctionnement" };
              var agg = {};
              BUDGET_POSTES.forEach(function (p) {
                var cat = MACRO[p.poste] || "Autre";
                if (!agg[cat]) { agg[cat] = { categorie: cat, budget: 0, reel: 0 }; }
                agg[cat].budget += p.budget; agg[cat].reel += p.reel;
              });
              return Object.values(agg).map(function (c) { return { categorie: c.categorie, consomme: Math.min(c.reel, c.budget), depassement: Math.max(c.reel - c.budget, 0), reste: Math.max(c.budget - c.reel, 0) }; });
            })()} barSize={42}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="categorie" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} unit="M" />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "M FCFA"]; }} />
              <Legend wrapperStyle={{ fontSize: 10, color: "#94A3B8" }} formatter={function (v) { return v === "consomme" ? "Consomme" : v === "depassement" ? "Depassement" : "Reste disponible"; }} />
              <Bar dataKey="consomme" stackId="b" fill="#3B82F6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="depassement" stackId="b" fill="#DC2626" radius={[4, 4, 0, 0]} />
              <Bar dataKey="reste" stackId="b" fill="#1E293B" stroke="#334155" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Alertes de seuils par poste budgetaire</p>
        <div className="space-y-2">
          {seuils.map(function (s) {
            return (
              <div key={s.poste} className="border border-slate-700 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white text-sm font-semibold">{s.poste}</span>
                  <Chip color={NIV_COL[s.niveau]}>{NIV_LABEL[s.niveau]}</Chip>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-700 rounded-full h-2"><div className="h-2 rounded-full" style={{ width: Math.min(100, s.taux) + "%", background: NIV_COL[s.niveau] }}></div></div>
                  <span className="text-slate-400 text-xs w-12 text-right">{s.taux}%</span>
                </div>
                <p className="text-slate-600 text-xs mt-1">{s.reel}M / {s.budget}M FCFA</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TachesDAF(props) {
  var compte = props.compte;
  var engState = useState(ENGAGEMENTS_DATA.map(function (e) { var c = {}; for (var k in e) { c[k] = e[k]; } return c; }));
  var engs = engState[0]; var setEngs = engState[1];
  var tabState = useState("todo");
  var tab = tabState[0]; var setTab = tabState[1];

  function valider(id) {
    setEngs(function (prev) {
      return prev.map(function (e) {
        if (e.id !== id) { return e; }
        var c = {}; for (var k in e) { c[k] = e[k]; }
        c.statut = e.montant >= SEUIL_VALIDATION_COMMANDANT ? "attente_commandant" : "valide";
        return c;
      });
    });
  }
  function rejeter(id) { setEngs(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.statut = "rejete"; return c; }); }); }

  var PRIO_COL = { urgente: "#DC2626", haute: "#F59E0B", normale: "#3B82F6" };
  var PRIO_LABEL = { urgente: "Urgent", haute: "Priorite haute", normale: "Normal" };
  var PRIO_ORDER = { urgente: 0, haute: 1, normale: 2 };

  var todo = engs.filter(function (e) { return e.statut === "en_attente"; }).sort(function (a, b) { return PRIO_ORDER[a.priorite] - PRIO_ORDER[b.priorite]; });
  var journal = engs.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });

  var TABS = [["todo", "A traiter (" + todo.length + ")", "✅"], ["journal", "Journal des engagements", "📜"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-900 to-emerald-900 border border-green-700 flex items-center justify-center text-2xl shrink-0">📋</div>
        <div><h2 className="text-2xl font-black text-white">Gestionnaire de Taches et Ordonnances</h2><p className="text-slate-500 text-xs">Validation technique, comptable et de conformite — {compte.service}</p></div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl border border-purple-800 p-4">
        <p className="text-purple-300 text-xs font-black uppercase mb-1">Workflow de validation a double niveau</p>
        <p className="text-slate-400 text-xs">Le DAF verifie chaque engagement. Les montants superieurs ou egaux a {SEUIL_VALIDATION_COMMANDANT.toLocaleString("fr-FR")} FCFA sont automatiquement transmis au Commandant des Forces de Police pour validation finale avant execution.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-green-700 text-white border-green-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "todo" ? (
        <div className="space-y-3">
          {todo.length === 0 ? <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 text-center text-slate-500 text-sm">Aucune action en attente. Tout est traite.</div> : null}
          {todo.map(function (e) {
            var majeur = e.montant >= SEUIL_VALIDATION_COMMANDANT;
            return (
              <div key={e.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1"><span className="text-white font-bold text-sm">{e.objet}</span><Chip color={PRIO_COL[e.priorite]}>{PRIO_LABEL[e.priorite]}</Chip>{majeur ? <Chip color="#8B5CF6">Engagement majeur</Chip> : null}</div>
                    <p className="text-slate-400 text-xs">{e.service} — {e.date}</p>
                    <p className="text-green-400 font-black text-base mt-0.5">{e.montant.toLocaleString("fr-FR")} FCFA</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700">
                  <button onClick={function () { valider(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-900 text-green-300">{majeur ? "Verifier et transmettre au Commandant" : "Valider"}</button>
                  <button onClick={function () { rejeter(e.id); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-900 text-red-300">Rejeter</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "journal" ? (
        <div className="space-y-2">
          {journal.map(function (e) {
            return (
              <div key={e.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center justify-between gap-2 flex-wrap">
                <div><p className="text-white font-semibold text-sm">{e.objet}</p><p className="text-slate-500 text-xs">{e.service} — {e.date} — {e.montant.toLocaleString("fr-FR")} FCFA</p></div>
                <Chip color={STC_ENG[e.statut]}>{STL_ENG[e.statut]}</Chip>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function BudgetPrevisionsDAF(props) {
  var compte = props.compte;
  var tabState = useState("simulateur");
  var tab = tabState[0]; var setTab = tabState[1];
  var posteState = useState(BUDGET_POSTES[1].poste);
  var posteSim = posteState[0]; var setPosteSim = posteState[1];
  var pctState = useState(20);
  var pctSim = pctState[0]; var setPctSim = pctState[1];
  var simAI = useState({ loading: false, result: null });
  var SYS = "Tu es conseiller financier SIPGN. Reponds en francais, structure et chiffre en FCFA.";

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); });
  }

  var posteData = BUDGET_POSTES.find(function (p) { return p.poste === posteSim; });
  var impactM = posteData ? Math.round(posteData.reel * (pctSim / 100)) : 0;
  var nouveauTotal = posteData ? posteData.reel + impactM : 0;

  var TABS = [["simulateur", "Simulateur de Previsions", "🧪"], ["comparateur", "Comparateur Budget vs Reel", "📊"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-900 to-green-900 border border-teal-700 flex items-center justify-center text-2xl shrink-0">📈</div>
        <div><h2 className="text-2xl font-black text-white">Budget et Previsions</h2><p className="text-slate-500 text-xs">Simulation de scenarios et pilotage de l execution budgetaire — {compte.service}</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-teal-700 text-white border-teal-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "simulateur" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-3">Simuler l impact d une variation de cout</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase">Poste budgetaire</label>
                <select value={posteSim} onChange={function (e) { setPosteSim(e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
                  {BUDGET_POSTES.map(function (p) { return <option key={p.poste} value={p.poste}>{p.poste}</option>; })}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs font-bold uppercase">Variation (%)</label>
                <input type="number" value={pctSim} onChange={function (e) { setPctSim(Number(e.target.value)); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
              </div>
            </div>
            <div className="bg-slate-950 rounded-xl p-4 border border-teal-800">
              <p className="text-slate-500 text-xs uppercase">Impact simule sur {posteSim}</p>
              <div className="flex items-center gap-4 mt-2">
                <div><p className="text-slate-500 text-xs">Depense actuelle</p><p className="text-white font-black text-xl">{posteData ? posteData.reel : 0}M FCFA</p></div>
                <span className="text-slate-600 text-xl">→</span>
                <div><p className="text-slate-500 text-xs">Nouvelle depense estimee</p><p className={(impactM >= 0 ? "text-red-400" : "text-green-400") + " font-black text-xl"}>{nouveauTotal}M FCFA</p></div>
                <div><p className="text-slate-500 text-xs">Impact</p><p className={(impactM >= 0 ? "text-red-400" : "text-green-400") + " font-black text-xl"}>{impactM >= 0 ? "+" : ""}{impactM}M FCFA</p></div>
              </div>
            </div>
            <button onClick={function () {
              callIA(simAI[1], "Analyse l impact d une variation de " + pctSim + "% sur le poste budgetaire '" + posteSim + "' pour la Police et Gendarmerie du Congo. Budget actuel du poste: " + (posteData ? posteData.budget : 0) + "M FCFA, depense reelle: " + (posteData ? posteData.reel : 0) + "M FCFA. Impact simule: " + (impactM >= 0 ? "+" : "") + impactM + "M FCFA, nouveau total estime: " + nouveauTotal + "M FCFA. Fournis: 1) Consequences operationnelles concretes de ce scenario 2) Mesures d attenuation possibles (substitution, negociation fournisseur, etalement) 3) Postes budgetaires a reequilibrer si ce scenario se realise 4) Recommandation finale au DAF. Contexte budget global: " + JSON.stringify(BUDGET_POSTES));
            }} className="bg-teal-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 mt-3">🧪 Analyser ce scenario avec l'IA</button>
            <div className="mt-3"><AIBloc state={simAI[0]} /></div>
          </div>
        </div>
      ) : null}

      {tab === "comparateur" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-3">Budget vs Reel (millions FCFA)</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BUDGET_POSTES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                  <XAxis dataKey="poste" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "M FCFA"]; }} />
                  <Bar dataKey="budget" name="Budget" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={18} />
                  <Bar dataKey="reel" name="Reel" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-1"><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm bg-blue-500"></span>Budget previsionnel</span><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-sm bg-amber-400"></span>Depenses reelles</span></div>
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-1.5">
            {BUDGET_POSTES.map(function (p) { var ec = p.reel - p.budget; var col = ec > 0 ? "#DC2626" : "#22C55E"; return (<div key={p.poste} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{p.poste}</span><span style={{ color: col }} className="font-bold">{ec > 0 ? "+" : ""}{ec}M FCFA ({((ec / p.budget) * 100).toFixed(0)}%)</span></div>); })}
          </div>
          <div className="bg-amber-950/30 border border-amber-800 rounded-2xl p-4">
            <p className="text-amber-300 text-xs font-bold">📜 Besoin d un rapport pour l Assemblee Nationale ou le Senat ?</p>
            <p className="text-slate-500 text-xs mt-0.5">Rendez-vous dans le module "Rapports Institutionnels" pour generer un dossier complet (justificatifs de depenses, besoins RH et logistiques).</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

var BATIMENTS_DATA = [
  { id: "BAT-001", nom: "QG Commandement CFP Brazzaville", type: "Commandement", etat: "bon", derniereInspection: "2026-03-12", valeur: 850000000 },
  { id: "BAT-002", nom: "Commissariat Central BZV", type: "Commissariat", etat: "bon", derniereInspection: "2026-02-20", valeur: 320000000 },
  { id: "BAT-003", nom: "DCPJ Brazzaville", type: "Direction", etat: "a_renover", derniereInspection: "2025-11-05", valeur: 210000000 },
  { id: "BAT-004", nom: "Caserne Gendarmerie Pointe-Noire", type: "Caserne", etat: "bon", derniereInspection: "2026-04-01", valeur: 480000000 },
  { id: "BAT-005", nom: "Garage central — Direction Logistique", type: "Logistique", etat: "critique", derniereInspection: "2025-09-15", valeur: 95000000 }
];

var EQUIPEMENTS_LOURDS_DATA = [
  { id: "EQP-001", nom: "Groupe electrogene QG CFP", categorie: "Energie", etat: "operationnel", derniereMaintenance: "2026-05-10", prochaineMaintenance: "2026-08-10" },
  { id: "EQP-002", nom: "Serveur central SIPGN", categorie: "Informatique", etat: "operationnel", derniereMaintenance: "2026-06-01", prochaineMaintenance: "2026-09-01" },
  { id: "EQP-003", nom: "Vedette fluviale Police Navale", categorie: "Naval", etat: "maintenance_requise", derniereMaintenance: "2026-01-15", prochaineMaintenance: "2026-06-15" },
  { id: "EQP-004", nom: "Systeme radio-telecom national", categorie: "Communication", etat: "operationnel", derniereMaintenance: "2026-04-20", prochaineMaintenance: "2026-10-20" },
  { id: "EQP-005", nom: "Scanner documents — Poste frontalier", categorie: "Controle frontieres", etat: "maintenance_requise", derniereMaintenance: "2025-12-01", prochaineMaintenance: "2026-06-01" }
];

function InventairePatrimoine(props) {
  var compte = props.compte;
  var tabState = useState("batiments");
  var tab = tabState[0]; var setTab = tabState[1];

  var ETAT_BAT_COL = { bon: "#22C55E", a_renover: "#F59E0B", critique: "#DC2626" };
  var ETAT_BAT_LABEL = { bon: "Bon etat", a_renover: "A renover", critique: "Etat critique" };
  var ETAT_EQP_COL = { operationnel: "#22C55E", maintenance_requise: "#DC2626" };
  var ETAT_EQP_LABEL = { operationnel: "Operationnel", maintenance_requise: "Maintenance requise" };

  var today = new Date();
  function joursRestants(date) { var dt = new Date(date + "T00:00:00"); return Math.round((dt - today) / 86400000); }

  var valeurTotaleBatiments = BATIMENTS_DATA.reduce(function (s, b) { return s + b.valeur; }, 0);
  var TABS = [["batiments", "Batiments", "🏛️"], ["equipements", "Equipements Lourds", "⚙️"], ["vehicules", "Parc Automobile", "🚗"]];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex items-center justify-center text-2xl shrink-0">🏛️</div>
        <div><h2 className="text-2xl font-black text-white">Inventaire et Patrimoine</h2><p className="text-slate-500 text-xs">Suivi des actifs lourds, batiments et parc automobile — {compte.service}</p></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="🏛️" label="Batiments" value={BATIMENTS_DATA.length} sub={Math.round(valeurTotaleBatiments / 1000000) + "M FCFA"} color="#3B82F6" />
        <StatCard icon="⚙️" label="Equipements suivis" value={EQUIPEMENTS_LOURDS_DATA.length} sub={EQUIPEMENTS_LOURDS_DATA.filter(function (e) { return e.etat === "maintenance_requise"; }).length + " a entretenir"} color="#F59E0B" />
        <StatCard icon="🚗" label="Vehicules" value={VEHICULES_DATA.length} sub={VEHICULES_DATA.filter(function (v) { return v.statut === "maintenance"; }).length + " en maintenance"} color="#0EA5E9" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-slate-700 text-white border-slate-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "batiments" ? (
        <div className="space-y-2">
          {BATIMENTS_DATA.map(function (b) {
            return (
              <div key={b.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-bold text-sm">{b.nom}</p><p className="text-slate-500 text-xs">{b.type} — Inspection: {b.derniereInspection}</p><p className="text-slate-400 text-xs mt-0.5">Valeur estimee: {b.valeur.toLocaleString("fr-FR")} FCFA</p></div>
                  <Chip color={ETAT_BAT_COL[b.etat]}>{ETAT_BAT_LABEL[b.etat]}</Chip>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "equipements" ? (
        <div className="space-y-2">
          {EQUIPEMENTS_LOURDS_DATA.map(function (e) {
            var jr = joursRestants(e.prochaineMaintenance);
            var urgent = jr <= 14;
            return (
              <div key={e.id} className={"bg-slate-800/90 rounded-2xl border p-4 " + (urgent ? "border-red-700" : "border-slate-700")}>
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <p className="text-white font-bold text-sm">{e.nom}</p>
                    <p className="text-slate-500 text-xs">{e.categorie} — Derniere maintenance: {e.derniereMaintenance}</p>
                    <p className={(urgent ? "text-red-400" : "text-slate-400") + " text-xs mt-0.5"}>{urgent ? "⚠️ " : ""}Prochaine maintenance: {e.prochaineMaintenance} ({jr >= 0 ? "dans " + jr + " jours" : "en retard de " + Math.abs(jr) + " jours"})</p>
                  </div>
                  <Chip color={ETAT_EQP_COL[e.etat]}>{ETAT_EQP_LABEL[e.etat]}</Chip>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "vehicules" ? (
        <div className="space-y-2">
          {VEHICULES_DATA.map(function (v) {
            var col = v.statut === "mission" ? "#22C55E" : v.statut === "maintenance" ? "#F59E0B" : "#3B82F6";
            return (
              <div key={v.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center justify-between">
                <div><p className="text-white font-bold font-mono">{v.immat}</p><p className="text-slate-400 text-sm">{v.marque} {v.type}</p><p className="text-slate-500 text-xs">{v.unite}</p></div>
                <div className="text-right"><CorpsBadge corps={v.corps} /><p className="mt-1"><Chip color={col}>{STATUT_VEHICULE_LABEL[v.statut]}</Chip></p><p className="text-slate-400 text-xs mt-1">{v.km.toLocaleString("fr-FR")} km</p></div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

var PATRIMOINE_CATEGORIES = [
  { nom: "Vehicules", valeur: 285000000, color: "#3B82F6" },
  { nom: "Armement", valeur: 165000000, color: "#DC2626" },
  { nom: "Batiments", valeur: 1955000000, color: "#8B5CF6" },
  { nom: "Equipements individuels", valeur: 72000000, color: "#22C55E" },
  { nom: "Informatique", valeur: 38000000, color: "#0EA5E9" }
];

var STOCKS_DATA = [
  { id: "STK-001", item: "Munitions 9mm", categorie: "Armement", niveau: 15, seuilCritique: 25, quantite: 1500, unite: "cartouches" },
  { id: "STK-002", item: "Pneus de patrouille", categorie: "Vehicules", niveau: 8, seuilCritique: 20, quantite: 6, unite: "unites" },
  { id: "STK-003", item: "Gilets pare-balles", categorie: "Equipements", niveau: 42, seuilCritique: 30, quantite: 21, unite: "unites" },
  { id: "STK-004", item: "Uniformes (toutes tailles)", categorie: "Bureau", niveau: 58, seuilCritique: 25, quantite: 116, unite: "unites" },
  { id: "STK-005", item: "Carburant reserve strategique", categorie: "Vehicules", niveau: 33, seuilCritique: 30, quantite: 3300, unite: "litres" },
  { id: "STK-006", item: "Cartouches de papier A4", categorie: "Bureau", niveau: 70, seuilCritique: 20, quantite: 140, unite: "ramettes" },
  { id: "STK-007", item: "Materiel informatique (PC)", categorie: "Informatique", niveau: 18, seuilCritique: 25, quantite: 9, unite: "unites" }
];

var TRAVAUX_DATA = [
  { id: "TRV-001", batiment: "DCPJ Brazzaville", type: "Plomberie", description: "Fuite reseau eau — aile administrative", priorite: "haute", statut: "en_cours", date: "2026-06-10" },
  { id: "TRV-002", batiment: "Garage central — Direction Logistique", type: "Structure", description: "Affaissement toiture atelier mecanique", priorite: "urgente", statut: "en_attente", date: "2026-06-17" },
  { id: "TRV-003", batiment: "Commissariat Central BZV", type: "Electricite", description: "Remise aux normes tableau electrique", priorite: "normale", statut: "en_attente", date: "2026-06-14" },
  { id: "TRV-004", batiment: "Caserne Gendarmerie Pointe-Noire", type: "Plomberie", description: "Renovation sanitaires dortoirs", priorite: "normale", statut: "termine", date: "2026-05-20" }
];

var CONTRATS_MAINTENANCE_DATA = [
  { id: "CTR-001", prestataire: "Congo Maintenance Technique", objet: "Entretien groupes electrogenes", echeance: "2026-09-30", montantAnnuel: 6500000, statut: "actif" },
  { id: "CTR-002", prestataire: "BZV Climatisation Pro", objet: "Maintenance climatisation QG CFP", echeance: "2026-07-15", montantAnnuel: 3200000, statut: "actif" },
  { id: "CTR-003", prestataire: "SecuriBat Congo", objet: "Surveillance et alarmes batiments", echeance: "2026-12-01", montantAnnuel: 9800000, statut: "actif" },
  { id: "CTR-004", prestataire: "AquaTech Brazzaville", objet: "Maintenance reseaux hydrauliques", echeance: "2026-07-05", montantAnnuel: 2400000, statut: "renouvellement_proche" }
];

var ARMES_DATA = [
  { id: "ARM-001", numeroSerie: "PAMAS-77245", type: "Pistolet PAMAS G1", dotation: "individuelle", assigne: "MALANDA Christian", etat: "en_service", acquisition: "2019-03-12" },
  { id: "ARM-002", numeroSerie: "AK47-30981", type: "Fusil AK-47", dotation: "collective", assigne: "DCPJ Brazzaville — Armurerie", etat: "en_service", acquisition: "2017-11-08" },
  { id: "ARM-003", numeroSerie: "PAMAS-77310", type: "Pistolet PAMAS G1", dotation: "individuelle", assigne: "MBEMBA Joel", etat: "en_service", acquisition: "2019-03-12" },
  { id: "ARM-004", numeroSerie: "MAT49-11420", type: "Pistolet-mitrailleur MAT-49", dotation: "collective", assigne: "Commissariat Central BZV — Armurerie", etat: "maintenance", acquisition: "2015-06-20" },
  { id: "ARM-005", numeroSerie: "PAMAS-77398", type: "Pistolet PAMAS G1", dotation: "individuelle", assigne: "NGUESSO POBA Marie-Claire", etat: "en_service", acquisition: "2020-01-15" },
  { id: "ARM-006", numeroSerie: "AK47-31055", type: "Fusil AK-47", dotation: "collective", assigne: "Brigade Territoriale Pointe-Noire — Armurerie", etat: "en_service", acquisition: "2018-04-02" },
  { id: "ARM-007", numeroSerie: "PAMAS-77412", type: "Pistolet PAMAS G1", dotation: "individuelle", assigne: "ITOUA Patrice", etat: "hors_service", acquisition: "2014-09-10" }
];

var GILETS_DATA = [
  { id: "GIL-001", reference: "GPB-2021-0042", assigne: "MALANDA Christian", dateExpiration: "2026-07-10" },
  { id: "GIL-002", reference: "GPB-2020-0198", assigne: "MBEMBA Joel", dateExpiration: "2026-08-22" },
  { id: "GIL-003", reference: "GPB-2019-0356", assigne: "NGUESSO POBA Marie-Claire", dateExpiration: "2026-06-28" },
  { id: "GIL-004", reference: "GPB-2022-0511", assigne: "ODZAMBA Patrick", dateExpiration: "2027-03-15" },
  { id: "GIL-005", reference: "GPB-2018-0089", assigne: "ITOUA Patrice", dateExpiration: "2026-06-25" },
  { id: "GIL-006", reference: "GPB-2021-0203", assigne: "BITSINDOU Rodrigue", dateExpiration: "2026-11-30" }
];

var FICHE_VIE_MAP = {
  "VHL-001": { affectationDepuis: "2022-01-10", pannes: [{ date: "2025-08-12", description: "Remplacement amortisseurs avant", cout: 380000 }, { date: "2026-02-03", description: "Vidange et filtres", cout: 95000 }], coutTotalReparation: 475000 },
  "VHL-002": { affectationDepuis: "2021-05-22", pannes: [{ date: "2025-11-20", description: "Reparation systeme freinage", cout: 420000 }], coutTotalReparation: 420000 },
  "VHL-003": { affectationDepuis: "2023-02-14", pannes: [{ date: "2026-01-15", description: "Remplacement batterie", cout: 110000 }], coutTotalReparation: 110000 },
  "VHL-004": { affectationDepuis: "2020-07-01", pannes: [{ date: "2025-06-10", description: "Reparation boite de vitesse", cout: 850000 }, { date: "2026-03-22", description: "Pneus avant", cout: 240000 }], coutTotalReparation: 1090000 },
  "VHL-005": { affectationDepuis: "2024-03-18", pannes: [], coutTotalReparation: 0 },
  "VHL-006": { affectationDepuis: "2018-09-05", pannes: [{ date: "2025-04-02", description: "Reparation moteur — surchauffe", cout: 1250000 }, { date: "2025-12-18", description: "Embrayage", cout: 310000 }, { date: "2026-06-01", description: "Diagnostic — immobilisation en cours", cout: 0 }], coutTotalReparation: 1560000 }
};

var USURE_DATA = [
  { mois: "Jan", vehicules: 28, armement: 12 }, { mois: "Fev", vehicules: 31, armement: 14 }, { mois: "Mar", vehicules: 35, armement: 15 },
  { mois: "Avr", vehicules: 39, armement: 17 }, { mois: "Mai", vehicules: 44, armement: 19 }, { mois: "Juin", vehicules: 49, armement: 22 }
];

var REPARATIONS_ATELIER_DATA = [
  { atelier: "Mecanique", interventions: 14 },
  { atelier: "Batiments", interventions: 7 },
  { atelier: "Informatique", interventions: 5 },
  { atelier: "Armurerie", interventions: 3 }
];

var COUTS_LOGISTIQUES_DATA = [
  { mois: "Jan", cout: 14.2 }, { mois: "Fev", cout: 13.8 }, { mois: "Mar", cout: 16.5 },
  { mois: "Avr", cout: 15.1 }, { mois: "Mai", cout: 18.9 }, { mois: "Juin", cout: 18.5 }
];

var ARRONDISSEMENT_DISPO_DATA = [
  { nom: "1er", dispoVehicules: 82, dispoArmement: 90, dispoEquipements: 75, stockFournitures: 60 },
  { nom: "2e", dispoVehicules: 70, dispoArmement: 85, dispoEquipements: 68, stockFournitures: 72 },
  { nom: "3e", dispoVehicules: 45, dispoArmement: 60, dispoEquipements: 50, stockFournitures: 38 },
  { nom: "4e", dispoVehicules: 91, dispoArmement: 95, dispoEquipements: 88, stockFournitures: 80 },
  { nom: "5e", dispoVehicules: 55, dispoArmement: 65, dispoEquipements: 48, stockFournitures: 42 }
];

var FLUX_DISTRIBUTION_DATA = [
  { destination: "Commissariat Central BZV", quantite: 420, type: "Munitions + Uniformes" },
  { destination: "DCPJ Brazzaville", quantite: 310, type: "Equipements techniques" },
  { destination: "Brigade Territoriale PNR", quantite: 260, type: "Carburant + Pieces" },
  { destination: "Bureau Controle Accidents", quantite: 180, type: "Materiel routier" },
  { destination: "Poste Frontalier Aeroport", quantite: 140, type: "Materiel controle" }
];

function PatrimoineTreemapCell(props) {
  var x = props.x, y = props.y, width = props.width, height = props.height, name = props.name, value = props.value, index = props.index;
  var color = PATRIMOINE_CATEGORIES[index] ? PATRIMOINE_CATEGORIES[index].color : "#3B82F6";
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} style={{ fill: color, stroke: "#0F172A", strokeWidth: 2 }} />
      {width > 55 && height > 28 ? <text x={x + 8} y={y + 18} fill="#fff" fontSize={11} fontWeight="700">{name}</text> : null}
      {width > 55 && height > 44 ? <text x={x + 8} y={y + 34} fill="#E2E8F0" fontSize={10}>{Math.round(value / 1000000)}M FCFA</text> : null}
    </g>
  );
}

function DashboardDL(props) {
  var compte = props.compte;
  var alertesStocks = STOCKS_DATA.filter(function (s) { return s.niveau <= s.seuilCritique; });
  var totalPatrimoine = PATRIMOINE_CATEGORIES.reduce(function (s, c) { return s + c.valeur; }, 0);
  var dispoVehicules = Math.round(VEHICULES_DATA.filter(function (v) { return v.statut !== "maintenance"; }).length / VEHICULES_DATA.length * 100);
  var dispoArmement = Math.round(ARMES_DATA.filter(function (a) { return a.etat === "en_service"; }).length / ARMES_DATA.length * 100);
  var dispoEquip = Math.round((STOCKS_DATA.filter(function (s) { return s.categorie === "Equipements"; }).reduce(function (s, x) { return s + x.niveau; }, 0)) / Math.max(STOCKS_DATA.filter(function (s) { return s.categorie === "Equipements"; }).length, 1));
  var dispoBatiments = Math.round(BATIMENTS_DATA.filter(function (b) { return b.etat === "bon"; }).length / BATIMENTS_DATA.length * 100);
  var tauxGlobal = Math.round((dispoVehicules + dispoArmement + dispoEquip + dispoBatiments) / 4);
  var budgetLogPoste = ["Carburant", "Maintenance", "Equipements"];
  var budgetLogAlloue = BUDGET_POSTES.filter(function (p) { return budgetLogPoste.indexOf(p.poste) >= 0; }).reduce(function (s, p) { return s + p.budget; }, 0);
  var budgetLogReel = BUDGET_POSTES.filter(function (p) { return budgetLogPoste.indexOf(p.poste) >= 0; }).reduce(function (s, p) { return s + p.reel; }, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Tableau de Bord 360° — Materiel & Infrastructure</h2><p className="text-slate-400 text-sm">{compte.service}</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">MCO actif</span></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="📊" label="Disponibilite globale" value={tauxGlobal + "%"} sub="Tous moyens confondus" color={tauxGlobal >= 75 ? "#22C55E" : tauxGlobal >= 50 ? "#F59E0B" : "#DC2626"} />
        <StatCard icon="🚗" label="Disponibilite vehicules" value={dispoVehicules + "%"} sub={VEHICULES_DATA.length + " unites au parc"} color="#3B82F6" />
        <StatCard icon="🔫" label="Disponibilite armement" value={dispoArmement + "%"} sub={ARMES_DATA.length + " armes tracees"} color="#DC2626" />
        <StatCard icon="⚠️" label="Stocks critiques" value={alertesStocks.length} sub="Seuil de securite franchi" color="#F59E0B" />
      </div>

      {alertesStocks.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-red-800 p-4">
          <p className="text-red-300 font-black text-xs uppercase mb-2">🚨 Alertes de stocks critiques</p>
          <div className="space-y-1.5">
            {alertesStocks.map(function (s) { return (<div key={s.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{s.item}</span><span className="text-red-400 font-bold">{s.niveau}% restant — {s.quantite} {s.unite}</span></div>); })}
          </div>
        </div>
      ) : null}

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Indicateur budgetaire logistique</p>
        <p className="text-slate-500 text-xs mb-3">Budget entretien consomme vs previsions annuelles — en lien avec validation DAF</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-700 rounded-full h-3"><div className="h-3 rounded-full" style={{ width: Math.min(100, Math.round((budgetLogReel / budgetLogAlloue) * 100)) + "%", background: budgetLogReel > budgetLogAlloue ? "#DC2626" : "#22C55E" }}></div></div>
          <span className="text-slate-300 text-sm font-bold w-16 text-right">{Math.round((budgetLogReel / budgetLogAlloue) * 100)}%</span>
        </div>
        <p className="text-slate-500 text-xs mt-1">{budgetLogReel}M / {budgetLogAlloue}M FCFA (Carburant, Maintenance, Equipements)</p>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Repartition du patrimoine (Treemap)</p>
        <p className="text-slate-500 text-xs mb-3">Valeur estimee par categorie — {Math.round(totalPatrimoine / 1000000).toLocaleString("fr-FR")}M FCFA au total</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap data={PATRIMOINE_CATEGORIES.map(function (c) { return { name: c.nom, size: c.valeur }; })} dataKey="size" stroke="#0F172A" isAnimationActive={false} content={<PatrimoineTreemapCell />} />
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mt-3">
          {PATRIMOINE_CATEGORIES.map(function (c, i) { return (<div key={i} className="border border-slate-700 rounded-lg p-2"><div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }}></span><span className="text-slate-300 text-xs font-semibold truncate">{c.nom}</span></div><p className="text-white text-sm font-black mt-1">{Math.round((c.valeur / totalPatrimoine) * 100)}%</p><p className="text-slate-500 text-[10px]">{Math.round(c.valeur / 1000000)}M FCFA</p></div>); })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Charge de travail des ateliers</p>
          <p className="text-slate-500 text-xs mb-3">Interventions en cours par specialite</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REPARATIONS_ATELIER_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="atelier" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="interventions" radius={[4, 4, 0, 0]} fill="#0EA5E9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Couts logistiques mensuels</p>
          <p className="text-slate-500 text-xs mb-3">Millions FCFA — identifier les pics budgetaires</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COUTS_LOGISTIQUES_DATA}>
                <defs><linearGradient id="coutGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22C55E" stopOpacity={0.5} /><stop offset="95%" stopColor="#22C55E" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="mois" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} unit="M" />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "M FCFA"]; }} />
                <Area type="monotone" dataKey="cout" stroke="#22C55E" fill="url(#coutGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Indice de disponibilite par arrondissement</p>
        <p className="text-slate-500 text-xs mb-3">Capacite logistique comparee zone par zone</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={[
              { axe: "Vehicules", ...ARRONDISSEMENT_DISPO_DATA.reduce(function (acc, a, i) { acc["a" + i] = a.dispoVehicules; return acc; }, {}) },
              { axe: "Armement", ...ARRONDISSEMENT_DISPO_DATA.reduce(function (acc, a, i) { acc["a" + i] = a.dispoArmement; return acc; }, {}) },
              { axe: "Equipements", ...ARRONDISSEMENT_DISPO_DATA.reduce(function (acc, a, i) { acc["a" + i] = a.dispoEquipements; return acc; }, {}) },
              { axe: "Fournitures", ...ARRONDISSEMENT_DISPO_DATA.reduce(function (acc, a, i) { acc["a" + i] = a.stockFournitures; return acc; }, {}) }
            ]}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="axe" tick={{ fill: "#94A3B8", fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#475569", fontSize: 9 }} />
              {ARRONDISSEMENT_DISPO_DATA.map(function (a, i) { var cols = ["#3B82F6", "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899"]; return <Radar key={i} name={a.nom + " arr."} dataKey={"a" + i} stroke={cols[i % cols.length]} fill={cols[i % cols.length]} fillOpacity={0.12} strokeWidth={2} />; })}
              <Legend wrapperStyle={{ fontSize: 10, color: "#94A3B8" }} />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ParcAutomobileDL(props) {
  var compte = props.compte;
  var selState = useState(null);
  var selected = selState[0]; var setSelected = selState[1];

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Parc Automobile & Engins</h2><p className="text-slate-500 text-xs">Suivi GPS, maintenance et fiche de vie — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Graphique d usure — Vehicules vs Armement</p>
        <p className="text-slate-500 text-xs mb-3">Evolution du taux d usure dans le temps pour anticiper les renouvellements</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={USURE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="mois" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "%"]; }} />
              <Line type="monotone" dataKey="vehicules" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="armement" stroke="#DC2626" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 mt-1"><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Vehicules</span><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full bg-red-500"></span>Armement</span></div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon="🟢" label="En mission" value={VEHICULES_DATA.filter(function (v) { return v.statut === "mission"; }).length} color="#22C55E" />
        <StatCard icon="🔧" label="En maintenance" value={VEHICULES_DATA.filter(function (v) { return v.statut === "maintenance"; }).length} color="#F59E0B" />
        <StatCard icon="📋" label="Total parc" value={VEHICULES_DATA.length} color="#3B82F6" />
      </div>

      <div className="space-y-2">
        {VEHICULES_DATA.map(function (v) {
          var col = v.statut === "mission" ? "#22C55E" : v.statut === "maintenance" ? "#F59E0B" : "#3B82F6";
          var fiche = FICHE_VIE_MAP[v.id];
          var isOpen = selected === v.id;
          return (
            <div key={v.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
              <button onClick={function () { setSelected(isOpen ? null : v.id); }} className="w-full text-left flex items-center justify-between">
                <div><p className="text-white font-bold font-mono">{v.immat}</p><p className="text-slate-400 text-sm">{v.marque} {v.type} — {v.unite}</p><p className="text-slate-500 text-xs">GPS simule: 4.26°S, 15.28°E — {v.km.toLocaleString("fr-FR")} km</p></div>
                <div className="text-right shrink-0"><CorpsBadge corps={v.corps} /><p className="mt-1"><Chip color={col}>{STATUT_VEHICULE_LABEL[v.statut]}</Chip></p></div>
              </button>
              {isOpen && fiche ? (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <p className="text-slate-400 text-xs font-bold uppercase mb-2">Fiche de vie — Affecte depuis {fiche.affectationDepuis}</p>
                  {fiche.pannes.length === 0 ? <p className="text-slate-500 text-xs">Aucune panne enregistree.</p> : (
                    <div className="space-y-1.5">
                      {fiche.pannes.map(function (p, i) { return (<div key={i} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{p.date} — {p.description}</span><span className="text-amber-400 font-bold">{p.cout.toLocaleString("fr-FR")} FCFA</span></div>); })}
                    </div>
                  )}
                  <p className="text-slate-400 text-xs mt-2">Cout total reparations: <span className="text-white font-bold">{fiche.coutTotalReparation.toLocaleString("fr-FR")} FCFA</span></p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ArmurerieDL(props) {
  var compte = props.compte;
  var tabState = useState("armes");
  var tab = tabState[0]; var setTab = tabState[1];
  var today = new Date();
  function joursAvant(date) { var dt = new Date(date + "T00:00:00"); return Math.round((dt - today) / 86400000); }
  var ETAT_ARME_COL = { en_service: "#22C55E", maintenance: "#F59E0B", hors_service: "#DC2626" };
  var ETAT_ARME_LABEL = { en_service: "En service", maintenance: "En maintenance", hors_service: "Hors service" };
  var TABS = [["armes", "Armement (" + ARMES_DATA.length + ")", "🔫"], ["gilets", "Protection (" + GILETS_DATA.length + ")", "🦺"]];

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Armurerie & Protection</h2><p className="text-slate-500 text-xs">Tracabilite et dotations — {compte.service}</p></div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-red-700 text-white border-red-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>
      {tab === "armes" ? (
        <div className="space-y-2">
          {ARMES_DATA.map(function (a) {
            return (
              <div key={a.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center justify-between flex-wrap gap-2">
                <div><p className="text-white font-bold text-sm">{a.type}</p><p className="text-slate-500 text-xs font-mono">N° serie: {a.numeroSerie}</p><p className="text-slate-400 text-xs">{a.assigne} — {a.dotation === "individuelle" ? "Dotation individuelle" : "Dotation collective"}</p></div>
                <Chip color={ETAT_ARME_COL[a.etat]}>{ETAT_ARME_LABEL[a.etat]}</Chip>
              </div>
            );
          })}
        </div>
      ) : null}
      {tab === "gilets" ? (
        <div className="space-y-2">
          {GILETS_DATA.map(function (g) {
            var jr = joursAvant(g.dateExpiration);
            var niveau = jr <= 30 ? "expire_proche" : jr <= 90 ? "a_surveiller" : "valide";
            var col = niveau === "expire_proche" ? "#DC2626" : niveau === "a_surveiller" ? "#F59E0B" : "#22C55E";
            var label = niveau === "expire_proche" ? "Expire bientot" : niveau === "a_surveiller" ? "A surveiller" : "Valide";
            return (
              <div key={g.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center justify-between flex-wrap gap-2">
                <div><p className="text-white font-bold text-sm">{g.assigne}</p><p className="text-slate-500 text-xs font-mono">Ref: {g.reference}</p><p className="text-slate-400 text-xs">Expiration: {g.dateExpiration} ({jr >= 0 ? "dans " + jr + " jours" : "expire depuis " + Math.abs(jr) + " jours"})</p></div>
                <Chip color={col}>{label}</Chip>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function InfrastructuresDL(props) {
  var compte = props.compte;
  var tabState = useState("batiments");
  var tab = tabState[0]; var setTab = tabState[1];
  var travauxState = useState(TRAVAUX_DATA.map(function (t) { var c = {}; for (var k in t) { c[k] = t[k]; } return c; }));
  var travaux = travauxState[0]; var setTravaux = travauxState[1];

  function avancerStatut(id) {
    setTravaux(function (prev) { return prev.map(function (t) { if (t.id !== id) { return t; } var c = {}; for (var k in t) { c[k] = t[k]; } c.statut = t.statut === "en_attente" ? "en_cours" : "termine"; return c; }); });
  }

  var ETAT_BAT_COL = { bon: "#22C55E", a_renover: "#F59E0B", critique: "#DC2626" };
  var ETAT_BAT_LABEL = { bon: "Bon etat", a_renover: "A renover", critique: "Etat critique" };
  var PRIO_TRV_COL = { urgente: "#DC2626", haute: "#F59E0B", normale: "#3B82F6" };
  var STATUT_TRV_COL = { en_attente: "#F59E0B", en_cours: "#3B82F6", termine: "#22C55E" };
  var STATUT_TRV_LABEL = { en_attente: "En attente", en_cours: "En cours", termine: "Termine" };
  var TYPE_TRV_ICON = { Plomberie: "🚰", Electricite: "⚡", Structure: "🏗️" };

  var TABS = [["batiments", "Batiments", "🏛️"], ["travaux", "Demandes de travaux", "🔨"], ["contrats", "Contrats de maintenance", "📜"]];

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Infrastructures & Batiments</h2><p className="text-slate-500 text-xs">Cartographie, travaux et contrats — {compte.service}</p></div>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-slate-700 text-white border-slate-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}
      </div>

      {tab === "batiments" ? (
        <div className="space-y-2">
          {BATIMENTS_DATA.map(function (b) {
            return (
              <div key={b.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center justify-between flex-wrap gap-2">
                <div><p className="text-white font-bold text-sm">{b.nom}</p><p className="text-slate-500 text-xs">{b.type} — Inspection: {b.derniereInspection}</p><p className="text-slate-400 text-xs">Valeur: {b.valeur.toLocaleString("fr-FR")} FCFA</p></div>
                <Chip color={ETAT_BAT_COL[b.etat]}>{ETAT_BAT_LABEL[b.etat]}</Chip>
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "travaux" ? (
        <div className="space-y-2">
          {travaux.map(function (t) {
            return (
              <div key={t.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-bold text-sm">{TYPE_TRV_ICON[t.type]} {t.description}</p><p className="text-slate-500 text-xs">{t.batiment} — {t.type} — {t.date}</p></div>
                  <div className="flex gap-1.5 shrink-0"><Chip color={PRIO_TRV_COL[t.priorite]}>{t.priorite}</Chip><Chip color={STATUT_TRV_COL[t.statut]}>{STATUT_TRV_LABEL[t.statut]}</Chip></div>
                </div>
                {t.statut !== "termine" ? (<button onClick={function () { avancerStatut(t.id); }} className="mt-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-900 text-blue-300">{t.statut === "en_attente" ? "Demarrer les travaux" : "Marquer termine"}</button>) : null}
              </div>
            );
          })}
        </div>
      ) : null}

      {tab === "contrats" ? (
        <div className="space-y-2">
          {CONTRATS_MAINTENANCE_DATA.map(function (c) {
            var jr = Math.round((new Date(c.echeance + "T00:00:00") - new Date()) / 86400000);
            var proche = jr <= 45;
            return (
              <div key={c.id} className={"bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border p-4 " + (proche ? "border-amber-700" : "border-slate-700")}>
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-bold text-sm">{c.prestataire}</p><p className="text-slate-400 text-xs">{c.objet}</p><p className={(proche ? "text-amber-400" : "text-slate-500") + " text-xs mt-0.5"}>{proche ? "⚠️ " : ""}Echeance: {c.echeance} ({jr} jours) — {c.montantAnnuel.toLocaleString("fr-FR")} FCFA/an</p></div>
                  <Chip color={proche ? "#F59E0B" : "#22C55E"}>{proche ? "Renouvellement proche" : "Actif"}</Chip>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function FournituresDL(props) {
  var compte = props.compte;
  var commandesState = useState([]);
  var commandesLocales = commandesState[0]; var setCommandesLocales = commandesState[1];

  function demanderReappro(stock) {
    var nouvelle = { id: "ENG-" + Date.now(), objet: "Reapprovisionnement — " + stock.item, montant: stock.categorie === "Armement" ? 3500000 : 1800000, service: "Direction de la Logistique", statut: "en_attente", date: new Date().toISOString().slice(0, 10), priorite: stock.niveau <= 15 ? "urgente" : "haute" };
    ENGAGEMENTS_DATA.push(nouvelle);
    setCommandesLocales(function (prev) { return prev.concat([nouvelle.objet]); });
  }

  var DONUT_COLORS = { Armement: "#DC2626", Vehicules: "#3B82F6", Equipements: "#22C55E", Bureau: "#8B5CF6", Informatique: "#0EA5E9" };

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Fournitures & Intendance</h2><p className="text-slate-500 text-xs">Stocks centralises, dispatch et reapprovisionnement — {compte.service}</p></div>

      <div className="bg-slate-900 rounded-2xl border border-sky-800 p-3 flex items-center gap-2.5">
        <span className="text-lg shrink-0">🤖</span>
        <p className="text-slate-400 text-xs">L'IA de prediction analyse l'historique de consommation pour anticiper les ruptures avant le seuil critique — voir l'onglet <span className="text-sky-400 font-bold">Stocks Predictifs</span> dans Data Scientist IA.</p>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Jauges de stocks par categorie</p>
        <p className="text-slate-500 text-xs mb-4">Niveau de remplissage des reserves</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STOCKS_DATA.map(function (s) {
            var col = s.niveau <= s.seuilCritique ? "#DC2626" : s.niveau <= s.seuilCritique + 15 ? "#F59E0B" : "#22C55E";
            var data = [{ name: "rempli", value: s.niveau }, { name: "vide", value: 100 - s.niveau }];
            return (
              <div key={s.id} className="flex flex-col items-center">
                <div className="h-24 w-24 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={data} dataKey="value" innerRadius={28} outerRadius={40} startAngle={90} endAngle={-270} stroke="none"><Cell fill={col} /><Cell fill="#1E293B" /></Pie></PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center"><span style={{ color: col }} className="text-sm font-black">{s.niveau}%</span></div>
                </div>
                <p className="text-slate-300 text-xs font-semibold text-center mt-1">{s.item}</p>
                {s.niveau <= s.seuilCritique ? (<button onClick={function () { demanderReappro(s); }} className="mt-1 px-2 py-1 rounded-lg text-[10px] font-bold bg-red-900 text-red-300">Demander reappro</button>) : null}
              </div>
            );
          })}
        </div>
        {commandesLocales.length > 0 ? <p className="text-green-400 text-xs mt-3">✓ {commandesLocales.length} demande(s) transmise(s) au DAF pour validation.</p> : null}
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Flux de distribution — Depot central vers les unites</p>
        <p className="text-slate-500 text-xs mb-4">Circulation des stocks dispatches ce mois-ci</p>
        <svg width="100%" height="260" viewBox="0 0 600 260">
          <rect x="10" y="110" width="120" height="40" rx="8" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="1.5" />
          <text x="70" y="135" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">Depot Central</text>
          {FLUX_DISTRIBUTION_DATA.map(function (f, i) {
            var maxQ = Math.max.apply(null, FLUX_DISTRIBUTION_DATA.map(function (x) { return x.quantite; }));
            var strokeW = 2 + (f.quantite / maxQ) * 14;
            var yDest = 30 + i * 50;
            var cols = ["#3B82F6", "#22C55E", "#F59E0B", "#8B5CF6", "#EC4899"];
            return (
              <g key={i}>
                <path d={"M 130 130 C 280 130, 280 " + yDest + ", 420 " + yDest} stroke={cols[i % cols.length]} strokeWidth={strokeW} fill="none" opacity="0.55" />
                <rect x="420" y={yDest - 16} width="170" height="32" rx="6" fill="#0F172A" stroke={cols[i % cols.length]} strokeWidth="1.5" />
                <text x="505" y={yDest - 2} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">{f.destination}</text>
                <text x="505" y={yDest + 10} textAnchor="middle" fill="#94A3B8" fontSize="8">{f.quantite} unites — {f.type}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function CommandesDL(props) {
  var compte = props.compte;
  var refreshState = useState(0);
  var refresh = refreshState[0]; var setRefresh = refreshState[1];
  var objetState = useState("");
  var montantState = useState("");

  var mesCommandes = ENGAGEMENTS_DATA.filter(function (e) { return e.service === "Direction de la Logistique"; }).slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });

  function creerCommande() {
    if (!objetState[0].trim() || !montantState[0]) { return; }
    var montant = Number(montantState[0]);
    ENGAGEMENTS_DATA.push({ id: "ENG-" + Date.now(), objet: objetState[0].trim(), montant: montant, service: "Direction de la Logistique", statut: "en_attente", date: new Date().toISOString().slice(0, 10), priorite: montant >= SEUIL_VALIDATION_COMMANDANT ? "haute" : "normale" });
    objetState[1](""); montantState[1]("");
    setRefresh(refresh + 1);
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Commandes & Validations</h2><p className="text-slate-500 text-xs">Workflow hierarchique a deux niveaux — {compte.service}</p></div>
      <div className="bg-slate-800/90 rounded-2xl border border-purple-800 p-4">
        <p className="text-purple-300 text-xs font-black uppercase mb-1">Workflow de validation</p>
        <p className="text-slate-400 text-xs">Toute commande initiee par la Logistique declenche une verification budgetaire du DAF. Les montants superieurs ou egaux a {SEUIL_VALIDATION_COMMANDANT.toLocaleString("fr-FR")} FCFA sont ensuite transmis au Commandant pour approbation finale.</p>
      </div>
      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Nouvelle demande de commande</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <input value={objetState[0]} onChange={function (e) { objetState[1](e.target.value); }} placeholder="Objet de la commande..." className="lg:col-span-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input type="number" value={montantState[0]} onChange={function (e) { montantState[1](e.target.value); }} placeholder="Montant en FCFA" className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
        </div>
        <button onClick={creerCommande} className="mt-3 bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Soumettre au DAF</button>
      </div>
      <div className="space-y-2">
        {mesCommandes.map(function (e) {
          return (
            <div key={e.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center justify-between flex-wrap gap-2">
              <div><p className="text-white font-semibold text-sm">{e.objet}</p><p className="text-slate-500 text-xs">{e.date} — {e.montant.toLocaleString("fr-FR")} FCFA</p></div>
              <Chip color={STC_ENG[e.statut]}>{STL_ENG[e.statut]}</Chip>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DashboardPersonnel(props) {
  var compte = props.compte;
  var syncState = useState(null);
  var lastSync = syncState[0]; var setLastSync = syncState[1];
  var exportState = useState(null);
  var exportTxt = exportState[0]; var setExportTxt = exportState[1];
  var copiedState = useState(false);
  var copied = copiedState[0]; var setCopied = copiedState[1];

  var totalAgents = AGENTS_DATA.length;
  var actifs = AGENTS_DATA.filter(function (a) { return a.statut === "actif"; }).length;
  var detachement = AGENTS_DATA.filter(function (a) { return a.statut === "detachement"; }).length;
  var suspension = AGENTS_DATA.filter(function (a) { return a.statut === "suspension"; }).length;
  var policeCount = AGENTS_DATA.filter(function (a) { return a.corps === "Police"; }).length;
  var gendCount = AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie"; }).length;
  var corpsData = [{ name: "Police", value: policeCount, color: "#003F87" }, { name: "Gendarmerie", value: gendCount, color: "#1B6B3A" }];

  var today = new Date();
  var alertesRH = [];
  AGENTS_DATA.forEach(function (a) {
    var p = AGENT_PROFILS_MAP[a.id];
    if (p && p.dateFinContrat) {
      var jr = Math.round((new Date(p.dateFinContrat + "T00:00:00") - today) / 86400000);
      if (jr <= 90) { alertesRH.push({ type: "Fin de contrat", agent: a.nom, detail: jr >= 0 ? "dans " + jr + " jours" : "depasse de " + Math.abs(jr) + " jours", couleur: jr <= 30 ? "#DC2626" : "#F59E0B" }); }
    }
    if (a.statut === "proposition_promotion") { alertesRH.push({ type: "Promotion imminente", agent: a.nom, detail: "En attente de validation Commandant", couleur: "#8B5CF6" }); }
  });
  if (AGENTS_DATA.filter(function (a) { return a.anciennete >= 28; }).length > 0) { alertesRH.push({ type: "Besoin de recrutement", agent: AGENTS_DATA.filter(function (a) { return a.anciennete >= 28; }).length + " depart(s) a la retraite prevus", detail: "Anticiper le remplacement", couleur: "#F59E0B" }); }

  function genererEtatService() {
    var lignes = AGENTS_DATA.map(function (a) { return a.matricule + " — " + a.nom + " — " + gradeLabel(a) + " — " + a.corps + " — " + a.service + " — " + STATUT_CARRIERE_LABEL[a.statut]; });
    var texte = "ETAT DE SERVICE — " + new Date().toLocaleDateString("fr-FR") + "\nDirection Organisation et Personnel — SIPGN\n\n" + lignes.join("\n") + "\n\nTotal effectif: " + totalAgents + " agents.";
    setExportTxt(texte);
  }
  function copier() { if (navigator.clipboard && exportTxt) { navigator.clipboard.writeText(exportTxt).then(function () { setCopied(true); setTimeout(function () { setCopied(false); }, 2500); }); } }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Gestion des Effectifs</h2><p className="text-slate-400 text-sm">{compte.service}</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">Effectifs synchronises</span></div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={function () { setLastSync(new Date()); }} className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">🔄 Actualiser effectifs</button>
        <button onClick={genererEtatService} className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold">📄 Generer etat de service</button>
        {lastSync ? <span className="text-slate-500 text-xs self-center">Derniere synchro: {lastSync.toLocaleTimeString("fr-FR")}</span> : null}
      </div>

      {exportTxt ? (
        <div className="bg-slate-900 rounded-2xl border border-purple-800 p-4">
          <div className="flex items-center justify-between mb-2"><span className="text-purple-400 text-xs font-black uppercase">Etat de service genere</span><button onClick={copier} className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold">{copied ? "✓ Copie !" : "Copier"}</button></div>
          <p className="text-slate-300 text-xs whitespace-pre-wrap font-mono leading-relaxed">{exportTxt}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={<Users size={18} />} label="Effectifs totaux" value={totalAgents} color="#3B82F6" />
        <StatCard icon="✅" label="En activite" value={actifs} color="#22C55E" />
        <StatCard icon="🌍" label="En detachement" value={detachement} color="#8B5CF6" />
        <StatCard icon="⛔" label="En suspension" value={suspension} color="#EA580C" />
      </div>

      {alertesRH.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-amber-800 p-4">
          <p className="text-amber-300 font-black text-xs uppercase mb-2">Alertes RH</p>
          <div className="space-y-1.5">
            {alertesRH.map(function (a, i) { return (<div key={i} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{a.type} — {a.agent}</span><span style={{ color: a.couleur }} className="font-bold">{a.detail}</span></div>); })}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Repartition par corps</p>
          <div className="h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={corpsData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={70} paddingAngle={3} stroke="none">{corpsData.map(function (e, i) { return <Cell key={i} fill={e.color} />; })}</Pie><Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} /></PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><span className="text-white text-2xl font-black">{totalAgents}</span><span className="text-slate-500 text-xs uppercase">Agents</span></div>
          </div>
          <div className="flex justify-center gap-4 mt-1"><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full" style={{ background: "#003F87" }}></span>Police ({policeCount})</span><span className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-2 h-2 rounded-full" style={{ background: "#1B6B3A" }}></span>Gendarmerie ({gendCount})</span></div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Evolution des effectifs vs besoins</p>
          <p className="text-slate-500 text-xs mb-3">Ressources reelles comparees aux besoins operationnels</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={EVOLUTION_EFFECTIFS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="mois" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
                <Legend wrapperStyle={{ fontSize: 10, color: "#94A3B8" }} />
                <Line type="monotone" dataKey="reel" name="Effectif reel" stroke="#22C55E" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="besoin" name="Besoin estime" stroke="#F59E0B" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Competences de l effectif (Police vs Gendarmerie)</p>
          <p className="text-slate-500 text-xs mb-3">Capacites techniques moyennes par corps</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={["armes", "secourisme", "criminalistique", "informatique", "langues"].map(function (axe) {
                var pol = AGENTS_DATA.filter(function (a) { return a.corps === "Police" && AGENT_PROFILS_MAP[a.id]; });
                var gen = AGENTS_DATA.filter(function (a) { return a.corps === "Gendarmerie" && AGENT_PROFILS_MAP[a.id]; });
                var avgPol = Math.round(pol.reduce(function (s, a) { return s + AGENT_PROFILS_MAP[a.id].competences[axe]; }, 0) / Math.max(pol.length, 1));
                var avgGen = Math.round(gen.reduce(function (s, a) { return s + AGENT_PROFILS_MAP[a.id].competences[axe]; }, 0) / Math.max(gen.length, 1));
                var labels = { armes: "Maitrise armes", secourisme: "Secourisme", criminalistique: "Criminalistique", informatique: "Informatique", langues: "Langues" };
                return { axe: labels[axe], Police: avgPol, Gendarmerie: avgGen };
              })}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="axe" tick={{ fill: "#94A3B8", fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#475569", fontSize: 9 }} />
                <Radar name="Police" dataKey="Police" stroke="#003F87" fill="#003F87" fillOpacity={0.2} strokeWidth={2} />
                <Radar name="Gendarmerie" dataKey="Gendarmerie" stroke="#1B6B3A" fill="#1B6B3A" fillOpacity={0.2} strokeWidth={2} />
                <Legend wrapperStyle={{ fontSize: 10, color: "#94A3B8" }} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Taux d absenteisme par unite</p>
          <p className="text-slate-500 text-xs mb-3">Detecter d eventuels problemes de management</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ABSENTEISME_DATA} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis type="number" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
                <YAxis dataKey="service" type="category" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 9 }} axisLine={false} tickLine={false} width={120} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "%"]; }} />
                <Bar dataKey="taux" radius={[0, 4, 4, 0]} barSize={16}>
                  {ABSENTEISME_DATA.map(function (s, i) { return <Cell key={i} fill={s.taux >= 10 ? "#DC2626" : s.taux >= 6 ? "#F59E0B" : "#22C55E"} />; })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function EDossierPersonnel(props) {
  var compte = props.compte;
  var selState = useState(AGENTS_DATA[0].id);
  var selectedId = selState[0]; var setSelectedId = selState[1];
  var agentsState = useState(AGENTS_DATA.map(function (a) { var c = {}; for (var k in a) { c[k] = a[k]; } return c; }));
  var agents = agentsState[0]; var setAgents = agentsState[1];

  var agent = agents.find(function (a) { return a.id === selectedId; });
  var profil = AGENT_PROFILS_MAP[selectedId];

  function changerStatut(nouveauStatut) {
    setAgents(function (prev) { return prev.map(function (a) { if (a.id !== selectedId) { return a; } var c = {}; for (var k in a) { c[k] = a[k]; } c.statut = nouveauStatut; return c; }); });
  }
  function validerMutation() {
    setAgents(function (prev) { return prev.map(function (a) { if (a.id !== selectedId) { return a; } var c = {}; for (var k in a) { c[k] = a[k]; } c.statut = "actif"; return c; }); });
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Dossier Individuel (e-dossier)</h2><p className="text-slate-500 text-xs">Fiche complete agent — {compte.service}</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-3 lg:col-span-1 max-h-[600px] overflow-auto">
          {agents.map(function (a) {
            var isSel = a.id === selectedId;
            return (
              <button key={a.id} onClick={function () { setSelectedId(a.id); }} className={"w-full text-left px-3 py-2 rounded-xl text-xs mb-1 " + (isSel ? "bg-blue-900/50 border border-blue-700" : "hover:bg-slate-700/50")}>
                <p className="text-white font-semibold">{a.nom}</p>
                <p className="text-slate-500">{a.matricule} — {gradeLabel(a)}</p>
              </button>
            );
          })}
        </div>
        {agent && profil ? (
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div><p className="text-white font-black text-lg">{agent.nom}</p><p className="text-slate-400 text-sm">{gradeLabel(agent)} — {agent.service}</p><p className="text-slate-500 text-xs font-mono">{agent.matricule}</p></div>
                <div className="flex items-center gap-1.5"><CorpsBadge corps={agent.corps} /><Chip color={STATUT_CARRIERE_COLOR[agent.statut]}>{STATUT_CARRIERE_LABEL[agent.statut]}</Chip></div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div><p className="text-slate-500 uppercase">Naissance</p><p className="text-slate-300">{profil.dateNaissance} — {profil.lieuNaissance}</p></div>
                <div><p className="text-slate-500 uppercase">Situation</p><p className="text-slate-300">{profil.situationFamiliale}</p></div>
                <div><p className="text-slate-500 uppercase">Diplome</p><p className="text-slate-300">{agent.diplome}</p></div>
                <div><p className="text-slate-500 uppercase">Anciennete</p><p className="text-slate-300">{agent.anciennete} ans</p></div>
              </div>
              <div className="flex gap-2 mt-3 pt-3 border-t border-slate-700 flex-wrap">
                <select onChange={function (e) { if (e.target.value) { changerStatut(e.target.value); } }} value="" className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs">
                  <option value="">Mettre a jour statut...</option>
                  <option value="actif">En service</option>
                  <option value="conge">En conge</option>
                  <option value="detachement">Detachement</option>
                  <option value="suspension">Suspension</option>
                </select>
                {agent.statut === "proposition_promotion" ? <button onClick={validerMutation} className="bg-green-900 text-green-300 px-3 py-1.5 rounded-lg text-xs font-bold">Valider promotion/mutation</button> : null}
              </div>
            </div>

            <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
              <p className="text-white font-bold text-sm mb-2">Historique des affectations</p>
              <div className="space-y-1.5">{profil.historiqueAffectations.map(function (h, i) { return (<div key={i} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{h.service}</span><span className="text-slate-500">{h.periode}</span></div>); })}</div>
            </div>

            <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
              <p className="text-white font-bold text-sm mb-2">Evaluations de performance</p>
              {profil.evaluations.length === 0 ? <p className="text-slate-500 text-xs">Aucune evaluation enregistree.</p> : (
                <div className="space-y-2">{profil.evaluations.map(function (e, i) { return (<div key={i} className="border-l-2 border-blue-600 pl-3"><p className="text-white text-sm font-bold">{e.annee} — {e.note}/20</p><p className="text-slate-400 text-xs">{e.commentaire}</p></div>); })}</div>
              )}
            </div>

            <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
              <p className="text-white font-bold text-sm mb-2">Historique disciplinaire</p>
              {profil.historiqueDiscipline.length === 0 ? <p className="text-green-400 text-xs">✓ Aucun antecedent disciplinaire.</p> : (
                <div className="space-y-2">{profil.historiqueDiscipline.map(function (d, i) { return (<div key={i} className="border-l-2 border-red-600 pl-3"><p className="text-red-300 text-sm font-bold">{d.date} — {d.motif}</p><p className="text-slate-400 text-xs">Sanction: {d.sanction}</p></div>); })}</div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function GestionAffectations(props) {
  var compte = props.compte;
  var agentsState = useState(AGENTS_DATA.filter(function (a) { return a.statut === "actif" || a.statut === "proposition_promotion"; }).map(function (a) { var c = {}; for (var k in a) { c[k] = a[k]; } return c; }));
  var agents = agentsState[0]; var setAgents = agentsState[1];
  var dragState = useState(null);
  var dragId = dragState[0]; var setDragId = dragState[1];

  var services = Array.from(new Set(agents.map(function (a) { return a.service; })));

  function onDrop(service) {
    if (!dragId) { return; }
    setAgents(function (prev) { return prev.map(function (a) { if (a.id !== dragId) { return a; } var c = {}; for (var k in a) { c[k] = a[k]; } c.service = service; return c; }); });
    setDragId(null);
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Gestion des Affectations</h2><p className="text-slate-500 text-xs">Glissez-deposez un agent vers son nouveau service — {compte.service}</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {services.map(function (service) {
          var groupe = agents.filter(function (a) { return a.service === service; });
          return (
            <div key={service} onDragOver={function (e) { e.preventDefault(); }} onDrop={function () { onDrop(service); }} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-3 min-h-[180px]">
              <p className="text-white font-bold text-xs mb-2 truncate">{service} ({groupe.length})</p>
              <div className="space-y-1.5">
                {groupe.map(function (a) {
                  return (
                    <div key={a.id} draggable onDragStart={function () { setDragId(a.id); }} className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 cursor-move hover:border-blue-600">
                      <p className="text-slate-200 text-xs font-semibold">{a.nom}</p>
                      <p className="text-slate-500 text-[10px]">{gradeLabel(a)} — {a.matricule}</p>
                    </div>
                  );
                })}
                {groupe.length === 0 ? <p className="text-slate-600 text-xs italic">Deposez un agent ici</p> : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlanningPresence(props) {
  var compte = props.compte;
  var congesState = useState(AGENTS_DATA.filter(function (a) { return a.statut === "conge"; }).map(function (a) { return { agentId: a.id, statut: "en_attente" }; }));
  var conges = congesState[0]; var setConges = congesState[1];
  var JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  var SERVICES_COUVERTURE = Array.from(new Set(AGENTS_DATA.map(function (a) { return a.service; }))).slice(0, 6);

  function traiterConge(agentId, decision) {
    setConges(function (prev) { return prev.map(function (c) { if (c.agentId !== agentId) { return c; } return { agentId: agentId, statut: decision }; }); });
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Planning et Presence</h2><p className="text-slate-500 text-xs">Validation des conges et couverture de service — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Demandes de conge en attente</p>
        {conges.filter(function (c) { return c.statut === "en_attente"; }).length === 0 ? <p className="text-slate-500 text-xs">Aucune demande en attente.</p> : (
          <div className="space-y-2">
            {conges.filter(function (c) { return c.statut === "en_attente"; }).map(function (c) {
              var agent = AGENTS_DATA.find(function (a) { return a.id === c.agentId; });
              return (
                <div key={c.agentId} className="border border-slate-700 rounded-xl p-3 flex items-center justify-between flex-wrap gap-2">
                  <div><p className="text-white font-semibold text-sm">{agent.nom}</p><p className="text-slate-500 text-xs">{agent.service}</p></div>
                  <div className="flex gap-2"><button onClick={function () { traiterConge(c.agentId, "valide"); }} className="bg-green-900 text-green-300 px-3 py-1.5 rounded-lg text-xs font-bold">Valider</button><button onClick={function () { traiterConge(c.agentId, "refuse"); }} className="bg-red-900 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold">Refuser</button></div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5 overflow-auto">
        <p className="text-white font-bold text-sm mb-3">Couverture de service — semaine en cours</p>
        <table className="w-full text-xs">
          <thead><tr><th className="text-left text-slate-500 pb-2 pr-2">Service</th>{JOURS.map(function (j) { return <th key={j} className="text-slate-500 pb-2 px-1">{j}</th>; })}</tr></thead>
          <tbody>
            {SERVICES_COUVERTURE.map(function (s, si) {
              return (
                <tr key={s} className="border-t border-slate-800">
                  <td className="text-slate-300 py-2 pr-2 truncate max-w-[140px]">{s}</td>
                  {JOURS.map(function (j, ji) {
                    var pct = 60 + ((si * 7 + ji) % 5) * 8;
                    var col = pct >= 85 ? "#22C55E" : pct >= 65 ? "#F59E0B" : "#DC2626";
                    return <td key={j} className="px-1 py-2 text-center"><span style={{ color: col }} className="font-bold">{pct}%</span></td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AcademieFormation(props) {
  var compte = props.compte;
  var sessionsState = useState(SESSIONS_FORMATION_DATA.map(function (s) { var c = {}; for (var k in s) { c[k] = k === "candidats" ? [] : s[k]; } return c; }));
  var sessions = sessionsState[0]; var setSessions = sessionsState[1];
  var openState = useState(null);
  var openSession = openState[0]; var setOpenSession = openState[1];
  var showForm = useState(false);
  var setShowForm = showForm[1]; var showFormVal = showForm[0];
  var nomS = useState(""); var ancS = useState(0); var gradeS = useState(0); var dureeS = useState(""); var dateS = useState("");

  function creerSession() {
    if (!nomS[0].trim()) { return; }
    var nouvelle = { id: "SES-" + Date.now(), nom: nomS[0].trim(), ancienneteMin: Number(ancS[0]), gradeMin: Number(gradeS[0]), specialite: null, duree: dureeS[0] || "A definir", dateDebut: dateS[0] || "A definir", statut: "ouverte", candidats: [] };
    setSessions(function (prev) { return prev.concat([nouvelle]); });
    nomS[1](""); ancS[1](0); gradeS[1](0); dureeS[1](""); dateS[1]("");
    setShowForm(false);
  }

  function ajouterCandidat(sessionId, agentId) {
    setSessions(function (prev) { return prev.map(function (s) { if (s.id !== sessionId) { return s; } if (s.candidats.indexOf(agentId) >= 0) { return s; } var c = {}; for (var k in s) { c[k] = s[k]; } c.candidats = s.candidats.concat([agentId]); return c; }); });
  }
  function retirerCandidat(sessionId, agentId) {
    setSessions(function (prev) { return prev.map(function (s) { if (s.id !== sessionId) { return s; } var c = {}; for (var k in s) { c[k] = s[k]; } c.candidats = s.candidats.filter(function (id) { return id !== agentId; }); return c; }); });
  }

  function verifierCompatibilite(session, agent) {
    var motifs = [];
    if (agent.anciennete < session.ancienneteMin) { motifs.push("Anciennete insuffisante (" + agent.anciennete + " ans, requis " + session.ancienneteMin + ")"); }
    if (agent.gradeIndex < session.gradeMin) { motifs.push("Grade insuffisant (requis: " + gradesDe(agent.corps)[session.gradeMin] + ")"); }
    return { compatible: motifs.length === 0, motifs: motifs };
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Academie & Formation</h2><p className="text-slate-500 text-xs">Cycle de montee en competences — {compte.service}</p></div>
        <button onClick={function () { setShowForm(!showFormVal); }} className="bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold">{showFormVal ? "Fermer" : "+ Creer nouvelle session"}</button>
      </div>

      {showFormVal ? (
        <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-3">
          <input value={nomS[0]} onChange={function (e) { nomS[1](e.target.value); }} placeholder="Nom de la formation..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <div><label className="text-slate-400 text-xs font-bold uppercase">Anciennete min (ans)</label><input type="number" value={ancS[0]} onChange={function (e) { ancS[1](e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" /></div>
            <div><label className="text-slate-400 text-xs font-bold uppercase">Grade min (index 0-9)</label><input type="number" value={gradeS[0]} onChange={function (e) { gradeS[1](e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" /></div>
            <div><label className="text-slate-400 text-xs font-bold uppercase">Duree</label><input value={dureeS[0]} onChange={function (e) { dureeS[1](e.target.value); }} placeholder="ex: 6 semaines" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" /></div>
            <div><label className="text-slate-400 text-xs font-bold uppercase">Date debut</label><input type="date" value={dateS[0]} onChange={function (e) { dateS[1](e.target.value); }} className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" /></div>
          </div>
          <button onClick={creerSession} className="bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Creer la session</button>
        </div>
      ) : null}

      <div className="space-y-3">
        {sessions.map(function (s) {
          var isOpen = openSession === s.id;
          return (
            <div key={s.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
              <button onClick={function () { setOpenSession(isOpen ? null : s.id); }} className="w-full text-left flex items-center justify-between flex-wrap gap-2">
                <div><p className="text-white font-bold text-sm">{s.nom}</p><p className="text-slate-500 text-xs">{s.duree} — Debut: {s.dateDebut} — Prerequis: {s.ancienneteMin} ans min, grade ≥ {s.ancienneteMin > 0 || s.gradeMin > 0 ? "index " + s.gradeMin : "aucun"}</p></div>
                <Chip color="#3B82F6">{s.candidats.length} candidat(s)</Chip>
              </button>
              {isOpen ? (
                <div className="mt-3 pt-3 border-t border-slate-700 space-y-3">
                  <div>
                    <label className="text-slate-400 text-xs font-bold uppercase">Ajouter un candidat</label>
                    <select onChange={function (e) { if (e.target.value) { ajouterCandidat(s.id, e.target.value); e.target.value = ""; } }} value="" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm">
                      <option value="">Selectionner un agent...</option>
                      {AGENTS_DATA.filter(function (a) { return s.candidats.indexOf(a.id) < 0; }).map(function (a) { return <option key={a.id} value={a.id}>{a.nom} — {gradeLabel(a)} — {a.anciennete} ans</option>; })}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    {s.candidats.map(function (agentId) {
                      var agent = AGENTS_DATA.find(function (a) { return a.id === agentId; });
                      var compat = verifierCompatibilite(s, agent);
                      return (
                        <div key={agentId} className={"border rounded-xl p-3 " + (compat.compatible ? "border-green-700 bg-green-950/15" : "border-red-700 bg-red-950/20")}>
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <p className="text-white font-semibold text-sm">{compat.compatible ? "✅" : "🔴"} {agent.nom}</p>
                              <p className="text-slate-500 text-xs">{gradeLabel(agent)} — {agent.anciennete} ans — {agent.service}</p>
                              {!compat.compatible ? <p className="text-red-400 text-xs mt-1">{compat.motifs.join(" — ")}</p> : null}
                            </div>
                            <div className="flex gap-1.5 shrink-0">
                              {compat.compatible ? <button className="bg-green-900 text-green-300 px-3 py-1.5 rounded-lg text-xs font-bold">Valider inscription</button> : null}
                              <button onClick={function () { retirerCandidat(s.id, agentId); }} className="bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold">Retirer</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Projets academiques par filiere</p>
          <p className="text-slate-500 text-xs mb-3">Nombre d agents inscrits par diplome vise</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.entries(ASPIRATIONS_DATA.reduce(function (acc, a) { acc[a.diplomeVise] = (acc[a.diplomeVise] || 0) + 1; return acc; }, {})).map(function (e) { return { diplome: e[0], count: e[1] }; })}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="diplome" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 8 }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-3">Taux de conformite aux formations obligatoires</p>
          <div className="space-y-3">
            {FORMATIONS_OBLIGATOIRES_DATA.map(function (f) {
              var pct = Math.round((f.valide / f.total) * 100);
              var col = pct >= 80 ? "#22C55E" : pct >= 50 ? "#F59E0B" : "#DC2626";
              return (
                <div key={f.id} className="flex items-center gap-3">
                  <div className="h-16 w-16 shrink-0 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart><Pie data={[{ v: pct }, { v: 100 - pct }]} dataKey="v" innerRadius={20} outerRadius={28} startAngle={90} endAngle={-270} stroke="none"><Cell fill={col} /><Cell fill="#1E293B" /></Pie></PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center"><span style={{ color: col }} className="text-[10px] font-black">{pct}%</span></div>
                  </div>
                  <div><p className="text-slate-200 text-xs font-semibold">{f.nom}</p><p className="text-slate-500 text-[10px]">{f.valide}/{f.total} agents conformes</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function CarrieresMobilite(props) {
  var compte = props.compte;
  var disposState = useState(DISPONIBILITE_DATA.map(function (d) { var c = {}; for (var k in d) { c[k] = d[k]; } return c; }));
  var dispos = disposState[0]; var setDispos = disposState[1];
  var filterState = useState("tous");
  var filterDiplome = filterState[0]; var setFilterDiplome = filterState[1];

  function traiter(id, avis) {
    setDispos(function (prev) { return prev.map(function (d) { if (d.id !== id) { return d; } var c = {}; for (var k in d) { c[k] = d[k]; } c.statut = avis; return c; }); });
  }

  var diplomesUniques = Array.from(new Set(ASPIRATIONS_DATA.map(function (a) { return a.diplomeVise; })));
  var aspirationsFiltrees = filterDiplome === "tous" ? ASPIRATIONS_DATA : ASPIRATIONS_DATA.filter(function (a) { return a.diplomeVise === filterDiplome; });

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Gestion des Carrieres & Mobilite</h2><p className="text-slate-500 text-xs">Disponibilites et aspirations academiques — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Demandes de mise en disponibilite</p>
        <div className="space-y-2">
          {dispos.map(function (d) {
            var agent = AGENTS_DATA.find(function (a) { return a.id === d.agentId; });
            return (
              <div key={d.id} className="border border-slate-700 rounded-xl p-3">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="text-white font-semibold text-sm">{agent.nom} — {agent.matricule}</p><p className="text-slate-400 text-xs">Duree: {d.duree} — Motif: {d.motif}</p></div>
                  <Chip color={d.statut === "favorable" ? "#22C55E" : d.statut === "defavorable" ? "#DC2626" : "#F59E0B"}>{d.statut === "favorable" ? "Avis favorable" : d.statut === "defavorable" ? "Avis defavorable" : "En attente"}</Chip>
                </div>
                {d.statut === "en_attente" ? (
                  <div className="flex gap-2 mt-2"><button onClick={function () { traiter(d.id, "favorable"); }} className="bg-green-900 text-green-300 px-3 py-1.5 rounded-lg text-xs font-bold">Avis favorable</button><button onClick={function () { traiter(d.id, "defavorable"); }} className="bg-red-900 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold">Avis defavorable</button></div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <p className="text-white font-bold text-sm">Registre des aspirations academiques</p>
          <select value={filterDiplome} onChange={function (e) { setFilterDiplome(e.target.value); }} className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs">
            <option value="tous">Tous les diplomes</option>
            {diplomesUniques.map(function (d) { return <option key={d} value={d}>{d}</option>; })}
          </select>
        </div>
        <div className="space-y-2">
          {aspirationsFiltrees.map(function (asp) {
            var agent = AGENTS_DATA.find(function (a) { return a.id === asp.agentId; });
            return (
              <div key={asp.id} className="flex items-center justify-between border-b border-slate-800 pb-2 flex-wrap gap-2">
                <div><p className="text-slate-200 text-sm font-semibold">{agent.nom}</p><p className="text-slate-500 text-xs">{asp.diplomeVise}</p></div>
                {asp.strategique ? <Chip color="#22C55E">Strategique pour le service</Chip> : <Chip color="#64748B">Aspiration personnelle</Chip>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

var ENQUETES_DATA = [
  { id: "ENQ-001", titre: "Braquage Marche Total — reseau organise", type: "Vol a main armee", gravite: "critique", statut: "en_cours", opjAssigne: "MALANDA Christian", dateOuverture: "2026-06-18", brigade: "Brigade Criminelle", instructions: "Exploiter les videos de surveillance du marche, identifier le vehicule de fuite." },
  { id: "ENQ-002", titre: "Trafic de stupefiants — Port de Brazzaville", type: "Trafic de stupefiants", gravite: "critique", statut: "en_cours", opjAssigne: "MBEMBA Joel", dateOuverture: "2026-06-15", brigade: "Brigade des Stupefiants", instructions: "Surveillance du quai 3, identification des receptionnaires." },
  { id: "ENQ-003", titre: "Faux documents — Aeroport Maya-Maya", type: "Faux documents", gravite: "grave", statut: "instruction_terminee", opjAssigne: "ITOUA Patrice", dateOuverture: "2026-05-28", brigade: "Brigade des Fraudes", instructions: "Dossier pret pour transmission, verifier la coherence du PV de synthese." },
  { id: "ENQ-004", titre: "Tentative d evasion — Maison d arret BZV", type: "Evasion", gravite: "critique", statut: "transmis_parquet", opjAssigne: "MALANDA Christian", dateOuverture: "2026-06-10", brigade: "Brigade Criminelle", instructions: "Dossier transmis, complement d enquete sur les complicites internes en cours." },
  { id: "ENQ-005", titre: "Serie de cambriolages — Bacongo / Poto-Poto", type: "Cambriolage", gravite: "grave", statut: "en_cours", opjAssigne: null, dateOuverture: "2026-06-12", brigade: "Brigade Criminelle", instructions: "Au moins 4 cambriolages avec meme mode operatoire — necessite affectation d un OPJ supplementaire." },
  { id: "ENQ-006", titre: "Escroquerie en ligne — victime MOUKALA Bernadette", type: "Escroquerie", gravite: "moyen", statut: "en_cours", opjAssigne: "ITOUA Patrice", dateOuverture: "2026-06-08", brigade: "Brigade des Fraudes", instructions: "Tracer le virement bancaire, requete aupres de la MUCODEC." },
  { id: "ENQ-007", titre: "Vol de vehicule — RAV4 gris", type: "Vol de vehicule", gravite: "grave", statut: "cloturee", opjAssigne: "MBEMBA Joel", dateOuverture: "2026-04-02", brigade: "Brigade Criminelle", instructions: "Dossier clos, vehicule retrouve et restitue." },
  { id: "ENQ-008", titre: "Reseau de faux papiers — investigation prolongee", type: "Faux documents", gravite: "grave", statut: "en_cours", opjAssigne: null, dateOuverture: "2026-01-15", brigade: "Brigade des Fraudes", instructions: "Dossier en souffrance depuis plus de 5 mois — necessite renfort cybercriminalite." }
];

var STATUT_ENQ_LABEL = { en_cours: "En cours", instruction_terminee: "Instruction terminee", transmis_parquet: "Transmis Parquet", cloturee: "Cloturee" };
var STATUT_ENQ_COLOR = { en_cours: "#F59E0B", instruction_terminee: "#3B82F6", transmis_parquet: "#8B5CF6", cloturee: "#22C55E" };

var TYPOLOGIE_CRIMES_DATA = [
  { name: "Vols", value: 40, color: "#DC2626" },
  { name: "Stupefiants", value: 30, color: "#F59E0B" },
  { name: "Escroqueries", value: 20, color: "#3B82F6" },
  { name: "Autres", value: 10, color: "#64748B" }
];

var EVOLUTION_CRIMINALITE_30J = [
  { jour: "01/06", incidents: 3 }, { jour: "04/06", incidents: 4 }, { jour: "07/06", incidents: 2 }, { jour: "10/06", incidents: 5 },
  { jour: "13/06", incidents: 6 }, { jour: "16/06", incidents: 4 }, { jour: "19/06", incidents: 7 }, { jour: "22/06", incidents: 6 },
  { jour: "25/06", incidents: 8 }, { jour: "28/06", incidents: 5 }
];

var COLD_CASES_DATA = [
  { categorie: "Resolus < 3 mois", count: 9, color: "#22C55E" },
  { categorie: "En cours < 6 mois", count: 6, color: "#3B82F6" },
  { categorie: "En souffrance 6-12 mois", count: 4, color: "#F59E0B" },
  { categorie: "Cold cases (12 mois+)", count: 3, color: "#DC2626" }
];

function DashboardDPJ(props) {
  var compte = props.compte;
  var mesEnquetes = ENQUETES_DATA;
  var enCours = mesEnquetes.filter(function (e) { return e.statut === "en_cours"; }).length;
  var cloturees = mesEnquetes.filter(function (e) { return e.statut === "cloturee" || e.statut === "transmis_parquet"; }).length;
  var tauxResolution = Math.round((cloturees / mesEnquetes.length) * 100);
  var gavDCPJ = GARDES_VUE_DATA.filter(function (g) { return g.unite === "DCPJ Brazzaville" && g.statut !== "libere"; });
  var transmisParquet = mesEnquetes.filter(function (e) { return e.statut === "transmis_parquet"; }).length;
  var alertesCriticite = INCIDENTS_DATA.filter(function (i) { return i.gravite === "critique" && i.statut === "en_cours"; });
  var gavCritiques = gavDCPJ.filter(function (g) { return g.heuresRestantes <= 6; });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Centre Nevralgique — Police Judiciaire</h2><p className="text-slate-400 text-sm">{compte.service}</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">Renseignement actif</span></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon="🕵️" label="Enquetes en cours" value={enCours} sub={mesEnquetes.length + " dossiers geres"} color="#3B82F6" />
        <StatCard icon="📊" label="Taux de resolution" value={tauxResolution + "%"} sub="Dossiers clotures / Parquet" color={tauxResolution >= 60 ? "#22C55E" : "#F59E0B"} />
        <StatCard icon="🔒" label="Suspects en GAV" value={gavDCPJ.length} sub={gavCritiques.length + " en delai critique"} color="#F59E0B" />
        <StatCard icon="⚖️" label="Transmis au Parquet" value={transmisParquet} sub="Ce mois-ci" color="#8B5CF6" />
      </div>

      {alertesCriticite.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-red-800 p-4">
          <p className="text-red-300 font-black text-xs uppercase mb-2">🚨 Alertes de criticite — crimes graves signales</p>
          <div className="space-y-1.5">
            {alertesCriticite.map(function (i) { return (<div key={i.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{i.type} — {i.lieu}</span><Chip color={GRAVITE_COLOR[i.gravite]}>{i.gravite}</Chip></div>); })}
          </div>
        </div>
      ) : null}

      {gavCritiques.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-amber-800 p-4">
          <p className="text-amber-300 font-black text-xs uppercase mb-2">⏱️ Delais GAV proches de l expiration</p>
          <div className="space-y-2">
            {gavCritiques.map(function (g) { return (<div key={g.id}><div className="flex items-center justify-between text-xs mb-1"><span className="text-slate-300">{g.nom} — {g.motif}</span></div><GavTimer heures={g.heuresRestantes} /></div>); })}
          </div>
        </div>
      ) : null}

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-3">Flux des dossiers recents</p>
        <div className="space-y-2">
          {mesEnquetes.slice().sort(function (a, b) { return a.dateOuverture < b.dateOuverture ? 1 : -1; }).slice(0, 5).map(function (e) {
            return (<div key={e.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1.5"><span className="text-slate-300">{e.titre}</span><Chip color={STATUT_ENQ_COLOR[e.statut]}>{STATUT_ENQ_LABEL[e.statut]}</Chip></div>);
          })}
        </div>
      </div>
    </div>
  );
}

function PilotageDPJ(props) {
  var compte = props.compte;
  var BZV_ZONES_DPJ = [
    { nom: "Makelelekele", x: 110, y: 265 }, { nom: "Bacongo", x: 175, y: 235 }, { nom: "Poto-Poto", x: 260, y: 195 },
    { nom: "Moungali", x: 315, y: 168 }, { nom: "Ouenze", x: 360, y: 142 }, { nom: "Talangai", x: 400, y: 115 },
    { nom: "Mfilou", x: 145, y: 200 }, { nom: "Madibou", x: 88, y: 300 }, { nom: "Djiri", x: 435, y: 92 }
  ];
  var incParZone = {};
  INCIDENTS_DATA.forEach(function (inc) {
    BZV_ZONES_DPJ.forEach(function (z) { if (inc.lieu.toLowerCase().indexOf(z.nom.toLowerCase().slice(0, 5)) >= 0) { incParZone[z.nom] = (incParZone[z.nom] || 0) + 1; } });
    if (inc.lieu.toLowerCase().indexOf("bacongo") >= 0) { incParZone["Bacongo"] = (incParZone["Bacongo"] || 0) + 1; }
    if (inc.lieu.toLowerCase().indexOf("poto") >= 0 || inc.lieu.toLowerCase().indexOf("port") >= 0) { incParZone["Poto-Poto"] = (incParZone["Poto-Poto"] || 0) + 1; }
    if (inc.lieu.toLowerCase().indexOf("moungali") >= 0) { incParZone["Moungali"] = (incParZone["Moungali"] || 0) + 1; }
  });

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Pilotage — Analyse et Cartographie</h2><p className="text-slate-500 text-xs">Outils d analyse de la criminalite — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Heatmap de la criminalite — Crime Mapping</p>
        <p className="text-slate-500 text-xs mb-3">Zones de forte concentration delictuelle — Brazzaville</p>
        <div className="bg-slate-950 rounded-xl overflow-hidden" style={{ height: 320 }}>
          <svg width="100%" height="100%" viewBox="0 0 520 340">
            <rect width="520" height="340" fill="#0B1120" />
            <path d="M 0 310 Q 260 295 520 305" stroke="#1E3A5F" strokeWidth="18" fill="none" opacity="0.5" />
            {BZV_ZONES_DPJ.map(function (z) {
              var nb = incParZone[z.nom] || 0;
              var r = 24 + nb * 12;
              var col = nb >= 2 ? "#DC2626" : nb >= 1 ? "#F59E0B" : "#1E293B";
              return (<g key={z.nom}><circle cx={z.x} cy={z.y} r={r} fill={col} opacity={nb > 0 ? 0.2 : 0.06} /><circle cx={z.x} cy={z.y} r={16} fill={col} opacity={nb > 0 ? 0.8 : 0.15} />{nb > 0 ? <text x={z.x} y={z.y + 4} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">{nb}</text> : null}<text x={z.x} y={z.y - 22} textAnchor="middle" fill="#94A3B8" fontSize={9}>{z.nom}</text></g>);
            })}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Typologie des crimes</p>
          <p className="text-slate-500 text-xs mb-3">Repartition des infractions traitees</p>
          <div className="flex items-center gap-4">
            <div className="h-40 w-40 shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={TYPOLOGIE_CRIMES_DATA} dataKey="value" nameKey="name" innerRadius={42} outerRadius={65} paddingAngle={2} stroke="none">{TYPOLOGIE_CRIMES_DATA.map(function (e, i) { return <Cell key={i} fill={e.color} />; })}</Pie><Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} formatter={function (v) { return [v + "%"]; }} /></PieChart></ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1.5">{TYPOLOGIE_CRIMES_DATA.map(function (e, i) { return (<div key={i} className="flex items-center justify-between text-xs"><span className="flex items-center gap-1.5 text-slate-300"><span className="w-2 h-2 rounded-full shrink-0" style={{ background: e.color }}></span>{e.name}</span><span className="text-slate-500">{e.value}%</span></div>); })}</div>
          </div>
        </div>
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
          <p className="text-white font-bold text-sm mb-1">Evolution de la criminalite — 30 jours</p>
          <p className="text-slate-500 text-xs mb-3">Detecter une montee de la violence</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EVOLUTION_CRIMINALITE_30J}>
                <defs><linearGradient id="crimGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#DC2626" stopOpacity={0.5} /><stop offset="95%" stopColor="#DC2626" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="jour" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
                <Area type="monotone" dataKey="incidents" stroke="#DC2626" fill="url(#crimGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Cold Cases — Pression sur les dossiers anciens</p>
        <p className="text-slate-500 text-xs mb-3">Repartition des dossiers selon leur anciennete</p>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COLD_CASES_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="categorie" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 8 }} axisLine={false} tickLine={false} interval={0} angle={-10} textAnchor="end" height={50} />
              <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>{COLD_CASES_DATA.map(function (c, i) { return <Cell key={i} fill={c.color} />; })}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ActionsDPJ(props) {
  var compte = props.compte;
  var enquetesState = useState(ENQUETES_DATA.map(function (e) { var c = {}; for (var k in e) { c[k] = e[k]; } return c; }));
  var enquetes = enquetesState[0]; var setEnquetes = enquetesState[1];
  var hotspotState = useState(null);
  var hotspotMsg = hotspotState[0]; var setHotspotMsg = hotspotState[1];
  var zoneState = useState("");

  var opjDisponibles = AGENTS_DATA.filter(function (a) { return a.service === "DCPJ Brazzaville" && a.statut === "actif"; });

  function affecterOPJ(id, opj) {
    setEnquetes(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.opjAssigne = opj; return c; }); });
  }
  function transmettreParquet(id) {
    setEnquetes(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.statut = "transmis_parquet"; return c; }); });
  }
  function changerStatut(id, statut) {
    setEnquetes(function (prev) { return prev.map(function (e) { if (e.id !== id) { return e; } var c = {}; for (var k in e) { c[k] = e[k]; } c.statut = statut; return c; }); });
  }
  function lancerHotspot() {
    if (!zoneState[0].trim()) { return; }
    setHotspotMsg("Alerte transmise aux patrouilles et au Commandement pour la zone: " + zoneState[0]);
    zoneState[1]("");
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Actions — Pilotage des Enquetes</h2><p className="text-slate-500 text-xs">Commandes rapides — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-red-800 p-5">
        <p className="text-red-300 font-bold text-sm mb-1">🔥 Lancer alerte "Hotspot"</p>
        <p className="text-slate-500 text-xs mb-3">Alerter les patrouilles sur une zone en pic d incidents (en lien avec le Commandant)</p>
        <div className="flex gap-2 flex-wrap">
          <input value={zoneState[0]} onChange={function (e) { zoneState[1](e.target.value); }} placeholder="Zone concernee (ex: Poto-Poto, Marche Total)..." className="flex-1 min-w-[200px] bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <button onClick={lancerHotspot} className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold">Lancer l alerte</button>
        </div>
        {hotspotMsg ? <p className="text-green-400 text-xs mt-2">✓ {hotspotMsg}</p> : null}
      </div>

      <div className="space-y-3">
        {enquetes.map(function (e) {
          return (
            <div key={e.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
              <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap"><span className="text-white font-bold text-sm">{e.titre}</span><Chip color={GRAVITE_COLOR[e.gravite]}>{e.gravite}</Chip></div>
                  <p className="text-slate-500 text-xs">{e.brigade} — Ouvert le {e.dateOuverture}</p>
                  <p className="text-slate-400 text-xs mt-0.5">OPJ: {e.opjAssigne || "Non affecte"}</p>
                </div>
                <Chip color={STATUT_ENQ_COLOR[e.statut]}>{STATUT_ENQ_LABEL[e.statut]}</Chip>
              </div>
              <div className="flex gap-2 flex-wrap pt-2 border-t border-slate-700">
                <select onChange={function (ev) { if (ev.target.value) { affecterOPJ(e.id, ev.target.value); } }} value="" className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs">
                  <option value="">Affecter enqueteur...</option>
                  {opjDisponibles.map(function (a) { return <option key={a.id} value={a.nom}>{a.nom}</option>; })}
                </select>
                {e.statut !== "transmis_parquet" && e.statut !== "cloturee" ? <button onClick={function () { transmettreParquet(e.id); }} className="bg-purple-900 text-purple-300 px-3 py-1.5 rounded-lg text-xs font-bold">Transmettre au Parquet</button> : null}
                <select onChange={function (ev) { if (ev.target.value) { changerStatut(e.id, ev.target.value); } }} value="" className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs">
                  <option value="">Mettre a jour statut...</option>
                  <option value="en_cours">En cours</option>
                  <option value="instruction_terminee">Instruction terminee</option>
                  <option value="cloturee">Cloturee</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailDPJ(props) {
  var compte = props.compte;
  var tabState = useState("gav");
  var tab = tabState[0]; var setTab = tabState[1];
  var gavDCPJ = GARDES_VUE_DATA.filter(function (g) { return g.unite === "DCPJ Brazzaville"; });
  var TABS = [["gav", "Registre GAV", "🔒"], ["dossiers", "Flux des dossiers", "📁"], ["profils", "Profils suspects", "🎯"]];

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Detail — Base de Travail Quotidienne</h2><p className="text-slate-500 text-xs">{compte.service}</p></div>
      <div className="flex gap-2 flex-wrap">{TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-red-700 text-white border-red-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}</div>

      {tab === "gav" ? (
        <div className="space-y-3">
          {gavDCPJ.map(function (g) { return (<div key={g.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4"><div className="flex items-start justify-between mb-2"><div><p className="text-white font-bold">{g.nom}</p><p className="text-slate-400 text-xs">Motif: {g.motif}</p></div><Chip color={g.statut === "libere" ? "#22C55E" : g.heuresRestantes <= 6 ? "#DC2626" : "#F59E0B"}>{g.statut}</Chip></div>{g.statut !== "libere" ? <GavTimer heures={g.heuresRestantes} /> : null}</div>); })}
        </div>
      ) : null}

      {tab === "dossiers" ? (
        <div className="space-y-2">
          {ENQUETES_DATA.slice().sort(function (a, b) { return a.dateOuverture < b.dateOuverture ? 1 : -1; }).map(function (e) {
            return (<div key={e.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4"><div className="flex items-start justify-between gap-2 flex-wrap"><div><p className="text-white font-bold text-sm">{e.titre}</p><p className="text-slate-500 text-xs">{e.brigade} — {e.dateOuverture}</p><p className="text-slate-400 text-xs mt-1 italic">Instructions: {e.instructions}</p></div><Chip color={STATUT_ENQ_COLOR[e.statut]}>{STATUT_ENQ_LABEL[e.statut]}</Chip></div></div>);
          })}
        </div>
      ) : null}

      {tab === "profils" ? (
        <div className="space-y-2">
          {RECHERCHES_DATA.map(function (r) {
            return (<div key={r.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4 flex items-center gap-4"><div className={"w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shrink-0 " + (r.dangereux ? "bg-red-900 text-red-300" : "bg-slate-700 text-slate-300")}>{r.photo}</div><div className="flex-1 min-w-0"><div className="flex items-center gap-2 flex-wrap"><span className="text-white font-bold">{r.nom}</span>{r.dangereux ? <Chip color="#DC2626">Dangereux</Chip> : null}</div><p className="text-slate-400 text-xs">{r.motif}</p><p className="text-slate-500 text-xs font-mono">{r.reference}</p></div><Chip color={STATUT_RCH_COLOR[r.statut]}>{STATUT_RCH_LABEL[r.statut]}</Chip></div>);
          })}
        </div>
      ) : null}
    </div>
  );
}

function DataScientistDPJ(props) {
  var compte = props.compte;
  var tabState = useState("forecast");
  var tab = tabState[0]; var setTab = tabState[1];
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var ai3 = useState({ loading: false, result: null });
  var ai4 = useState({ loading: false, result: null });
  var rapportInput = useState("");
  var indiceInput = useState("");
  var SYS = "Tu es l assistant IA Data Scientist de la Police Judiciaire (DCPJ) du Congo. Tu fais de l analyse predictive et de l aide a l investigation. Reponds en francais, de maniere structuree, precise et operationnelle pour un Directeur de Police Judiciaire.";

  function callIA(setter, prompt) {
    setter({ loading: true, result: null });
    fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1100, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur de connexion." }); });
  }

  var TABS = [["forecast", "Crime Forecaster", "🔮"], ["enquete", "Aide a l Enquete", "🔍"], ["ressources", "Pilotage Ressources", "👥"], ["anomalies", "Detection Anomalies", "⚠️"]];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-900 to-slate-900 border border-red-700 flex items-center justify-center text-2xl shrink-0">🕵️</div>
        <div><h2 className="text-2xl font-black text-white">Data Scientist IA — Police Judiciaire</h2><p className="text-slate-500 text-xs">Moteur d analyse predictive et d aide a l investigation — {compte.service}</p></div>
      </div>
      <div className="flex gap-2 flex-wrap">{TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-red-700 text-white border-red-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}</div>

      {tab === "forecast" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Dossiers et incidents recents — base d analyse</p>
            <div className="space-y-1">{INCIDENTS_DATA.slice(0, 6).map(function (i) { return (<div key={i.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300">{i.type} — {i.lieu}</span><Chip color={GRAVITE_COLOR[i.gravite]}>{i.gravite}</Chip></div>); })}</div>
          </div>
          <button onClick={function () {
            var ctx = "Incidents recents: " + JSON.stringify(INCIDENTS_DATA.map(function (i) { return { type: i.type, lieu: i.lieu, gravite: i.gravite, description: i.description }; })) + " | Enquetes actives: " + JSON.stringify(ENQUETES_DATA.filter(function (e) { return e.statut === "en_cours"; }).map(function (e) { return { titre: e.titre, type: e.type, brigade: e.brigade }; }));
            callIA(ai1[1], "Modelise les zones a risque pour les prochaines 24h a Brazzaville (Crime Forecaster). Sur base des donnees: 1) Zones a forte probabilite d infraction dans les 24h (justifie par les patterns observes) 2) Type d infraction le plus probable par zone 3) Recommandation de deploiement preventif des effectifs 4) CORRELATION DES MODES OPERATOIRES: identifie si plusieurs crimes recents presentent des similitudes (horaires, outils, cibles) suggerant un meme groupe de malfaiteurs, avec justification precise. Donnees: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔮 Lancer la modelisation predictive 24h</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}

      {tab === "enquete" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Synthese automatisee de rapport / PV</p>
            <p className="text-slate-500 text-xs mb-3">Collez le texte d un rapport OPJ ou PV pour extraction des faits saillants</p>
            <textarea value={rapportInput[0]} onChange={function (e) { rapportInput[1](e.target.value); }} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none mb-2" placeholder="Collez ici le rapport ou PV a analyser..." />
            <button onClick={function () { if (rapportInput[0].trim()) { callIA(ai2[1], "Analyse ce rapport OPJ / PV d enquete et fournis: 1) FAITS SAILLANTS (resume des elements cles) 2) INCOHERENCES detectees dans les temoignages ou declarations 3) POINTS DE CONVERGENCE avec d autres enquetes en cours du DCPJ (dossiers actifs: " + JSON.stringify(ENQUETES_DATA.filter(function (e) { return e.statut === "en_cours"; }).map(function (e) { return e.titre; })) + ") 4) PISTES D ENQUETE recommandees. Texte du rapport: " + rapportInput[0]); } }} className="bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Analyser le rapport</button>
            <AIBloc state={ai2[0]} />
          </div>
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Matching des indices</p>
            <p className="text-slate-500 text-xs mb-3">Comparez un nouvel indice avec la base criminelle</p>
            <input value={indiceInput[0]} onChange={function (e) { indiceInput[1](e.target.value); }} placeholder="Ex: vehicule RAV4 gris, suspect cicatrice joue gauche..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm mb-2" />
            <button onClick={function () { if (indiceInput[0].trim()) { callIA(ai3[1], "Compare cet indice avec la base de donnees criminelle (fichiers de recherche et profils suspects). Indice fourni: '" + indiceInput[0] + "'. Base de donnees: " + JSON.stringify(RECHERCHES_DATA.map(function (r) { return { nom: r.nom, motif: r.motif, reference: r.reference, dangereux: r.dangereux }; })) + ". Indique: 1) Correspondances potentielles avec justification 2) Niveau de confiance (Faible/Moyen/Eleve) 3) Recidivistes potentiels a auditionner en priorite 4) Prochaine etape d enquete recommandee."); } }} className="bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold">Lancer le matching</button>
            <AIBloc state={ai3[0]} />
          </div>
        </div>
      ) : null}

      {tab === "ressources" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={<Users size={18} />} label="OPJ disponibles" value={AGENTS_DATA.filter(function (a) { return a.service === "DCPJ Brazzaville" && a.statut === "actif"; }).length} color="#3B82F6" />
            <StatCard icon="📁" label="Dossiers actifs" value={ENQUETES_DATA.filter(function (e) { return e.statut === "en_cours"; }).length} color="#F59E0B" />
          </div>
          <button onClick={function () {
            var ctx = "OPJ DCPJ: " + JSON.stringify(AGENTS_DATA.filter(function (a) { return a.service === "DCPJ Brazzaville"; }).map(function (a) { return { nom: a.nom, grade: gradeLabel(a), anciennete: a.anciennete, diplome: a.diplome, statut: a.statut }; })) + " | Dossiers actifs: " + JSON.stringify(ENQUETES_DATA.filter(function (e) { return e.statut === "en_cours"; }).map(function (e) { return { titre: e.titre, opjAssigne: e.opjAssigne, brigade: e.brigade, gravite: e.gravite }; }));
            callIA(ai4[1], "Optimise le pilotage des ressources de la Police Judiciaire. Fournis: 1) PLANNING D ENQUETE optimal (moments recommandes pour auditions/interpellations selon disponibilite OPJ et charge actuelle) 2) BESOINS EN RENFORTS pour les dossiers complexes ou sans OPJ assigne (specialite recommandee: cybercriminalite, scientifique, financiere) 3) REPARTITION DE CHARGE entre OPJ (qui est surcharge, qui peut prendre plus) 4) RECOMMANDATION PRIORITAIRE pour le DPJ cette semaine. Donnees: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">👥 Optimiser le pilotage des ressources</button>
          <AIBloc state={ai4[0]} />
        </div>
      ) : null}

      {tab === "anomalies" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 space-y-2">
            <p className="text-white font-bold text-sm mb-2">Controle interne — dossiers a verifier</p>
            {ENQUETES_DATA.filter(function (e) { return !e.opjAssigne || e.statut === "en_cours"; }).map(function (e) {
              var sansOpj = !e.opjAssigne;
              var ancien = new Date(e.dateOuverture + "T00:00:00") < new Date(new Date().setMonth(new Date().getMonth() - 4));
              if (!sansOpj && !ancien) { return null; }
              return (<div key={e.id} className="border border-amber-700 bg-amber-950/15 rounded-xl p-3"><p className="text-white text-sm font-semibold">{e.titre}</p><p className="text-amber-400 text-xs mt-0.5">{sansOpj ? "⚠️ Aucun OPJ affecte" : ""}{sansOpj && ancien ? " — " : ""}{ancien ? "⚠️ Dossier ouvert depuis plus de 4 mois sans cloture" : ""}</p></div>);
            })}
            {GARDES_VUE_DATA.filter(function (g) { return g.unite === "DCPJ Brazzaville" && g.heuresRestantes <= 6 && g.statut === "actif"; }).map(function (g) {
              return (<div key={g.id} className="border border-red-700 bg-red-950/15 rounded-xl p-3"><p className="text-white text-sm font-semibold">{g.nom}</p><p className="text-red-400 text-xs mt-0.5">⚠️ GAV proche expiration ({g.heuresRestantes}h) — verifier le PV de synthese</p></div>);
            })}
          </div>
          <button onClick={function () {
            var ctx = "Dossiers: " + JSON.stringify(ENQUETES_DATA.map(function (e) { return { titre: e.titre, statut: e.statut, opjAssigne: e.opjAssigne, dateOuverture: e.dateOuverture, brigade: e.brigade }; })) + " | GAV DCPJ: " + JSON.stringify(GARDES_VUE_DATA.filter(function (g) { return g.unite === "DCPJ Brazzaville"; }));
            callIA(ai1[1], "Effectue un controle interne des procedures de la Police Judiciaire. Identifie: 1) Anomalies procedurales (GAV sans suivi, dossiers bloques, absence d OPJ assigne) avec niveau de risque 2) ANALYSE DE PERFORMANCE: causes probables des retards dans les dossiers (manque d effectif, complexite juridique, zone geographique) 3) Argumentaire chiffre que le DPJ peut presenter au Commandant pour justifier des besoins supplementaires. Donnees: " + ctx);
          }} className="bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">⚠️ Lancer le controle interne complet</button>
          <AIBloc state={ai1[0]} />
        </div>
      ) : null}
    </div>
  );
}

var ACCIDENTS_DATA = [
  { id: "BZV-20260615-0830-BRIG01", lat: -4.2634, lng: 15.2429, lieu: "Carrefour Moungali", gravite: 2, delitFuite: false, personnalitePublique: false, opjAssigne: "MAKOSSO Sylvie", statut: "enquete", etape: 1, vehiculePolice: false, agentEnTort: null, dateCreation: "2026-06-15" },
  { id: "BZV-20260618-1745-BRIG02", lat: -4.2789, lng: 15.2654, lieu: "Avenue de la Paix, Poto-Poto", gravite: 4, delitFuite: false, personnalitePublique: false, opjAssigne: "MASSAMBA Herve", statut: "rapport", etape: 2, vehiculePolice: false, agentEnTort: null, dateCreation: "2026-06-18" },
  { id: "BZV-20260619-2210-BRIG01", lat: -4.2701, lng: 15.2502, lieu: "Marche Total, Centre-ville", gravite: 3, delitFuite: true, personnalitePublique: false, opjAssigne: "MAKOSSO Sylvie", statut: "enquete", etape: 1, vehiculePolice: true, agentEnTort: null, dateCreation: "2026-06-19" },
  { id: "BZV-20260620-0915-BRIG03", lat: -4.2558, lng: 15.2381, lieu: "Rond-point Moungali", gravite: 1, delitFuite: false, personnalitePublique: false, opjAssigne: "MASSAMBA Herve", statut: "cloture", etape: 3, vehiculePolice: false, agentEnTort: null, dateCreation: "2026-06-20" },
  { id: "BZV-20260621-1130-BRIG02", lat: -4.2845, lng: 15.2598, lieu: "RN1 km 88, Niari", gravite: 4, delitFuite: false, personnalitePublique: true, opjAssigne: null, statut: "enquete", etape: 1, vehiculePolice: false, agentEnTort: null, dateCreation: "2026-06-21" },
  { id: "BZV-20260612-1400-BRIG03", lat: -4.2701, lng: 15.2502, lieu: "Marche Total, Centre-ville", gravite: 2, delitFuite: false, personnalitePublique: false, opjAssigne: "MASSAMBA Herve", statut: "cloture", etape: 3, vehiculePolice: true, agentEnTort: "AGT-003", dateCreation: "2026-06-12" }
];

var GRAVITE_ACC_LABEL = { 1: "Degats materiels legers", 2: "Blesses legers", 3: "Blesses graves", 4: "Accident mortel" };
var GRAVITE_ACC_COLOR = { 1: "#22C55E", 2: "#3B82F6", 3: "#F59E0B", 4: "#DC2626" };
var STATUT_ACC_LABEL = { enquete: "Enquete", rapport: "Rapport", cloture: "Cloture" };
var ETAPES_ACC = ["Enquete", "Rapport", "Cloture"];

function DashboardAccidents(props) {
  var compte = props.compte;
  var enCoursTerrain = ACCIDENTS_DATA.filter(function (a) { return a.statut === "enquete"; }).length;
  var enAttenteAdmin = ACCIDENTS_DATA.filter(function (a) { return a.statut === "rapport"; }).length;
  var immobilises = VEHICULES_DATA.filter(function (v) { return v.statut === "maintenance"; }).length;
  var alertesPrioritaires = ACCIDENTS_DATA.filter(function (a) { return a.delitFuite || a.gravite >= 3 || a.personnalitePublique; });

  var chargeOPJ = {};
  ACCIDENTS_DATA.forEach(function (a) { var opj = a.opjAssigne || "Non affecte"; chargeOPJ[opj] = (chargeOPJ[opj] || 0) + 1; });
  var chargeData = Object.entries(chargeOPJ).map(function (e) { return { opj: e[0], dossiers: e[1] }; });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-2xl font-black text-white">Poste de Pilotage des Sinistres</h2><p className="text-slate-400 text-sm">{compte.service}</p></div>
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full px-3 py-1.5"><ShieldCheck size={14} className="text-green-500" /><span className="text-slate-300 text-xs font-bold">Bureau operationnel</span></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <StatCard icon="🚧" label="Accidents en intervention" value={enCoursTerrain} sub="Enquete sur le terrain" color="#F59E0B" />
        <StatCard icon="📋" label="Dossiers en attente admin." value={enAttenteAdmin} sub="Traitement du rapport" color="#3B82F6" />
        <StatCard icon="🚗" label="Vehicules immobilises" value={immobilises} sub="Fourriere / maintenance" color="#DC2626" />
      </div>

      {alertesPrioritaires.length > 0 ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-red-800 p-4">
          <p className="text-red-300 font-black text-xs uppercase mb-2">🚨 Liste rouge — alertes prioritaires</p>
          <div className="space-y-2">
            {alertesPrioritaires.map(function (a) {
              var motifs = [];
              if (a.delitFuite) { motifs.push("Delit de fuite"); }
              if (a.gravite >= 3) { motifs.push(GRAVITE_ACC_LABEL[a.gravite]); }
              if (a.personnalitePublique) { motifs.push("Personnalite publique impliquee"); }
              return (<div key={a.id} className="border-l-2 border-red-600 pl-3"><p className="text-white text-sm font-bold font-mono">{a.id}</p><p className="text-slate-400 text-xs">{a.lieu} — {motifs.join(" — ")}</p></div>);
            })}
          </div>
        </div>
      ) : null}

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-white font-bold text-sm mb-1">Repartition des dossiers par OPJ</p>
        <p className="text-slate-500 text-xs mb-3">Equilibrer la charge de travail du bureau</p>
        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chargeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="opj" stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 9 }} axisLine={false} tickLine={false} interval={0} angle={-10} textAnchor="end" height={45} />
              <YAxis stroke="#64748B" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "#0F172A", border: "1px solid #334155", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="dossiers" radius={[4, 4, 0, 0]} fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ConstatNumerique(props) {
  var compte = props.compte;
  var idSinistre = useState(null);
  var gpsLat = useState(""); var gpsLng = useState("");
  var gravite = useState(null);
  var lieu = useState("");
  var photos = useState(false);
  var croquis = useState("");
  var temoins = useState("");
  var savedState = useState(false);
  var saved = savedState[0]; var setSaved = savedState[1];

  function depecherUnite() {
    var now = new Date();
    var id = "BZV-" + now.toISOString().slice(0, 10).replace(/-/g, "") + "-" + String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0") + "-BRIG0" + (1 + Math.floor(Math.random() * 4));
    idSinistre[1](id);
  }

  var champsComplets = !!idSinistre[0] && gpsLat[0] !== "" && gpsLng[0] !== "" && gravite[0] !== null;

  function enregistrer() {
    if (!champsComplets) { return; }
    var nouveau = { id: idSinistre[0], lat: Number(gpsLat[0]), lng: Number(gpsLng[0]), lieu: lieu[0] || "Non precise", gravite: gravite[0], delitFuite: false, personnalitePublique: false, opjAssigne: null, statut: "enquete", etape: 1, vehiculePolice: false, agentEnTort: null, dateCreation: now_date() };
    ACCIDENTS_DATA.push(nouveau);
    setSaved(true);
    if (gravite[0] === 4) { setTimeout(function () { alert("Alerte transmise au Directeur PJ et au Commandant — accident mortel."); }, 100); }
  }
  function now_date() { return new Date().toISOString().slice(0, 10); }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Constat Numerique</h2><p className="text-slate-500 text-xs">Formulaire terrain — {compte.service}</p></div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-purple-800 p-4">
        <p className="text-purple-300 text-xs font-black uppercase mb-1">1. Matricule unique de l incident (ID-Sinistre)</p>
        <p className="text-slate-500 text-xs mb-2">Genere automatiquement par activation de l unite. Cle primaire du dossier.</p>
        {idSinistre[0] ? (
          <div className="bg-green-950/30 border border-green-700 rounded-xl px-3 py-2"><p className="text-green-300 font-mono font-bold text-sm">{idSinistre[0]}</p></div>
        ) : (
          <button onClick={depecherUnite} className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold">🚓 Depecher Unite</button>
        )}
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-purple-800 p-4">
        <p className="text-purple-300 text-xs font-black uppercase mb-1">2. Geolocalisation precise (obligatoire)</p>
        <p className="text-slate-500 text-xs mb-2">Sans ce champ, la soumission du constat est bloquee.</p>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input value={gpsLat[0]} onChange={function (e) { gpsLat[1](e.target.value); }} placeholder="Latitude (ex: -4.2634)" className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
          <input value={gpsLng[0]} onChange={function (e) { gpsLng[1](e.target.value); }} placeholder="Longitude (ex: 15.2429)" className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
        </div>
        <input value={lieu[0]} onChange={function (e) { lieu[1](e.target.value); }} placeholder="Description du lieu (optionnel)..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm" />
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-purple-800 p-4">
        <p className="text-purple-300 text-xs font-black uppercase mb-2">3. Indice de gravite (obligatoire)</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[1, 2, 3, 4].map(function (g) {
            var isSel = gravite[0] === g;
            return (<button key={g} onClick={function () { gravite[1](g); }} className={"rounded-xl p-3 text-left border " + (isSel ? "border-2" : "border-slate-700")} style={isSel ? { borderColor: GRAVITE_ACC_COLOR[g], background: GRAVITE_ACC_COLOR[g] + "22" } : {}}><p style={{ color: GRAVITE_ACC_COLOR[g] }} className="font-black text-lg">{g}</p><p className="text-slate-300 text-xs">{GRAVITE_ACC_LABEL[g]}</p></button>);
          })}
        </div>
        {gravite[0] === 4 ? <p className="text-red-400 text-xs mt-2">⚠️ Accident mortel — declenche une alerte immediate au Directeur PJ et au Commandant.</p> : null}
      </div>

      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
        <p className="text-white font-bold text-sm mb-2">Pieces du constat</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <button onClick={function () { photos[1](!photos[0]); }} className={"rounded-xl p-3 text-left border " + (photos[0] ? "border-green-700 bg-green-950/20" : "border-slate-700")}><p className="text-white text-sm font-semibold">{photos[0] ? "✅" : "📷"} Photos de la scene</p><p className="text-slate-500 text-xs">{photos[0] ? "Photos chargees" : "Cliquer pour simuler le chargement"}</p></button>
          <div className="rounded-xl p-3 border border-slate-700"><p className="text-white text-sm font-semibold mb-1">✏️ Croquis (editeur)</p><textarea value={croquis[0]} onChange={function (e) { croquis[1](e.target.value); }} rows={2} placeholder="Description du croquis / positions des vehicules..." className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs resize-none" /></div>
        </div>
        <textarea value={temoins[0]} onChange={function (e) { temoins[1](e.target.value); }} rows={2} placeholder="Declarations des temoins..." className="w-full mt-3 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm resize-none" />
      </div>

      <button onClick={enregistrer} disabled={!champsComplets} className={"px-5 py-3 rounded-xl text-sm font-bold w-full " + (champsComplets ? "bg-green-700 hover:bg-green-600 text-white" : "bg-slate-700 text-slate-500 cursor-not-allowed")}>
        {champsComplets ? "✓ Enregistrer et Transmettre au Bureau" : "Enregistrer et Transmettre au Bureau (champs obligatoires manquants)"}
      </button>
      {!champsComplets ? <p className="text-amber-400 text-xs text-center">Renseignez l ID-Sinistre, la geolocalisation et l indice de gravite pour activer la soumission.</p> : null}
      {saved ? <p className="text-green-400 text-xs text-center">✓ Dossier {idSinistre[0]} transmis au Bureau avec succes.</p> : null}
    </div>
  );
}

function CartographieRisques(props) {
  var compte = props.compte;
  var selState = useState(null);
  var selected = selState[0]; var setSelected = selState[1];

  var pointsNoirs = {};
  ACCIDENTS_DATA.forEach(function (a) { var key = a.lieu; if (!pointsNoirs[key]) { pointsNoirs[key] = { lieu: a.lieu, lat: a.lat, lng: a.lng, accidents: [] }; } pointsNoirs[key].accidents.push(a); });
  var points = Object.values(pointsNoirs);
  var minLat = Math.min.apply(null, points.map(function (p) { return p.lat; }));
  var maxLat = Math.max.apply(null, points.map(function (p) { return p.lat; }));
  var minLng = Math.min.apply(null, points.map(function (p) { return p.lng; }));
  var maxLng = Math.max.apply(null, points.map(function (p) { return p.lng; }));
  function toX(lng) { return 40 + ((lng - minLng) / Math.max(maxLng - minLng, 0.001)) * 440; }
  function toY(lat) { return 40 + ((maxLat - lat) / Math.max(maxLat - minLat, 0.001)) * 260; }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Cartographie des Risques</h2><p className="text-slate-500 text-xs">Zones de forte accidentologie — {compte.service}</p></div>
      <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-5">
        <p className="text-slate-500 text-xs mb-3">Cliquez sur un point noir pour voir les rapports associes</p>
        <div className="bg-slate-950 rounded-xl overflow-hidden" style={{ height: 340 }}>
          <svg width="100%" height="100%" viewBox="0 0 520 340">
            <rect width="520" height="340" fill="#0B1120" />
            <path d="M 0 310 Q 260 295 520 305" stroke="#1E3A5F" strokeWidth="18" fill="none" opacity="0.5" />
            {points.map(function (p, i) {
              var x = toX(p.lng); var y = toY(p.lat);
              var nb = p.accidents.length;
              var col = nb >= 2 ? "#DC2626" : "#F59E0B";
              return (<g key={i} onClick={function () { setSelected(p); }} style={{ cursor: "pointer" }}><circle cx={x} cy={y} r={20 + nb * 8} fill={col} opacity="0.2" /><circle cx={x} cy={y} r={14} fill={col} opacity="0.85" /><text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">{nb}</text><text x={x} y={y - 20} textAnchor="middle" fill="#94A3B8" fontSize={8}>{p.lieu.split(",")[0]}</text></g>);
            })}
          </svg>
        </div>
      </div>
      {selected ? (
        <div className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-amber-800 p-5">
          <div className="flex items-center justify-between mb-2"><p className="text-amber-300 font-bold text-sm">Rapports — {selected.lieu}</p><button onClick={function () { setSelected(null); }} className="text-slate-500 hover:text-white text-xs border border-slate-700 px-2 py-1 rounded-lg">Fermer ✕</button></div>
          <div className="space-y-2">{selected.accidents.map(function (a) { return (<div key={a.id} className="border-l-2 pl-3" style={{ borderColor: GRAVITE_ACC_COLOR[a.gravite] }}><p className="text-white text-sm font-mono font-bold">{a.id}</p><p className="text-slate-400 text-xs">{GRAVITE_ACC_LABEL[a.gravite]} — {a.dateCreation} — {STATUT_ACC_LABEL[a.statut]}</p></div>); })}</div>
        </div>
      ) : null}
    </div>
  );
}

function DataScientistAccidents(props) {
  var compte = props.compte;
  var tabState = useState("reconstitution");
  var tab = tabState[0]; var setTab = tabState[1];
  var descInput = useState("");
  var ai1 = useState({ loading: false, result: null });
  var ai2 = useState({ loading: false, result: null });
  var vA = useState({ freinage: "", masse: "1200", vitesseDeclaree: "", mu: "0.75" });
  var vB = useState({ freinage: "", masse: "1000", vitesseDeclaree: "", mu: "0.75" });
  var muEtat = useState("sec");
  var angleImpact = useState("");
  var poiDesc = useState("");
  var resultatsState = useState(null);
  var resultats = resultatsState; var setResultats = resultatsState[1];
  var SYS = "Tu es l assistant IA du Bureau de Controle Accidents de la Police Nationale du Congo. Reponds en francais, technique et operationnel.";

  function callIA(setter, prompt) { setter({ loading: true, result: null }); fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: SYS, messages: [{ role: "user", content: prompt }] }) }).then(function (r) { return r.json(); }).then(function (d) { setter({ loading: false, result: d.content && d.content[0] ? d.content[0].text : "Erreur." }); }).catch(function () { setter({ loading: false, result: "Erreur." }); }); }

  var TABS = [["reconstitution", "Reconstitution 3D", "🎬"], ["causes", "Analyse des Causes", "🔧"]];

  return (
    <div className="space-y-4">
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div><h2 className="text-2xl font-black text-white">Data Scientist IA — Accidents</h2><p className="text-slate-500 text-xs">{compte.service}</p></div>
      <div className="flex gap-2 flex-wrap">{TABS.map(function (t) { var isA = tab === t[0]; return <button key={t[0]} onClick={function () { setTab(t[0]); }} className={"px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border " + (isA ? "bg-amber-700 text-white border-amber-600" : "bg-slate-800 text-slate-400 border-slate-700")}><span>{t[2]}</span>{t[1]}</button>; })}</div>

      {tab === "reconstitution" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5">
            <p className="text-white font-bold text-sm mb-1">Reconstitution — Analyse Physique &amp; Cinematique</p>
            <p className="text-slate-500 text-xs mb-4">Estimation de la vitesse d impact, du Delta-V et de la coherence des traces de freinage a partir des releves terrain</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 rounded-xl border border-slate-700 p-3">
                <p className="text-amber-500 font-bold text-xs mb-2">🚗 Vehicule A</p>
                <label className="text-slate-500 text-[10px] block mb-1">Distance de freinage (m)</label>
                <input type="number" value={vA[0].freinage} onChange={function (e) { vA[1](function (p) { var c = {}; for (var k in p) { c[k] = p[k]; } c.freinage = e.target.value; return c; }); }} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs mb-2" placeholder="Ex: 15" />
                <label className="text-slate-500 text-[10px] block mb-1">Masse du vehicule (kg)</label>
                <input type="number" value={vA[0].masse} onChange={function (e) { vA[1](function (p) { var c = {}; for (var k in p) { c[k] = p[k]; } c.masse = e.target.value; return c; }); }} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs mb-2" placeholder="Ex: 1200" />
                <label className="text-slate-500 text-[10px] block mb-1">Vitesse declaree (km/h, optionnel)</label>
                <input type="number" value={vA[0].vitesseDeclaree} onChange={function (e) { vA[1](function (p) { var c = {}; for (var k in p) { c[k] = p[k]; } c.vitesseDeclaree = e.target.value; return c; }); }} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs" placeholder="Ex: 60" />
              </div>
              <div className="bg-slate-900 rounded-xl border border-slate-700 p-3">
                <p className="text-amber-500 font-bold text-xs mb-2">🚙 Vehicule B</p>
                <label className="text-slate-500 text-[10px] block mb-1">Distance de freinage (m)</label>
                <input type="number" value={vB[0].freinage} onChange={function (e) { vB[1](function (p) { var c = {}; for (var k in p) { c[k] = p[k]; } c.freinage = e.target.value; return c; }); }} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs mb-2" placeholder="Ex: 0" />
                <label className="text-slate-500 text-[10px] block mb-1">Masse du vehicule (kg)</label>
                <input type="number" value={vB[0].masse} onChange={function (e) { vB[1](function (p) { var c = {}; for (var k in p) { c[k] = p[k]; } c.masse = e.target.value; return c; }); }} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs mb-2" placeholder="Ex: 1000" />
                <label className="text-slate-500 text-[10px] block mb-1">Vitesse declaree (km/h, optionnel)</label>
                <input type="number" value={vB[0].vitesseDeclaree} onChange={function (e) { vB[1](function (p) { var c = {}; for (var k in p) { c[k] = p[k]; } c.vitesseDeclaree = e.target.value; return c; }); }} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs" placeholder="Ex: 0 (arret)" />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-slate-500 text-[10px] block mb-1">Etat de la chaussee</label>
              <select value={muEtat[0]} onChange={function (e) { var val = e.target.value; muEtat[1](val); var presets = { sec: "0.75", mouille: "0.45", verglas: "0.15", gravier: "0.55" }; vA[1](function (p) { var c = {}; for (var k in p) { c[k] = p[k]; } c.mu = presets[val]; return c; }); vB[1](function (p) { var c = {}; for (var k in p) { c[k] = p[k]; } c.mu = presets[val]; return c; }); }} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs">
                <option value="sec">Sec (μ ≈ 0.75)</option>
                <option value="mouille">Mouille (μ ≈ 0.45)</option>
                <option value="verglas">Verglas / gel (μ ≈ 0.15)</option>
                <option value="gravier">Gravier / terre (μ ≈ 0.55)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="text-slate-500 text-[10px] block mb-1">Angle d impact estime (degres)</label>
                <input type="number" value={angleImpact[0]} onChange={function (e) { angleImpact[1](e.target.value); }} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs" placeholder="Ex: 90 (choc lateral en T)" />
              </div>
              <div>
                <label className="text-slate-500 text-[10px] block mb-1">Point de choc (repere sur chaussee)</label>
                <input type="text" value={poiDesc[0]} onChange={function (e) { poiDesc[1](e.target.value); }} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-white text-xs" placeholder="Ex: 12m apres le panneau stop" />
              </div>
            </div>

            <button onClick={function () {
              var g = 9.81;
              var muA = parseFloat(vA[0].mu) || 0.75;
              var muB = parseFloat(vB[0].mu) || 0.75;
              var dA = parseFloat(vA[0].freinage) || 0;
              var dB = parseFloat(vB[0].freinage) || 0;
              var mA = parseFloat(vA[0].masse) || 0;
              var mB = parseFloat(vB[0].masse) || 0;
              var vDecA = parseFloat(vA[0].vitesseDeclaree) || 0;
              var vDecB = parseFloat(vB[0].vitesseDeclaree) || 0;

              var vA_impact_ms = dA > 0 ? Math.sqrt(2 * muA * g * dA) : 0;
              var vB_impact_ms = dB > 0 ? Math.sqrt(2 * muB * g * dB) : 0;

              var vA_choc = vDecA > 0 ? vDecA / 3.6 : vA_impact_ms;
              var vB_choc = vDecB > 0 ? vDecB / 3.6 : vB_impact_ms;

              var vApresChoc_ms = (mA + mB) > 0 ? (mA * vA_choc + mB * vB_choc) / (mA + mB) : 0;
              var deltaVA_ms = Math.abs(vA_choc - vApresChoc_ms);
              var deltaVB_ms = Math.abs(vB_choc - vApresChoc_ms);

              var dTheoA = vDecA > 0 ? Math.pow(vDecA / 3.6, 2) / (2 * muA * g) : null;
              var dTheoB = vDecB > 0 ? Math.pow(vDecB / 3.6, 2) / (2 * muB * g) : null;
              var ecartA = dTheoA !== null && dA > 0 ? (((dTheoA - dA) / dA) * 100) : null;
              var ecartB = dTheoB !== null && dB > 0 ? (((dTheoB - dB) / dB) * 100) : null;

              setResultats({
                vA_impact_kmh: vA_impact_ms * 3.6,
                vB_impact_kmh: vB_impact_ms * 3.6,
                deltaVA_kmh: deltaVA_ms * 3.6,
                deltaVB_kmh: deltaVB_ms * 3.6,
                vApresChoc_kmh: vApresChoc_ms * 3.6,
                dTheoA: dTheoA,
                dTheoB: dTheoB,
                ecartA: ecartA,
                ecartB: ecartB,
                angle: angleImpact[0],
                poi: poiDesc[0]
              });
            }} className="bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold mt-4">📐 Calculer la reconstitution physique</button>

            {resultats[0] ? (
              <div className="mt-4 bg-slate-900 rounded-xl border border-slate-700 p-4 space-y-3">
                <p className="text-white font-bold text-xs mb-2">Resultats de l analyse cinematique</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800 rounded-lg p-2">
                    <p className="text-slate-500 text-[10px]">Vitesse Vehicule A a l impact</p>
                    <p className="text-amber-400 font-bold text-lg">{resultats[0].vA_impact_kmh.toFixed(1)} km/h</p>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-2">
                    <p className="text-slate-500 text-[10px]">Vitesse Vehicule B a l impact</p>
                    <p className="text-amber-400 font-bold text-lg">{resultats[0].vB_impact_kmh.toFixed(1)} km/h</p>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-2">
                    <p className="text-slate-500 text-[10px]">Delta-V Vehicule A</p>
                    <p className="text-white font-bold text-sm">{resultats[0].deltaVA_kmh.toFixed(1)} km/h</p>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-2">
                    <p className="text-slate-500 text-[10px]">Delta-V Vehicule B</p>
                    <p className="text-white font-bold text-sm">{resultats[0].deltaVB_kmh.toFixed(1)} km/h</p>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-2">
                    <p className="text-slate-500 text-[10px]">Vitesse commune post-choc (approx)</p>
                    <p className="text-white font-bold text-sm">{resultats[0].vApresChoc_kmh.toFixed(1)} km/h</p>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-2">
                    <p className="text-slate-500 text-[10px]">Angle d impact / Point de choc</p>
                    <p className="text-white font-bold text-sm">{resultats[0].angle || "-"}° — {resultats[0].poi || "non precise"}</p>
                  </div>
                </div>
                {resultats[0].ecartA !== null ? (<div className="text-[11px] text-slate-400 border-t border-slate-700 pt-2">Coherence Vehicule A : freinage theorique {resultats[0].dTheoA.toFixed(1)}m vs releve terrain — ecart {resultats[0].ecartA.toFixed(0)}%</div>) : null}
                {resultats[0].ecartB !== null ? (<div className="text-[11px] text-slate-400">Coherence Vehicule B : freinage theorique {resultats[0].dTheoB.toFixed(1)}m vs releve terrain — ecart {resultats[0].ecartB.toFixed(0)}%</div>) : null}
                <p className="text-[10px] text-slate-600 italic pt-2 border-t border-slate-700">Estimation theorique basee sur les formules physiques standards (freinage, conservation de la quantite de mouvement). A confirmer par expertise complementaire si necessaire.</p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {tab === "causes" ? (
        <div className="space-y-4">
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4">
            <p className="text-white font-bold text-sm mb-2">Dossiers recents — base d analyse</p>
            <div className="space-y-1">{ACCIDENTS_DATA.slice(0, 5).map(function (a) { return (<div key={a.id} className="flex items-center justify-between text-xs border-b border-slate-800 pb-1"><span className="text-slate-300 font-mono">{a.id}</span><span className="text-slate-500">{a.lieu}</span></div>); })}</div>
          </div>
          <button onClick={function () {
            var ctx = JSON.stringify(ACCIDENTS_DATA.map(function (a) { return { lieu: a.lieu, gravite: a.gravite, delitFuite: a.delitFuite, date: a.dateCreation }; }));
            callIA(ai2[1], "Analyse les causes recurrentes des accidents de la circulation a Brazzaville sur base de ces dossiers: " + ctx + ". 1) Identifie les causes recurrentes probables (signalisation defectueuse, etat de la chaussee, eclairage, comportement) par zone 2) Redige un PROJET DE NOTE OFFICIELLE adresse au Directeur de la Logistique et aux services des Travaux Publics, signalant les points noirs identifies et demandant les corrections necessaires (signalisation, eclairage, marquage au sol). La note doit etre formelle et structuree (Objet, Constat, Demande, Signature Bureau Controle Accidents).");
          }} className="bg-amber-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">🔧 Analyser les causes et rediger la note</button>
          <AIBloc state={ai2[0]} />
        </div>
      ) : null}
    </div>
  );
}

function ActionsAccidents(props) {
  var compte = props.compte;
  var dossiersState = useState(ACCIDENTS_DATA.map(function (a) { var c = {}; for (var k in a) { c[k] = a[k]; } return c; }));
  var dossiers = dossiersState[0]; var setDossiers = dossiersState[1];
  var msgState = useState({});
  var msgs = msgState[0]; var setMsgs = msgState[1];

  function avancerEtape(id) {
    setDossiers(function (prev) { return prev.map(function (a) { if (a.id !== id) { return a; } var c = {}; for (var k in a) { c[k] = a[k]; } c.etape = Math.min(3, a.etape + 1); c.statut = c.etape === 2 ? "rapport" : c.etape === 3 ? "cloture" : "enquete"; return c; }); });
  }
  function transmettreParquet(id) {
    var dossier = dossiers.find(function (a) { return a.id === id; });
    setMsgs(function (prev) { var c = {}; for (var k in prev) { c[k] = prev[k]; } c[id] = "Dossier judiciaire genere et pret pour signature et envoi electronique au Procureur."; return c; });
    if (dossier.vehiculePolice) {
      VEHICULES_DATA.forEach(function (v) { });
    }
  }
  function notifier(id) {
    setMsgs(function (prev) { var c = {}; for (var k in prev) { c[k] = prev[k]; } c[id] = "Avis d accident transmis automatiquement a l assureur et a l hopital concerne."; return c; });
  }
  function lierLogistique(id) {
    var dossier = dossiers.find(function (a) { return a.id === id; });
    ENGAGEMENTS_DATA.push({ id: "ENG-" + Date.now(), objet: "Reparation vehicule police accidente — dossier " + id, montant: 1500000, service: "Direction de la Logistique", statut: "en_attente", date: new Date().toISOString().slice(0, 10), priorite: "haute" });
    setMsgs(function (prev) { var c = {}; for (var k in prev) { c[k] = prev[k]; } c[id] = "Fiche de reparation generee automatiquement dans le module Logistique."; return c; });
  }
  function lierPersonnel(id, agentId) {
    setMsgs(function (prev) { var c = {}; for (var k in prev) { c[k] = prev[k]; } c[id] = "Dossier lie a l e-dossier RH de l agent concerne (notification Direction du Personnel)."; return c; });
  }

  return (
    <div className="space-y-4">
      <div><h2 className="text-2xl font-black text-white">Gestion Administrative</h2><p className="text-slate-500 text-xs">Dossiers en cours et collaboration transversale — {compte.service}</p></div>
      <div className="space-y-3">
        {dossiers.map(function (d) {
          var agent = d.agentEnTort ? AGENTS_DATA.find(function (a) { return a.id === d.agentEnTort; }) : null;
          return (
            <div key={d.id} className="bg-slate-800/90 rounded-2xl shadow-lg shadow-black/30 border border-slate-700 p-4">
              <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                <div><p className="text-white font-bold text-sm font-mono">{d.id}</p><p className="text-slate-500 text-xs">{d.lieu}</p></div>
                <Chip color={GRAVITE_ACC_COLOR[d.gravite]}>{GRAVITE_ACC_LABEL[d.gravite]}</Chip>
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                {ETAPES_ACC.map(function (e, i) { var done = d.etape > i; var current = d.etape === i + 1; return (<div key={e} className="flex-1"><div className="h-1.5 rounded-full" style={{ background: done || current ? "#F59E0B" : "#1E293B" }}></div><p className={"text-[10px] mt-1 " + (current ? "text-amber-400 font-bold" : "text-slate-600")}>{e}</p></div>); })}
              </div>
              <div className="flex gap-2 flex-wrap pt-2 border-t border-slate-700">
                {d.etape < 3 ? <button onClick={function () { avancerEtape(d.id); }} className="bg-blue-900 text-blue-300 px-3 py-1.5 rounded-lg text-xs font-bold">Avancer l etape</button> : null}
                <button onClick={function () { transmettreParquet(d.id); }} className="bg-purple-900 text-purple-300 px-3 py-1.5 rounded-lg text-xs font-bold">Transmettre Parquet</button>
                <button onClick={function () { notifier(d.id); }} className="bg-teal-900 text-teal-300 px-3 py-1.5 rounded-lg text-xs font-bold">Notifier Assureur/Hopital</button>
                {d.vehiculePolice ? <button onClick={function () { lierLogistique(d.id); }} className="bg-amber-900 text-amber-300 px-3 py-1.5 rounded-lg text-xs font-bold">🔧 Lien Logistique</button> : null}
                {agent ? <button onClick={function () { lierPersonnel(d.id, agent.id); }} className="bg-pink-900 text-pink-300 px-3 py-1.5 rounded-lg text-xs font-bold">👤 Lien e-dossier {agent.nom}</button> : null}
              </div>
              {msgs[d.id] ? <p className="text-green-400 text-xs mt-2">✓ {msgs[d.id]}</p> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

var DOMAINE_RENS_LABEL = { social: "Social", economique: "Economique", politique: "Politique", religieux: "Religieux", securitaire: "Securitaire" };
var DOMAINE_RENS_COLOR = { social: "#3B82F6", economique: "#16A34A", politique: "#8B5CF6", religieux: "#F59E0B", securitaire: "#DC2626" };
var NIVEAU_RENS_COLOR = { faible: "#22C55E", moyen: "#3B82F6", eleve: "#F59E0B", critique: "#DC2626" };
var NIVEAU_RENS_LABEL = { faible: "Faible", moyen: "Moyen", eleve: "Eleve", critique: "Critique" };

var SIGNAUX_FAIBLES_DATA = [
  { id: "SF-001", date: "2026-06-21", heure: "08:40", domaine: "social", niveau: "eleve", lieu: "Bacongo, Brazzaville", titre: "Appel a mobilisation sur les reseaux sociaux", description: "Un collectif de jeunes diffuse un appel a manifester contre la hausse du prix du carburant. Plus de 800 partages en 12h.", statut: "analyse" },
  { id: "SF-002", date: "2026-06-21", heure: "14:15", domaine: "economique", niveau: "moyen", lieu: "Marche Total, Brazzaville", titre: "Rupture d approvisionnement en denrees de base", description: "Penurie de farine et de sucre signalee par plusieurs commercants. Risque de tension sur les prix.", statut: "nouveau" },
  { id: "SF-003", date: "2026-06-20", heure: "19:30", domaine: "religieux", niveau: "moyen", lieu: "Talangai, Brazzaville", titre: "Discours radical dans une eglise de reveil", description: "Un predicateur tient des propos hostiles envers une communaute etrangere. Audience estimee a 300 fideles.", statut: "analyse" },
  { id: "SF-004", date: "2026-06-20", heure: "11:00", domaine: "politique", niveau: "eleve", lieu: "Centre-ville, Pointe-Noire", titre: "Tract anonyme distribue pres de la Prefecture", description: "Tract appelant a la desobeissance civile en cas de coupure d electricite prolongee.", statut: "nouveau" },
  { id: "SF-005", date: "2026-06-19", heure: "22:10", domaine: "securitaire", niveau: "critique", lieu: "Zone portuaire, Pointe-Noire", titre: "Mouvement inhabituel de vehicules de nuit", description: "Plusieurs vehicules non identifies observes pres du poste frontalier, sans manifeste declare.", statut: "analyse" },
  { id: "SF-006", date: "2026-06-19", heure: "09:20", domaine: "social", niveau: "faible", lieu: "Moungali, Brazzaville", titre: "Greve ponctuelle des moto-taxis", description: "Mouvement localise sans relai national pour le moment.", statut: "classe" },
  { id: "SF-007", date: "2026-06-18", heure: "16:45", domaine: "economique", niveau: "moyen", lieu: "Zone portuaire, Pointe-Noire", titre: "Retard de paiement des dockers", description: "Trois mois d arrieres signales, risque de mouvement social dans le secteur portuaire.", statut: "analyse" },
  { id: "SF-008", date: "2026-06-17", heure: "07:50", domaine: "politique", niveau: "moyen", lieu: "Makelekele, Brazzaville", titre: "Reunion non declaree d un groupe d opposition", description: "Une trentaine de personnes reunies dans une residence privee, motif officiel non communique.", statut: "classe" }
];

var FICHES_RENSEIGNEMENT_DATA = [
  { id: "FR-2026-014", domaine: "securitaire", titre: "Suivi des flux frontaliers nocturnes — axe Pointe-Noire", date: "2026-06-20", source: "HUMINT-07", niveau: "critique", statut: "validee" },
  { id: "FR-2026-013", domaine: "politique", titre: "Cartographie des mouvements d opposition — Brazzaville", date: "2026-06-19", source: "OSINT-12", niveau: "eleve", statut: "validee" },
  { id: "FR-2026-012", domaine: "religieux", titre: "Veille des discours dans les eglises de reveil", date: "2026-06-18", source: "HUMINT-03", niveau: "moyen", statut: "en_cours" },
  { id: "FR-2026-011", domaine: "economique", titre: "Tensions sociales dans le secteur portuaire", date: "2026-06-17", source: "OSINT-05", niveau: "eleve", statut: "validee" },
  { id: "FR-2026-010", domaine: "social", titre: "Cartographie des collectifs de jeunesse urbaine", date: "2026-06-15", source: "HUMINT-09", niveau: "moyen", statut: "archivee" },
  { id: "FR-2026-009", domaine: "securitaire", titre: "Reseau de trafic transfrontalier suspecte", date: "2026-06-12", source: "HUMINT-02", niveau: "critique", statut: "en_cours" }
];
var STATUT_FR_LABEL = { validee: "Validee", en_cours: "En cours d analyse", archivee: "Archivee" };
var STATUT_FR_COLOR = { validee: "#22C55E", en_cours: "#F59E0B", archivee: "#64748B" };

var ACTEURS_DATA = [
  { id: "ACT-001", nom: "Collectif Jeunesse Debout", type: "Groupe de pression", domaine: "social", influence: "Forte", posture: "hostile", notes: "Forte audience sur les reseaux sociaux. Capacite de mobilisation rapide demontree." },
  { id: "ACT-002", nom: "Predicateur — Eglise de reveil Talangai", type: "Leader d opinion", domaine: "religieux", influence: "Moyenne", posture: "neutre", notes: "Audience locale fidele. Discours suivis pour evolution de la rhetorique." },
  { id: "ACT-003", nom: "Syndicat des Dockers du Port Autonome", type: "Organisation", domaine: "economique", influence: "Forte", posture: "hostile", notes: "Arrieres de salaire recurrents. Historique de greves dures." },
  { id: "ACT-004", nom: "Plateforme Citoyenne Unite", type: "Parti / mouvement politique", domaine: "politique", influence: "Moyenne", posture: "hostile", notes: "Diffusion de tracts. Implantation principale a Pointe-Noire." },
  { id: "ACT-005", nom: "Association des Commercants du Grand Marche", type: "Groupe de pression", domaine: "economique", influence: "Moyenne", posture: "neutre", notes: "Relai utile pour la remontee d information economique de terrain." },
  { id: "ACT-006", nom: "Reseau Moto-Taxis Solidarite", type: "Groupe de pression", domaine: "social", influence: "Faible", posture: "neutre", notes: "Mouvements ponctuels et localises, peu de relai national." }
];
var POSTURE_COLOR = { favorable: "#22C55E", neutre: "#3B82F6", hostile: "#DC2626" };
var POSTURE_LABEL = { favorable: "Favorable", neutre: "Neutre", hostile: "Hostile" };

var RESEAU_NODES_DATA = [
  { id: "N1", nom: "Collectif Jeunesse Debout", type: "groupe", x: 100, y: 90 },
  { id: "N2", nom: "Predicateur Talangai", type: "individu", x: 250, y: 50 },
  { id: "N3", nom: "Syndicat des Dockers", type: "organisation", x: 380, y: 130 },
  { id: "N4", nom: "Plateforme Citoyenne Unite", type: "groupe", x: 210, y: 200 },
  { id: "N5", nom: "Contact recurrent FR-2026-009", type: "individu", x: 420, y: 220 },
  { id: "N6", nom: "Association Commercants", type: "organisation", x: 80, y: 210 }
];
var RESEAU_LIENS_DATA = [
  { source: "N1", target: "N4", type: "Coordination logistique", force: "forte" },
  { source: "N2", target: "N1", type: "Soutien moral / discours commun", force: "moyenne" },
  { source: "N3", target: "N6", type: "Echange d information economique", force: "faible" },
  { source: "N4", target: "N3", type: "Appel a convergence des luttes", force: "moyenne" },
  { source: "N5", target: "N3", type: "Contact recurrent identifie (zone portuaire)", force: "forte" },
  { source: "N1", target: "N6", type: "Relai logistique commun", force: "faible" }
];
var FORCE_LIEN_COLOR = { forte: "#DC2626", moyenne: "#F59E0B", faible: "#64748B" };

var NOTES_TRANSMISES_DATA = [
  { id: "NS-2026-031", titre: "Note de synthese — Tensions sociales secteur portuaire", date: "2026-06-19", heure: "09:12", destinataire: "Primature", niveau: "eleve", statut: "accuse_reception", dateAccuse: "2026-06-19 11:30" },
  { id: "NS-2026-030", titre: "Note flash — Mouvement suspect zone frontaliere Pointe-Noire", date: "2026-06-19", heure: "23:05", destinataire: "Presidence", niveau: "critique", statut: "accuse_reception", dateAccuse: "2026-06-19 23:40" },
  { id: "NS-2026-029", titre: "Note de synthese — Veille politique Plateforme Citoyenne", date: "2026-06-17", heure: "15:20", destinataire: "Prefecture de Pointe-Noire", niveau: "moyen", statut: "accuse_reception", dateAccuse: "2026-06-18 08:05" },
  { id: "NS-2026-028", titre: "Note de synthese — Veille religieuse Talangai", date: "2026-06-15", heure: "10:00", destinataire: "Commandement des Forces de Police", niveau: "moyen", statut: "transmise", dateAccuse: null }
];
var STATUT_NOTE_COLOR = { transmise: "#F59E0B", accuse_reception: "#22C55E" };
var STATUT_NOTE_LABEL = { transmise: "Transmise — en attente d accuse", accuse_reception: "Accuse de reception recu" };

var ISG_SOUS_INDICES = [
  { nom: "Social", valeur: 68, color: "#3B82F6" },
  { nom: "Economique", valeur: 61, color: "#16A34A" },
  { nom: "Securitaire", valeur: 74, color: "#DC2626" },
  { nom: "Politique", valeur: 70, color: "#8B5CF6" }
];

function JaugeISG(props) {
  var value = props.value;
  var color = value < 40 ? "#DC2626" : value < 70 ? "#F59E0B" : "#22C55E";
  var statutLabel = value < 40 ? "Instabilite elevee" : value < 70 ? "Vigilance requise" : "Stabilite satisfaisante";
  return (
    <div className="flex flex-col items-center">
      <svg width="220" height="130" viewBox="0 0 200 110">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#1E293B" strokeWidth="16" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={color} strokeWidth="16" strokeLinecap="round" pathLength="100" strokeDasharray={value + " 100"} />
        <text x="100" y="85" textAnchor="middle" fill="#fff" fontSize="34" fontWeight="900">{value}</text>
        <text x="100" y="103" textAnchor="middle" fill="#64748B" fontSize="10">/ 100</text>
      </svg>
      <p style={{ color: color }} className="text-xs font-bold uppercase tracking-wide -mt-2">{statutLabel}</p>
    </div>
  );
}


export { DataScientistRouter, GestionBudget, EtatMajor, RapportsInstitutionnels, PistesIA, DashboardCFP, CommandementTerritorialCFP, DashboardDAF, TachesDAF, BudgetPrevisionsDAF, InventairePatrimoine, PatrimoineTreemapCell, DashboardDL, ParcAutomobileDL, ArmurerieDL, InfrastructuresDL, FournituresDL, CommandesDL, DashboardPersonnel, EDossierPersonnel, GestionAffectations, PlanningPresence, AcademieFormation, CarrieresMobilite, DashboardDPJ, PilotageDPJ, ActionsDPJ, DetailDPJ, DataScientistDPJ, DashboardAccidents, ConstatNumerique, CartographieRisques, DataScientistAccidents, ActionsAccidents, JaugeISG, ENGAGEMENTS_DATA, STC_ENG, STL_ENG, SEUIL_VALIDATION_COMMANDANT, COMMANDEMENTS_TERRITORIAUX_DATA, STATUT_COMMANDEMENT_COLOR, STATUT_COMMANDEMENT_LABEL, GROUPES_INTERVENTION_DATA, STATUT_GI_COLOR, STATUT_GI_LABEL, DIRECTIONS_CENTRALES_CFP, SERVICES_SOUS_CFP, BATIMENTS_DATA, EQUIPEMENTS_LOURDS_DATA, PATRIMOINE_CATEGORIES, STOCKS_DATA, TRAVAUX_DATA, CONTRATS_MAINTENANCE_DATA, ARMES_DATA, GILETS_DATA, FICHE_VIE_MAP, USURE_DATA, REPARATIONS_ATELIER_DATA, COUTS_LOGISTIQUES_DATA, ARRONDISSEMENT_DISPO_DATA, FLUX_DISTRIBUTION_DATA, ENQUETES_DATA, STATUT_ENQ_LABEL, STATUT_ENQ_COLOR, TYPOLOGIE_CRIMES_DATA, EVOLUTION_CRIMINALITE_30J, COLD_CASES_DATA, ACCIDENTS_DATA, GRAVITE_ACC_LABEL, GRAVITE_ACC_COLOR, STATUT_ACC_LABEL, ETAPES_ACC, DOMAINE_RENS_LABEL, DOMAINE_RENS_COLOR, NIVEAU_RENS_COLOR, NIVEAU_RENS_LABEL, SIGNAUX_FAIBLES_DATA, FICHES_RENSEIGNEMENT_DATA, STATUT_FR_LABEL, STATUT_FR_COLOR, ACTEURS_DATA, POSTURE_COLOR, POSTURE_LABEL, RESEAU_NODES_DATA, RESEAU_LIENS_DATA, FORCE_LIEN_COLOR, NOTES_TRANSMISES_DATA, STATUT_NOTE_COLOR, STATUT_NOTE_LABEL, ISG_SOUS_INDICES };
