// ... code correct ...
          console.log('profileImage.classList APRES ADD :', profileImage.classList);
          console.log('mainElement.classList APRES ADD :', mainElement.classList);


        // Déplacer l'image hors du header, juste avant main dans le DOM
        try { // <-- PREMIER BLOC TRY (correct)
          header.parentNode.insertBefore(profileImage, mainElement);
          console.log('insertBefore exécuté. Vérifier l\'Inspecteur.');
          console.log('Nouveau parent de profileImage JUSTE APRES insertBefore :', profileImage.parentNode);
        } catch (e) {
          console.error('Erreur lors de l\'exécution de insertBefore :', e);
        }

      } else { // <-- FIN CORRECTE DU IF PRÉCÉDENT
        console.log('Condition : profileImage N\'est PAS un enfant direct de header. Déplacement non nécessaire (ou déjà fait/dans un état inattendu).');
      } // <-- FIN CORRECTE DU IF PRÉCÉDENT


        try { // <-- CE BLOC EST UN DOUBLON ! IL N'EST PAS DANS UN IF/ELSE.
          header.parentNode.insertBefore(profileImage, mainElement);
          console.log('insertBefore exécuté. Vérifier l\'Inspecteur.');
          console.log('Nouveau parent de profileImage JUSTE APRES insertBefore :', profileImage.parentNode); // AJOUTEZ CETTE LIGNE
        } catch (e) {
          console.error('Erreur lors de l\'exécution de insertBefore :', e);
        }


      } else { // <-- CET ELSE EST ORPHELIN (sans if) => ERREUR DE SYNTAXE !
        console.log('Condition : profileImage N\'est PAS un enfant direct de header. Déplacement non nécessaire (ou déjà fait/dans un état inattendu).');
      } // <-- CETTE ACCCOLADE EST ORPHELINE
