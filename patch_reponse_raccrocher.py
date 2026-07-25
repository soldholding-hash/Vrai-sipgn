import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

# ---- PATCH A: ajouter verifierReponseAppelant() a cote de verifierAppels() dans le useEffect ----
old_a = '''    var appelTimer = setInterval(verifierAppels, 3000);

    return function() {
      clearInterval(timer);
      clearInterval(presTimer);
      clearInterval(appelTimer);'''

new_a = '''    var appelTimer = setInterval(verifierAppels, 3000);

    // Ecouter reponse de l'appel sortant (WebRTC answer)
    function verifierReponseAppelant() {
      setAppelSortant(function(a) {
        if (!a || !pcRef.current || pcRef.current.remoteDescription) { return a; }
        supabase.from("appels").select("statut,answer_sdp").eq("id", a.id).limit(1).then(function(r) {
          var row = r.data && r.data[0];
          if (row && row.answer_sdp && pcRef.current && !pcRef.current.remoteDescription) {
            pcRef.current.setRemoteDescription(JSON.parse(row.answer_sdp)).then(function() {
              setEnAppel(true);
            });
          }
        });
        return a;
      });
    }
    var reponseTimer = setInterval(verifierReponseAppelant, 1500);

    return function() {
      clearInterval(timer);
      clearInterval(presTimer);
      clearInterval(appelTimer);
      clearInterval(reponseTimer);'''

count_a = c.count(old_a)
print("PATCH A - Occurrences trouvees:", count_a)
if count_a == 1:
    c = c.replace(old_a, new_a)
    print("PATCH A applique: OK")
else:
    print("PATCH A: ANCRE NON UNIQUE OU INTROUVABLE - ARRET")
    sys.exit(1)

# ---- PATCH B: nettoyer WebRTC dans raccrocher() ----
old_b = '''  function raccrocher() {
    var id = enAppel ? (appelEntrant ? appelEntrant.id : (appelSortant ? appelSortant.id : null)) : (appelSortant ? appelSortant.id : null);
    if(id) {
      supabase.from("appels").update({statut:"termine"}).eq("id", id).then(function(){});
    }
    setEnAppel(false);
    setAppelEntrant(null);
    setAppelSortant(null);
  }'''

new_b = '''  function raccrocher() {
    var id = enAppel ? (appelEntrant ? appelEntrant.id : (appelSortant ? appelSortant.id : null)) : (appelSortant ? appelSortant.id : null);
    if(id) {
      supabase.from("appels").update({statut:"termine"}).eq("id", id).then(function(){});
    }
    if (pcRef.current) { pcRef.current.close(); pcRef.current = null; }
    if (localStreamRef.current) { localStreamRef.current.getTracks().forEach(function(t){t.stop();}); localStreamRef.current = null; }
    setEnAppel(false);
    setAppelEntrant(null);
    setAppelSortant(null);
  }'''

count_b = c.count(old_b)
print("PATCH B - Occurrences trouvees:", count_b)
if count_b == 1:
    c = c.replace(old_b, new_b)
    print("PATCH B applique: OK")
else:
    print("PATCH B: ANCRE NON UNIQUE OU INTROUVABLE - ARRET (fichier non modifie pour ce patch)")
    open(path, "w", encoding="utf-8").write(c)
    sys.exit(1)

open(path, "w", encoding="utf-8").write(c)
print("Tous les patches appliques avec succes.")
