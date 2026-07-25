import sys

path = "App.jsx"
c = open(path, encoding="utf-8").read()

old = '''  function accepterAppel() {
    if(!appelEntrant) return;
    var idAppel = appelEntrant.id;
    var nomAppelant = appelEntrant.appelant_nom;
    supabase.from("appels").select("*").eq("id", idAppel).limit(1).then(function(rSel) {
      var ligneAppel = rSel.data && rSel.data[0];
      if (!ligneAppel || !ligneAppel.offer_sdp) { return; }
      navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream) {'''

new = '''  function accepterAppel() {
    if(!appelEntrant) return;
    var idAppel = appelEntrant.id;
    var nomAppelant = appelEntrant.appelant_nom;
    var tentativesAcceptation = 0;
    function chercherOffre() {
      tentativesAcceptation++;
      supabase.from("appels").select("*").eq("id", idAppel).limit(1).then(function(rSel) {
        var ligneAppel = rSel.data && rSel.data[0];
        if (!ligneAppel || !ligneAppel.offer_sdp) {
          if (tentativesAcceptation < 6) {
            setDebugStatus("En attente de l'offre de l'appelant...");
            setTimeout(chercherOffre, 800);
          } else {
            setDebugStatus("Erreur: offre jamais recue, reessayez l'appel.");
          }
          return;
        }
        demarrerReponse(ligneAppel);
      });
    }
    function demarrerReponse(ligneAppel) {
      navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream) {'''

count = c.count(old)
print("Occurrences trouvees:", count)
if count == 1:
    c = c.replace(old, new)
    print("Patch A applique: OK")
else:
    print("ATTENTION: ancre non unique ou introuvable")
    sys.exit(1)

# Fermer la nouvelle fonction demarrerReponse et lancer chercherOffre au lieu de l'ancien appel direct
old2 = '''      }).catch(function(){});
    });
  }

  function refuserAppel() {'''

new2 = '''      }).catch(function(err){ setDebugStatus("Erreur micro: " + (err && err.name ? err.name : String(err))); });
    }
    chercherOffre();
  }

  function refuserAppel() {'''

count2 = c.count(old2)
print("Occurrences trouvees (fermeture):", count2)
if count2 == 1:
    c = c.replace(old2, new2)
    print("Patch B applique: OK")
    open(path, "w", encoding="utf-8").write(c)
else:
    print("ATTENTION: ancre non unique ou introuvable pour patch B")
    open(path, "w", encoding="utf-8").write(c)
    sys.exit(1)
