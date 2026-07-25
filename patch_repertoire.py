import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

# ---- PATCH A: ajouter les states repertoire ----
old_a = '''  var numeroComposeState = useState(""); var numeroCompose = numeroComposeState[0]; var setNumeroCompose = numeroComposeState[1];'''
new_a = '''  var numeroComposeState = useState(""); var numeroCompose = numeroComposeState[0]; var setNumeroCompose = numeroComposeState[1];
  var repertoireState = useState([]); var repertoire = repertoireState[0]; var setRepertoire = repertoireState[1];
  var nouveauNomState = useState(""); var nouveauNom = nouveauNomState[0]; var setNouveauNom = nouveauNomState[1];
  var nouveauNumeroState = useState(""); var nouveauNumero = nouveauNumeroState[0]; var setNouveauNumero = nouveauNumeroState[1];'''

count_a = c.count(old_a)
print("PATCH A - Occurrences trouvees:", count_a)
if count_a == 1:
    c = c.replace(old_a, new_a)
    print("PATCH A applique: OK")
else:
    print("PATCH A: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    sys.exit(1)

# ---- PATCH B: ajouter chargerRepertoire, ajouterContact, supprimerContact + etendre le useEffect ----
old_b = '''  useEffect(function() {
    if (onglet === "historique") { chargerHistorique(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onglet]);'''

new_b = '''  function chargerRepertoire() {
    supabase.from("repertoire_perso")
      .select("*")
      .eq("proprietaire", compte.identifiant)
      .order("nom", {ascending: true})
      .then(function(r) {
        if (r.data) { setRepertoire(r.data); }
      });
  }

  function ajouterContact() {
    if (!nouveauNom.trim() || !nouveauNumero.trim()) { return; }
    supabase.from("repertoire_perso").insert([{
      proprietaire: compte.identifiant,
      nom: nouveauNom.trim(),
      numero: nouveauNumero.trim()
    }]).then(function(r) {
      if (!r.error) {
        setNouveauNom("");
        setNouveauNumero("");
        chargerRepertoire();
      }
    });
  }

  function supprimerContact(id) {
    supabase.from("repertoire_perso").delete().eq("id", id).eq("proprietaire", compte.identifiant).then(function(r) {
      if (!r.error) { chargerRepertoire(); }
    });
  }

  useEffect(function() {
    if (onglet === "historique") { chargerHistorique(); }
    if (onglet === "repertoire") { chargerRepertoire(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onglet]);'''

count_b = c.count(old_b)
print("PATCH B - Occurrences trouvees:", count_b)
if count_b == 1:
    c = c.replace(old_b, new_b)
    print("PATCH B applique: OK")
else:
    print("PATCH B: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    open(path, "w", encoding="utf-8").write(c)
    sys.exit(1)

# ---- PATCH C: ajouter l'onglet Repertoire au selecteur ----
old_c = '''{[["clavier","🔢 Clavier"],["historique","📋 Historique"]].map(function(o) {'''
new_c = '''{[["clavier","🔢 Clavier"],["repertoire","📇 Repertoire"],["historique","📋 Historique"]].map(function(o) {'''

count_c = c.count(old_c)
print("PATCH C - Occurrences trouvees:", count_c)
if count_c == 1:
    c = c.replace(old_c, new_c)
    print("PATCH C applique: OK")
else:
    print("PATCH C: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    open(path, "w", encoding="utf-8").write(c)
    sys.exit(1)

# ---- PATCH D: ajouter le bloc JSX Repertoire avant le bloc Historique ----
old_d = '''      {onglet === "historique" ? ('''
new_d = '''      {onglet === "repertoire" ? (
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 space-y-2">
            <input value={nouveauNom} onChange={function(e){setNouveauNom(e.target.value);}} placeholder="Nom du contact" className="w-full bg-slate-800 text-white text-sm px-3 py-2 rounded-lg outline-none border border-slate-700"/>
            <input value={nouveauNumero} onChange={function(e){setNouveauNumero(e.target.value);}} placeholder="Numero (ex: 035 671 001)" className="w-full bg-slate-800 text-white text-sm px-3 py-2 rounded-lg outline-none border border-slate-700"/>
            <button onClick={ajouterContact} className="w-full bg-blue-700 hover:bg-blue-600 text-white text-sm font-bold py-2 rounded-lg">Ajouter au repertoire</button>
          </div>
          <div className="space-y-2">
            {repertoire.length === 0 ? (
              <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-8 text-center">
                <p className="text-slate-500 text-sm">Aucun contact enregistre</p>
              </div>
            ) : repertoire.map(function(rc) {
              return (
                <div key={rc.id} className="bg-slate-800/90 rounded-2xl border border-slate-700 p-4 flex items-center gap-3">
                  <div onClick={function() {
                    var cibleTrouvee = allComptes.filter(function(cc) { return cc.numero.replace(/\\s/g, "") === rc.numero.replace(/\\s/g, ""); })[0];
                    if (cibleTrouvee) { setOnglet("clavier"); appeler(cibleTrouvee, "audio"); }
                    else { setNumeroCompose(rc.numero.replace(/\\s/g, "")); setOnglet("clavier"); }
                  }} className="flex-1 min-w-0 cursor-pointer">
                    <p className="text-white text-sm font-bold truncate">{rc.nom}</p>
                    <p className="text-slate-500 text-xs">{rc.numero}</p>
                  </div>
                  <button onClick={function(){supprimerContact(rc.id);}} className="w-9 h-9 rounded-full flex items-center justify-center bg-red-900/40 text-red-400 hover:bg-red-700 hover:text-white shrink-0" title="Supprimer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"/></svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {onglet === "historique" ? ('''

count_d = c.count(old_d)
print("PATCH D - Occurrences trouvees:", count_d)
if count_d == 1:
    c = c.replace(old_d, new_d)
    print("PATCH D applique: OK")
else:
    print("PATCH D: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    open(path, "w", encoding="utf-8").write(c)
    sys.exit(1)

open(path, "w", encoding="utf-8").write(c)
print("Tous les patches appliques avec succes.")
