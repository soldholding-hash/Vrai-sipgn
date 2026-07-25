import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

# ---- PATCH A: ajouter chargerHistorique() + useEffect declenche sur onglet ----
old_a = '''  // Chrono appel
  useEffect(function() {
    if(enAppel) {
      var t = setInterval(function() { setDuree(function(d) { return d+1; }); }, 1000);
      return function() { clearInterval(t); };
    } else {
      setDuree(0);
    }
  }, [enAppel]);'''

new_a = '''  // Chrono appel
  useEffect(function() {
    if(enAppel) {
      var t = setInterval(function() { setDuree(function(d) { return d+1; }); }, 1000);
      return function() { clearInterval(t); };
    } else {
      setDuree(0);
    }
  }, [enAppel]);

  // Charger historique depuis Supabase
  function chargerHistorique() {
    supabase.from("appels")
      .select("*")
      .or("appelant.eq." + compte.identifiant + ",recepteur.eq." + compte.identifiant)
      .order("created_at", {ascending: false})
      .limit(50)
      .then(function(r) {
        if (!r.data) { return; }
        var mapped = r.data.map(function(row) {
          var estSortant = row.appelant === compte.identifiant;
          var nomAvec = row.appelant_nom;
          if (estSortant) {
            var cibleTrouvee = allComptes.filter(function(cc) { return cc.identifiant === row.recepteur; })[0];
            nomAvec = cibleTrouvee ? cibleTrouvee.nom : row.recepteur;
          }
          return {
            id: row.id,
            avec: nomAvec,
            type: estSortant ? "sortant" : "entrant",
            heure: row.created_at ? new Date(row.created_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) : "",
            statut: row.statut
          };
        });
        setHistorique(mapped);
      });
  }

  useEffect(function() {
    if (onglet === "historique") { chargerHistorique(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onglet]);'''

count_a = c.count(old_a)
print("PATCH A - Occurrences trouvees:", count_a)
if count_a == 1:
    c = c.replace(old_a, new_a)
    print("PATCH A applique: OK")
else:
    print("PATCH A: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    sys.exit(1)

# ---- PATCH B: corriger la couleur du Chip pour utiliser les vrais statuts DB ----
old_b = '''                <Chip color={h.statut==="accepte"?"#22C55E":"#DC2626"}>{h.statut}</Chip>'''
new_b = '''                <Chip color={(h.statut==="termine"||h.statut==="en_cours")?"#22C55E":(h.statut==="sonnerie"?"#64748B":"#DC2626")}>{h.statut}</Chip>'''

count_b = c.count(old_b)
print("PATCH B - Occurrences trouvees:", count_b)
if count_b == 1:
    c = c.replace(old_b, new_b)
    print("PATCH B applique: OK")
else:
    print("PATCH B: ANCRE NON UNIQUE OU INTROUVABLE - patch A conserve, B ignore")

open(path, "w", encoding="utf-8").write(c)
print("Fichier sauvegarde.")
